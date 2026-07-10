import axios from 'axios';

export class RpcManager {
  constructor(private readonly url: string) {}

  async call(method: string, params: any[]) {
    const response = await axios.post(this.url, {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    });

    return response.data.result;
  }
}