import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(requestUser: AuthDto): Promise<User> {
    const user = await this.userService.findOneByPhone(requestUser.phone);
    if (user && (await bcrypt.compare(requestUser.password, user.password))) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
