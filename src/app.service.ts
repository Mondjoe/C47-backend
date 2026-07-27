import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getValidators() {
    return this.prisma.validator.findMany();
  }
}