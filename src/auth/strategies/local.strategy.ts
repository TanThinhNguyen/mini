import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(phone: string, password: string): Promise<User> {
    const user = await this.authService.validateUser({
      phone,
      password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
