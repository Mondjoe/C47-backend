import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { RedisService } from '../../cache/redis.service';

export type SolanaJobName = 'index-slot' | 'index-balance';

@Injectable()
export class SolanaQueue {
  private queue: Queue;

  constructor(private readonly redis: RedisService) {
    this.queue = new Queue('solana-indexer', {
      connection: this.redis.getConnection(),
    });
  }

  async enqueueSlotIndex(validatorAddress: string) {
    await this.queue.add('index-slot', { validatorAddress });
  }

  async enqueueBalanceIndex(validatorAddress: string) {
    await this.queue.add('index-balance', { validatorAddress });
  }
}