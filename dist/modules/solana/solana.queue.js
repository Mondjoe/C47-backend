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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaQueue = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
const redis_service_1 = require("../../cache/redis.service");
let SolanaQueue = class SolanaQueue {
    redis;
    blockQueue;
    txQueue;
    stakeQueue;
    validatorQueue;
    constructor(redis) {
        this.redis = redis;
        const connection = this.redis.getConnection();
        this.blockQueue = new bullmq_1.Queue('solana-block-queue', { connection });
        this.txQueue = new bullmq_1.Queue('solana-tx-queue', { connection });
        this.stakeQueue = new bullmq_1.Queue('solana-stake-queue', { connection });
        this.validatorQueue = new bullmq_1.Queue('solana-validator-queue', { connection });
    }
    async addBlockJob(slot) {
        await this.blockQueue.add('process-block', { slot });
    }
    async addTxJob(signature, raw, slot) {
        await this.txQueue.add('process-tx', { signature, raw, slot });
    }
    async addStakeJob(address) {
        await this.stakeQueue.add('process-stake', { address });
    }
    async addValidatorJob() {
        await this.validatorQueue.add('process-validators', {});
    }
};
exports.SolanaQueue = SolanaQueue;
exports.SolanaQueue = SolanaQueue = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], SolanaQueue);
//# sourceMappingURL=solana.queue.js.map