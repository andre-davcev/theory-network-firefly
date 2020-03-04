import { MetadataUrl } from '../interfaces';

export interface MetadataAlert extends MetadataUrl
{
    dateTimeDate?            : Date;
    timeStartFormatted?      : string;
    timeStartFormattedShort? : string
    timeStartDate?           : Date;
    sessionRead?             : boolean;
}
