import { PrismaService } from '../../database/prisma/prisma.service';
import { SolanaService } from './solana.service';
import { SolanaNormalizer } from './solana.normalizer';
export declare class SolanaIndexer {
    private readonly prisma;
    private readonly solana;
    private readonly normalizer;
    private readonly logger;
    constructor(prisma: PrismaService, solana: SolanaService, normalizer: SolanaNormalizer);
    scanNewBlocks(): Promise<void>;
    processSlot(slot: number): Promise<void>;
    processTransaction(rawTx: any, slot: number): Promise<void>;
    updateBalance(address: string): Promise<void>;
    updateStakeAccounts(address: string): Promise<void>;
    updateValidators(): Promise<void>;
    updateRewards(address: string): Promise<void>;
}
