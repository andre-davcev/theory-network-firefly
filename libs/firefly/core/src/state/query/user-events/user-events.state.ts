import { State, Action, StateContext, Store } from '@ngxs/store';

import { Event } from '@firefly/cloud';

import { StateUserEventsModel } from './user-events.state.model';
import { StateUserEventsOptions } from './user-events.state.options';
import {
    ActionUserEventsAdd,
    ActionUserEventsRemove,
    ActionUserEventsGet,
    ActionUserEventsSync,
    ActionUserEventsGetData,
    ActionUserEventsReset
} from './user-events.actions';
import { StateUser } from '../../document/user';
import { StateQuery } from '@theory/ngxs';
import { ServiceEvents } from '@firefly/core/services';
import { Query } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';
import { StateLanguage } from '@theory/capacitor';
import { Injectable } from '@angular/core';

@State<StateUserEventsModel>(StateUserEventsOptions)
@Injectable()
export class StateUserEvents extends StateQuery<Event, StateUserEventsModel>
{
    constructor
    (
        private store:   Store,
        private service: ServiceEvents
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
                ActionSync    : ActionUserEventsSync
            }
        );
    }

    @Action(ActionUserEventsReset)
    reset(context: StateContext<StateUserEventsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id());
        const query: Query   = userId == null ? undefined : this.service.collection('events').ref.where('userId', '==', userId)
          .where('notifyComplete', '==', false);

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
        return super.get(context).pipe(
          tap(() =>
          {
            const language: string = this.store.selectSnapshot(StateLanguage.language);
            const events: Array<Event>  = StateUserEvents.dataState(context.getState());
            const options: any = { weekday: 'long',
              year: 'numeric', month: 'long', day: 'numeric'};

              let timeStart: Date;
              let timeStartPrevious: Date;
              let timeStartFormatted: string;

              events.forEach((event: Event) =>
              {
                timeStart = new Date(event.timeStart);
                timeStartFormatted = timeStart.toLocaleDateString(language, options);

                if(event.metadata === undefined)
                  event.metadata = {};

                if(timeStartPrevious === undefined || timeStart.getTime() != timeStartPrevious.getTime())
                  event.metadata.timeStartFormatted = timeStartFormatted;

                event.metadata.timeStartDate = timeStart;
                timeStartPrevious = timeStart;

              });
          })
        );
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
}
