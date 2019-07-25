import { State, Selector, Action, StateContext } from '@ngxs/store';
import { take, tap } from 'rxjs/operators';

import { ClusterEvents, Alert } from '@firefly/core/models';
import { ServiceClusterEvents } from '@firefly/core/services';

import { StateAlertModel } from './alert.state.model';
import { StateAlertOptions } from './alertstate.options';
import { ActionAlertGet } from './alert.actions';

@State<StateAlertModel>(StateAlertOptions)

export class StateUserStream
{
    @Selector() static id(state: StateAlertModel):   string { return state.id; }
    @Selector() static data(state: StateAlertModel): Alert  { return state.data == null ? {} as Alert : state.data; }

    constructor(private service: ServiceClusterEvents) { }

    @Action(ActionAlertGet)
    get({ patchState }: StateContext<StateAlertModel>, { payload }: ActionAlertGet)
    {
        const id: string = payload;

        patchState({ id });

        return this.service.document(id).valueChanges().
        pipe
        (
            take(1),
            tap((data: Alert) =>
                patchState({ data })
            )
        );
    }

    @Action(ActionClusterEventsCreate)
    create({ }: StateContext<StateAlertModel>, { payload }: ActionClusterEventsCreate)
    {

    }

    @Action(ActionClusterEventsDelete)
    delete({ patchState }: StateContext<StateAlertModel>, { payload }: ActionClusterEventsDelete)
    {

    }

    @Action(ActionClusterEventsAdd)
    add({ }: StateContext<StateAlertModel>, { payload }: ActionClusterEventsAdd)
    {

    }
}
