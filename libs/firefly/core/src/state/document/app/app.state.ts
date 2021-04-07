
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { EventType, InterestType } from '@firefly/core/enums';

import { StateAppModel } from './app.state.model';
import { StateAppOptions } from './app.state.options';
import {
    ActionAppInterestTypeSet,
    ActionAppEventTypeSet,
    ActionAppInterestVirtualSet,
    ActionAppEventVirtualSet,
    ActionAppFilterInterests,
    ActionAppFilterInterestsUnsubscribed,
    ActionAppFilterInterestsSubscribed,
    ActionAppFilterInterestsCreated,
    ActionAppFilterEvents,
    ActionAppFilterEventsUpcoming,
    ActionAppFilterEventsCreated,
    ActionAppPageInterests,
    ActionAppPageEvents,
    ActionAppLoadingShow,
    ActionAppLoadingHide,
} from './app.actions';

import { ActionCityStreamGet, ActionUserAlertsGet, ActionUserAlertsGetImages, ActionUserSubscriptionsGet, StateCityStream, StateUserAlerts, StateUserSubscriptions } from '../../child';
import { ActionUserSubscriptionsSet } from '../user/user.actions';
import { ActionUserEventsGet, ActionUserEventsGetData, ActionUserInterestsGet, ActionUserInterestsGetData, StateUserEvents, StateUserInterests } from '../../query';
import { Alert, DateEvents, Event, Interest, StreamInterest, SubscriptionPartial } from '@firefly/cloud';
import { StateUser } from '../user';

@State<StateAppModel>(StateAppOptions)
@Injectable()
export class StateApp
{
    @Selector() static loading(state: StateAppModel)         : boolean      { return state.loading; }
    @Selector() static interestType(state: StateAppModel)    : InterestType { return state.interestType; }
    @Selector() static interestVirtual(state: StateAppModel) : boolean      { return state.interestVirtual; }
    @Selector() static eventType(state: StateAppModel)       : EventType    { return state.eventType; }
    @Selector() static eventVirtual(state: StateAppModel)    : boolean      { return state.eventVirtual; }

    @Selector([StateUserAlerts.data()])
    public static notifications(state: StateAppModel, alerts: Array<Alert>): Array<Alert>
    {
        return alerts.
            filter((alert: Alert) =>
                !alert.read || alert.metadata?.sessionRead
            );
    }

    @Selector([StateUserAlerts.data()])
    public static notificationsCount(state: StateAppModel, alerts: Array<Alert>): number
    {
        return StateApp.notifications(state, alerts).length;
    }

    @Selector([StateUserAlerts.data()])
    public static notificationsExist(state: StateAppModel, alerts: Array<Alert>): boolean
    {
        return StateApp.notificationsCount(state, alerts) > 0;
    }

    @Selector([StateUserAlerts.data()])
    public static notificationsUnreadCount(state: StateAppModel, alerts: Array<Alert>): number
    {
        return alerts.
            filter((alert: Alert) =>
                !alert.read
            ).length;
    }

    @Selector([StateUserAlerts.data()])
    public static notificationsUnreadExists(state: StateAppModel, alerts: Array<Alert>): boolean
    {
        return StateApp.notificationsUnreadCount(state, alerts) > 0
    }

