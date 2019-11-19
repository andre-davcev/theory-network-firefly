

import { ActionsStorage } from './storage.actions.enum';
import { ImageSize } from '@theory/firebase/enums';

export class ActionStorageGetUrl  { static readonly type = ActionsStorage.GetUrl;  constructor(public bucketPath:  string,        public size: ImageSize = ImageSize.Medium) { } }
export class ActionStorageGetUrls { static readonly type = ActionsStorage.GetUrls; constructor(public bucketPaths: Array<string>, public size: ImageSize = ImageSize.Small)  { } }
