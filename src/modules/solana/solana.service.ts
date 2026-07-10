import { Injectable, Logger } from '@nestjs/common';
import { RpcManager } from '../../rpc/rpc.manager';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class SolanaService {
  private readonly logger = new Logger(SolanaService.name);

  constructor(
    private readonly rpc: RpcManager,
    private readonly prisma: PrismaService,
  ) {}

  async indexValidatorSlot(validatorAddress: string) {
    const slot = await this.rpc.call<number>('getSlot');
    this.logger.debug(`Slot: ${slot} for ${validatorAddress}`);

    await this.prisma.validatorMetric.create({
      data: {
        validatorId: validatorAddress, // or mapped ID
        slot,
        value: 1,
      },
    });
  }

  async indexValidatorBalance(validatorAddress: string) {
    const lamports = await this.rpc.call<number>('getBalance', [validatorAddress]);
    const sol = lamports / 1_000_000_000;

    await this.prisma.validatorMetric.create({
      data: {
        validatorId: validatorAddress,
        slot: 0,
        value: sol,
      },
    });
  }
}