
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';

import { StateFilterModel } from './filter.state.model';
import { StateFilterOptions } from './filter.state.options';
import {
    ActionFilterInterestTypeSet,
    ActionFilterEventTypeSet,
    ActionFilterInterestVirtualSet,
    ActionFilterEventVirtualSet,
} from './filter.actions';


@State<StateFilterModel>(StateFilterOptions)
@Injectable()
export class StateFilter
{
    constructor()
    {

    }

    @Action(ActionFilterInterestTypeSet)
    interestTypeSet({ patchState }: StateContext<StateFilterModel>, { interestType }: ActionFilterInterestTypeSet)
    {
        patchState({ interestType });
    }

    @Action(ActionFilterInterestVirtualSet)
    interestVirtualSet({ patchState }: StateContext<StateFilterModel>, { virtual }: ActionFilterInterestVirtualSet)
    {
        patchState({ interestVirtual: virtual });
    }

    @Action(ActionFilterEventTypeSet)
    eventTypeSet({ patchState }: StateContext<StateFilterModel>, { eventType }: ActionFilterEventTypeSet)
    {
        patchState({ eventType });
    }

    @Action(ActionFilterEventVirtualSet)
    eventVirtualSet({ patchState }: StateContext<StateFilterModel>, { virtual }: ActionFilterEventVirtualSet)
    {
        patchState({ eventVirtual: virtual });
    }
}
