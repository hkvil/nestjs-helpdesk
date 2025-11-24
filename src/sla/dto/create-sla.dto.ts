import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateSlaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  pipeline?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsString()
  start_stage?: string;

  @IsOptional()
  @IsString()
  end_stage?: string;

  @IsOptional()
  @IsNumber()
  resolution_time_hour?: number;

  @IsOptional()
  @IsNumber()
  resolution_time_minute?: number;

  @IsOptional()
  operational_hours?: any;
}
