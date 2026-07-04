import { Injectable } from '@nestjs/common';

@Injectable()
export class SolanaNormalizer {
  // -----------------------------
  // Normalize block
  // -----------------------------
  normalizeBlock(raw: any) {
    if (!raw) return null;

    return {
      slot: raw.slot,
      blockhash: raw.blockhash,
      parentSlot: raw.parentSlot,
      timestamp: raw.blockTime ?? 0,
    };
  }

  // -----------------------------
  // Normalize transaction
  // -----------------------------
  normalizeTransaction(raw: any, slot: number) {
    if (!raw) return null;

    return {
      signature: raw.transaction.signatures[0],
      slot,
      success: raw.meta?.err === null,
      fee: raw.meta?.fee ?? 0,
      timestamp: raw.blockTime ?? 0,
      raw,
    };
  }

  // -----------------------------
  // Normalize stake account
  // -----------------------------
  normalizeStakeAccount(raw: any) {
    const info = raw.account?.data?.parsed?.info;
    if (!info) return null;

    return {
      stakePubkey: raw.pubkey,
      delegatedStake: BigInt(info.stake?.delegation?.stake ?? 0),
      voterAddress: info.stake?.delegation?.voter ?? '',
      activationEpoch: BigInt(info.stake?.delegation?.activationEpoch ?? 0),
      deactivationEpoch: info.stake?.delegation?.deactivationEpoch
        ? BigInt(info.stake.delegation.deactivationEpoch)
        : null,
      state: info.state ?? 'unknown',
    };
  }

  // -----------------------------
  // Normalize validator
  // -----------------------------
  normalizeValidator(raw: any, epoch: number) {
    return {
      voteKey: raw.votePubkey,
      identityKey: raw.nodePubkey,
      commission: raw.commission,
      activatedStake: BigInt(raw.activatedStake ?? 0),
      epoch: BigInt(epoch),
      lastVote: BigInt(raw.lastVote ?? 0),
      rootSlot: BigInt(raw.rootSlot ?? 0),
      credits: BigInt(raw.credits ?? 0),
    };
  }

  // -----------------------------
  // Normalize reward
  // -----------------------------
  normalizeReward(raw: any, address: string) {
    if (!raw) return null;

    return {
      epoch: BigInt(raw.epoch ?? 0),
      address,
      amount: BigInt(raw.amount ?? 0),
      postBalance: BigInt(raw.postBalance ?? 0),
      rewardType: raw.rewardType ?? 'unknown',
      commission: raw.commission ?? null,
    };
  }
}