import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action, Selector, Select, State, StateContext } from '@ngxs/store';
import { FormGroup } from '@angular/forms';

import { StateUser } from '../user/user.state';
import { GetClusters, SetClusterId, SetCluster } from './cluster.actions';
import { Cluster } from '../../models/cluster.model';
import { ServiceCluster } from '../../services/cluster.service';
import { FormCluster } from '../../forms/cluster.form';
import { User } from '../../models/user.model';

export interface StateClusterModel
{
    id       : string;
    form     : FormGroup;
    entities : Record<string, Cluster>;
}

@State<StateClusterModel>
({
    name : 'cluster',

    defaults :
    {
        id       : undefined,
        form     : undefined,
        entities : {}
    }
})


export class StateCluster
{
    constructor(private clusterService: ServiceCluster, private formCluster: FormCluster) {}

    @Selector() static entities(state: StateClusterModel) {return state.entities;}
    @Selector() static id(state: StateClusterModel)       {return state.id;}
    @Selector() static form(state: StateClusterModel)     {return state.form;}

    @Selector() static clusters(state: StateClusterModel) {return Object.keys(state.entities).map(id => state.entities[id]);}
    @Selector() static entity(state: StateClusterModel)   {return state.entities[state.id];}

    @Select(StateUser.user) user$:Observable<User>;

    @Action(GetClusters)
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

    @Action(SetClusterId)
    setClusterId({patchState, getState} : StateContext<StateClusterModel>, { payload }: SetClusterId)
    {
        const id    : string            = payload;
        const state : StateClusterModel = getState();

        patchState
        ({
            id,
            form: id === 'new' ? this.formCluster.build() : this.formCluster.build(state.entities[id])
        });
    }

    @Action(SetCluster)
    setCluster({patchState, dispatch} : StateContext<StateClusterModel>, { payload }: SetCluster)
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
