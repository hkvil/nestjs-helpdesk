import { Test, TestingModule } from '@nestjs/testing';
import { MasterDataController } from './master-data.controller';
import { MasterDataService } from './master-data.service';
import { CreateChannelDto } from './dto/create-channel.dto';

const mockService = {
  createChannel: jest
    .fn()
    .mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
  findAllChannels: jest.fn().mockResolvedValue([]),
};

describe('MasterDataController', () => {
  let controller: MasterDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterDataController],
      providers: [{ provide: MasterDataService, useValue: mockService }],
    }).compile();

    controller = module.get<MasterDataController>(MasterDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a channel', async () => {
    const dto: CreateChannelDto = { name: 'IT' };
    await expect(controller.createChannel(dto)).resolves.toEqual({
      id: 1,
      ...dto,
    });
    expect(mockService.createChannel).toHaveBeenCalledWith(dto);
  });

  it('should list channels', async () => {
    await expect(controller.findChannels()).resolves.toEqual([]);
    expect(mockService.findAllChannels).toHaveBeenCalled();
  });
});
