import {
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
      throw new InternalServerErrorException({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'JWT token is missing',
      });
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
      throw new InternalServerErrorException({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Invalid JWT token',
      });
    }
  }
}
