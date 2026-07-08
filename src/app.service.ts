import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';   // ← ADD THIS

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}     // ← ADD THIS

  getHello(): string {
    return 'Hello World!';
  }

  getValidators() {
    return this.prisma.validator.findMany();        // ← NOW THIS WORKS
  }
}