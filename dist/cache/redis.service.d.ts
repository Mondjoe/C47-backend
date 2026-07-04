import { RedisClientType } from 'redis';
export declare class RedisService {
    private client;
    constructor();
    getClient(): RedisClientType;
}
