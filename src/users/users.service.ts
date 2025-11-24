import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    // Helper to find user by username; returns repository result (password not returned by default)
    findByUsername(username: string) {
        return this.usersRepository.findOneBy({ username });
    }

    findOne(id: number) {
        return this.usersRepository.findOneBy({ id });
    }

    findAll() {
        return this.usersRepository.find();
    }
}
