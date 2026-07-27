import { Injectable } from '@nestjs/common';
import { RpcManager } from '../../rpc/rpc.manager';

@Injectable()
export class SolanaService {
  constructor(private readonly rpc: RpcManager) {}

  // Latest slot
  async getLatestSlot() {
    return await this.rpc.connection.getSlot();
  }

  // Fetch a block
  async getBlock(slot: number) {
    return await this.rpc.connection.getBlock(slot, {
      maxSupportedTransactionVersion: 0,
    });
  }

  // Balance (lamports)
  async getBalance(address: string) {
    return await this.rpc.connection.getBalance(address);
  }

  // Stake accounts
  async getStakeAccounts(address: string) {
    return await this.rpc.connection.getParsedProgramAccounts(
      this.rpc.stakeProgramId,
      {
        filters: [
          {
            memcmp: {
              offset: 0,
              bytes: address,
            },
          },
        ],
      },
    );
  }

  // Epoch info
  async getEpochInfo() {
    return await this.rpc.connection.getEpochInfo();
  }

  // Validators (vote accounts)
  async getValidators() {
    return await this.rpc.connection.getVoteAccounts();
  }

  // Rewards (inflation rewards)
  async getRewards(addresses: string[]) {
    return await this.rpc.connection.getInflationReward(addresses);
  }
}