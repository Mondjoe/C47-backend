import { Injectable } from '@nestjs/common';
import { Worker } from 'bullmq';
import { RedisService } from '../../cache/redis.service';

@Injectable()
export class SolanaProcessor {
  private worker: Worker;

  constructor(private readonly redis: RedisService) {
    this.worker = new Worker('solana', async job => {
      // process job
    }, {
      connection: this.redis.getConnection(),
    });
  }
}