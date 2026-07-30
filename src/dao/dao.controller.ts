import { Body, Controller, Post } from '@nestjs/common';
import { DaoService } from './dao.service';
import { CreateProposalDto } from './dtos/create-proposal.dto';
import { VoteDto } from './dtos/vote.dto';
import { FinalizeDto } from './dtos/finalize.dto';

@Controller('dao')
export class DaoController {
  constructor(private readonly daoService: DaoService) {}

  @Post('proposal/create')
  async createProposal(@Body() dto: CreateProposalDto) {
    return this.daoService.createProposal(dto);
  }

  @Post('proposal/vote')
  async vote(@Body() dto: VoteDto) {
    return this.daoService.vote(dto);
  }

  @Post('proposal/finalize')
  async finalize(@Body() dto: FinalizeDto) {
    return this.daoService.finalize(dto);
  }
}