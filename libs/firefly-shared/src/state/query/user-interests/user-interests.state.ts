import { Injectable } from '@angular/core';
import { Query } from '@angular/fire/compat/firestore';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Collection, Interest, SubscriptionPartial } from '@firefly/cloud';
import { ImageType } from '@theory/core';
import { ServiceStorage } from '@theory/firebase';
import { StateQuery } from '@theory/ngxs';

import { InterestType } from '../../../enums';
import { ServiceInterests } from '../../../services';
import { InterestsFilter } from '../../composite/interests/interests.filter.model';
import {
  ActionAppLoadingHide,
  ActionAppLoadingShow
} from '../../document/app/app.actions';
import { StateUser } from '../../document/user/user.state';
import {
  ActionUserInterestsAdd,
  ActionUserInterestsFilter,
  ActionUserInterestsGet,
  ActionUserInterestsGetData,
  ActionUserInterestsRemove,
  ActionUserInterestsReset,
  ActionUserInterestsSync
} from './user-interests.actions';
import { StateUserInterestsModel } from './user-interests.state.model';
import { StateUserInterestsOptions } from './user-interests.state.options';

@State<StateUserInterestsModel>(StateUserInterestsOptions)
@Injectable()
export class StateUserInterests extends StateQuery<
  Interest,
  StateUserInterestsModel
> {
  @Selector() static filter(state: StateUserInterestsModel): InterestsFilter {
    return state.filter;
  }
  @Selector() static type(state: StateUserInterestsModel): InterestType {
    return StateUserInterests.filter(state).type;
  }
  @Selector() static virtual(state: StateUserInterestsModel): boolean {
    return StateUserInterests.filter(state).virtual;
  }
  @Selector() static subscriptions(
    state: StateUserInterestsModel
  ): Record<string, SubscriptionPartial> {
    return StateUserInterests.filter(state).subscriptions;
  }

  constructor(
    private store: Store,
    private service: ServiceInterests,
    storage: ServiceStorage
  ) {
    super(
      StateUserInterestsOptions.defaults,
      {
        ActionReset: ActionUserInterestsReset,
        ActionGetData: ActionUserInterestsGetData,
        ActionGet: ActionUserInterestsGet,
        ActionAdd: ActionUserInterestsAdd,
        ActionRemove: ActionUserInterestsRemove,
        ActionSync: ActionUserInterestsSync,
        ActionFilter: ActionUserInterestsFilter
      },
      storage
    );
  }

  @Action(ActionUserInterestsReset)
  reset(context: StateContext<StateUserInterestsModel>) {
    const userId: string = this.store.selectSnapshot(StateUser.id());
    const query: Query =
      userId == null
        ? undefined
        : this.service
            .collection(Collection.Interests)
            .ref.where('userId', '==', userId);

    return super.reset(context, { query });
  }

  @Action(ActionUserInterestsGetData)
  getData(context: StateContext<StateUserInterestsModel>) {
    return super.getData(context);
  }

  @Action(ActionUserInterestsGet)
  get(context: StateContext<StateUserInterestsModel>) {
    return super.get(context, {
      collection: Collection.Interests,
      imageType: ImageType.Image
    });
  }

  @Action(ActionUserInterestsAdd)
  add(
    context: StateContext<StateUserInterestsModel>,
    action: ActionUserInterestsAdd
  ) {
    return super.add(context, action);
  }

  @Action(ActionUserInterestsRemove)
  remove(
    context: StateContext<StateUserInterestsModel>,
    action: ActionUserInterestsRemove
  ) {
    return super.remove(context, action);
  }

  @Action(ActionUserInterestsSync)
  sync(
    context: StateContext<StateUserInterestsModel>,
    action: ActionUserInterestsSync
  ) {
    return super.sync(context, action);
  }

  @Action(ActionUserInterestsFilter)
  filter(
    context: StateContext<StateUserInterestsModel>,
    { filter }: ActionUserInterestsFilter
  ) {
    const { dispatch, getState, patchState } = context;

    const state: StateUserInterestsModel = getState();

    filter = filter || StateUserInterests.filter(state);

    patchState({ filter });

    const initialized: boolean = StateUserInterests.initializedState(state);

    const action$: Observable<any> = initialized
      ? of(null)
      : dispatch(new ActionAppLoadingShow()).pipe(
          switchMap(() => dispatch(new ActionUserInterestsGetData())),
          switchMap(() => dispatch(new ActionAppLoadingHide()))
        );

    return action$.pipe(switchMap(() => super.filter(context)));
  }
}
