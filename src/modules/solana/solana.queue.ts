import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { RedisService } from '../../cache/redis.service';

@Injectable()
export class SolanaQueue {
  private queue: Queue;

  constructor(private readonly redis: RedisService) {
    this.queue = new Queue('solana', {
      connection: this.redis.getConnection(),
    });
  }
}