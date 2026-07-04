import { Injectable, Logger } from '@nestjs/common';
import { RpcManager } from '../../rpc/rpc.manager';

@Injectable()
export class SolanaService {
  private readonly logger = new Logger(SolanaService.name);

  constructor(private readonly rpc: RpcManager) {}

  // -----------------------------
  // Fetch latest slot
  // -----------------------------
  async getLatestSlot(): Promise<number> {
    const result = await this.rpc.call('getSlot', []);
    return result;
  }

  // -----------------------------
  // Fetch block by slot
  // -----------------------------
  async getBlock(slot: number): Promise<any> {
    try {
      const block = await this.rpc.call('getBlock', [
        slot,
        {
          maxSupportedTransactionVersion: 0,
          transactionDetails: 'full',
          rewards: true,
        },
      ]);

      return block;
    } catch (err) {
      this.logger.error(`Failed to fetch block ${slot}`, err);
      return null;
    }
  }

  // -----------------------------
  // Fetch account balance
  // -----------------------------
  async getBalance(address: string): Promise<number> {
    const result = await this.rpc.call('getBalance', [address]);
    return result?.value ?? 0;
  }

  // -----------------------------
  // Fetch stake accounts for an address
  // -----------------------------
  async getStakeAccounts(address: string): Promise<any[]> {
    const result = await this.rpc.call('getProgramAccounts', [
      'Stake11111111111111111111111111111111111111',
      {
        filters: [
          {
            memcmp: {
              offset: 12,
              bytes: address,
            },
          },
        ],
        encoding: 'jsonParsed',
      },
    ]);

    return result || [];
  }

  // -----------------------------
  // Fetch validator list
  // -----------------------------
  async getValidators(): Promise<any[]> {
    const result = await this.rpc.call('getVoteAccounts', []);
    return [...result.current, ...result.delinquent];
  }

  // -----------------------------
  // Fetch epoch info
  // -----------------------------
  async getEpochInfo(): Promise<any> {
    return await this.rpc.call('getEpochInfo', []);
  }

  // -----------------------------
  // Fetch rewards for an address
  // -----------------------------
  async getRewards(address: string): Promise<any[]> {
    const result = await this.rpc.call('getInflationReward', [[address]]);
    return result || [];
  }
}