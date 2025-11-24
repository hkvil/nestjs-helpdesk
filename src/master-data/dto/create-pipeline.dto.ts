import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePipelineDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
