import { Icon } from '@firefly/core/models';

import { ActionsUserIcons } from './user-icons.actions.enum';
import { firestore } from 'firebase/app';

export class ActionUserIconsReset   { static readonly type = ActionsUserIcons.Reset;   constructor() { } }
export class ActionUserIconsGetData { static readonly type = ActionsUserIcons.GetData; constructor() { } }
export class ActionUserIconsGet     { static readonly type = ActionsUserIcons.Get;     constructor() { } }
export class ActionUserIconsAdd     { static readonly type = ActionsUserIcons.Add;     constructor(public snapshot: firestore.DocumentSnapshot, public entity?: Icon) { } }
export class ActionUserIconsRemove  { static readonly type = ActionsUserIcons.Remove;  constructor(public id: string) { } }
export class ActionUserIconsSync    { static readonly type = ActionsUserIcons.Sync;    constructor(public object: Icon) { } }
