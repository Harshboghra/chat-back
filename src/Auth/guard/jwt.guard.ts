import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Constants } from 'src/utils/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    for (const url of Constants.BY_PASS_URLS) {
      if (request.url.includes(url)) {
        return true;
      }
    }

    // For other URLs, fall back to default JWT authentication behavior
    return super.canActivate(context);
  }
}
