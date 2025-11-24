import {
  IsInt,
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTicketDto {
  @Type(() => Number)
  @IsInt()
  reporter_id: number;

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
  pipeline: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsEnum(['low', 'medium', 'high', 'critical'] as const)
  priority: string;

  @IsOptional()
  @IsEnum(['Portal', 'Email', 'WhatsApp'] as const)
  source: string;

  // Optional fields for simplicity
  @IsOptional()
  association?: any;

  @IsOptional()
  attachment?: any;
}
