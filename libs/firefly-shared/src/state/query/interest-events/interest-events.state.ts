import { Injectable } from '@angular/core';
import { Query } from '@angular/fire/compat/firestore';
import { Action, State, StateContext, Store } from '@ngxs/store';

import { Collection, List } from '@firefly/cloud';
import { ServiceStorage } from '@theory/firebase';
import { StateQuery } from '@theory/ngxs';

import { ServiceLists } from '../../../services';
import { StateUser } from '../../document/user/user.state';
import {
  ActionClusterEventsGetData,
  ActionListEventsAdd,
  ActionListEventsFilter,
  ActionListEventsGet,
  ActionListEventsRemove,
  ActionListEventsReset,
  ActionListEventsSync
} from './list-events.actions';
import { StateListEventsModel } from './list-events.state.model';
import { StateListEventsOptions } from './list-events.state.options';

@State<StateListEventsModel>(StateListEventsOptions)
@Injectable()
export class StateListsEvents extends StateQuery<List, StateListEventsModel> {
  constructor(
    private store: Store,
    private service: ServiceLists,
    storage: ServiceStorage
  ) {
    super(
      StateListEventsOptions.defaults as StateListEventsModel,
      {
        ActionReset: ActionListEventsReset,
        ActionGetData: ActionClusterEventsGetData,
        ActionGet: ActionListEventsGet,
        ActionAdd: ActionListEventsAdd,
        ActionRemove: ActionListEventsRemove,
        ActionSync: ActionListEventsSync,
        ActionFilter: ActionListEventsFilter
      },
      storage
    );
  }

  @Action(ActionListEventsReset)
  public override reset(context: StateContext<StateListEventsModel>) {
    const userId: string = this.store.selectSnapshot(StateUser.id());
    const query: Query | undefined =
      userId == null
        ? undefined
        : this.service
            .collection(Collection.Lists)
            .ref.where('userId', '==', userId);

    return super.reset(context, { query });
  }

  @Action(ActionClusterEventsGetData)
  public override getData(context: StateContext<StateListEventsModel>) {
    return super.getData(context);
  }

  @Action(ActionListEventsGet)
  public override get(context: StateContext<StateListEventsModel>) {
    return super.get(context);
  }

  @Action(ActionListEventsAdd)
  public override add(
    context: StateContext<StateListEventsModel>,
    action: ActionListEventsAdd
  ) {
    return super.add(context, action);
  }

  @Action(ActionListEventsRemove)
  public override remove(
    context: StateContext<StateListEventsModel>,
    action: ActionListEventsRemove
  ) {
    return super.remove(context, action);
  }

  @Action(ActionListEventsSync)
  public override sync(
    context: StateContext<StateListEventsModel>,
    action: ActionListEventsSync
  ) {
    return super.sync(context, action);
  }

  @Action(ActionListEventsFilter)
  public override filter(
    context: StateContext<StateListEventsModel>,
    action: ActionListEventsFilter
  ) {
    return super.filter(context, action);
  }
}
