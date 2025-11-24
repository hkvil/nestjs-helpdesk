import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // Hash a plain password (salt rounds: 10)
  async hashPassword(password: string): Promise<string> {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  }

  // Compare plain password with hash
  async comparePasswords(password: string, hash: string): Promise<boolean> {
    const ok = await bcrypt.compare(password, hash);
    return !!ok;
  }

  // Basic validate that checks username + password; returns user if valid or null
  async validateUser(username: string, plainPassword: string) {
    // Note: by default the password field is select: false; in a full implementation
    // you would request the password explicitly when needed.
    // Request the user including the password explicitly for auth
    const user = await this.usersService.findByUsernameWithPassword(username);
    if (!user) return null;
    // In some setups, `user.password` may not be present depending on select settings.
    // TypeScript knows the `password` property exists on the selected fields.
    if (!user.password) return null;

    const ok = await this.comparePasswords(plainPassword, user.password);
    if (!ok) return null;
    // Remove password before returning user object
    // Copy typed user to a result object that omits password
    // Remove password before returning user object
    const { password: _pw, ...rest } = user;
    void _pw; // explicitly mark unused password local
    return rest as Omit<User, 'password'>;
  }
}
