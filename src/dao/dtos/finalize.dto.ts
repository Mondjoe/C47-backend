import { IsString, IsNotEmpty } from 'class-validator';

export class FinalizeDto {
  @IsString()
  @IsNotEmpty()
  proposalId: string;
}