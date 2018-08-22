import { HttpStatusCode } from '../enums/http-status-code.enum';

export interface ResponseStatus
{
    code      : HttpStatusCode;
    requestId : string;
}
