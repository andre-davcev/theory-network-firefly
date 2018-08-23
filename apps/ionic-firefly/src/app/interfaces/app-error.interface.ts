import { ErrorCodeApp } from '../enums/error-code-app.enum';

export interface AppError
{
    message : string;
    key     : string;
    code    : ErrorCodeApp;
}
