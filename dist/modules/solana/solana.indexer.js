"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SolanaIndexer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaIndexer = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const solana_service_1 = require("./solana.service");
const solana_normalizer_1 = require("./solana.normalizer");
let SolanaIndexer = SolanaIndexer_1 = class SolanaIndexer {
    prisma;
    solana;
    normalizer;
    logger = new common_1.Logger(SolanaIndexer_1.name);
    constructor(prisma, solana, normalizer) {
        this.prisma = prisma;
        this.solana = solana;
        this.normalizer = normalizer;
    }
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
    async processSlot(slot) {
        const block = await this.solana.getBlock(slot);
        if (!block)
            return;
        const normalizedBlock = this.normalizer.normalizeBlock(block);
        await this.prisma.solanaBlock.upsert({
            where: { slot },
            update: {},
            create: normalizedBlock,
        });
        for (const tx of block.transactions || []) {
            await this.processTransaction(tx, slot);
        }
        this.logger.log(`Indexed slot ${slot}`);
    }
    async processTransaction(rawTx, slot) {
        const normalized = this.normalizer.normalizeTransaction(rawTx, slot);
        if (!normalized)
            return;
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
    async updateBalance(address) {
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
    async updateStakeAccounts(address) {
        const stakeAccounts = await this.solana.getStakeAccounts(address);
        const account = await this.prisma.account.upsert({
            where: { address },
            update: {},
            create: { address },
        });
        for (const raw of stakeAccounts) {
            const normalized = this.normalizer.normalizeStakeAccount(raw);
            if (!normalized)
                continue;
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
    async updateRewards(address) {
        const rewards = await this.solana.getRewards(address);
        for (const r of rewards) {
            const normalized = this.normalizer.normalizeReward(r, address);
            if (!normalized)
                continue;
            await this.prisma.solanaReward.create({
                data: normalized,
            });
        }
    }
};
exports.SolanaIndexer = SolanaIndexer;
exports.SolanaIndexer = SolanaIndexer = SolanaIndexer_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        solana_service_1.SolanaService,
        solana_normalizer_1.SolanaNormalizer])
], SolanaIndexer);
//# sourceMappingURL=solana.indexer.js.map