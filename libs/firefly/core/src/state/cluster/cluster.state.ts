import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action, Selector, Select, State, StateContext } from '@ngxs/store';

import { StateUser } from '@firefly/core/state/user';
import { User, Cluster } from '@firefly/core/models';
import { ServiceCluster } from '@firefly/core/services';
import { FormCluster } from '@firefly/core/forms';
import { StateClusterModel } from './cluster.state.model';
import { StateClusterOptions } from './cluster.state.options';
import { ActionGetClusters, ActionSetClusterId, ActionSetCluster } from './cluster.actions';

@State<StateClusterModel>(StateClusterOptions)

export class StateCluster
{
    @Select(StateUser.user) user$:Observable<User>;

    constructor(private clusterService: ServiceCluster, private formCluster: FormCluster) {}

    @Selector() static entities(state: StateClusterModel) {return state.entities;}
    @Selector() static id(state: StateClusterModel)       {return state.id;}
    @Selector() static form(state: StateClusterModel)     {return state.form;}

    @Selector() static clusters(state: StateClusterModel) {return Object.keys(state.entities).map(id => state.entities[id]);}
    @Selector() static entity(state: StateClusterModel)   {return state.entities[state.id];}

    @Action(ActionGetClusters)
    getClusters({ patchState } : StateContext<StateClusterModel>)
    {
        return this.user$.pipe(
            map((user:User) => user.uidInternal),
            switchMap(uidInternal => {
                return this.clusterService
                .getClusters(uidInternal)
                .pipe(
                    map((clusters:Cluster[]) => {
                        const entities: Record<number, Cluster> = {};
                        for(const cluster of clusters){
                            entities[cluster.id] = cluster;
                        }

                        patchState({
                            entities
                        });
                    })
                )
            })
        )
    }

    @Action(ActionSetClusterId)
    setClusterId({patchState, getState} : StateContext<StateClusterModel>, { payload }: ActionSetClusterId)
    {
        const id    : string            = payload;
        const state : StateClusterModel = getState();

        patchState
        ({
            id,
            form: id === 'new' ? this.formCluster.build() : this.formCluster.build(state.entities[id])
        });
    }

    @Action(ActionSetCluster)
    setCluster({patchState, dispatch} : StateContext<StateClusterModel>, { payload }: ActionSetCluster)
    {
        return this.clusterService
        .setCluster(payload)
        .pipe(
            map((cluster:Cluster) =>
            {
                const entities: Record<number, Cluster> = {};
                entities[cluster.id] = cluster;

                patchState({entities});
            })
        )
    }
}
