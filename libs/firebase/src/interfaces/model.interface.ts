import { firestore } from 'firebase/app';

import { ModelKey } from '../enums';

export interface Model
{
    [ModelKey.Id]?:          string;
    [ModelKey.DateCreated]?: firestore.Timestamp;
    [ModelKey.DateUpdated]?: firestore.Timestamp;
}
