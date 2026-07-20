import { SolanaIndexer } from './solana.indexer';
export declare class SolanaCron {
    private readonly indexer;
    private readonly logger;
    constructor(indexer: SolanaIndexer);
    scanBlocks(): Promise<void>;
    updateValidators(): Promise<void>;
    updateBalances(): Promise<void>;
    updateStake(): Promise<void>;
    updateRewards(): Promise<void>;
}
