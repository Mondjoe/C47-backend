import { Injectable } from '@nestjs/common';
import { CreateProposalDto } from './dtos/create-proposal.dto';
import { VoteDto } from './dtos/vote.dto';
import { FinalizeDto } from './dtos/finalize.dto';

@Injectable()
export class DaoService {
  private proposals = new Map<
    string,
    {
      title: string;
      description: string;
      votesFor: number;
      votesAgainst: number;
      finalized: boolean;
    }
  >();

  async createProposal(dto: CreateProposalDto) {
    if (this.proposals.has(dto.proposalId)) {
      return { status: 'error', message: 'Proposal already exists' };
    }

    this.proposals.set(dto.proposalId, {
      title: dto.title,
      description: dto.description,
      votesFor: 0,
      votesAgainst: 0,
      finalized: false,
    });

    return {
      status: 'created',
      proposalId: dto.proposalId,
      title: dto.title,
    };
  }

  async vote(dto: VoteDto) {
    const proposal = this.proposals.get(dto.proposalId);
    if (!proposal) {
      return { status: 'error', message: 'Proposal not found' };
    }

    if (proposal.finalized) {
      return { status: 'error', message: 'Proposal already finalized' };
    }

    if (dto.vote === 'for') {
      proposal.votesFor += 1;
    } else {
      proposal.votesAgainst += 1;
    }

    return {
      status: 'voted',
      proposalId: dto.proposalId,
      votesFor: proposal.votesFor,
      votesAgainst: proposal.votesAgainst,
    };
  }

  async finalize(dto: FinalizeDto) {
    const proposal = this.proposals.get(dto.proposalId);
    if (!proposal) {
      return { status: 'error', message: 'Proposal not found' };
    }

    proposal.finalized = true;

    return {
      status: 'finalized',
      proposalId: dto.proposalId,
      result:
        proposal.votesFor > proposal.votesAgainst ? 'accepted' : 'rejected',
    };
  }
}