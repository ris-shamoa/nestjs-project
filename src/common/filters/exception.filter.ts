import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let status;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            response
                .status(status)
                .json({
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    exception: exception.name,
                    method: request.method,
                    message: exception.message
                });
        } else {
            response
            .status(status)
            .json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error'
            });

        }
    }
}