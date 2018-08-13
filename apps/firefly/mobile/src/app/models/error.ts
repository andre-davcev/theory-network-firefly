import {ErrorCodeApp} from '../enums/error.code.app';

export interface AppError
{
    message : string;
    key     : string;
    code    : ErrorCodeApp;
}