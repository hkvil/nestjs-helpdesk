import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeBaseService } from './knowledge-base.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { KnowledgeBase } from './entities/knowledge-base.entity';

const mockRepo = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
  find: jest.fn().mockResolvedValue([]),
  findOneBy: jest.fn(),
  remove: jest.fn().mockResolvedValue({}),
};

describe('KnowledgeBaseService', () => {
  let service: KnowledgeBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnowledgeBaseService, { provide: getRepositoryToken(KnowledgeBase), useValue: mockRepo }],
    }).compile();

    service = module.get<KnowledgeBaseService>(KnowledgeBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create KB', async () => {
    const dto = { start_date: '2025-01-01', end_date: '2025-12-31', channel: 'IT', category: 'A', sub_category: 'B', title: 'Title' };
    await expect(service.create(dto as any)).resolves.toEqual({ id: 1, ...dto, start_date: new Date(dto.start_date), end_date: new Date(dto.end_date) });
    expect(mockRepo.create).toHaveBeenCalled();
  });
});
