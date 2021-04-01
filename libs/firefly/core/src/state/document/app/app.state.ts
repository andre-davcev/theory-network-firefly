
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

import { ActionCityStreamGet, ActionUserAlertsGet, ActionUserAlertsGetImages, ActionUserSubscriptionsGet, StateUserAlerts, StateUserSubscriptions } from '../../child';
import { ActionUserSubscriptionsSet } from '../user';
import { ActionUserEventsGet, ActionUserEventsGetData, ActionUserInterestsGet, ActionUserInterestsGetData, StateUserEvents, StateUserInterests } from '../../query';

@State<StateAppModel>(StateAppOptions)
@Injectable()
export class StateApp
{
    @Selector() static loading(state: StateAppModel)         : boolean      { return state.loading; }
    @Selector() static interestType(state: StateAppModel)    : InterestType { return state.interestType; }
    @Selector() static interestVirtual(state: StateAppModel) : boolean      { return state.interestVirtual; }
    @Selector() static eventType(state: StateAppModel)       : EventType    { return state.eventType; }
    @Selector() static eventVirtual(state: StateAppModel)    : boolean      { return state.eventVirtual; }

    constructor
    (
        private store: Store
    )
    {

    }

    @Action(ActionAppLoadingShow)
    loadingShow({ patchState }: StateContext<StateAppModel>)
    {
        patchState({ loading: true });
    }

    @Action(ActionAppLoadingHide)
    loadingHide({ patchState }: StateContext<StateAppModel>)
    {
        patchState({ loading: false });
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
        return this.store.selectSnapshot(StateUserAlerts.empty()) || this.store.selectSnapshot(StateUserAlerts.alerts)[0].metadata.image != null ?
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
        const finishedPaging : boolean      = this.store.selectSnapshot(StateUserInterests.pageFinished);

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
