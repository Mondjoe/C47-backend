import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { SolanaService } from './solana.service';
import { SolanaNormalizer } from './solana.normalizer';

@Injectable()
export class SolanaIndexer {
  private readonly logger = new Logger(SolanaIndexer.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly solana: SolanaService,
    private readonly normalizer: SolanaNormalizer,
  ) {}

  // -----------------------------
  // Main block scanning loop
  // -----------------------------
  async scanNewBlocks() {
    const latestSlot = await this.solana.getLatestSlot();

    const lastIndexed = await this.prisma.solanaBlock.findFirst({
      orderBy: { slot: 'desc' },
    });

    let startSlot = lastIndexed ? Number(lastIndexed.slot) + 1 : latestSlot - 5;

    for (let slot = startSlot; slot <= latestSlot; slot++) {
      await this.processSlot(slot);
    }
  }

  // -----------------------------
  // Process a single slot
  // -----------------------------
  async processSlot(slot: number) {
    const block = await this.solana.getBlock(slot);
    if (!block) return;

    const normalizedBlock = this.normalizer.normalizeBlock(block);

    await this.prisma.solanaBlock.upsert({
      where: { slot },
      update: {},
      create: normalizedBlock,
    });

    // Process transactions
    for (const tx of block.transactions || []) {
      await this.processTransaction(tx, slot);
    }

    this.logger.log(`Indexed slot ${slot}`);
  }

  // -----------------------------
  // Process a single transaction
  // -----------------------------
  async processTransaction(rawTx: any, slot: number) {
    const normalized = this.normalizer.normalizeTransaction(rawTx, slot);
    if (!normalized) return;

    await this.prisma.solanaTransaction.upsert({
      where: { signature: normalized.signature },
      update: {},
      create: {
        signature: normalized.signature,
        slot: normalized.slot,
        success: normalized.success,
        fee: normalized.fee,
        timestamp: normalized.timestamp,
        raw: normalized.raw,
      },
    });
  }

  // -----------------------------
  // Update balances for an address
  // -----------------------------
  async updateBalance(address: string) {
    const lamports = await this.solana.getBalance(address);

    const account = await this.prisma.account.upsert({
      where: { address },
      update: {},
      create: { address },
    });

    await this.prisma.balance.upsert({
      where: { accountId: account.id },
      update: { lamports: BigInt(lamports) },
      create: {
        accountId: account.id,
        lamports: BigInt(lamports),
      },
    });
  }

  // -----------------------------
  // Update stake accounts for an address
  // -----------------------------
  async updateStakeAccounts(address: string) {
    const stakeAccounts = await this.solana.getStakeAccounts(address);

    const account = await this.prisma.account.upsert({
      where: { address },
      update: {},
      create: { address },
    });

    for (const raw of stakeAccounts) {
      const normalized = this.normalizer.normalizeStakeAccount(raw);
      if (!normalized) continue;

      await this.prisma.solanaStakeAccount.upsert({
        where: { stakePubkey: normalized.stakePubkey },
        update: {
          delegatedStake: normalized.delegatedStake,
          voterAddress: normalized.voterAddress,
          activationEpoch: normalized.activationEpoch,
          deactivationEpoch: normalized.deactivationEpoch,
          state: normalized.state,
        },
        create: {
          accountId: account.id,
          ...normalized,
        },
      });
    }
  }

  // -----------------------------
  // Update validator list
  // -----------------------------
  async updateValidators() {
    const epochInfo = await this.solana.getEpochInfo();
    const validators = await this.solana.getValidators();

    for (const v of validators) {
      const normalized = this.normalizer.normalizeValidator(v, epochInfo.epoch);

      await this.prisma.solanaValidator.upsert({
        where: { voteKey: normalized.voteKey },
        update: {
          commission: normalized.commission,
          activatedStake: normalized.activatedStake,
          epoch: normalized.epoch,
          lastVote: normalized.lastVote,
          rootSlot: normalized.rootSlot,
          credits: normalized.credits,
        },
        create: normalized,
      });
    }
  }

  // -----------------------------
  // Update rewards for an address
  // -----------------------------
  async updateRewards(address: string) {
    const rewards = await this.solana.getRewards(address);

    for (const r of rewards) {
      const normalized = this.normalizer.normalizeReward(r, address);
      if (!normalized) continue;

      await this.prisma.solanaReward.create({
        data: normalized,
      });
    }
  }
}