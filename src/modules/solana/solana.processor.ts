import { Injectable, Logger } from '@nestjs/common';
import { Worker } from 'bullmq';
import { RedisService } from '../../cache/redis.service';
import { SolanaService } from './solana.service';

@Injectable()
export class SolanaProcessor {
  private readonly logger = new Logger(SolanaProcessor.name);

  constructor(
    private readonly redis: RedisService,
    private readonly solana: SolanaService,
  ) {
    new Worker(
      'solana-indexer',
      async job => {
        const { validatorAddress } = job.data;

        switch (job.name) {
          case 'index-slot':
            await this.solana.getLatestSlot();
await this.solana.getBalance(validatorAddress);
            break;
          default:
            this.logger.warn(`Unknown job: ${job.name}`);
        }
      },
      { connection: { host: '127.0.0.1', port: 6379 }
    );
  }
}