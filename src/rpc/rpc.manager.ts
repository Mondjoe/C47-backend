import axios from 'axios';

export class RpcManager {
  constructor(private readonly url: string) {}

  async call<T = any>(method: string, params: any[] = []): Promise<T> {
    const { data } = await axios.post(this.url, {
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    });

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.result as T;
  }
}
