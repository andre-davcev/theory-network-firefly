import { DocumentBase } from './base.document';

export interface UserProfile extends DocumentBase
{
    icon        : string;
    companyName : string;
    isCompany   : boolean;
    nameFirst   : string;
    nameLast    : string;
}