    // START StateUserEvents.list
    @Selector
    ([
        StateUserAlerts.data(),
        StateUserEvents.data()
    ])
    public static calendar
    (
        state  : StateAppModel,
        alerts : Array<Alert>,
        events : Array<Event>
    ) : Array<DateEvents>
    {
        const virtual    : boolean           = StateApp.eventVirtual(state);
        const type       : EventType         = StateApp.eventType(state);
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
    public static calendarExists
    (
        state  : StateAppModel,
        alerts : Array<Alert>,
        events : Array<Event>
    ) : boolean
    {
        return StateApp.calendar(state, alerts, events).length > 0;
    }

    // StateUserEvents.add
    @Selector([StateUser.isPublisher])
    public static calendarCanAdd
    (
        state       : StateAppModel,
        isPublisher : boolean
    ): boolean
    {
        return isPublisher && StateApp.eventType(state) === EventType.Created;
    }

    @Selector()
    static calendarEmptyMessage(state: StateAppModel) : string
    {
        const type: EventType = StateApp.eventType(state);

        return StateApp.eventVirtual(state) ?
            'page.events.empty.virtual' :
            type === EventType.New ?
            'page.events.empty.new' :
            type === EventType.Upcoming ?
            'page.events.empty.upcoming' :
            'page.events.empty.created';
    }

    // StateApp.pageFinished
    @Selector
    ([
        StateApp.eventType,
        StateUserAlerts.finishedPaging(),
        StateUserEvents.finishedPaging()
    ])
    public static calendarPagingFinished
    (
        state                : StateAppModel,
        eventType            : EventType,
        finishedPagingAlerts : boolean,
        finishedPagingEvents : boolean
    ) : boolean
    {
        return eventType === EventType.Created ?
            finishedPagingEvents :
            finishedPagingAlerts;
    }


    // START StateUserInterests
    @Selector()
    static streamEmptyMessage(state: StateAppModel) : string
    {
        const type: InterestType = StateApp.interestType(state);

        return StateApp.interestVirtual(state) ?
                'page.stream.empty.virtual' :
            type === InterestType.Unsubscribed ?
                'page.stream.empty.unsubscribed' :
            type === InterestType.Subscribed ?
                'page.stream.empty.subscribed' :
                'page.stream.empty.created';
    }

    @Selector
    ([
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static streamSubscribedKeys
    (
        state         : StateAppModel,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<string>
    {
        return keys.
            filter((id: string) =>
                subscriptions[id] != null
            );
    };

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static streamSubscribed
    (
        state         : StateAppModel,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<StreamInterest>
    {
        const keysFiltered : Array<string> = StateApp.streamSubscribedKeys(state, keys, subscriptions);

        if (keysFiltered.length === 0) { return []; }

        const offset : number = keysFiltered.findIndex((id: string) => lookup[id] == null);
        const end    : number = offset === -1 ? keys.length : offset;

        return keysFiltered.
            splice(0, end).
            map((id: string) =>
                lookup[id]
            );
    };

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static streamUnsubscribedKeys
    (
        state         : StateAppModel,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<string>
    {
        return keys.
            filter((id: string) =>
                subscriptions[id] == null || lookup[id]?.on != null
            );
    };

    @Selector
    ([
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus
    ])
    public static streamUnsubscribed
    (
        state         : StateAppModel,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>
    ) : Array<StreamInterest>
    {
        const keysFiltered : Array<string> = StateApp.streamUnsubscribedKeys(state, lookup, keys, subscriptions);

        if (keysFiltered.length === 0) { return []; }

        const offset : number = keysFiltered.findIndex((id: string) => lookup[id] == null);
        const end    : number = offset === -1 ? keys.length : offset;

        return keysFiltered.
            slice(0, end).
            map((id: string) =>
                lookup[id]
            );
    };

    @Selector
    ([
        StateUserInterests.finishedPaging(),
        StateCityStream.finishedPaging()
    ])
    public static pageFinished
    (
        state                 : StateAppModel,
        finishedUserInterests : boolean,
        finishedStream        : boolean
    ) : boolean
    {
        return finishedUserInterests && finishedStream;
    }



    @Selector
    ([
        StateUserInterests.data(),
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus,
        StateApp.interestType,
        StateApp.interestVirtual
    ])
    public static stream
    (
        state         : StateAppModel,
        userInterests : Array<Interest>,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>,
        interestType  : InterestType,
        virtual       : boolean
    ) : Array<StreamInterest>
    {
        return interestType === InterestType.Created ?
            userInterests.
                map((interest: Interest) => {
                    return {
                        ...interest,
                        score : 0,
                        on    : subscriptions[interest.id] == null ? false : true
                    };
                }) :
        interestType === InterestType.Subscribed ?
            StateApp.streamSubscribed(state, lookup, keys, subscriptions) :
            StateApp.streamUnsubscribed(state, lookup, keys, subscriptions);
    }

    @Selector
    ([
        StateUserInterests.data(),
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus,
        StateApp.interestType,
        StateApp.interestVirtual
    ])
    public static streamFound
    (
        state         : StateAppModel,
        userInterests : Array<Interest>,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>,
        interestType  : InterestType,
        virtual       : boolean
    ): boolean
    {
        return StateApp.stream(state, userInterests, lookup, keys, subscriptions, interestType, virtual).length > 0;
    }

    @Selector
    ([
        StateApp.interestType,
        StateUser.isPublisher
    ])
    public static streamAdd
    (
        state         : StateAppModel,
        interestType  : InterestType,
        isPublisher   : boolean
    ): boolean
    {
        return isPublisher && interestType === InterestType.Created;
    }

    @Selector
    ([
        StateUserInterests.data(),
        StateCityStream.dataLookup(),
        StateCityStream.keys(),
        StateUser.subscriptionsStatus,
        StateApp.interestType,
        StateApp.interestVirtual
    ])
    public static streamEmpty
    (
        state         : StateAppModel,
        userInterests : Array<Interest>,
        lookup        : Record<string, StreamInterest>,
        keys          : Array<string>,
        subscriptions : Record<string, SubscriptionPartial>,
        interestType  : InterestType,
        virtual       : boolean
    ): boolean
    {
        return !StateApp.streamFound(state, userInterests, lookup, keys, subscriptions, interestType, virtual);
    }

    constructor
    (
        private store: Store
    )
    { }

    @Action(ActionAppLoadingShow)
    loadingShow({ patchState, getState }: StateContext<StateAppModel>)
    {
        if (!StateApp.loading(getState()))
        {
            patchState({ loading: true });
        }
    }

    @Action(ActionAppLoadingHide)
    loadingHide({ patchState, getState }: StateContext<StateAppModel>)
    {
        if (StateApp.loading(getState()))
        {
            patchState({ loading: false });
        }
    }

    @Action(ActionAppInterestTypeSet)
    interestTypeSet({ patchState }: StateContext<StateAppModel>, { interestType }: ActionAppInterestTypeSet)
    {
        patchState({ interestType });
    }

    @Action(ActionAppInterestVirtualSet)
    interestVirtualSet({ patchState }: StateContext<StateAppModel>, { virtual }: ActionAppInterestVirtualSet)
    {
        patchState({ interestVirtual: virtual });
    }

    @Action(ActionAppEventTypeSet)
    eventTypeSet({ patchState }: StateContext<StateAppModel>, { eventType }: ActionAppEventTypeSet)
    {
        patchState({ eventType });
    }

    @Action(ActionAppEventVirtualSet)
    eventVirtualSet({ patchState }: StateContext<StateAppModel>, { virtual }: ActionAppEventVirtualSet)
    {
        patchState({ eventVirtual: virtual });
    }

    @Action(ActionAppFilterInterests)
    filterInterests({ dispatch, getState }: StateContext<StateAppModel>, { type }: ActionAppFilterInterests)
    {
        type = type || StateApp.interestType(getState());

        return type === InterestType.Unsubscribed ?
                dispatch(new ActionAppFilterInterestsUnsubscribed()) :
            type === InterestType.Subscribed ?
                dispatch(new ActionAppFilterInterestsSubscribed()) :
                dispatch(new ActionAppFilterInterestsCreated());
    }

    @Action(ActionAppFilterInterestsUnsubscribed)
    filterInterestsUnsubscribed({ dispatch }: StateContext<StateAppModel>)
    {
        return dispatch(new ActionAppInterestTypeSet(InterestType.Unsubscribed));
    }

    @Action(ActionAppFilterInterestsSubscribed)
    filterInterestsSubscribed({ dispatch }: StateContext<StateAppModel>)
    {
        return this.store.selectSnapshot(StateUserSubscriptions.initialized()) ?
            dispatch(new ActionAppInterestTypeSet(InterestType.Subscribed)) :
            dispatch(new ActionAppLoadingShow()).
            pipe
            (
                switchMap(() => this.store.dispatch(new ActionUserSubscriptionsSet())),
                switchMap(() => this.store.dispatch(new ActionAppLoadingHide())),
                switchMap(() => this.store.dispatch(new ActionAppInterestTypeSet(InterestType.Subscribed)))
            );
    }

    @Action(ActionAppFilterInterestsCreated)
    filterInterestsCreated({ dispatch }: StateContext<StateAppModel>)
    {
        return this.store.selectSnapshot(StateUserInterests.initialized()) ?
            dispatch(new ActionAppInterestTypeSet(InterestType.Created)) :
            dispatch(new ActionAppLoadingShow()).
            pipe
            (
                switchMap(() => this.store.dispatch(new ActionUserInterestsGetData())),
                switchMap(() => this.store.dispatch(new ActionAppLoadingHide())),
                switchMap(() => this.store.dispatch(new ActionAppInterestTypeSet(InterestType.Created)))
            );
    }

    @Action(ActionAppFilterEvents)
    filterEvents({ dispatch, getState }: StateContext<StateAppModel>, { type }: ActionAppFilterEvents)
    {
        type = type || StateApp.eventType(getState());

        return type === EventType.Upcoming ?
            dispatch(new ActionAppFilterEventsUpcoming()) :
            dispatch(new ActionAppFilterEventsCreated());
    }

    @Action(ActionAppFilterEventsUpcoming)
    filterEventsUpcoming({ dispatch }: StateContext<StateAppModel>)
    {
        return this.store.selectSnapshot(StateUserAlerts.empty()) || this.store.selectSnapshot(StateUserAlerts.data())[0].metadata.image != null ?
            dispatch(new ActionAppEventTypeSet(EventType.Upcoming)) :
            dispatch(new ActionAppLoadingShow()).
            pipe
            (
                switchMap(() => this.store.dispatch(new ActionUserAlertsGetImages())),
                switchMap(() => this.store.dispatch(new ActionAppLoadingHide())),
                switchMap(() => this.store.dispatch(new ActionAppEventTypeSet(EventType.Upcoming)))
            );
    }

    @Action(ActionAppFilterEventsCreated)
    filterEventsCreated({ dispatch }: StateContext<StateAppModel>)
    {
        return this.store.selectSnapshot(StateUserEvents.initialized()) ?
            dispatch(new ActionAppEventTypeSet(EventType.Created)) :
            dispatch(new ActionAppLoadingShow()).
            pipe
            (
                switchMap(() => this.store.dispatch(new ActionUserEventsGetData())),
                switchMap(() => this.store.dispatch(new ActionAppLoadingHide())),
                switchMap(() => this.store.dispatch(new ActionAppEventTypeSet(EventType.Created)))
            );
    }

    @Action(ActionAppPageInterests)
    pageInterests({ dispatch, getState }: StateContext<StateAppModel>, { infiniteScroll }: ActionAppPageInterests)
    {
        const interestType   : InterestType = StateApp.interestType(getState());
        const finishedPaging : boolean      = this.store.selectSnapshot(StateApp.pageFinished);

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
                interestType === InterestType.Unsubscribed ?
                    new ActionCityStreamGet() :
                interestType === InterestType.Subscribed ?
                    new ActionUserSubscriptionsGet() :
                    new ActionUserInterestsGet()
            ).
            pipe
            (
                switchMap(() =>
                    from(infiniteScroll.complete())
                )
            );
    }

    @Action(ActionAppPageEvents)
    pageEvents({ dispatch, getState }: StateContext<StateAppModel>, { infiniteScroll }: ActionAppPageEvents)
    {
        const eventType : EventType = StateApp.eventType(getState());

        const finishedPaging : boolean = this.store.selectSnapshot
        (
            eventType === EventType.Upcoming ?
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
                eventType === EventType.Upcoming ?
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
