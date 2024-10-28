import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { from, of } from 'rxjs';
import { switchMap, takeWhile, tap } from 'rxjs/operators';

import { StreamList, SubscriptionPartial } from '@firefly/cloud';
import { DocumentSnapshot } from '@theory/firebase';

import { TagList, TagListDefault } from '../../../enums';
import {
  ActionListsFilter,
  ActionListsPage,
  ActionListsSetSubscriptions,
  ActionListsSetVirtual,
  ActionListsSubscriptionAdd,
  ActionListsSubscriptionOnOff,
  ActionListsSubscriptionRemove,
  ActionListsSubscriptionToggle,
  ActionListsTagSet
} from './lists.actions';
import { StateListsModel } from './lists.state.model';
import { StateListsOptions } from './lists.state.options';

import { StateLocation } from '@theory/capacitor';
import { Tag } from '@theory/ionic';
import {
  ActionCityStreamAdd,
  ActionCityStreamFilter,
  ActionCityStreamGet,
  ActionCityStreamSubscriptionNew,
  ActionCityStreamSubscriptionsSet
} from '../../child/city-stream/city-stream.actions';
import { StateCityStream } from '../../child/city-stream/city-stream.state';
import {
  ActionUserSubscriptionsAdd,
  ActionUserSubscriptionsFilter,
  ActionUserSubscriptionsGet,
  ActionUserSubscriptionsRemove
} from '../../child/user-subscriptions/user-subscriptions.actions';
import { StateUserSubscriptions } from '../../child/user-subscriptions/user-subscriptions.state';
import { ActionUserPatch } from '../../document/user/user.actions';
import { StateUser } from '../../document/user/user.state';
import {
  ActionUserListsFilter,
  ActionUserListsGet
} from '../../query/user-lists/user-lists.actions';
import { StateUserLists } from '../../query/user-lists/user-lists.state';
import { ListsFilter } from './lists.filter.model';

@State<StateListsModel>(StateListsOptions)
@Injectable()
export class StateLists {
  @Selector() static filter(state: StateListsModel): ListsFilter {
    return state.filter;
  }
  @Selector() static virtual(state: StateListsModel): boolean {
    return StateLists.filter(state).virtual;
  }
  @Selector() static subscriptions(
    state: StateListsModel
  ): Record<string, SubscriptionPartial> {
    return StateLists.filter(state).subscriptions;
  }

  @Selector() static tag(state: StateListsModel): Tag<TagList> | null {
    return state.tag;
  }

  @Selector([StateLists.filter]) static tagKey(
    state: StateListsModel,
    filter: ListsFilter
  ): TagList {
    return filter.tag;
  }

  @Selector([StateLists.tag]) static tagIndex(
    state: StateListsModel,
    tag: Tag<TagList> | null
  ): number {
    return tag?.index || 0;
  }

  @Selector([
    StateLists.tagKey,
    StateCityStream.data(),
    StateUserSubscriptions.data(),
    StateUserLists.data()
  ])
  public static data(
    state: StateListsModel,
    key: TagList,
    dataUnsubscribed: Array<StreamList>,
    dataSubscribed: Array<StreamList>,
    dataCreated: Array<StreamList>
  ): Array<StreamList> {
    const subscriptions: Record<string, SubscriptionPartial> =
      StateLists.subscriptions(state);

    const data: Array<StreamList> =
      key === TagListDefault.Popular
        ? dataUnsubscribed
        : key === TagListDefault.Subscribed
        ? dataSubscribed
        : dataCreated;

    return data.map((item: StreamList) => ({
      ...item,
      score: item.score || 0,
      on: subscriptions[item.id]?.on
    }));
  }

  @Selector([
    StateLists.tagKey,
    StateCityStream.snapshotLookup(),
    StateUserSubscriptions.snapshotLookup(),
    StateUserLists.snapshotLookup()
  ])
  public static snapshotLookup(
    state: StateListsModel,
    key: TagList,
    lookupUnsubscribed: Record<string, DocumentSnapshot<StreamList>>,
    lookupSubscribed: Record<string, DocumentSnapshot<StreamList>>,
    lookupCreated: Record<string, DocumentSnapshot<StreamList>>
  ): Record<string, DocumentSnapshot<StreamList>> {
    return key === TagListDefault.Popular
      ? lookupUnsubscribed
      : key === TagListDefault.Subscribed
      ? lookupSubscribed
      : lookupCreated;
  }

