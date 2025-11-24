import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateKnowledgeBaseDto {
  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsString()
  @IsNotEmpty()
  channel: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  sub_category: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  file_name?: string;

  @IsOptional()
  @IsString()
  file_text?: string;
}
