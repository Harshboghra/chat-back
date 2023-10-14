import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userSevrvice: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user: User[] = await this.userSevrvice.findByEmail(email);
    if (user.length == 0) throw new NotFoundException('User Not Fount');
    const isMachPassword = await bcrypt.compare(password, user[0].password);
    if (user && isMachPassword) return user[0];
    if (!isMachPassword) throw new UnauthorizedException('Invalid password');
  }
}
