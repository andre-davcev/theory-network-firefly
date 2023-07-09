import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { from, of } from 'rxjs';
import { switchMap, takeWhile, tap } from 'rxjs/operators';

import { DocumentSnapshot } from '@theory/firebase';
import { StreamInterest, SubscriptionPartial } from '@firefly/cloud';

import { InterestType } from '../../../enums';
import { StateInterestsModel } from './interests.state.model';
import { StateInterestsOptions } from './interests.state.options';
import {
  ActionInterestsSetType,
  ActionInterestsSetVirtual,
  ActionInterestsFilter,
  ActionInterestsPage,
  ActionInterestsSetSubscriptions,
  ActionInterestsSubscriptionToggle,
  ActionInterestsSubscriptionOnOff,
  ActionInterestsSubscriptionAdd,
  ActionInterestsSubscriptionRemove
} from './interests.actions';

import { ActionUserPatch } from '../../document/user/user.actions';
import { InterestsFilter } from './interests.filter.model';
import { StateCityStream } from '../../child/city-stream/city-stream.state';
import { StateUserSubscriptions } from '../../child/user-subscriptions/user-subscriptions.state';
import {
  ActionUserSubscriptionsAdd,
  ActionUserSubscriptionsFilter,
  ActionUserSubscriptionsGet,
  ActionUserSubscriptionsRemove
} from '../../child/user-subscriptions/user-subscriptions.actions';
import {
  ActionCityStreamAdd,
  ActionCityStreamFilter,
  ActionCityStreamGet,
  ActionCityStreamSubscriptionNew,
  ActionCityStreamSubscriptionsSet
} from '../../child/city-stream/city-stream.actions';
import { StateUser } from '../../document/user/user.state';
import { StateUserInterests } from '../../query/user-interests/user-interests.state';
import {
  ActionUserInterestsFilter,
  ActionUserInterestsGet
} from '../../query/user-interests/user-interests.actions';
import { StateLocation } from '@theory/capacitor';

@State<StateInterestsModel>(StateInterestsOptions)
@Injectable()
export class StateInterests {
  @Selector() static filter(state: StateInterestsModel): InterestsFilter {
    return state.filter;
  }
  @Selector() static type(state: StateInterestsModel): InterestType {
    return StateInterests.filter(state).type;
  }
  @Selector() static virtual(state: StateInterestsModel): boolean {
    return StateInterests.filter(state).virtual;
  }
  @Selector() static subscriptions(
    state: StateInterestsModel
  ): Record<string, SubscriptionPartial> {
    return StateInterests.filter(state).subscriptions;
  }

  @Selector([
    StateCityStream.data(),
    StateUserSubscriptions.data(),
    StateUserInterests.data()
  ])
  public static data(
    state: StateInterestsModel,
    dataUnsubscribed: Array<StreamInterest>,
    dataSubscribed: Array<StreamInterest>,
    dataCreated: Array<StreamInterest>
  ): Array<StreamInterest> {
    const type: InterestType = StateInterests.type(state);
    const subscriptions: Record<string, SubscriptionPartial> =
      StateInterests.subscriptions(state);

    const data: Array<StreamInterest> =
      type === InterestType.Unsubscribed
        ? dataUnsubscribed
        : type === InterestType.Subscribed
        ? dataSubscribed
        : dataCreated;

    return data.map((item: StreamInterest) => ({
      ...item,
      score: item.score || 0,
      on: subscriptions[item.id]?.on
    }));
  }

  @Selector([
    StateCityStream.snapshotLookup(),
    StateUserSubscriptions.snapshotLookup(),
    StateUserInterests.snapshotLookup()
  ])
  public static snapshotLookup(
    state: StateInterestsModel,
    lookupUnsubscribed: Record<string, DocumentSnapshot>,
    lookupSubscribed: Record<string, DocumentSnapshot>,
    lookupCreated: Record<string, DocumentSnapshot>
  ): Record<string, DocumentSnapshot> {
    const type: InterestType = StateInterests.type(state);

    return type === InterestType.Unsubscribed
      ? lookupUnsubscribed
      : type === InterestType.Subscribed
      ? lookupSubscribed
      : lookupCreated;
  }

