import { Queue } from 'bullmq';
import { RedisService } from '../../cache/redis.service';
export declare class SolanaQueue {
    private readonly redis;
    readonly blockQueue: Queue;
    readonly txQueue: Queue;
    readonly stakeQueue: Queue;
    readonly validatorQueue: Queue;
    constructor(redis: RedisService);
    addBlockJob(slot: number): Promise<void>;
    addTxJob(signature: string, raw: any, slot: number): Promise<void>;
    addStakeJob(address: string): Promise<void>;
    addValidatorJob(): Promise<void>;
}
