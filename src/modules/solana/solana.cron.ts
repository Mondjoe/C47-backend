import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SolanaIndexer } from './solana.indexer';

@Injectable()
export class SolanaCron {
  private readonly logger = new Logger(SolanaCron.name);

  constructor(private readonly indexer: SolanaIndexer) {}

  // -----------------------------
  // Scan new blocks every 5 seconds
  // -----------------------------
  @Cron('*/5 * * * * *')
  async scanBlocks() {
    this.logger.log('Scanning new Solana blocks...');
    await this.indexer.scanNewBlocks();
  }

  // -----------------------------
  // Update validators every 60 seconds
  // -----------------------------
  @Cron(CronExpression.EVERY_MINUTE)
  async updateValidators() {
    this.logger.log('Updating Solana validators...');
    await this.indexer.updateValidators();
  }

  // -----------------------------
  // Update balances every 30 seconds
  // (You can optimize by tracking active accounts)
  // -----------------------------
  @Cron('*/30 * * * * *')
  async updateBalances() {
    this.logger.log('Updating balances...');

    // TODO: Replace with dynamic account list
    const trackedAccounts = [];

    for (const address of trackedAccounts) {
      await this.indexer.updateBalance(address);
    }
  }

  // -----------------------------
  // Update stake accounts every 45 seconds
  // -----------------------------
  @Cron('*/45 * * * * *')
  async updateStake() {
    this.logger.log('Updating stake accounts...');

    // TODO: Replace with dynamic account list
    const trackedAccounts = [];

    for (const address of trackedAccounts) {
      await this.indexer.updateStakeAccounts(address);
    }
  }

  // -----------------------------
  // Update rewards every 2 minutes
  // -----------------------------
  @Cron('*/120 * * * * *')
  async updateRewards() {
    this.logger.log('Updating rewards...');

    // TODO: Replace with dynamic account list
    const trackedAccounts = [];

    for (const address of trackedAccounts) {
      await this.indexer.updateRewards(address);
    }
  }
}