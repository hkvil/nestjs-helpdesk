import { IsString, IsNotEmpty, IsInt, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsInt()
  category_id: number;

  @IsEnum(['low', 'medium', 'high', 'critical'] as const)
  priority: string;
}
