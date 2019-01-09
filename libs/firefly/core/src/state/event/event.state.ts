import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action, Selector, Select, State, StateContext } from '@ngxs/store';
import { FormGroup } from '@angular/forms';

import { StateUser } from '@firefly/core/state/user';
import { User, Event } from '@firefly/core/models';
import { ServiceEvent } from '@firefly/core/services';
import { FormCluster } from '@firefly/core/forms';
import { StateEventModel } from './event.state.model';
import { StateEventOptions } from './event.state.options';
import { ActionGetEvents, ActionSetEventId, ActionSetEvent } from './event.actions';

@State<StateEventModel>(StateEventOptions)

export class StateEvent
{
    @Select(StateUser.user) user$:Observable<User>;

    constructor(private serviceEvent: ServiceEvent, private formCluster: FormCluster) {}

    @Selector() static entities(state: StateEventModel): Record<string, Event> { return state.entities; }
    @Selector() static id(state: StateEventModel): string                      { return state.id; }
    @Selector() static form(state: StateEventModel): FormGroup                 { return state.form; }

    @Selector() static events(state: StateEventModel): Array<Event> { return Object.keys(state.entities).map(id => state.entities[id]); }
    @Selector() static entity(state: StateEventModel): Event        { return state.entities[state.id]; }

    @Action(ActionGetEvents)
    getClusters({ patchState } : StateContext<StateEventModel>)
    {
        return this.user$.pipe(
            map((user:User) => user.uidInternal),
            switchMap(uidInternal => {
                return this.serviceEvent.
                getEvents(uidInternal).
                pipe
                (
                    map((events: Array<Event>) =>
                    {
                        const entities: Record<number, Event> = {};

                        events.forEach((event: Event) => entities[event.id] = event);

                        patchState({ entities });
                    })
                )
            })
        )
    }

    @Action(ActionSetEventId)
    setClusterId({ patchState, getState } : StateContext<StateEventModel>, { payload }: ActionSetEventId)
    {
        const id    : string          = payload;
        const state : StateEventModel = getState();

        patchState
        ({
            id,
            form: id === 'new' ? this.formCluster.build() : this.formCluster.build(state.entities[id])
        });
    }

    @Action(ActionSetEvent)
    setCluster({ patchState } : StateContext<StateEventModel>, { payload }: ActionSetEvent)
    {
        return this.serviceEvent.
        setEvent(payload).
        pipe
        (
            map((event: Event) =>
            {
                const entities: Record<number, Event> = {};

                entities[event.id] = event;

                patchState({ entities });
            })
        )
    }
}
