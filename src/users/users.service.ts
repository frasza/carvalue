import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  find(email: string) {
    return this.repository.findBy({ email });
  }

  findOne(id: number) {
    const user = this.repository.findOneBy({
      id,
    });

    if (user === null) {
      throw new Error('User not found');
    }

    return user;
  }

  create(email: string, password: string) {
    const user = this.repository.create({
      email,
      password,
    });

    return this.repository.save(user);
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (user === null) {
      throw new Error('User not found');
    }

    Object.assign(user, attrs);

    return this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (user === null) {
      throw new Error('User not found');
    }

    return this.repository.remove(user);
  }
}
