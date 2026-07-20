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
var SolanaCron_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaCron = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const solana_indexer_1 = require("./solana.indexer");
let SolanaCron = SolanaCron_1 = class SolanaCron {
    indexer;
    logger = new common_1.Logger(SolanaCron_1.name);
    constructor(indexer) {
        this.indexer = indexer;
    }
    async scanBlocks() {
        this.logger.log('Scanning new Solana blocks...');
        await this.indexer.scanNewBlocks();
    }
    async updateValidators() {
        this.logger.log('Updating Solana validators...');
        await this.indexer.updateValidators();
    }
    async updateBalances() {
        this.logger.log('Updating balances...');
        const trackedAccounts = [];
        for (const address of trackedAccounts) {
            await this.indexer.updateBalance(address);
        }
    }
    async updateStake() {
        this.logger.log('Updating stake accounts...');
        const trackedAccounts = [];
        for (const address of trackedAccounts) {
            await this.indexer.updateStakeAccounts(address);
        }
    }
    async updateRewards() {
        this.logger.log('Updating rewards...');
        const trackedAccounts = [];
        for (const address of trackedAccounts) {
            await this.indexer.updateRewards(address);
        }
    }
};
exports.SolanaCron = SolanaCron;
__decorate([
    (0, schedule_1.Cron)('*/5 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SolanaCron.prototype, "scanBlocks", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SolanaCron.prototype, "updateValidators", null);
__decorate([
    (0, schedule_1.Cron)('*/30 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SolanaCron.prototype, "updateBalances", null);
__decorate([
    (0, schedule_1.Cron)('*/45 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SolanaCron.prototype, "updateStake", null);
__decorate([
    (0, schedule_1.Cron)('*/120 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SolanaCron.prototype, "updateRewards", null);
exports.SolanaCron = SolanaCron = SolanaCron_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [solana_indexer_1.SolanaIndexer])
], SolanaCron);
//# sourceMappingURL=solana.cron.js.map