import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
    @IsOptional()
    @IsString()
    stage?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    assignee_id?: number;
}