  @Selector([
    StateLists.tagKey,
    StateCityStream.dataLookup(),
    StateUserSubscriptions.dataLookup(),
    StateUserLists.dataLookup()
  ])
  public static dataLookup(
    state: StateListsModel,
    key: TagList,
    lookupUnsubscribed: Record<string, StreamList>,
    lookupSubscribed: Record<string, StreamList>,
    lookupCreated: Record<string, StreamList>
  ): Record<string, StreamList> {
    return key === TagListDefault.Popular
      ? lookupUnsubscribed
      : key === TagListDefault.Subscribed
      ? lookupSubscribed
      : lookupCreated;
  }

  @Selector([
    StateLists.tagKey,
    StateCityStream.finishedPaging(),
    StateUserSubscriptions.finishedPaging(),
    StateUserLists.finishedPaging()
  ])
  public static pageFinished(
    state: StateListsModel,
    key: TagList,
    finishedUnsubscribed: boolean,
    finishedSubscribed: boolean,
    finishedCreated: boolean
  ): boolean {
    return key === TagListDefault.Popular
      ? finishedSubscribed
      : key === TagListDefault.Subscribed
      ? finishedUnsubscribed
      : finishedCreated;
  }

  @Selector([
    StateLists.tagKey,
    StateCityStream.data(),
    StateUserSubscriptions.data(),
    StateUserLists.data()
  ])
  public static found(
    state: StateListsModel,
    key: TagList,
    dataUnsubscribed: Array<StreamList>,
    dataSubscribed: Array<StreamList>,
    dataCreated: Array<StreamList>
  ): boolean {
    return (
      StateLists.data(state, key, dataUnsubscribed, dataSubscribed, dataCreated)
        .length > 0
    );
  }

  @Selector([
    StateLists.tagKey,
    StateCityStream.data(),
    StateUserSubscriptions.data(),
    StateUserLists.data()
  ])
  public static empty(
    state: StateListsModel,
    key: TagList,
    dataUnsubscribed: Array<StreamList>,
    dataSubscribed: Array<StreamList>,
    dataCreated: Array<StreamList>
  ): boolean {
    return !StateLists.found(
      state,
      key,
      dataUnsubscribed,
      dataSubscribed,
      dataCreated
    );
  }

  @Selector([StateUser.isPublisher])
  public static add(state: StateListsModel, isPublisher: boolean): boolean {
    return isPublisher;
  }

  @Selector([StateLists.tagKey, StateLocation.permissionDenied])
  static emptyMessage(
    state: StateListsModel,
    key: TagList,
    permissionDenied: boolean
  ): string {
    return permissionDenied
      ? 'page.stream.empty.locationDenied'
      : StateLists.virtual(state)
      ? 'page.stream.empty.virtual'
      : key === TagListDefault.Popular
      ? 'page.stream.empty.unsubscribed'
      : key === TagListDefault.Subscribed
      ? 'page.stream.empty.subscribed'
      : 'page.stream.empty.created';
  }

  constructor(private store: Store) {}

  @Action(ActionListsTagSet)
  tagSet(
    { dispatch, getState, patchState }: StateContext<StateListsModel>,
    { tag }: ActionListsTagSet
  ) {
    const filter: ListsFilter = StateLists.filter(getState());

    filter.tag = tag.key as TagList;

    patchState({ tag });

    return dispatch(new ActionListsFilter(filter));
  }

  @Action(ActionListsSetVirtual)
  setVirtual(
    { getState, dispatch }: StateContext<StateListsModel>,
    { virtual }: ActionListsSetVirtual
  ) {
    const filter: ListsFilter = StateLists.filter(getState());

    filter.virtual = virtual;

    return dispatch(new ActionListsFilter(filter));
  }

  @Action(ActionListsSetSubscriptions)
  setSubscriptions(
    { getState, dispatch }: StateContext<StateListsModel>,
    { subscriptions, save }: ActionListsSetSubscriptions
  ) {
    const state: StateListsModel = getState();
    const filter: ListsFilter = StateLists.filter(state);
    const key: TagList = this.store.selectSnapshot(StateLists.tagKey);

    subscriptions = subscriptions || {};

    filter.subscriptions = subscriptions;

    return dispatch(
      key === TagListDefault.Popular
        ? new ActionCityStreamSubscriptionsSet(subscriptions)
        : new ActionListsFilter(filter)
    ).pipe(
      takeWhile(() => save || false),
      switchMap(() =>
        dispatch(
          new ActionUserPatch(
            {
              subscriptionsStatus: subscriptions as Record<
                string,
                SubscriptionPartial
              >
            },
            true
          )
        )
      )
    );
  }

