import { Image } from '@firefly/cloud';

import { ActionsUserImages } from './user-images.actions.enum';
import { firestore } from 'firebase/app';

export class ActionUserImagesReset   { static readonly type = ActionsUserImages.Reset;   constructor() { } }
export class ActionUserImagesGetData { static readonly type = ActionsUserImages.GetData; constructor() { } }
export class ActionUserImagesGet     { static readonly type = ActionsUserImages.Get;     constructor() { } }
export class ActionUserImagesAdd     { static readonly type = ActionsUserImages.Add;     constructor(public snapshot: firestore.DocumentSnapshot, public entity?: Image) { } }
export class ActionUserImagesRemove  { static readonly type = ActionsUserImages.Remove;  constructor(public id: string) { } }
export class ActionUserImagesSync    { static readonly type = ActionsUserImages.Sync;    constructor(public object: Image) { } }
