import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { filter, switchMap, take, tap } from 'rxjs/operators';

import { Collection, StreamList, SubscriptionPartial } from '@firefly/cloud';
import { ImageType } from '@theory/core';
import { ServiceStorage } from '@theory/firebase';
import { StateChild } from '@theory/ngxs';

import { ListType } from '../../../enums';
import { ServiceStreams } from '../../../services';
import { ListsFilter } from '../../composite/lists/lists.filter.model';
import {
  ActionCityStreamAdd,
  ActionCityStreamFilter,
  ActionCityStreamGet,
  ActionCityStreamGetData,
  ActionCityStreamRemove,
  ActionCityStreamReset,
  ActionCityStreamSetData,
  ActionCityStreamSubscriptionNew,
  ActionCityStreamSubscriptionsSet,
  ActionCityStreamSync
} from './city-stream.actions';
import { StateCityStreamModel } from './city-stream.state.model';
import { StateCityStreamOptions } from './city-stream.state.options';

@State<StateCityStreamModel>(StateCityStreamOptions)
@Injectable()
export class StateCityStream extends StateChild<
  StreamList,
  StateCityStreamModel
> {
  @Selector() static filter(state: StateCityStreamModel): ListsFilter {
    return state.filter;
  }
  @Selector() static type(state: StateCityStreamModel): ListType {
    return StateCityStream.filter(state).type;
  }
  @Selector() static virtual(state: StateCityStreamModel): boolean {
    return StateCityStream.filter(state).virtual;
  }
  @Selector() static subscriptions(
    state: StateCityStreamModel
  ): Record<string, SubscriptionPartial> {
    return StateCityStream.filter(state).subscriptions;
  }
  @Selector() static subscriptionsNew(
    state: StateCityStreamModel
  ): Record<string, string> {
    return state.subscriptionsNew;
  }
  @Selector() static subscriptionsSet(state: StateCityStreamModel): boolean {
    return state.subscriptionsSet;
  }
  @Selector() static cityStreamSet(state: StateCityStreamModel): boolean {
    return state.cityStreamSet;
  }

  constructor(
    service: ServiceStreams,
    storage: ServiceStorage,
    private store: Store
  ) {
    super(
      StateCityStreamOptions.defaults as StateCityStreamModel,
      {
        ActionReset: ActionCityStreamReset,
        ActionGetData: ActionCityStreamGetData,
        ActionSetData: ActionCityStreamSetData,
        ActionGet: ActionCityStreamGet,
        ActionAdd: ActionCityStreamAdd,
        ActionRemove: ActionCityStreamRemove,
        ActionSync: ActionCityStreamSync,
        ActionFilter: ActionCityStreamFilter
      },
      storage,
      service,
      Collection.Lists
    );
  }

  @Action(ActionCityStreamReset)
  public override reset(
    context: StateContext<StateCityStreamModel>,
    action: ActionCityStreamReset
  ) {
    return super.reset(context, action);
  }

  @Action(ActionCityStreamGetData)
  public override getData(
    context: StateContext<StateCityStreamModel>,
    action: ActionCityStreamGetData
  ) {
    return super.getData(context, action);
  }

  @Action(ActionCityStreamSetData)
  public override setData(
    context: StateContext<StateCityStreamModel>,
    action: ActionCityStreamSetData
  ) {
    return this.store.select(StateCityStream.subscriptionsSet).pipe(
      filter((set: boolean) => set),
      take(1),
      switchMap(() => super.setData(context, action)),
      tap(() => context.patchState({ cityStreamSet: true }))
    );
  }

  @Action(ActionCityStreamGet)
  public override get(context: StateContext<StateCityStreamModel>) {
    return super.get(context, {
      collection: Collection.Lists,
      imageType: ImageType.Image
    });
  }

  @Action(ActionCityStreamAdd)
  public override add(
    context: StateContext<StateCityStreamModel>,
    action: ActionCityStreamAdd
  ) {
    return super.add(context, action);
  }

  @Action(ActionCityStreamRemove)
  public override remove(
    context: StateContext<StateCityStreamModel>,
    action: ActionCityStreamRemove
  ) {
    return super.remove(context, action);
  }

  @Action(ActionCityStreamSync)
  public override sync(
    context: StateContext<StateCityStreamModel>,
    action: ActionCityStreamSync
  ) {
    return super.sync(context, action);
  }

  @Action(ActionCityStreamSubscriptionNew)
  subscriptionNew(
    { patchState, getState }: StateContext<StateCityStreamModel>,
    { id }: ActionCityStreamSubscriptionNew
  ) {
    const subscriptionsNew: Record<string, string> =
      StateCityStream.subscriptionsNew(getState());

    subscriptionsNew[id] = id;

    patchState({ subscriptionsNew });
  }

  @Action(ActionCityStreamSubscriptionsSet)
  subscriptionSet(
    { patchState, getState, dispatch }: StateContext<StateCityStreamModel>,
    { subscriptions }: ActionCityStreamSubscriptionsSet
  ) {
    const filter: ListsFilter = StateCityStream.filter(getState());

    filter.subscriptions = subscriptions;

    patchState({ subscriptionsSet: true });

    return dispatch(new ActionCityStreamFilter(filter));
  }

  @Action(ActionCityStreamFilter)
  public override filter(
    context: StateContext<StateCityStreamModel>,
    { filter }: ActionCityStreamFilter
  ) {
    const { patchState, getState } = context;

    filter = filter || StateCityStream.filter(getState());

    patchState({ filter });

    return super.filter(context);
  }

  public override keys(
    context: StateContext<StateCityStreamModel>
  ): Array<string> {
    const { getState } = context;

    const state: StateCityStreamModel = getState();
    const lookup: Record<string, StreamList> =
      StateCityStream.dataLookupState(state);
    const keys: Array<string> = StateCityStream.keysState(state);
    const subscriptions: Record<string, SubscriptionPartial> =
      StateCityStream.subscriptions(state);
    const subscriptionsNew: Record<string, string> =
      StateCityStream.subscriptionsNew(state);
    const virtual: boolean = StateCityStream.virtual(state);

    return keys.filter(
      (id: string) =>
        (!virtual || lookup[id]?.virtual) &&
        (!subscriptions[id]?.on || subscriptionsNew[id] != null)
    );
  }
}
