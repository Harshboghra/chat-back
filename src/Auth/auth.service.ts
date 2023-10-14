import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async singUp(singUpDto): Promise<{ token: string }> {
    const { firstName, lastName, email, password } = singUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
    });

    const token = this.jwtService.sign({
      ...user,
      password: '',
    });
    return { token };
  }
}
