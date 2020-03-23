import { FirebaseDocument } from '../interfaces';

export interface UserProfile extends FirebaseDocument
{
    icon        : string;
    companyName : string;
    isCompany   : boolean;
    nameFirst   : string;
    nameLast    : string;
    isPublisher : boolean;
}
