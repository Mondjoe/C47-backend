import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { RedisService } from '../../cache/redis.service';

@Injectable()
export class SolanaQueue {
  public readonly blockQueue: Queue;
  public readonly txQueue: Queue;
  public readonly stakeQueue: Queue;
  public readonly validatorQueue: Queue;

  constructor(private readonly redis: RedisService) {
    const connection = this.redis.getConnection();

    this.blockQueue = new Queue('solana-block-queue', { connection });
    this.txQueue = new Queue('solana-tx-queue', { connection });
    this.stakeQueue = new Queue('solana-stake-queue', { connection });
    this.validatorQueue = new Queue('solana-validator-queue', { connection });
  }

  async addBlockJob(slot: number) {
    await this.blockQueue.add('process-block', { slot });
  }

  async addTxJob(signature: string, raw: any, slot: number) {
    await this.txQueue.add('process-tx', { signature, raw, slot });
  }

  async addStakeJob(address: string) {
    await this.stakeQueue.add('process-stake', { address });
  }

  async addValidatorJob() {
    await this.validatorQueue.add('process-validators', {});
  }
}