import { Test, TestingModule } from '@nestjs/testing';
import { MasterDataService } from './master-data.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/sub-category.entity';
import { Pipeline } from './entities/pipeline.entity';
import { PicGroup } from './entities/pic-group.entity';
import { PicGroupMember } from './entities/pic-group-member.entity';

const mockRepo: Partial<Repository<Channel>> = {
  create: jest.fn().mockImplementation((dto: any) => dto as Channel),
  save: jest
    .fn()
    .mockImplementation((dto: any) =>
      Promise.resolve({ id: 1, ...(dto as Channel) } as Channel),
    ),
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
        {
          provide: getRepositoryToken(Channel),
          useValue: mockRepo as unknown as Repository<Channel>,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockRepo as unknown as Repository<Category>,
        },
        {
          provide: getRepositoryToken(SubCategory),
          useValue: mockRepo as unknown as Repository<SubCategory>,
        },
        {
          provide: getRepositoryToken(Pipeline),
          useValue: mockRepo as unknown as Repository<Pipeline>,
        },
        {
          provide: getRepositoryToken(PicGroup),
          useValue: mockRepo as unknown as Repository<PicGroup>,
        },
        {
          provide: getRepositoryToken(PicGroupMember),
          useValue: mockRepo as unknown as Repository<PicGroupMember>,
        },
      ],
    }).compile();

    service = module.get<MasterDataService>(MasterDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a channel', async () => {
    const dto: CreateChannelDto = { name: 'IT' };
    await expect(service.createChannel(dto)).resolves.toEqual({
      id: 1,
      ...dto,
    });
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });
});
