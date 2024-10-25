import { SystemError } from '@codismart/architect-toolkit';
import { type ExceptionFilter, Catch, type ArgumentsHost, HttpStatus } from '@nestjs/common';
import { type Response } from 'express';

@Catch(SystemError)
export class SystemErrorExceptionFilter implements ExceptionFilter {
  catch(exception: SystemError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json(exception);
  }
}
