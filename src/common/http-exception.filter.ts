import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const body = exception.getResponse();

      let message: string | string[] = exception.message;
      if (typeof body === 'string') {
        message = body;
      } else if (body && typeof body === 'object' && 'message' in body) {
        const m = (body as { message?: unknown }).message;
        if (typeof m === 'string' || Array.isArray(m)) message = m;
      }

      // можеш придумати свою мапу під коди
      const errorCode =
        statusCode === 400
          ? 'VALIDATION_ERROR'
          : statusCode === 404
            ? 'NOT_FOUND'
            : 'HTTP_ERROR';

      return response.status(statusCode).json({
        statusCode,
        errorCode,
        message,
        timestamp,
        path: request.url,
      });
    }

    // 500 для всього іншого
    const message =
      exception instanceof Error ? exception.message : 'Internal server error';

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message,
      timestamp,
      path: request.url,
    });
  }
}
