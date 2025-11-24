import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const mockRepository = {
  findOneBy: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: getRepositoryToken(User), useValue: mockRepository }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find user by username', async () => {
    const u = { id: 5, username: 'bob', email: 'b@example.com' } as User;
    (mockRepository.findOneBy as jest.Mock).mockResolvedValueOnce(u);
    await expect(service.findByUsername('bob')).resolves.toEqual(u);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ username: 'bob' });
  });
});
