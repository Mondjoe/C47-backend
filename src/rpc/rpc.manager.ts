import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RpcManager {
  private endpoint = process.env.SOLANA_RPC || 'https://api.mainnet-beta.solana.com';

  async sendRpc(method: string, params: any[] = []) {
    const response = await axios.post(this.endpoint, {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    });

    return response.data.result;
  }
}