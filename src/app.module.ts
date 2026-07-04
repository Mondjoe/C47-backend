import { Module } from '@nestjs/common';
import { SolanaModule } from './modules/solana/solana.module';

@Module({
  imports: [SolanaModule],
})
export class AppModule {}