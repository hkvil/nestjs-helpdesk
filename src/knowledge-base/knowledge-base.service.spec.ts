import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeBaseService } from './knowledge-base.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { KnowledgeBase } from './entities/knowledge-base.entity';
import { CreateKnowledgeBaseDto } from './dto/create-knowledge-base.dto';
import { Repository } from 'typeorm';

const mockRepo: Partial<Repository<KnowledgeBase>> = {
  create: jest.fn().mockImplementation((dto: any) => dto as KnowledgeBase),
  save: jest
    .fn()
    .mockImplementation((dto: any) =>
      Promise.resolve({ id: 1, ...(dto as KnowledgeBase) } as KnowledgeBase),
    ),
  find: jest.fn().mockResolvedValue([]),
  findOneBy: jest.fn(),
  remove: jest.fn().mockResolvedValue({}),
};

describe('KnowledgeBaseService', () => {
  let service: KnowledgeBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnowledgeBaseService,
        {
          provide: getRepositoryToken(KnowledgeBase),
          useValue: mockRepo as unknown as Repository<KnowledgeBase>,
        },
      ],
    }).compile();

    service = module.get<KnowledgeBaseService>(KnowledgeBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create KB', async () => {
    const dto: CreateKnowledgeBaseDto = {
      start_date: '2025-01-01',
      end_date: '2025-12-31',
      channel: 'IT',
      category: 'A',
      sub_category: 'B',
      title: 'Title',
    };
    await expect(service.create(dto)).resolves.toEqual({
      id: 1,
      ...dto,
      start_date: new Date(dto.start_date),
      end_date: new Date(dto.end_date),
    });
    expect(mockRepo.create).toHaveBeenCalled();
  });
});
