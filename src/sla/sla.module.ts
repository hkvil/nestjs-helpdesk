import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlaService } from './sla.service';
import { SlaController } from './sla.controller';
import { SlaPolicy } from './entities/sla-policy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SlaPolicy])],
  controllers: [SlaController],
  providers: [SlaService],
  // Export both the service and a configured TypeOrmModule.forFeature so the
  // SlaPolicy repository (SlaPolicyRepository) is available to modules that
  // import SlaModule (e.g., TicketModule).
  exports: [SlaService, TypeOrmModule.forFeature([SlaPolicy])],
})
export class SlaModule {}
