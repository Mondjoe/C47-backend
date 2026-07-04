import { Module } from '@nestjs/common';
import { SolanaService } from './solana.service';
import { SolanaProcessor } from './solana.processor';
import { SolanaIndexer } from './solana.indexer';
import { SolanaQueue } from './solana.queue';
import { SolanaCron } from './solana.cron';
import { SolanaNormalizer } from './solana.normalizer';
import { PrismaService } from '../../database/prisma/prisma.service';
import { RedisService } from '../../cache/redis.service';
import { RpcManager } from '../../rpc/rpc.manager';

@Module({
providers: [
  PrismaService,
  RedisService,
  RpcManager,
  SolanaService,
  SolanaProcessor,
  SolanaIndexer,
  SolanaQueue,
  SolanaCron,
  SolanaNormalizer,
],
})
export class SolanaModule {}