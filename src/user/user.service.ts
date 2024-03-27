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

  create(createUserDto: CreateUserDto) {
    if (!this.userRepo.findOne({ where: { id: createUserDto.id } }))
      return this.userRepo.save(createUserDto);
    else throw ConflictException;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (!this.userRepo.findOne({ where: { id: updateUserDto.id } }))
      throw NotFoundException;
    else return this.userRepo.save(updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
