import { Cluster } from '@firefly/cloud';
import { CoreEnum } from '@theory/core';

import { ActionsCluster } from './cluster.actions.enum';
import { firestore } from 'firebase/app';
import { MockIconPath } from '@firefly/core/mocks';

export class ActionClusterReset  { static readonly type = ActionsCluster.Reset;   constructor() { } }
export class ActionClusterDirty  { static readonly type = ActionsCluster.Dirty;   constructor() { } }
export class ActionClusterGet    { static readonly type = ActionsCluster.Get;     constructor(public id: string) { } }
export class ActionClusterSet    { static readonly type = ActionsCluster.Set;     constructor(public snapshot: firestore.DocumentSnapshot, public data?: Cluster) { } }
export class ActionClusterPatch  { static readonly type = ActionsCluster.Patch;   constructor(public partial: Partial<Cluster>, public save: boolean = false) { } }
export class ActionClusterCreate { static readonly type = ActionsCluster.Create;  constructor() { } }
export class ActionClusterUpdate { static readonly type = ActionsCluster.Update;  constructor() { } }
export class ActionClusterSave   { static readonly type = ActionsCluster.Save;    constructor() { } }
export class ActionClusterDelete { static readonly type = ActionsCluster.Delete;  constructor() { } }
export class ActionClusterSetId  { static readonly type = ActionsCluster.SetId;   constructor(public id: string = CoreEnum.IdNew) { } }

export class ActionClusterIconClear   { static readonly type = ActionsCluster.IconClear;   constructor() { } }
export class ActionClusterIconUriSet  { static readonly type = ActionsCluster.IconUriSet;  constructor(public dataUri: string) { } }
export class ActionClusterIconPathSet { static readonly type = ActionsCluster.IconPathSet; constructor(public bucketPath: string = MockIconPath) { } }
export class ActionClusterIconCreate  { static readonly type = ActionsCluster.IconCreate;  constructor() { } }

export class ActionClusterEventsGet   { static readonly type = ActionsCluster.EventsGet; constructor() { } }
export class ActionClusterEventsReset { static readonly type = ActionsCluster.EventsReset; constructor() { }}
