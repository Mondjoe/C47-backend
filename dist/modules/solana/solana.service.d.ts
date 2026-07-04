import { RpcManager } from '../../rpc/rpc.manager';
export declare class SolanaService {
    private readonly rpc;
    private readonly logger;
    constructor(rpc: RpcManager);
    getLatestSlot(): Promise<number>;
    getBlock(slot: number): Promise<any>;
    getBalance(address: string): Promise<number>;
    getStakeAccounts(address: string): Promise<any[]>;
    getValidators(): Promise<any[]>;
    getEpochInfo(): Promise<any>;
    getRewards(address: string): Promise<any[]>;
}
