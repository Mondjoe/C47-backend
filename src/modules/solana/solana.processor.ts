import { Injectable, Logger } from '@nestjs/common';
import { Worker } from 'bullmq';
import { RedisService } from '../../cache/redis.service';
import { SolanaIndexer } from './solana.indexer';

@Injectable()
export class SolanaProcessor {
  private readonly logger = new Logger(SolanaProcessor.name);

  constructor(
    private readonly redis: RedisService,
    private readonly indexer: SolanaIndexer,
  ) {
    const connection = this.redis.getConnection();

    // -----------------------------
    // Block Worker
    // -----------------------------
    new Worker(
      'solana-block-queue',
      async (job) => {
        const { slot } = job.data;
        this.logger.log(`Processing block job for slot ${slot}`);
        await this.indexer.processSlot(slot);
      },
      { connection },
    );

    // -----------------------------
    // Transaction Worker
    // -----------------------------
    new Worker(
      'solana-tx-queue',
      async (job) => {
        const { signature, raw, slot } = job.data;
        this.logger.log(`Processing tx job ${signature}`);
        await this.indexer.processTransaction(raw, slot);
      },
      { connection },
    );

    // -----------------------------
    // Stake Worker
    // -----------------------------
    new Worker(
      'solana-stake-queue',
      async (job) => {
        const { address } = job.data;
        this.logger.log(`Processing stake job for ${address}`);
        await this.indexer.updateStakeAccounts(address);
      },
      { connection },
    );

    // -----------------------------
    // Validator Worker
    // -----------------------------
    new Worker(
      'solana-validator-queue',
      async () => {
        this.logger.log(`Processing validator update job`);
        await this.indexer.updateValidators();
      },
      { connection },
    );
  }
}