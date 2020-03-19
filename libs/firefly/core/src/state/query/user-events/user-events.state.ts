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
import { tap, map, switchMap } from 'rxjs/operators';
import { StateLanguage } from '@theory/capacitor';
import { Injectable } from '@angular/core';
import { ActionStorageUrlsGet, ImageSize } from '@theory/firebase';

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
        const { dispatch, getState } = context;

        return super.get(context).pipe
        (
            map(() =>
                StateUserEvents.dataState(getState())
            ),
            tap((data: Array<Event>) =>
            {
                const language: string = this.store.selectSnapshot(StateLanguage.language);

                const options: any =
                {
                    weekday : 'long',
                    year    : 'numeric',
                    month   : 'long',
                    day     : 'numeric'
                };

                let timeStartDate     : Date;
                let timeStartPrevious : Date;

                data.forEach((event: Event) =>
                {
                    timeStartDate = new Date(event.timeStart);

                    event.metadata =
                    {
                        ...event.metadata,

                        timeStartDate,
                        timeStartFormatted: timeStartPrevious == null || timeStartDate.getTime() != timeStartPrevious.getTime() ?
                            timeStartDate.toLocaleDateString(language, options) :
                            null
                    };

                    timeStartPrevious = timeStartDate;
                });
            }),
            map((data: Array<Event>) =>
                data.map((item: Event) =>
                    item.icon
                )
            ),
            switchMap((bucketPaths: Array<string>) =>
                dispatch(new ActionStorageUrlsGet(bucketPaths, ImageSize.Small))
            )
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
