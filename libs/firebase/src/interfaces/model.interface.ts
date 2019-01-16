import { firestore } from 'firebase/app';

import { KeyModel } from '../enums';

export interface Model
{
    [KeyModel.ID]?:          string;
    [KeyModel.Version]?:     string;
    [KeyModel.DateCreated]?: firestore.Timestamp;
    [KeyModel.DateUpdated]?: firestore.Timestamp;
}
