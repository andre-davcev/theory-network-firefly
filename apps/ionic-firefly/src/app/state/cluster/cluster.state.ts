import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action, Selector, Select, State, StateContext } from '@ngxs/store';
import { StoreOptions } from '@ngxs/store/src/symbols';
import { FormGroup } from '@angular/forms';

import { Cluster, User } from '@firefly/core';

import { StateUser } from '../user/user.state';
import { ActionGetClusters, ActionSetClusterId, ActionSetCluster } from './cluster.actions';
import { ServiceCluster } from '../../services/cluster.service';
import { FormCluster } from '../../forms/cluster.form';

export interface StateClusterModel
{
    id       : string;
    form     : FormGroup;
    entities : Record<string, Cluster>;
}

export const StateClusterOptions: StoreOptions<StateClusterModel> =
{
    name : 'cluster',

    defaults :
    {
        id       : undefined,
        form     : undefined,
        entities : {}
    }
};

@State<StateClusterModel>(StateClusterOptions)

export class StateCluster
{
    constructor(private clusterService: ServiceCluster, private formCluster: FormCluster) {}

    @Selector() static entities(state: StateClusterModel) {return state.entities;}
    @Selector() static id(state: StateClusterModel)       {return state.id;}
    @Selector() static form(state: StateClusterModel)     {return state.form;}

    @Selector() static clusters(state: StateClusterModel) {return Object.keys(state.entities).map(id => state.entities[id]);}
    @Selector() static entity(state: StateClusterModel)   {return state.entities[state.id];}

    @Select(StateUser.user) user$:Observable<User>;

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
