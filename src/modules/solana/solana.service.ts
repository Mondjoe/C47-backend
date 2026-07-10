import { Injectable } from '@nestjs/common';
import { RpcManager } from '../../rpc/rpc.manager';

@Injectable()
export class SolanaService {
  constructor(private readonly rpc: RpcManager) {}

  async getSlot() {
    return this.rpc.call('getSlot', []);
  }
}