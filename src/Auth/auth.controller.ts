import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() res, @Body() loginDto: LoginDto) {
    const payload = { ...res.user, password: '' };
    return { token: this.jwtService.sign(payload) };
  }

  @Post('/singUp')
  singUp(@Body() singUpDto: CreateUserDto): Promise<{ token: string }> {
    return this.authService.singUp(singUpDto);
  }
}
