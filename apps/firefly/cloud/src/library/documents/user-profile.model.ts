import { FirebaseDocument } from '../interfaces';

export interface UserProfile extends FirebaseDocument
{
    bucketPath  : string;
    bucketPaths : Record<string, string>;
    companyName : string;
    isCompany   : boolean;
    nameFirst   : string;
    nameLast    : string;
}
