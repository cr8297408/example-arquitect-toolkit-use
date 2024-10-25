import { Injectable, type NestMiddleware } from '@nestjs/common';
import { type Request, type Response, type NextFunction } from 'express';
import { LoggerInstance } from 'src/utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    LoggerInstance.info(
      `🚀 ~ Request in method: ${req.method} -- url: ${req.url}`
    );
    next();
  }
}