  @Action(ActionListsFilter)
  filter(
    { dispatch, getState, patchState }: StateContext<StateListsModel>,
    { filter }: ActionListsFilter
  ) {
    filter = filter || StateLists.filter(getState());

    const tag: TagList = filter.tag;

    return dispatch(
      tag === TagListDefault.Subscribed
        ? new ActionUserSubscriptionsFilter(filter)
        : tag === TagListDefault.Published
        ? new ActionUserListsFilter(filter)
        : new ActionCityStreamFilter(filter)
    ).pipe(tap(() => patchState({ filter })));
  }

  @Action(ActionListsPage)
  page(
    { dispatch }: StateContext<StateListsModel>,
    { infiniteScroll }: ActionListsPage
  ) {
    const key: TagList = this.store.selectSnapshot(StateLists.tagKey);

    return dispatch(
      key === TagListDefault.Popular
        ? new ActionCityStreamGet()
        : key === TagListDefault.Subscribed
        ? new ActionUserSubscriptionsGet()
        : new ActionUserListsGet()
    ).pipe(
      switchMap(() =>
        infiniteScroll == null ? of(null) : from(infiniteScroll.complete())
      )
    );
  }

  @Action(ActionListsSubscriptionToggle)
  subscriptionToggle(
    { dispatch, getState }: StateContext<StateListsModel>,
    { id, permanent }: ActionListsSubscriptionToggle
  ) {
    const subscription: SubscriptionPartial = StateLists.subscriptions(
      getState()
    )[id];

    return !permanent
      ? dispatch(new ActionListsSubscriptionOnOff(id, !subscription.on))
      : subscription == null
      ? dispatch(new ActionListsSubscriptionAdd(id))
      : dispatch(new ActionListsSubscriptionRemove(id));
  }

  @Action(ActionListsSubscriptionAdd)
  subscriptionAdd(
    { dispatch, getState }: StateContext<StateListsModel>,
    { id }: ActionListsSubscriptionAdd
  ) {
    const state: StateListsModel = getState();

    const subscriptions: Record<string, SubscriptionPartial> =
      StateLists.subscriptions(state);

    const data: StreamList = this.store.selectSnapshot(StateLists.dataLookup)[
      id
    ];
    const snapshot: DocumentSnapshot<StreamList> = this.store.selectSnapshot(
      StateLists.snapshotLookup
    )[id];

    subscriptions[id] = { on: true };

    data.subscriberCount += 1;

    return dispatch(new ActionCityStreamSubscriptionNew(id)).pipe(
      switchMap(() =>
        dispatch([
          new ActionListsSetSubscriptions(subscriptions, true),
          new ActionUserSubscriptionsAdd(snapshot, data)
        ])
      )
    );
  }

  @Action(ActionListsSubscriptionRemove)
  subscriptionRemove(
    { dispatch, getState }: StateContext<StateListsModel>,
    { id }: ActionListsSubscriptionRemove
  ) {
    const state: StateListsModel = getState();

    const subscriptions: Record<string, SubscriptionPartial> =
      StateLists.subscriptions(state);
    delete subscriptions[id];

    const data: StreamList = this.store.selectSnapshot(StateLists.dataLookup)[
      id
    ];
    const snapshot: DocumentSnapshot<StreamList> = this.store.selectSnapshot(
      StateLists.snapshotLookup
    )[id];

    data.subscriberCount -= 1;

    return dispatch([
      new ActionListsSetSubscriptions(subscriptions, true),
      new ActionUserSubscriptionsRemove(id)
    ]).pipe(
      takeWhile(
        () =>
          this.store.selectSnapshot(StateCityStream.childLookup())[id] != null
      ),
      switchMap(() => dispatch(new ActionCityStreamAdd(snapshot, data)))
    );
  }

  @Action(ActionListsSubscriptionOnOff)
  subscriptionOnOff(
    { dispatch, getState }: StateContext<StateListsModel>,
    { id, on }: ActionListsSubscriptionOnOff
  ) {
    const state: StateListsModel = getState();

    const subscriptions: Record<string, SubscriptionPartial> =
      StateLists.subscriptions(state);

    subscriptions[id].on = on;

    return dispatch(new ActionListsSetSubscriptions(subscriptions, true));
  }
}
