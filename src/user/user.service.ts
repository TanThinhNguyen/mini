import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (
      !(await this.userRepo.findOne({ where: { email: createUserDto.email } }))
    )
      return this.userRepo.save(createUserDto);
    else throw new ConflictException();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (
      !(await this.userRepo.findOne({ where: { email: updateUserDto.email } }))
    )
      throw new NotFoundException();
    else return this.userRepo.save(updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
