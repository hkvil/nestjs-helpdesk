import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlaService } from './sla.service';
import { SlaController } from './sla.controller';
import { SlaPolicy } from './entities/sla-policy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SlaPolicy])],
  controllers: [SlaController],
  providers: [SlaService],
})
export class SlaModule { }
