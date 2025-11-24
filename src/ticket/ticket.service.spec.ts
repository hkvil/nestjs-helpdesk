import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Reporter } from './entities/reporter.entity';
import { TicketStage } from './entities/ticket-stage.entity';
import { TicketAssignee } from './entities/ticket-assignee.entity';
import { SlaPolicy } from '../sla/entities/sla-policy.entity';
import { SlaService } from '../sla/sla.service';
import { UsersService } from '../users/users.service';

const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

const mockSlaService = {
  calculateDueDate: jest.fn(),
};

const mockUsersService = {
  findOne: jest.fn(),
};

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        { provide: getRepositoryToken(Ticket), useValue: mockRepository },
        { provide: getRepositoryToken(Reporter), useValue: mockRepository },
        { provide: getRepositoryToken(TicketStage), useValue: mockRepository },
        { provide: getRepositoryToken(TicketAssignee), useValue: mockRepository },
        { provide: getRepositoryToken(SlaPolicy), useValue: mockRepository },
        { provide: SlaService, useValue: mockSlaService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
