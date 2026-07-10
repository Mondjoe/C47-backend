import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SolanaQueue } from './solana.queue';

@Injectable()
export class SolanaCron {
  constructor(private readonly queue: SolanaQueue) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async indexSlots() {
    // TODO: pull validator list from DB
    const validators = ['VALIDATOR_ADDRESS_1'];

    for (const v of validators) {
      await this.queue.enqueueSlotIndex(v);
    }
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async indexBalances() {
    const validators = ['VALIDATOR_ADDRESS_1'];

    for (const v of validators) {
      await this.queue.enqueueBalanceIndex(v);
    }
  }
}