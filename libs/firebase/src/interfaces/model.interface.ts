import { firestore } from 'firebase/app';

import { ModelKey } from '../enums';

export interface Model
{
    [ModelKey.Version]?:     string;
    [ModelKey.Id]?:          string;
    [ModelKey.DateCreated]?: firestore.Timestamp;
    [ModelKey.DateUpdated]?: firestore.Timestamp;
}
