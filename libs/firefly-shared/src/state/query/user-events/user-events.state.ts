import { State, Action, StateContext, Store, Selector } from '@ngxs/store';

import { Event } from '@firefly/cloud';

import { StateUserEventsModel } from './user-events.state.model';
import { StateUserEventsOptions } from './user-events.state.options';
import {
    ActionUserEventsAdd,
    ActionUserEventsRemove,
    ActionUserEventsGet,
    ActionUserEventsSync,
    ActionUserEventsGetData,
    ActionUserEventsReset,
    ActionUserEventsDelete,
    ActionUserEventsFilter
} from './user-events.actions';
import { StateUser } from '../../document/user';
import { StateQuery } from '@theory/ngxs';
import { ServiceEvents } from '@firefly/shared/services';
import { Query } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { DocumentSnapshot, ServiceStorage } from '@theory/firebase';
import { Collection, EventType, ImageType } from '@firefly/shared/enums';
import { Observable, of } from 'rxjs';
import { CoreEnum } from '@theory/core';
import { CalendarFilter } from '../../composite/calendar/calendar.filter.model';
import { ActionAppLoadingHide, ActionAppLoadingShow } from '../../document/app/app.actions';

@State<StateUserEventsModel>(StateUserEventsOptions)
@Injectable()
export class StateUserEvents extends StateQuery<Event, StateUserEventsModel>
{
    @Selector() static filter(state: StateUserEventsModel)  : CalendarFilter { return state.filter; }
    @Selector() static type(state: StateUserEventsModel)    : EventType      { return StateUserEvents.filter(state).type; }
    @Selector() static virtual(state: StateUserEventsModel) : boolean        { return StateUserEvents.filter(state).virtual; }

    constructor
    (
        private store:   Store,
        private service: ServiceEvents,
                storage: ServiceStorage
    )
    {
        super
        (
            StateUserEventsOptions.defaults,
            {
                ActionReset   : ActionUserEventsReset,
                ActionGetData : ActionUserEventsGetData,
                ActionGet     : ActionUserEventsGet,
                ActionAdd     : ActionUserEventsAdd,
                ActionRemove  : ActionUserEventsRemove,
                ActionSync    : ActionUserEventsSync,
                ActionFilter  : ActionUserEventsFilter
            },
            storage
        );
    }

    @Action(ActionUserEventsReset)
    reset(context: StateContext<StateUserEventsModel>)
    {
        const dateCutoff: Date = new Date();
        dateCutoff.setHours(dateCutoff.getHours() - 6);

        const userId: string = this.store.selectSnapshot(StateUser.id());
        const query: Query   = userId == null ? undefined : this.service.
            collection(Collection.Events).ref.
            where('userId', '==', userId).
            where('timeStart', '>', dateCutoff);

        return super.reset(context, { query });
    }

    @Action(ActionUserEventsGetData)
    getData(context: StateContext<StateUserEventsModel>)
    {
        return super.getData(context);
    }

    @Action(ActionUserEventsGet)
    get(context: StateContext<StateUserEventsModel>)
    {
        return super.get(context, { collection: Collection.Events, imageType: ImageType.Image });
    }

    @Action(ActionUserEventsAdd)
    add(context: StateContext<StateUserEventsModel>, action: ActionUserEventsAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserEventsRemove)
    remove(context: StateContext<StateUserEventsModel>, action: ActionUserEventsRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserEventsSync)
    sync(context: StateContext<StateUserEventsModel>, action: ActionUserEventsSync)
    {
        return super.sync(context, action);
    }

    @Action(ActionUserEventsDelete)
    delete({ dispatch, getState }: StateContext<StateUserEventsModel>, { id }: ActionUserEventsDelete)
    {
        const snapshot: DocumentSnapshot = StateUserEvents.snapshotLookupState(getState())[id];

        const delete$: Observable<any> = id === CoreEnum.IdNew ?
            of(null) :
            this.service.documentDelete(snapshot);

        return delete$.
        pipe
        (
            switchMap(() =>
                dispatch(new ActionUserEventsRemove(id))
            )
        )
    }

    @Action(ActionUserEventsFilter)
    filter(context: StateContext<StateUserEventsModel>, { filter }: ActionUserEventsFilter)
    {
      const { patchState, dispatch, getState } = context;

      const state : StateUserEventsModel = getState();

      filter = filter || StateUserEvents.filter(state);

      patchState({ filter });

      const initialized : boolean = StateUserEvents.initializedState(state);

      return initialized ?
          super.filter(context) :
          dispatch(new ActionAppLoadingShow()).
          pipe
          (
              switchMap(() => dispatch(new ActionUserEventsGetData())),
              switchMap(() => dispatch(new ActionAppLoadingHide()))
          );
    }

    public keys(context: StateContext<StateUserEventsModel>): Array<string>
    {
        const { getState } = context;

        const state            : StateUserEventsModel  = getState();
        const lookup           : Record<string, Event> = StateUserEvents.dataLookupState(state);
        const keys             : Array<string>         = StateUserEvents.keysState(state);
        const virtual          : boolean               = StateUserEvents.virtual(state);

        return keys.filter((id: string) =>
            (!virtual || lookup[id]?.virtual)
        );
    }
}
