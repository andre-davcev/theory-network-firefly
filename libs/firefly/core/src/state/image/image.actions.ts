
import { ActionsImage } from './image.actions.enum';
import { Collection } from '@firefly/core';
import { Event } from '@firefly/core/models';

export class ActionImageUpload      { static readonly type = ActionsImage.Upload; constructor(public path: string, public file: string) { } }
export class ActionImageUploadClear { static readonly type = ActionsImage.UploadClear; }
export class ActionImageSave        { static readonly type = ActionsImage.Save; constructor(public collection: Collection.Images | Collection.Icons, public file: string, public fileName?: string) { } }

export class ActionImageEventsReset  { static readonly type = ActionsImage.EventsReset;  constructor() { } }
export class ActionImageEventsGet    { static readonly type = ActionsImage.EventsGet;    constructor() { } }
export class ActionImageEventsAdd    { static readonly type = ActionsImage.EventsAdd;    constructor(public payload: Event) { } }
export class ActionImageEventsRemove { static readonly type = ActionsImage.EventsRemove; constructor(public payload: string) { } }
