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
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (
      !(await this.userRepo.findOne({ where: { email: createUserDto.email } }))
    ) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 0);

      return this.userRepo.save(createUserDto);
    } else throw new ConflictException();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOneByPhone(phone: string) {
    console.log(this.userRepo.findOneBy({ phone }));
    return this.userRepo.findOneBy({ phone });
  }

  findOne(email: string) {
    console.log(this.userRepo.findOneBy({ email }));
    return this.userRepo.findOneBy({ email });
  }

  async update(phone: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!(await this.userRepo.findOne({ where: { phone } })))
      throw new NotFoundException();
    return this.userRepo.save(updateUserDto);
  }

  async remove(phone: string) {
    return await this.userRepo.delete(phone);
  }
}
