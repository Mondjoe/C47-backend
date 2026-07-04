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
var SolanaProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaProcessor = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
const redis_service_1 = require("../../cache/redis.service");
const solana_indexer_1 = require("./solana.indexer");
let SolanaProcessor = SolanaProcessor_1 = class SolanaProcessor {
    redis;
    indexer;
    logger = new common_1.Logger(SolanaProcessor_1.name);
    constructor(redis, indexer) {
        this.redis = redis;
        this.indexer = indexer;
        const connection = this.redis.getConnection();
        new bullmq_1.Worker('solana-block-queue', async (job) => {
            const { slot } = job.data;
            this.logger.log(`Processing block job for slot ${slot}`);
            await this.indexer.processSlot(slot);
        }, { connection });
        new bullmq_1.Worker('solana-tx-queue', async (job) => {
            const { signature, raw, slot } = job.data;
            this.logger.log(`Processing tx job ${signature}`);
            await this.indexer.processTransaction(raw, slot);
        }, { connection });
        new bullmq_1.Worker('solana-stake-queue', async (job) => {
            const { address } = job.data;
            this.logger.log(`Processing stake job for ${address}`);
            await this.indexer.updateStakeAccounts(address);
        }, { connection });
        new bullmq_1.Worker('solana-validator-queue', async () => {
            this.logger.log(`Processing validator update job`);
            await this.indexer.updateValidators();
        }, { connection });
    }
};
exports.SolanaProcessor = SolanaProcessor;
exports.SolanaProcessor = SolanaProcessor = SolanaProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        solana_indexer_1.SolanaIndexer])
], SolanaProcessor);
//# sourceMappingURL=solana.processor.js.map