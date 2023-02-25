import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import authenticationSettings from 'src/authenticationSettings';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

@Injectable()
export class AuthTokenMiddleware implements NestMiddleware {
  use(request: any, response: any, next: () => void) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new HttpException('JWT token is missing!', HttpStatus.FORBIDDEN);
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authenticationSettings.jwt.secret);

      const { sub } = decoded as TokenPayload;

      request.user = {
        id: sub,
      };

      return next();
    } catch {
      throw new HttpException('Invalid JWT token', HttpStatus.FORBIDDEN);
    }
  }
}
