import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByUsername: jest.fn(),
  } as unknown as UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash and compare a password', async () => {
    const pwd = 'pa$$word';
    const hash = await service.hashPassword(pwd);
    expect(typeof hash).toBe('string');
    const ok = await service.comparePasswords(pwd, hash);
    expect(ok).toBe(true);
  });
});
