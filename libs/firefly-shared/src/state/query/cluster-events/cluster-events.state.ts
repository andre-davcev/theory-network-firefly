import { Injectable } from '@angular/core';
import { Query } from '@angular/fire/compat/firestore';
import { Action, State, StateContext, Store } from '@ngxs/store';

import { Collection, Interest } from '@firefly/cloud';
import { ServiceStorage } from '@theory/firebase';
import { StateQuery } from '@theory/ngxs';

import { ServiceInterests } from '../../../services';
import { StateUser } from '../../document/user/user.state';
import {
  ActionClusterEventsAdd,
  ActionClusterEventsFilter,
  ActionClusterEventsGet,
  ActionClusterEventsGetData,
  ActionClusterEventsRemove,
  ActionClusterEventsReset,
  ActionClusterEventsSync
} from './cluster-events.actions';
import { StateClusterInterestsModel } from './cluster-events.state.model';
import { StateClusterInterestsOptions } from './cluster-events.state.options';

@State<StateClusterInterestsModel>(StateClusterInterestsOptions)
@Injectable()
export class StateClusterInterests extends StateQuery<
  Interest,
  StateClusterInterestsModel
> {
  constructor(
    private store: Store,
    private service: ServiceInterests,
    storage: ServiceStorage
  ) {
    super(
      StateClusterInterestsOptions.defaults as StateClusterInterestsModel,
      {
        ActionReset: ActionClusterEventsReset,
        ActionGetData: ActionClusterEventsGetData,
        ActionGet: ActionClusterEventsGet,
        ActionAdd: ActionClusterEventsAdd,
        ActionRemove: ActionClusterEventsRemove,
        ActionSync: ActionClusterEventsSync,
        ActionFilter: ActionClusterEventsFilter
      },
      storage
    );
  }

  @Action(ActionClusterEventsReset)
  public override reset(context: StateContext<StateClusterInterestsModel>) {
    const userId: string = this.store.selectSnapshot(StateUser.id());
    const query: Query | undefined =
      userId == null
        ? undefined
        : this.service
            .collection(Collection.Interests)
            .ref.where('userId', '==', userId);

    return super.reset(context, { query });
  }

  @Action(ActionClusterEventsGetData)
  public override getData(context: StateContext<StateClusterInterestsModel>) {
    return super.getData(context);
  }

  @Action(ActionClusterEventsGet)
  public override get(context: StateContext<StateClusterInterestsModel>) {
    return super.get(context);
  }

  @Action(ActionClusterEventsAdd)
  public override add(
    context: StateContext<StateClusterInterestsModel>,
    action: ActionClusterEventsAdd
  ) {
    return super.add(context, action);
  }

  @Action(ActionClusterEventsRemove)
  public override remove(
    context: StateContext<StateClusterInterestsModel>,
    action: ActionClusterEventsRemove
  ) {
    return super.remove(context, action);
  }

  @Action(ActionClusterEventsSync)
  public override sync(
    context: StateContext<StateClusterInterestsModel>,
    action: ActionClusterEventsSync
  ) {
    return super.sync(context, action);
  }

  @Action(ActionClusterEventsFilter)
  public override filter(
    context: StateContext<StateClusterInterestsModel>,
    action: ActionClusterEventsFilter
  ) {
    return super.filter(context, action);
  }
}
