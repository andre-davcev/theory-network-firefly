import { Cluster } from '@firefly/core/models';
import { CoreEnum } from '@theory/core';

import { ActionsCluster } from './cluster.actions.enum';

export class ActionClusterReset  { static readonly type = ActionsCluster.Reset;   constructor() { } }
export class ActionClusterGet    { static readonly type = ActionsCluster.Get;     constructor(public payload: string) { } }
export class ActionClusterSetId  { static readonly type = ActionsCluster.SetId;   constructor(public payload: string = CoreEnum.IdNew) { } }
export class ActionClusterSet    { static readonly type = ActionsCluster.Set;     constructor(public payload: Cluster) { } }
export class ActionClusterPatch  { static readonly type = ActionsCluster.Patch;   constructor(public payload: Partial<Cluster>) { } }
export class ActionClusterCreate { static readonly type = ActionsCluster.Create;  constructor() { } }
export class ActionClusterSave   { static readonly type = ActionsCluster.Save;    constructor() { } }
export class ActionClusterDelete { static readonly type = ActionsCluster.Delete;  constructor() { } }

export class ActionClusterIconAdd    { static readonly type = ActionsCluster.IconAdd;    constructor() { } }
export class ActionClusterIconRemove { static readonly type = ActionsCluster.IconRemove; constructor() { } }
