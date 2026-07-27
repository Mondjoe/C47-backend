import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  getConnection() {
    return {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
    };
  }
}