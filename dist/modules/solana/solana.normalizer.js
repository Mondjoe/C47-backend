"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaNormalizer = void 0;
const common_1 = require("@nestjs/common");
let SolanaNormalizer = class SolanaNormalizer {
    normalizeBlock(raw) {
        if (!raw)
            return null;
        return {
            slot: raw.slot,
            blockhash: raw.blockhash,
            parentSlot: raw.parentSlot,
            timestamp: raw.blockTime ?? 0,
        };
    }
    normalizeTransaction(raw, slot) {
        if (!raw)
            return null;
        return {
            signature: raw.transaction.signatures[0],
            slot,
            success: raw.meta?.err === null,
            fee: raw.meta?.fee ?? 0,
            timestamp: raw.blockTime ?? 0,
            raw,
        };
    }
    normalizeStakeAccount(raw) {
        const info = raw.account?.data?.parsed?.info;
        if (!info)
            return null;
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
    normalizeValidator(raw, epoch) {
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
    normalizeReward(raw, address) {
        if (!raw)
            return null;
        return {
            epoch: BigInt(raw.epoch ?? 0),
            address,
            amount: BigInt(raw.amount ?? 0),
            postBalance: BigInt(raw.postBalance ?? 0),
            rewardType: raw.rewardType ?? 'unknown',
            commission: raw.commission ?? null,
        };
    }
};
exports.SolanaNormalizer = SolanaNormalizer;
exports.SolanaNormalizer = SolanaNormalizer = __decorate([
    (0, common_1.Injectable)()
], SolanaNormalizer);
//# sourceMappingURL=solana.normalizer.js.map