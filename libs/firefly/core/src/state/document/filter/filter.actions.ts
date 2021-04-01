import { InterestType, EventType } from '@firefly/core/enums';

import { ActionsFilter } from './filter.actions.enum';

export class ActionFilterInterestTypeSet    { static readonly type = ActionsFilter.InterestTypeSet;    constructor(public interestType: InterestType) { } }
export class ActionFilterInterestVirtualSet { static readonly type = ActionsFilter.InterestVirtualSet; constructor(public virtual: boolean) { } }

export class ActionFilterEventTypeSet    { static readonly type = ActionsFilter.EventTypeSet;    constructor(public eventType: EventType) { } }
export class ActionFilterEventVirtualSet { static readonly type = ActionsFilter.EventVirtualSet; constructor(public virtual: boolean) { } }
