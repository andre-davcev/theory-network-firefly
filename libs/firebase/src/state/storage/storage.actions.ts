

import { ActionsStorage } from './storage.actions.enum';
import { ImageSize } from '@theory/firebase/enums';
import { CoreEnum } from '@theory/core';

export class ActionStorageUrlGet    { static readonly type = ActionsStorage.UrlGet;    constructor(public bucketPath:  string,        public size: ImageSize = ImageSize.Medium, public cached: boolean = true) { } }
export class ActionStorageUrlsGet   { static readonly type = ActionsStorage.UrlsGet;   constructor(public bucketPaths: Array<string>, public size: ImageSize = ImageSize.Small,  public cached: boolean = true)  { } }
export class ActionStorageUrlSet    { static readonly type = ActionsStorage.UrlSet;    constructor(public url: string, public bucketPath: string = CoreEnum.IdNew, public size: ImageSize = ImageSize.Medium) { } }
export class ActionStorageRemoveNew { static readonly type = ActionsStorage.RemoveNew; constructor() { } }