  @Selector([
    StateCityStream.dataLookup(),
    StateUserSubscriptions.dataLookup(),
    StateUserInterests.dataLookup()
  ])
  public static dataLookup(
    state: StateInterestsModel,
    lookupUnsubscribed: Record<string, StreamInterest>,
    lookupSubscribed: Record<string, StreamInterest>,
    lookupCreated: Record<string, StreamInterest>
  ): Record<string, StreamInterest> {
    const type: InterestType = StateInterests.type(state);

    return type === InterestType.Unsubscribed
      ? lookupUnsubscribed
      : type === InterestType.Subscribed
      ? lookupSubscribed
      : lookupCreated;
  }

  @Selector([
    StateCityStream.finishedPaging(),
    StateUserSubscriptions.finishedPaging(),
    StateUserInterests.finishedPaging()
  ])
  public static pageFinished(
    state: StateInterestsModel,
    finishedUnsubscribed: boolean,
    finishedSubscribed: boolean,
    finishedCreated: boolean
  ): boolean {
    const type: InterestType = StateInterests.type(state);

    return type === InterestType.Unsubscribed
      ? finishedSubscribed
      : type === InterestType.Subscribed
      ? finishedUnsubscribed
      : finishedCreated;
  }

  @Selector([
    StateCityStream.data(),
    StateUserSubscriptions.data(),
    StateUserInterests.data()
  ])
  public static found(
    state: StateInterestsModel,
    dataUnsubscribed: Array<StreamInterest>,
    dataSubscribed: Array<StreamInterest>,
    dataCreated: Array<StreamInterest>
  ): boolean {
    return (
      StateInterests.data(state, dataUnsubscribed, dataSubscribed, dataCreated)
        .length > 0
    );
  }

  @Selector([
    StateCityStream.data(),
    StateUserSubscriptions.data(),
    StateUserInterests.data()
  ])
  public static empty(
    state: StateInterestsModel,
    dataUnsubscribed: Array<StreamInterest>,
    dataSubscribed: Array<StreamInterest>,
    dataCreated: Array<StreamInterest>
  ): boolean {
    return !StateInterests.found(
      state,
      dataUnsubscribed,
      dataSubscribed,
      dataCreated
    );
  }

  @Selector([StateUser.isPublisher])
  public static add(state: StateInterestsModel, isPublisher: boolean): boolean {
    return isPublisher && StateInterests.type(state) === InterestType.Created;
  }

  @Selector([StateLocation.permissionDenied])
  static emptyMessage(
    state: StateInterestsModel,
    permissionDenied: boolean
  ): string {
    const type: InterestType = StateInterests.type(state);

    return permissionDenied
      ? 'page.stream.empty.locationDenied'
      : StateInterests.virtual(state)
      ? 'page.stream.empty.virtual'
      : type === InterestType.Unsubscribed
      ? 'page.stream.empty.unsubscribed'
      : type === InterestType.Subscribed
      ? 'page.stream.empty.subscribed'
      : 'page.stream.empty.created';
  }

  constructor(private store: Store) {}

  @Action(ActionInterestsSetType)
  setType(
    { getState, dispatch }: StateContext<StateInterestsModel>,
    { type }: ActionInterestsSetType
  ) {
    const filter: InterestsFilter = StateInterests.filter(getState());

    filter.type = type;

    return dispatch(new ActionInterestsFilter(filter));
  }

  @Action(ActionInterestsSetVirtual)
  setVirtual(
    { getState, dispatch }: StateContext<StateInterestsModel>,
    { virtual }: ActionInterestsSetVirtual
  ) {
    const filter: InterestsFilter = StateInterests.filter(getState());

    filter.virtual = virtual;

    return dispatch(new ActionInterestsFilter(filter));
  }

  @Action(ActionInterestsSetSubscriptions)
  setSubscriptions(
    { getState, dispatch }: StateContext<StateInterestsModel>,
    { subscriptions, save }: ActionInterestsSetSubscriptions
  ) {
    const state: StateInterestsModel = getState();
    const filter: InterestsFilter = StateInterests.filter(state);
    const type: InterestType = StateInterests.type(state);

    filter.subscriptions = subscriptions;

    return dispatch(
      type === InterestType.Unsubscribed
        ? new ActionCityStreamSubscriptionsSet(subscriptions)
        : new ActionInterestsFilter(filter)
    ).pipe(
      takeWhile(() => save),
      switchMap(() =>
        dispatch(
          new ActionUserPatch({ subscriptionsStatus: subscriptions }, true)
        )
      )
    );
  }

