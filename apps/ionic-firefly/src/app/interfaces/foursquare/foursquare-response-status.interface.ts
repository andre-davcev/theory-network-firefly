import { HttpStatusCode } from '../../enums/http-status-code.enum';

export interface FoursquareResponseStatus
{
    code      : HttpStatusCode;
    requestId : string;
}
