import { Injectable } from '@angular/core';
import { Query } from '@angular/fire/compat/firestore';
import { Action, State, StateContext, Store } from '@ngxs/store';

import { Collection, Interest } from '@firefly/cloud';
import { ServiceStorage } from '@theory/firebase';
import { StateQuery } from '@theory/ngxs';

import { ServiceInterests } from '../../../services';
import { StateUser } from '../../document/user/user.state';
import {
  ActionClusterEventsGetData,
  ActionInterestEventsAdd,
  ActionInterestEventsFilter,
  ActionInterestEventsGet,
  ActionInterestEventsRemove,
  ActionInterestEventsReset,
  ActionInterestEventsSync
} from './interest-events.actions';
import { StateInterestEventsModel } from './interest-events.state.model';
import { StateInterestEventsOptions } from './interest-events.state.options';

@State<StateInterestEventsModel>(StateInterestEventsOptions)
@Injectable()
export class StateInterestsEvents extends StateQuery<
  Interest,
  StateInterestEventsModel
> {
  constructor(
    private store: Store,
    private service: ServiceInterests,
    storage: ServiceStorage
  ) {
    super(
      StateInterestEventsOptions.defaults as StateInterestEventsModel,
      {
        ActionReset: ActionInterestEventsReset,
        ActionGetData: ActionClusterEventsGetData,
        ActionGet: ActionInterestEventsGet,
        ActionAdd: ActionInterestEventsAdd,
        ActionRemove: ActionInterestEventsRemove,
        ActionSync: ActionInterestEventsSync,
        ActionFilter: ActionInterestEventsFilter
      },
      storage
    );
  }

  @Action(ActionInterestEventsReset)
  public override reset(context: StateContext<StateInterestEventsModel>) {
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
  public override getData(context: StateContext<StateInterestEventsModel>) {
    return super.getData(context);
  }

  @Action(ActionInterestEventsGet)
  public override get(context: StateContext<StateInterestEventsModel>) {
    return super.get(context);
  }

  @Action(ActionInterestEventsAdd)
  public override add(
    context: StateContext<StateInterestEventsModel>,
    action: ActionInterestEventsAdd
  ) {
    return super.add(context, action);
  }

  @Action(ActionInterestEventsRemove)
  public override remove(
    context: StateContext<StateInterestEventsModel>,
    action: ActionInterestEventsRemove
  ) {
    return super.remove(context, action);
  }

  @Action(ActionInterestEventsSync)
  public override sync(
    context: StateContext<StateInterestEventsModel>,
    action: ActionInterestEventsSync
  ) {
    return super.sync(context, action);
  }

  @Action(ActionInterestEventsFilter)
  public override filter(
    context: StateContext<StateInterestEventsModel>,
    action: ActionInterestEventsFilter
  ) {
    return super.filter(context, action);
  }
}
