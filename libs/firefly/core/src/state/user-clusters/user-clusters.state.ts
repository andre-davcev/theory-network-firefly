import { State, Action, StateContext, Store } from '@ngxs/store';

import { Cluster } from '@firefly/core/models';
import { ServiceClusters } from '@firefly/core/services';
import { StateQuery } from '@theory/ngxs';

import { StateUserClustersModel } from './user-clusters.state.model';
import { StateUserClustersOptions } from './user-clusters.state.options';
import {
    ActionUserClustersAdd,
    ActionUserClustersRemove,
    ActionUserClustersGetData,
    ActionUserClustersGet,
    ActionUserClustersSync,
    ActionUserClustersReset
} from './user-clusters.actions';
import { StateUser } from '../user/user.state';
import { Query } from '@angular/fire/firestore';

@State<StateUserClustersModel>(StateUserClustersOptions)

export class StateUserClusters extends StateQuery<Cluster, StateUserClustersModel>
{
    constructor
    (
        private store:   Store,
        private service: ServiceClusters
    )
    {
        super
        (
            StateUserClustersOptions.defaults,
            {
                ActionReset   : ActionUserClustersReset,
                ActionGetData : ActionUserClustersGetData,
                ActionGet     : ActionUserClustersGet,
                ActionAdd     : ActionUserClustersAdd,
                ActionRemove  : ActionUserClustersRemove,
                ActionSync    : ActionUserClustersSync
            }
        );
    }

    @Action(ActionUserClustersReset)
    reset(context: StateContext<StateUserClustersModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id);
        const query: Query   = userId == null ? undefined : this.service.collection('clusters').ref.where('userId', '==', userId);

        return super.reset(context, query);
    }

    @Action(ActionUserClustersGetData)
    getData(context: StateContext<StateUserClustersModel>)
    {
        return super.getData(context);
    }

    @Action(ActionUserClustersGet)
    get(context: StateContext<StateUserClustersModel>)
    {
        return super.get(context);
    }

    @Action(ActionUserClustersAdd)
    add(context: StateContext<StateUserClustersModel>, action: ActionUserClustersAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserClustersRemove)
    remove(context: StateContext<StateUserClustersModel>, action: ActionUserClustersRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserClustersSync)
    sync(context: StateContext<StateUserClustersModel>, action: ActionUserClustersSync)
    {
        return super.sync(context, action);
    }
}
