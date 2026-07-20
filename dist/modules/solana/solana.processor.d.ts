import { RedisService } from '../../cache/redis.service';
import { SolanaIndexer } from './solana.indexer';
export declare class SolanaProcessor {
    private readonly redis;
    private readonly indexer;
    private readonly logger;
    constructor(redis: RedisService, indexer: SolanaIndexer);
}
