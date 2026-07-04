"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SolanaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaService = void 0;
const common_1 = require("@nestjs/common");
const rpc_manager_1 = require("../../rpc/rpc.manager");
let SolanaService = SolanaService_1 = class SolanaService {
    rpc;
    logger = new common_1.Logger(SolanaService_1.name);
    constructor(rpc) {
        this.rpc = rpc;
    }
    async getLatestSlot() {
        const result = await this.rpc.call('getSlot', []);
        return result;
    }
    async getBlock(slot) {
        try {
            const block = await this.rpc.call('getBlock', [
                slot,
                {
                    maxSupportedTransactionVersion: 0,
                    transactionDetails: 'full',
                    rewards: true,
                },
            ]);
            return block;
        }
        catch (err) {
            this.logger.error(`Failed to fetch block ${slot}`, err);
            return null;
        }
    }
    async getBalance(address) {
        const result = await this.rpc.call('getBalance', [address]);
        return result?.value ?? 0;
    }
    async getStakeAccounts(address) {
        const result = await this.rpc.call('getProgramAccounts', [
            'Stake11111111111111111111111111111111111111',
            {
                filters: [
                    {
                        memcmp: {
                            offset: 12,
                            bytes: address,
                        },
                    },
                ],
                encoding: 'jsonParsed',
            },
        ]);
        return result || [];
    }
    async getValidators() {
        const result = await this.rpc.call('getVoteAccounts', []);
        return [...result.current, ...result.delinquent];
    }
    async getEpochInfo() {
        return await this.rpc.call('getEpochInfo', []);
    }
    async getRewards(address) {
        const result = await this.rpc.call('getInflationReward', [[address]]);
        return result || [];
    }
};
exports.SolanaService = SolanaService;
exports.SolanaService = SolanaService = SolanaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rpc_manager_1.RpcManager])
], SolanaService);
//# sourceMappingURL=solana.service.js.map