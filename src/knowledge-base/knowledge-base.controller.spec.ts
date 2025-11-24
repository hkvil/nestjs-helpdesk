import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeBaseController } from './knowledge-base.controller';
import { KnowledgeBaseService } from './knowledge-base.service';
import { CreateKnowledgeBaseDto } from './dto/create-knowledge-base.dto';

const mockKbService = {
  create: jest
    .fn()
    .mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
  findAll: jest.fn().mockResolvedValue([]),
};

describe('KnowledgeBaseController', () => {
  let controller: KnowledgeBaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnowledgeBaseController],
      providers: [{ provide: KnowledgeBaseService, useValue: mockKbService }],
    }).compile();

    controller = module.get<KnowledgeBaseController>(KnowledgeBaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create KB entry', async () => {
    const dto: CreateKnowledgeBaseDto = {
      start_date: '2025-01-01',
      end_date: '2025-12-31',
      channel: 'IT',
      category: 'A',
      sub_category: 'B',
      title: 'Title',
    };
    await expect(controller.create(dto)).resolves.toEqual({ id: 1, ...dto });
    expect(mockKbService.create).toHaveBeenCalledWith(dto);
  });

  it('should list KB entries', async () => {
    await expect(controller.findAll()).resolves.toEqual([]);
    expect(mockKbService.findAll).toHaveBeenCalled();
  });
});
