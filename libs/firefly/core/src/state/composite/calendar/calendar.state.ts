import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Alert, Event, DateEvents } from '@firefly/cloud';
import { EventType } from '@firefly/core/enums';
import { ActionUserAlertsGet, ActionUserAlertsGetImages, StateUserAlerts } from '@firefly/core/state/child';
import { ActionUserEventsGet, ActionUserEventsGetData, StateUserEvents } from '@firefly/core/state/query';
import { ActionAppLoadingHide, ActionAppLoadingShow, StateUser } from '@firefly/core/state/document';

import { StateCalendarModel } from './calendar.state.model';
import { StateCalendarOptions } from './calendar.state.options';
import {
  ActionCalendarFilter,
  ActionCalendarFilterCreated,
  ActionCalendarFilterUpcoming,
  ActionCalendarPage,
  ActionCalendarSetType,
  ActionCalendarSetVirtual
} from './calendar.actions';

@State<StateCalendarModel>(StateCalendarOptions)
@Injectable()
export class StateCalendar
{
    @Selector() static type(state: StateCalendarModel)    : EventType { return state.type; }
    @Selector() static virtual(state: StateCalendarModel) : boolean   { return state.virtual; }

    @Selector
    ([
        StateUserAlerts.data(),
        StateUserEvents.data()
    ])
    public static data
    (
        state  : StateCalendarModel,
        alerts : Array<Alert>,
        events : Array<Event>
    ) : Array<DateEvents>
    {
        const virtual    : boolean           = StateCalendar.virtual(state);
        const type       : EventType         = StateCalendar.type(state);
        const list       : Array<Event>      = type === EventType.Upcoming ? alerts : events;
        const eventsList : Array<DateEvents> = [];

        let current           : DateEvents;
        let timeStart         : Date;
        let timeStartPrevious : Date;
        let datesAreEqual     : boolean = true;

        list.
            filter((event: Event) =>
                !virtual || event.virtual
            ).
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
        StateUserAlerts.data(),
        StateUserEvents.data()
    ])
    public static exists
    (
        state  : StateCalendarModel,
        alerts : Array<Alert>,
        events : Array<Event>
    ) : boolean
    {
        return StateCalendar.data(state, alerts, events).length > 0;
    }

    @Selector([StateUser.isPublisher])
    public static canAdd
    (
        state       : StateCalendarModel,
        isPublisher : boolean
    ): boolean
    {
        return isPublisher && StateCalendar.type(state) === EventType.Created;
    }

    @Selector()
    static emptyMessage(state: StateCalendarModel) : string
    {
        const type: EventType = StateCalendar.type(state);

        return StateCalendar.virtual(state) ?
            'page.events.empty.virtual' :
            type === EventType.New ?
            'page.events.empty.new' :
            type === EventType.Upcoming ?
            'page.events.empty.upcoming' :
            'page.events.empty.created';
    }

    @Selector
    ([
        StateCalendar.type,
        StateUserAlerts.finishedPaging(),
        StateUserEvents.finishedPaging()
    ])
    public static pagingFinished
    (
        state                : StateCalendarModel,
        eventType            : EventType,
        finishedPagingAlerts : boolean,
        finishedPagingEvents : boolean
    ) : boolean
    {
        return eventType === EventType.Created ?
            finishedPagingEvents :
            finishedPagingAlerts;
    }

    constructor
    (
        private store : Store
    )
    { }

    @Action(ActionCalendarSetType)
    setType({ patchState }: StateContext<StateCalendarModel>, { type }: ActionCalendarSetType)
    {
        patchState({ type });
    }

    @Action(ActionCalendarSetVirtual)
    setVirtual({ patchState }: StateContext<StateCalendarModel>, { virtual }: ActionCalendarSetVirtual)
    {
        patchState({ virtual });
    }

    @Action(ActionCalendarFilter)
    filter({ dispatch, getState }: StateContext<StateCalendarModel>, { type }: ActionCalendarFilter)
    {
        type = type || StateCalendar.type(getState());

        return type === EventType.Upcoming ?
            dispatch(new ActionCalendarFilterUpcoming()) :
            dispatch(new ActionCalendarFilterCreated());
    }

    @Action(ActionCalendarFilterUpcoming)
    filterUpcoming({ dispatch }: StateContext<StateCalendarModel>)
    {
        return this.store.selectSnapshot(StateUserAlerts.empty()) || this.store.selectSnapshot(StateUserAlerts.data())[0].metadata.image != null ?
            dispatch(new ActionCalendarSetType(EventType.Upcoming)) :
            dispatch(new ActionAppLoadingShow()).
            pipe
            (
                switchMap(() => this.store.dispatch(new ActionUserAlertsGetImages())),
                switchMap(() => this.store.dispatch(new ActionAppLoadingHide())),
                switchMap(() => this.store.dispatch(new ActionCalendarSetType(EventType.Upcoming)))
            );
    }

    @Action(ActionCalendarFilterCreated)
    filterCreated({ dispatch }: StateContext<StateCalendarModel>)
    {
        return this.store.selectSnapshot(StateUserEvents.initialized()) ?
            dispatch(new ActionCalendarSetType(EventType.Created)) :
            dispatch(new ActionAppLoadingShow()).
            pipe
            (
                switchMap(() => this.store.dispatch(new ActionUserEventsGetData())),
                switchMap(() => this.store.dispatch(new ActionAppLoadingHide())),
                switchMap(() => this.store.dispatch(new ActionCalendarSetType(EventType.Created)))
            );
    }

    @Action(ActionCalendarPage)
    page({ dispatch, getState }: StateContext<StateCalendarModel>, { infiniteScroll }: ActionCalendarPage)
    {
        const type : EventType = StateCalendar.type(getState());

        const finishedPaging : boolean = this.store.selectSnapshot
        (
            type === EventType.Upcoming ?
                StateUserAlerts.finishedPaging() :
                StateUserEvents.finishedPaging()
        );

        return finishedPaging ?
            from(infiniteScroll.complete()).
            pipe
            (
                tap(() =>
                    infiniteScroll.disabled = true
                )
            ):

            dispatch
            (
                type === EventType.Upcoming ?
                    new ActionUserAlertsGet() :
                    new ActionUserEventsGet()
            ).
            pipe
            (
                switchMap(() =>
                    from(infiniteScroll.complete())
                )
            );
    }
}
