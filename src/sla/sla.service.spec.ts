
import { Test, TestingModule } from '@nestjs/testing';
import { SlaService } from './sla.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SlaPolicy } from './entities/sla-policy.entity';

const mockRepo = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
  find: jest.fn().mockResolvedValue([]),
  findOneBy: jest.fn(),
  remove: jest.fn().mockResolvedValue({}),
};

describe('SlaService', () => {
  let service: SlaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlaService, { provide: getRepositoryToken(SlaPolicy), useValue: mockRepo }],
    }).compile();

    service = module.get<SlaService>(SlaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create SLA', async () => {
    const dto = { name: 'Standard' };
    await expect(service.create(dto as any)).resolves.toEqual({ id: 1, ...dto });
    expect(mockRepo.create).toHaveBeenCalledWith(dto as any);
  });
});
