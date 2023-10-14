import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Corrected typo here
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_KEY'), // Corrected typo here
    });
  }

  async validate(payload: any) {
    return {
      ...payload,
    };
  }
}
