import { Cluster } from "../../models/cluster";
import { Injectable } from "@angular/core";
//import { ClusterService } from "../../services/services.cluster";
import { catchError, map, switchMap, tap} from "rxjs/operators";
import { of } from "rxjs/observable/of";
import * as clusterServiceFrom from "../../services/services.cluster"
import { Observable } from "rxjs/Observable";
import { State, StateContext } from "@ngxs/store";
import { Action } from "@ngxs/store";
import { Selector } from "@ngxs/store";
import { StateUser } from "../user.state";
import { Select } from "@ngxs/store";
import { User } from "../../models/user";

export class GetClusters {}
export class SetCluster  {constructor(public payload: Cluster) {}}

export interface StateClusterModel
{
    entities: {[id: string]: Cluster};
}

@State<StateClusterModel>
({
    name : 'cluster',

    defaults :
    {
        entities : {}
    }
})


export class StateCluster 
{
    constructor(
        private clusterService: clusterServiceFrom.ClusterService
    ){}

    @Selector() static entities(state: StateClusterModel) {return state.entities;}
    @Select(StateUser.user) user$:Observable<User>;

    @Action(GetClusters)
    getClusters({ patchState, dispatch} : StateContext<StateClusterModel>)
    {       
        return this.user$.pipe(
            map((user:User) => user.uidInternal),
            switchMap(uidInternal => {
                return this.clusterService
                .getClusters(uidInternal)
                .pipe(
                    map((clusters:Cluster[]) => {
                        const entities:{ [id: number]: Cluster } = {};
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
    
    @Action(SetCluster)
    setCluster({patchState, dispatch} : StateContext<StateClusterModel>, { payload }: SetCluster)
    {
        return this.clusterService
        .setCluster(payload)
        .pipe( 
            map((cluster:Cluster) => {
                const entities:{ [id: number]: Cluster } = {};
                entities[cluster.id] = cluster;

                patchState({
                        entities
                    });
            })
        )
    }
}