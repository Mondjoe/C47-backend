export declare class SolanaNormalizer {
    normalizeBlock(raw: any): {
        slot: any;
        blockhash: any;
        parentSlot: any;
        timestamp: any;
    } | null;
    normalizeTransaction(raw: any, slot: number): {
        signature: any;
        slot: number;
        success: boolean;
        fee: any;
        timestamp: any;
        raw: any;
    } | null;
    normalizeStakeAccount(raw: any): {
        stakePubkey: any;
        delegatedStake: bigint;
        voterAddress: any;
        activationEpoch: bigint;
        deactivationEpoch: bigint | null;
        state: any;
    } | null;
    normalizeValidator(raw: any, epoch: number): {
        voteKey: any;
        identityKey: any;
        commission: any;
        activatedStake: bigint;
        epoch: bigint;
        lastVote: bigint;
        rootSlot: bigint;
        credits: bigint;
    };
    normalizeReward(raw: any, address: string): {
        epoch: bigint;
        address: string;
        amount: bigint;
        postBalance: bigint;
        rewardType: any;
        commission: any;
    } | null;
}
