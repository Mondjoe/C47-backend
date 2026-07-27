import { Injectable } from '@nestjs/common';
import { RpcManager } from '../../rpc/rpc.manager';
import { PrismaService } from '../../database/prisma/prisma.service';
@Injectable()
export class SolanaService {
  constructor(
    private readonly rpc: RpcManager,
    private readonly prisma: PrismaService,
  ) {}

  async getLatestSlot() {
    return await this.rpc.call<number>('getSlot');
  }

  async getBlock(slot: number) {
    return await this.rpc.call<any>('getBlock', [slot]);
  }

  async getBalance(address: string) {
    return await this.rpc.call<number>('getBalance', [address]);
  }

  async getStakeAccounts(address: string) {
    return await this.rpc.call<any>('getProgramAccounts', [address]);
  }

  async getEpochInfo() {
    return await this.rpc.call<any>('getEpochInfo');
  }

  async getValidators() {
    return await this.rpc.call<any>('getVoteAccounts');
  }

  async getRewards(address: string) {
    return await this.rpc.call<any>('getInflationReward', [[address]]);
  }
}