import { SortField } from '@theory/state';
import { Event, ClusterEvent} from '@firefly/core/models';

import { ActionsClusterEvents } from './cluster-events.actions.enum';

export class ActionClusterEventsReset   { static readonly type = ActionsClusterEvents.Reset;   constructor() { } }
export class ActionClusterEventsGetData { static readonly type = ActionsClusterEvents.GetData; constructor(public fetch: boolean = true) { } }
export class ActionClusterEventsGet     { static readonly type = ActionsClusterEvents.Get;     constructor() { } }
export class ActionClusterEventsSet     { static readonly type = ActionsClusterEvents.Set;     constructor(public payload: Record<string, ClusterEvent>) { } }
export class ActionClusterEventsSort    { static readonly type = ActionsClusterEvents.Sort;    constructor(public payload?: SortField) { } }
export class ActionClusterEventsAdd     { static readonly type = ActionsClusterEvents.Add;     constructor(public payload: Event) { } }
export class ActionClusterEventsRemove  { static readonly type = ActionsClusterEvents.Remove;  constructor(public payload: string) { } }
export class ActionClusterEventsSync    { static readonly type = ActionsClusterEvents.Sync;    constructor(public payload: Event) { } }
export class ActionClusterEventsDelete  { static readonly type = ActionsClusterEvents.Delete;  constructor() { } }
