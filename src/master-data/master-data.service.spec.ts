import { Test, TestingModule } from '@nestjs/testing';
import { MasterDataService } from './master-data.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/sub-category.entity';
import { Pipeline } from './entities/pipeline.entity';
import { PicGroup } from './entities/pic-group.entity';
import { PicGroupMember } from './entities/pic-group-member.entity';

const mockRepo = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
  find: jest.fn().mockResolvedValue([]),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  remove: jest.fn().mockResolvedValue({}),
};

describe('MasterDataService', () => {
  let service: MasterDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MasterDataService,
        { provide: getRepositoryToken(Channel), useValue: mockRepo },
        { provide: getRepositoryToken(Category), useValue: mockRepo },
        { provide: getRepositoryToken(SubCategory), useValue: mockRepo },
        { provide: getRepositoryToken(Pipeline), useValue: mockRepo },
        { provide: getRepositoryToken(PicGroup), useValue: mockRepo },
        { provide: getRepositoryToken(PicGroupMember), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<MasterDataService>(MasterDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a channel', async () => {
    const dto = { name: 'IT' };
    await expect(service.createChannel(dto as any)).resolves.toEqual({ id: 1, ...dto });
    expect(mockRepo.create).toHaveBeenCalledWith(dto as any);
  });
});
