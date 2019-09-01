import { SortField } from '@theory/state';
import { Image, UserImage } from '@firefly/core/models';

import { ActionsUserImages } from './user-images.actions.enum';

export class ActionUserImagesReset     { static readonly type = ActionsUserImages.Reset;     constructor() { } }
export class ActionUserImagesGetData   { static readonly type = ActionsUserImages.GetData;   constructor() { } }
export class ActionUserImagesGet       { static readonly type = ActionsUserImages.Get;       constructor() { } }
export class ActionUserImagesSet       { static readonly type = ActionsUserImages.Set;       constructor(public payload: Record<string, UserImage>) { } }
export class ActionUserImagesSort      { static readonly type = ActionsUserImages.Sort;      constructor(public payload?: SortField) { } }
export class ActionUserImagesAdd       { static readonly type = ActionsUserImages.Add;       constructor(public payload: Image) { } }
export class ActionUserImagesRemove    { static readonly type = ActionsUserImages.Remove;    constructor(public payload: string) { } }
