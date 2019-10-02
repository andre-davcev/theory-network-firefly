import { SortField } from '@theory/state';
import { User, ClusterSubscriber } from '@firefly/core/models';

import { ActionsClusterSubscribers } from './cluster-subscribers.actions.enum';

export class ActionClusterSubscribersReset   { static readonly type = ActionsClusterSubscribers.Reset;   constructor() { } }
export class ActionClusterSubscribersGetData { static readonly type = ActionsClusterSubscribers.GetData; constructor(public fetch: boolean = true) { } }
export class ActionClusterSubscribersGet     { static readonly type = ActionsClusterSubscribers.Get;     constructor() { } }
export class ActionClusterSubscribersSet     { static readonly type = ActionsClusterSubscribers.Set;     constructor(public payload: Record<string, ClusterSubscriber>) { } }
export class ActionClusterSubscribersSort    { static readonly type = ActionsClusterSubscribers.Sort;    constructor(public payload?: SortField) { } }
export class ActionClusterSubscribersAdd     { static readonly type = ActionsClusterSubscribers.Add;     constructor(public payload: User) { } }
export class ActionClusterSubscribersRemove  { static readonly type = ActionsClusterSubscribers.Remove;  constructor(public payload: string) { } }
export class ActionClusterSubscribersDelete  { static readonly type = ActionsClusterSubscribers.Delete;  constructor() { } }
