import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // Hash a plain password (salt rounds: 10)
  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  // Compare plain password with hash
  async comparePasswords(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  // Basic validate that checks username + password; returns user if valid or null
  async validateUser(username: string, plainPassword: string) {
    // Note: by default the password field is select: false; in a full implementation
    // you would request the password explicitly when needed.
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;

    // In some setups, `user.password` may not be present depending on select settings.
    if (!('password' in (user as any)) || !(user as any).password) return null;

    const ok = await this.comparePasswords(plainPassword, (user as any).password);
    if (!ok) return null;

    // do not return password
    const copy = { ...user } as any;
    delete copy.password;
    return copy;
  }
}
