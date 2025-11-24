import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import type { DeepPartial } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Reporter } from './entities/reporter.entity';
import { SlaService } from '../sla/sla.service';
import { SlaPolicy } from '../sla/entities/sla-policy.entity';
import { TicketStage } from './entities/ticket-stage.entity';
import { TicketAssignee } from './entities/ticket-assignee.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Reporter)
    private reporterRepository: Repository<Reporter>,
    @InjectRepository(TicketStage)
    private ticketStageRepository: Repository<TicketStage>,
    @InjectRepository(TicketAssignee)
    private ticketAssigneeRepository: Repository<TicketAssignee>,
    private slaService: SlaService,
    @InjectRepository(SlaPolicy)
    private slaPolicyRepository: Repository<SlaPolicy>,
    private usersService: UsersService,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const { reporter_id, ...ticketData } = createTicketDto;

    // 1. Find Reporter
    const reporter = await this.reporterRepository.findOneBy({
      id: reporter_id,
    });
    if (!reporter) {
      throw new NotFoundException(`Reporter with ID ${reporter_id} not found`);
    }

    // 2. Determine SLA Policy
    let slaPolicy = await this.slaPolicyRepository.findOneBy({
      pipeline: createTicketDto.pipeline,
    });
    if (!slaPolicy) {
      slaPolicy = await this.slaPolicyRepository.findOneBy({
        name: 'Standard SLA',
      });
    }

    // 3. Calculate Due Date
    const createdDate = new Date();
    let dueDate: Date | null = null;
    if (slaPolicy) {
      dueDate = this.slaService.calculateDueDate(slaPolicy, createdDate);
    }

    // 4. Generate Ticket Number
    const ticketNumber = `T${Date.now()}`;

    // 5. Create Ticket
    const ticketObj: DeepPartial<Ticket> = {
      ...ticketData,
      reporter,
      number: ticketNumber,
      stage: 'New',
      created_date: createdDate,
      due_date: dueDate ?? undefined,
      sla_policy: slaPolicy ? slaPolicy.name : undefined,
      company: reporter.company,
      area: reporter.area,
      sub_area: reporter.sub_area,
      position: reporter.position,
    };

    const ticket = this.ticketRepository.create(ticketObj);

    const savedTicket = await this.ticketRepository.save(ticket);

    // 6. Record Initial Stage
    const stage = new TicketStage();
    stage.ticket = savedTicket;
    stage.stage = 'New';
    stage.percentage = 0;
    stage.pic = 'SYSTEM';
    stage.pic_text = 'System';
    stage.datetime = createdDate;

    await this.ticketStageRepository.save(stage);

    return savedTicket;
  }

  findAll() {
    return this.ticketRepository.find({ relations: ['reporter'] });
  }

  async findOne(id: number) {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: [
        'reporter',
        'stages',
        'assignees',
        'attachments',
        'associations',
      ],
    });
    if (!ticket) throw new NotFoundException(`Ticket #${id} not found`);
    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.findOne(id);

    // Handle Assignment
    if (updateTicketDto.assignee_id) {
      const user = await this.usersService.findOne(updateTicketDto.assignee_id);
      if (!user)
        throw new NotFoundException(
          `User with ID ${updateTicketDto.assignee_id} not found`,
        );

      ticket.assignee = user.username;

      // Create TicketAssignee
      const assignee = new TicketAssignee();
      assignee.ticket = ticket;
      assignee.persnum = user.id.toString();
      assignee.name = user.username;
      assignee.accept = false;
      await this.ticketAssigneeRepository.save(assignee);

      // Auto-update stage to Assigned if New
      if (ticket.stage === 'New') {
        updateTicketDto.stage = 'Assigned';
      }
    }

    // If stage changes, record history
    if (updateTicketDto.stage && updateTicketDto.stage !== ticket.stage) {
      const stage = new TicketStage();
      stage.ticket = ticket;
      stage.stage = updateTicketDto.stage;
      stage.percentage = this.getPercentage(updateTicketDto.stage);
      stage.pic = 'SYSTEM'; // Should be current user
      stage.pic_text = 'System Update';
      stage.datetime = new Date();

      await this.ticketStageRepository.save(stage);
    }

    Object.assign(ticket, updateTicketDto);
    return this.ticketRepository.save(ticket);
  }

  private getPercentage(stage: string): number {
    switch (stage) {
      case 'New':
        return 0;
      case 'Assigned':
        return 25;
      case 'In Progress':
        return 50;
      case 'Done':
        return 100;
      default:
        return 0;
    }
  }
}
