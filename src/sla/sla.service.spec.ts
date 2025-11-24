import { Test, TestingModule } from '@nestjs/testing';
import { SlaService } from './sla.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SlaPolicy } from './entities/sla-policy.entity';
import { CreateSlaDto } from './dto/create-sla.dto';
import { Repository } from 'typeorm';

const mockRepo: Partial<Repository<SlaPolicy>> = {
  create: jest.fn().mockImplementation((dto: any) => dto as SlaPolicy),
  save: jest
    .fn()
    .mockImplementation((dto: any) =>
      Promise.resolve({ id: 1, ...(dto as SlaPolicy) } as SlaPolicy),
    ),
  find: jest.fn().mockResolvedValue([]),
  findOneBy: jest.fn(),
  remove: jest.fn().mockResolvedValue({}),
};

describe('SlaService', () => {
  let service: SlaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlaService,
        {
          provide: getRepositoryToken(SlaPolicy),
          useValue: mockRepo as unknown as Repository<SlaPolicy>,
        },
      ],
    }).compile();

    service = module.get<SlaService>(SlaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create SLA', async () => {
    const dto: CreateSlaDto = { name: 'Standard' };
    await expect(service.create(dto)).resolves.toEqual({ id: 1, ...dto });
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });
});
