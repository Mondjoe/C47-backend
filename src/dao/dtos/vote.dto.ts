import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class VoteDto {
  @IsString()
  @IsNotEmpty()
  proposalId: string;

  @IsString()
  @IsIn(['for', 'against'])
  vote: string;
}