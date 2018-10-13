import { HttpStatusCode } from '@theory/core';

export interface FoursquareResponseStatus
{
    code      : HttpStatusCode;
    requestId : string;
}
