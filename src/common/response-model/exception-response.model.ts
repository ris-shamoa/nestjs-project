export class ExceptionResponse {
    statusCode: number;
    errorMessage: string;
}

export class HttpExceptioResponse extends ExceptionResponse {
    timestamp: Date;
    path: string;
    exception: string;
    method: string;
}