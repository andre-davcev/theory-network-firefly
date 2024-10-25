import { Injectable } from '@angular/core';
import { Query } from '@angular/fire/compat/firestore';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Collection, List, SubscriptionPartial } from '@firefly/cloud';
import { ImageType } from '@theory/core';
import { ServiceStorage } from '@theory/firebase';
import { StateQuery } from '@theory/ngxs';

import { ListType } from '../../../enums';
import { ServiceLists } from '../../../services';
import { ListsFilter } from '../../composite/lists/lists.filter.model';
import {
  ActionAppLoadingHide,
  ActionAppLoadingShow
} from '../../document/app/app.actions';
import { StateUser } from '../../document/user/user.state';
import {
  ActionUserListsAdd,
  ActionUserListsFilter,
  ActionUserListsGet,
  ActionUserListsGetData,
  ActionUserListsRemove,
  ActionUserListsReset,
  ActionUserListsSync
} from './user-lists.actions';
import { StateUserListsModel } from './user-lists.state.model';
import { StateUserListsOptions } from './user-lists.state.options';

@State<StateUserListsModel>(StateUserListsOptions)
@Injectable()
export class StateUserLists extends StateQuery<List, StateUserListsModel> {
  @Selector() static filter(state: StateUserListsModel): ListsFilter {
    return state.filter;
  }
  @Selector() static type(state: StateUserListsModel): ListType {
    return StateUserLists.filter(state).type;
  }
  @Selector() static virtual(state: StateUserListsModel): boolean {
    return StateUserLists.filter(state).virtual;
  }
  @Selector() static subscriptions(
    state: StateUserListsModel
  ): Record<string, SubscriptionPartial> {
    return StateUserLists.filter(state).subscriptions;
  }

  constructor(
    private store: Store,
    private service: ServiceLists,
    storage: ServiceStorage
  ) {
    super(
      StateUserListsOptions.defaults as StateUserListsModel,
      {
        ActionReset: ActionUserListsReset,
        ActionGetData: ActionUserListsGetData,
        ActionGet: ActionUserListsGet,
        ActionAdd: ActionUserListsAdd,
        ActionRemove: ActionUserListsRemove,
        ActionSync: ActionUserListsSync,
        ActionFilter: ActionUserListsFilter
      },
      storage
    );
  }

  @Action(ActionUserListsReset)
  public override reset(context: StateContext<StateUserListsModel>) {
    const userId: string = this.store.selectSnapshot(StateUser.id());
    const query: Query | undefined =
      userId == null
        ? undefined
        : this.service
            .collection(Collection.Lists)
            .ref.where('userId', '==', userId);

    return super.reset(context, { query });
  }

  @Action(ActionUserListsGetData)
  public override getData(context: StateContext<StateUserListsModel>) {
    return super.getData(context);
  }

  @Action(ActionUserListsGet)
  public override get(context: StateContext<StateUserListsModel>) {
    return super.get(context, {
      collection: Collection.Lists,
      imageType: ImageType.Image
    });
  }

  @Action(ActionUserListsAdd)
  public override add(
    context: StateContext<StateUserListsModel>,
    action: ActionUserListsAdd
  ) {
    return super.add(context, action);
  }

  @Action(ActionUserListsRemove)
  public override remove(
    context: StateContext<StateUserListsModel>,
    action: ActionUserListsRemove
  ) {
    return super.remove(context, action);
  }

  @Action(ActionUserListsSync)
  public override sync(
    context: StateContext<StateUserListsModel>,
    action: ActionUserListsSync
  ) {
    return super.sync(context, action);
  }

  @Action(ActionUserListsFilter)
  public override filter(
    context: StateContext<StateUserListsModel>,
    { filter }: ActionUserListsFilter
  ) {
    const { dispatch, getState, patchState } = context;

    const state: StateUserListsModel = getState();

    filter = filter || StateUserLists.filter(state);

    patchState({ filter });

    const initialized: boolean = StateUserLists.initializedState(state);

    const action$: Observable<any> = initialized
      ? of(null)
      : dispatch(new ActionAppLoadingShow()).pipe(
          switchMap(() => dispatch(new ActionUserListsGetData())),
          switchMap(() => dispatch(new ActionAppLoadingHide()))
        );

    return action$.pipe(switchMap(() => super.filter(context)));
  }
}
