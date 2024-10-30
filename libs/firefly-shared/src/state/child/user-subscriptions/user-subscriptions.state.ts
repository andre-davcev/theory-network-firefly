import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { switchMap } from 'rxjs/operators';

import {
  Collection,
  StreamList,
  Subscription,
  SubscriptionPartial
} from '@firefly/cloud';
import { ImageType } from '@theory/core';
import { ServiceStorage } from '@theory/firebase';
import { StateChild } from '@theory/ngxs';

import { ServiceSubscriptions } from '../../../services';
import { ListsFilter } from '../../composite/lists/lists.filter.model';
import {
  ActionAppLoadingHide,
  ActionAppLoadingShow
} from '../../document/app/app.actions';
import {
  ActionUserSubscriptionsAdd,
  ActionUserSubscriptionsFilter,
  ActionUserSubscriptionsGet,
  ActionUserSubscriptionsGetData,
  ActionUserSubscriptionsRemove,
  ActionUserSubscriptionsReset,
  ActionUserSubscriptionsSetData,
  ActionUserSubscriptionsSync
} from './user-subscriptions.actions';
import { StateUserSubscriptionsModel } from './user-subscriptions.state.model';
import { StateUserSubscriptionsOptions } from './user-subscriptions.state.options';

@State<StateUserSubscriptionsModel>(StateUserSubscriptionsOptions)
@Injectable()
export class StateUserSubscriptions extends StateChild<
  Subscription,
  StateUserSubscriptionsModel
> {
  @Selector([StateUserSubscriptions]) static filter(
    state: StateUserSubscriptionsModel
  ): ListsFilter {
    return state.filter;
  }
  @Selector([StateUserSubscriptions.filter]) static virtual(
    filter: ListsFilter
  ): boolean {
    return filter.virtual;
  }
  @Selector([StateUserSubscriptions.filter]) static subscriptions(
    filter: ListsFilter
  ): Record<string, SubscriptionPartial> {
    return filter.subscriptions;
  }

  constructor(
    service: ServiceSubscriptions,
    storage: ServiceStorage,
    private store: Store
  ) {
    super(
      StateUserSubscriptionsOptions.defaults as StateUserSubscriptionsModel,
      {
        ActionReset: ActionUserSubscriptionsReset,
        ActionGetData: ActionUserSubscriptionsGetData,
        ActionSetData: ActionUserSubscriptionsSetData,
        ActionGet: ActionUserSubscriptionsGet,
        ActionAdd: ActionUserSubscriptionsAdd,
        ActionRemove: ActionUserSubscriptionsRemove,
        ActionSync: ActionUserSubscriptionsSync,
        ActionFilter: ActionUserSubscriptionsFilter
      },
      storage,
      service,
      Collection.Lists
    );
  }

  @Action(ActionUserSubscriptionsReset)
  public override reset(
    context: StateContext<StateUserSubscriptionsModel>,
    action: ActionUserSubscriptionsReset
  ) {
    return super.reset(context, action);
  }

  @Action(ActionUserSubscriptionsGetData)
  public override getData(
    context: StateContext<StateUserSubscriptionsModel>,
    action: ActionUserSubscriptionsGetData
  ) {
    return super.getData(context, action);
  }

  @Action(ActionUserSubscriptionsSetData)
  public override setData(
    context: StateContext<StateUserSubscriptionsModel>,
    action: ActionUserSubscriptionsSetData
  ) {
    return super.setData(context, action);
  }

  @Action(ActionUserSubscriptionsGet)
  public override get(context: StateContext<StateUserSubscriptionsModel>) {
    return super.get(context, {
      collection: Collection.Lists,
      imageType: ImageType.Image
    });
  }

  @Action(ActionUserSubscriptionsAdd)
  public override add(
    context: StateContext<StateUserSubscriptionsModel>,
    action: ActionUserSubscriptionsAdd
  ) {
    return super.add(context, action);
  }

  @Action(ActionUserSubscriptionsRemove)
  public override remove(
    context: StateContext<StateUserSubscriptionsModel>,
    action: ActionUserSubscriptionsRemove
  ) {
    return super.remove(context, action);
  }

  @Action(ActionUserSubscriptionsSync)
  public override sync(
    context: StateContext<StateUserSubscriptionsModel>,
    action: ActionUserSubscriptionsSync
  ) {
    return super.sync(context, action);
  }

  @Action(ActionUserSubscriptionsFilter)
  public override filter(
    context: StateContext<StateUserSubscriptionsModel>,
    { filter }: ActionUserSubscriptionsFilter
  ) {
    const { patchState, dispatch, getState } = context;

    const state: StateUserSubscriptionsModel = getState();

    filter = filter || StateUserSubscriptions.filter(state);

    patchState({ filter });

    const initialized: boolean = StateUserSubscriptions.initializedState(state);
    const subscriptions: Record<string, SubscriptionPartial> =
      filter.subscriptions;

    return initialized
      ? super.filter(context)
      : dispatch(new ActionAppLoadingShow()).pipe(
          switchMap(() =>
            dispatch(new ActionUserSubscriptionsSetData(subscriptions, true))
          ),
          switchMap(() => dispatch(new ActionAppLoadingHide()))
        );
  }

  public override keys(
    context: StateContext<StateUserSubscriptionsModel>
  ): Array<string> {
    const { getState } = context;

    const state: StateUserSubscriptionsModel = getState();
    const lookup: Record<string, StreamList> =
      StateUserSubscriptions.dataLookupState(state);
    const keys: Array<string> = StateUserSubscriptions.keysState(state);
    const subscriptions: Record<string, SubscriptionPartial> =
      this.store.selectSnapshot(StateUserSubscriptions.subscriptions);
    const virtual: boolean = this.store.selectSnapshot(
      StateUserSubscriptions.virtual
    );

    return keys.filter(
      (id: string) =>
        (!virtual || lookup[id]?.virtual) && subscriptions[id] != null
    );
  }
}
