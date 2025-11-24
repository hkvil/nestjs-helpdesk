import { Test, TestingModule } from '@nestjs/testing';
import { SlaController } from './sla.controller';
import { CreateSlaDto } from './dto/create-sla.dto';
import { SlaService } from './sla.service';

const mockSlaService = {
  create: jest
    .fn()
    .mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
  findAll: jest.fn().mockResolvedValue([]),
};

describe('SlaController', () => {
  let controller: SlaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlaController],
      providers: [{ provide: SlaService, useValue: mockSlaService }],
    }).compile();

    controller = module.get<SlaController>(SlaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create SLA', async () => {
    const dto: CreateSlaDto = { name: 'Standard' };
    await expect(controller.create(dto)).resolves.toEqual({
      id: 1,
      ...dto,
    });
    expect(mockSlaService.create).toHaveBeenCalledWith(dto);
  });

  it('should list SLAs', async () => {
    await expect(controller.findAll()).resolves.toEqual([]);
    expect(mockSlaService.findAll).toHaveBeenCalled();
  });
});
