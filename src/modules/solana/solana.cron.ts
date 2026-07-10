import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SolanaService } from './solana.service';

@Injectable()
export class SolanaCron {
  constructor(private readonly solana: SolanaService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    await this.solana.getSlot();
  }
}