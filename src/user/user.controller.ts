import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log({ createUserDto });
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('phone')
  findOneByPhone(@Query('phone') phone: string) {
    console.log(this.userService.findOneByPhone(phone));
    console.log('?');
    return this.userService.findOneByPhone(phone);
  }

  @Get('email')
  findOne(@Query('email') email: string) {
    console.log(this.userService.findOne(email));
    console.log('?');
    return this.userService.findOne(email);
  }

  @Put('phone')
  update(@Query('phone') phone: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(phone, updateUserDto);
  }

  @Delete('phone')
  remove(@Query('phone') phone: string) {
    return this.userService.remove(phone);
  }
}
