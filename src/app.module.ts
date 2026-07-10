import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from './prisma.service';
import { RedisService } from './cache/redis.service';
import { SolanaService } from './modules/solana/solana.service';
import { SolanaQueue } from './modules/solana/solana.queue';
import { SolanaProcessor } from './modules/solana/solana.processor';
import { SolanaCron } from './modules/solana/solana.cron';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    PrismaService,
    RedisService,
    SolanaService,
    SolanaQueue,
    SolanaProcessor,
    SolanaCron,
  ],
})
export class AppModule {}