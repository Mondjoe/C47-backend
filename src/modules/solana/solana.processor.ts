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
            await this.solana.indexValidatorSlot(validatorAddress);
            break;
          case 'index-balance':
            await this.solana.indexValidatorBalance(validatorAddress);
            break;
          default:
            this.logger.warn(`Unknown job: ${job.name}`);
        }
      },
      { connection: this.redis.getConnection() },
    );
  }
}