  @Action(ActionInterestsFilter)
  filter(
    { dispatch, getState, patchState }: StateContext<StateInterestsModel>,
    { filter }: ActionInterestsFilter
  ) {
    filter = filter || StateInterests.filter(getState());

    const type: InterestType = filter.type;

    return dispatch(
      type === InterestType.Unsubscribed
        ? new ActionCityStreamFilter(filter)
        : type === InterestType.Subscribed
        ? new ActionUserSubscriptionsFilter(filter)
        : new ActionUserInterestsFilter(filter)
    ).pipe(tap(() => patchState({ filter })));
  }

  @Action(ActionInterestsPage)
  page(
    { dispatch, getState }: StateContext<StateInterestsModel>,
    { infiniteScroll }: ActionInterestsPage
  ) {
    const type: InterestType = StateInterests.type(getState());

    return dispatch(
      type === InterestType.Unsubscribed
        ? new ActionCityStreamGet()
        : type === InterestType.Subscribed
        ? new ActionUserSubscriptionsGet()
        : new ActionUserInterestsGet()
    ).pipe(
      switchMap(() =>
        infiniteScroll == null ? of(null) : from(infiniteScroll.complete())
      )
    );
  }

  @Action(ActionInterestsSubscriptionToggle)
  subscriptionToggle(
    { dispatch, getState }: StateContext<StateInterestsModel>,
    { id, permanent }: ActionInterestsSubscriptionToggle
  ) {
    const subscription: SubscriptionPartial = StateInterests.subscriptions(
      getState()
    )[id];

    return !permanent
      ? dispatch(new ActionInterestsSubscriptionOnOff(id, !subscription.on))
      : subscription == null
      ? dispatch(new ActionInterestsSubscriptionAdd(id))
      : dispatch(new ActionInterestsSubscriptionRemove(id));
  }

  @Action(ActionInterestsSubscriptionAdd)
  subscriptionAdd(
    { dispatch, getState }: StateContext<StateInterestsModel>,
    { id }: ActionInterestsSubscriptionAdd
  ) {
    const state: StateInterestsModel = getState();

    const subscriptions: Record<string, SubscriptionPartial> =
      StateInterests.subscriptions(state);

    const data: StreamInterest = this.store.selectSnapshot(
      StateInterests.dataLookup
    )[id];
    const snapshot: DocumentSnapshot = this.store.selectSnapshot(
      StateInterests.snapshotLookup
    )[id];

    subscriptions[id] = { on: true };

    data.subscriberCount += 1;

    return dispatch(new ActionCityStreamSubscriptionNew(id)).pipe(
      switchMap(() =>
        dispatch([
          new ActionInterestsSetSubscriptions(subscriptions, true),
          new ActionUserSubscriptionsAdd(snapshot, data)
        ])
      )
    );
  }

  @Action(ActionInterestsSubscriptionRemove)
  subscriptionRemove(
    { dispatch, getState }: StateContext<StateInterestsModel>,
    { id }: ActionInterestsSubscriptionRemove
  ) {
    const state: StateInterestsModel = getState();

    const subscriptions: Record<string, SubscriptionPartial> =
      StateInterests.subscriptions(state);
    delete subscriptions[id];

    const data: StreamInterest = this.store.selectSnapshot(
      StateInterests.dataLookup
    )[id];
    const snapshot: DocumentSnapshot = this.store.selectSnapshot(
      StateInterests.snapshotLookup
    )[id];

    data.subscriberCount -= 1;

    return dispatch([
      new ActionInterestsSetSubscriptions(subscriptions, true),
      new ActionUserSubscriptionsRemove(id)
    ]).pipe(
      takeWhile(
        () =>
          this.store.selectSnapshot(StateCityStream.childLookup())[id] != null
      ),
      switchMap(() => dispatch(new ActionCityStreamAdd(snapshot, data)))
    );
  }

  @Action(ActionInterestsSubscriptionOnOff)
  subscriptionOnOff(
    { dispatch, getState }: StateContext<StateInterestsModel>,
    { id, on }: ActionInterestsSubscriptionOnOff
  ) {
    const state: StateInterestsModel = getState();

    const subscriptions: Record<string, SubscriptionPartial> =
      StateInterests.subscriptions(state);

    subscriptions[id].on = on;

    return dispatch(new ActionInterestsSetSubscriptions(subscriptions, true));
  }
}
