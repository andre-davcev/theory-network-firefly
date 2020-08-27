import { State, Action, StateContext, Store, Selector } from '@ngxs/store';

import { Event, DateEvents, Alert } from '@firefly/cloud';

import { StateUserEventsModel } from './user-events.state.model';
import { StateUserEventsOptions } from './user-events.state.options';
import {
    ActionUserEventsAdd,
    ActionUserEventsRemove,
    ActionUserEventsGet,
    ActionUserEventsSync,
    ActionUserEventsGetData,
    ActionUserEventsReset,
    ActionUserEventsDelete
} from './user-events.actions';
import { StateUser } from '../../document/user';
import { StateQuery } from '@theory/ngxs';
import { ServiceEvents } from '@firefly/core/services';
import { Query } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ServiceStorage } from '@theory/firebase';
import { Collection, ImageType, EventType } from '@firefly/core/enums';
import { firestore } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { CoreEnum } from '@theory/core';
import { StateUserAlerts } from '../../child/user-alerts/user-alerts.state';

@State<StateUserEventsModel>(StateUserEventsOptions)
@Injectable()
export class StateUserEvents extends StateQuery<Event, StateUserEventsModel>
{
    @Selector
    ([
        StateUserAlerts.alerts,
        StateUser.eventType,
        StateUser.eventVirtual
    ])
    public static list
    (
        state     : StateUserEventsModel,
        alerts    : Array<Alert>,
        eventType : EventType,
        virtual   : boolean
    ) : Array<DateEvents>
    {
        const userEvents : Array<Event>      = StateUserEvents.dataState(state);
        const eventsList : Array<DateEvents> = [];
        const time       : number            = new Date().getTime();

        const events : Array<Event> = (eventType === EventType.Upcoming ? alerts : userEvents).
            filter((event: Event) =>
                (!virtual || event.virtual) &&
                event.timeEnd.toDate().getTime() > time
            );

        let current           : DateEvents;
        let timeStart         : Date;
        let timeStartPrevious : Date;
        let datesAreEqual     : boolean = true;

        events.
            forEach((event: Event) =>
            {
                timeStart = event.timeStart.toDate();

                datesAreEqual = timeStartPrevious != null &&
                                timeStart.getFullYear() === timeStartPrevious.getFullYear() &&
                                timeStart.getMonth()    === timeStartPrevious.getMonth() &&
                                timeStart.getDate()     === timeStartPrevious.getDate();

                if (!datesAreEqual)
                {
                    if (timeStartPrevious != null)
                    {
                        eventsList.push(current);
                    }

                    current =
                    {
                        date   : event.timeStart,
                        events : []
                    };
                }

                current.events.push(event);

                timeStartPrevious = timeStart;
            });

        if (eventsList.length > 0 || events.length === 1)
        {
            eventsList.push(current);
        };

        return eventsList;
    }

    @Selector
    ([
        StateUserAlerts.alerts,
        StateUser.eventType,
        StateUser.eventVirtual
    ])
    public static listFound
    (
        state      : StateUserEventsModel,
        alerts     : Array<Alert>,
        eventType  : EventType,
        virtual    : boolean
    ) : boolean
    {
        return StateUserEvents.list(state, alerts, eventType, virtual).length > 0;
    }

    @Selector
    ([
        StateUserAlerts.alerts,
        StateUser.eventType,
        StateUser.eventVirtual
    ])
    public static listEmpty
    (
        state      : StateUserEventsModel,
        alerts     : Array<Alert>,
        eventType  : EventType,
        virtual    : boolean
    ) : boolean
    {
        return StateUserEvents.list(state, alerts, eventType, virtual).length === 0;
    }

    @Selector
    ([
        StateUser.eventType,
        StateUser.isPublisher
    ])
    public static add
    (
        state       : StateUserEventsModel,
        eventType   : EventType,
        isPublisher : boolean
    ): boolean
    {
        return isPublisher && eventType === EventType.Created;
    }

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
                ActionSync    : ActionUserEventsSync
            },
            storage
        );
    }

    @Action(ActionUserEventsReset)
    reset(context: StateContext<StateUserEventsModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id());
        const query: Query   = userId == null ? undefined : this.service.
            collection(Collection.Events).ref.
            where('userId', '==', userId);

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
        return super.get(context).
        pipe
        (
            switchMap(() =>
                super.getMedia(context, Collection.Events, ImageType.Image)
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

    @Action(ActionUserEventsDelete)
    delete({ dispatch, getState }: StateContext<StateUserEventsModel>, { id }: ActionUserEventsDelete)
    {
        const snapshot: firestore.DocumentSnapshot = StateUserEvents.snapshotLookupState(getState())[id];

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
}
