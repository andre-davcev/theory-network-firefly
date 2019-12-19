import { State, Action, StateContext, Store } from '@ngxs/store';

import { StreamCluster } from '@firefly/cloud';
import { ServiceStreams } from '@firefly/core/services';
import { StateQuery } from '@theory/ngxs';

import { StateUserStreamModel } from './user-stream.state.model';
import { StateUserStreamOptions } from './user-stream.state.options';
import {
    ActionUserStreamAdd,
    ActionUserStreamReset,
    ActionUserStreamRemove,
    ActionUserStreamGetData,
    ActionUserStreamGet,
    ActionUserStreamSync
} from './user-stream.actions';
import { StateUser } from '../../document/user';
import { Query } from '@angular/fire/firestore';

@State<StateUserStreamModel>(StateUserStreamOptions)

export class StateUserStream extends StateQuery<StreamCluster, StateUserStreamModel>
{
  constructor
  (
      private store:   Store,
      private service: ServiceStreams
  )
  {
      super
      (
          StateUserStreamOptions.defaults,
          {
              ActionReset   : ActionUserStreamReset,
              ActionGetData : ActionUserStreamGetData,
              ActionGet     : ActionUserStreamGet,
              ActionAdd     : ActionUserStreamAdd,
              ActionRemove  : ActionUserStreamRemove,
              ActionSync    : ActionUserStreamSync
          }
      );
  }

    @Action(ActionUserStreamReset)
    reset(context: StateContext<StateUserStreamModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id);
        const query:  Query  = userId == null ? undefined : this.service.collection('streams').ref.where('userId', '==', userId);

        return super.reset(context, { query });
    }

    @Action(ActionUserStreamGetData)
    getData(context: StateContext<StateUserStreamModel>)
    {
        return super.getData(context);
    }

    @Action(ActionUserStreamGet)
    get(context: StateContext<StateUserStreamModel>)
    {
        return super.get(context);
    }

    @Action(ActionUserStreamAdd)
    add(context: StateContext<StateUserStreamModel>, action: ActionUserStreamAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserStreamRemove)
    remove(context: StateContext<StateUserStreamModel>, action: ActionUserStreamRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserStreamSync)
    sync(context: StateContext<StateUserStreamModel>, action: ActionUserStreamSync)
    {
        return super.sync(context, action);
    }
}
