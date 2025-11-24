import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Ticket } from './entities/ticket.entity';
import { Reporter } from './entities/reporter.entity';
import { TicketStage } from './entities/ticket-stage.entity';
import { TicketAssignee } from './entities/ticket-assignee.entity';
import { TicketAssociation } from './entities/ticket-association.entity';
import { TicketAttachment } from './entities/ticket-attachment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ticket,
      Reporter,
      TicketStage,
      TicketAssignee,
      TicketAssociation,
      TicketAttachment,
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule { }
