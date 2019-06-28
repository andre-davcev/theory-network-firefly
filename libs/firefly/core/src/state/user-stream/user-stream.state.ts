import { State, Selector, Select, Action, StateContext } from '@ngxs/store';
import { tap, map, filter, switchMap } from 'rxjs/operators';

import { StateUserStreamOptions } from './user-stream.state.options';
import { StateUserStreamModel } from './user-stream.state.model';
import { StateUser } from '../user';
import { Observable, of } from 'rxjs';
import { Cluster, Stream, UserStream } from '@firefly/core/models';
import { ActionUserStreamGet, ActionUserStreamWatch, ActionUserStreamPage } from './user-stream.actions';
import { ServiceUserStream, ServiceCluster } from '@firefly/core/services';
import { CoreUtil } from '@theory/core/utils';
import { StateClusterOptions } from '../cluster';


@State<StateUserStreamModel>(StateUserStreamOptions)

export class StateUserStream
{
    @Select(StateUser.userId) userId$: Observable<string>;

    @Selector() static watching(state: StateUserStreamModel): boolean        { return state.watching; }
    @Selector() static loading(state: StateUserStreamModel):  boolean        { return state.loading; }
    @Selector() static data(state: StateUserStreamModel):     UserStream     { return state.data; }
    @Selector() static clusters(state: StateUserStreamModel): Array<Cluster> { return state.clusters; }
    @Selector() static pageSize(state: StateUserStreamModel): number         { return state.pageSize; }
    @Selector() static page(state: StateUserStreamModel):     number         { return state.page; }

    @Selector() static map(state: StateUserStreamModel): Array<string>
    {
        const data: UserStream = StateUserStream.data(state);

        return data == null ? [] : data.data;
    }
    @Selector() static count(state: StateUserStreamModel): number { return StateUserStream.map(state).length; }
    @Selector() static stream(state: StateUserStreamModel): Array<Stream>
    {
        return StateUserStream.
            clusters(state).
            filter((cluster: Cluster) =>
                cluster.subscribers[cluster.id] == null
            ).
            map((item: Cluster, index: number) =>
            ({
                ...item,
                index:           index,
                subscribed:      false,
                subscribedCount: Object.keys(item.subscribers).length
            }));
    }

    constructor
    (
        private service: ServiceUserStream,
        private cluster: ServiceCluster
    ) { }

    @Action(ActionUserStreamGet)
    get({ patchState, getState, dispatch }: StateContext<StateUserStreamModel>)
    {
        const watching: boolean = StateUserStream.watching(getState());

        patchState({ watching: true });

        return watching ? of() : dispatch(new ActionUserStreamWatch());
    }

    @Action(ActionUserStreamWatch, { cancelUncompleted: true })
    watch({ patchState, dispatch }: StateContext<StateUserStreamModel>)
    {
        return this.userId$.
        pipe
        (
            filter((userId: string) => userId != null),
            tap(() => patchState({ loading: true })),
            switchMap((userId: string) => this.service.valuesChanges(userId)),
            tap((data: UserStream) =>
                patchState
                ({
                    data,
                    page:     StateUserStreamOptions.defaults.page,
                    clusters: []
                })
            ),
            switchMap(() =>
                dispatch(new ActionUserStreamPage())
            ),
            tap(() => patchState({ loading: false }))
        );
    }

    @Action(ActionUserStreamPage)
    page({ patchState, getState }: StateContext<StateUserStreamModel>)
    {
        const empty:      Cluster                = StateClusterOptions.defaults.empty;
        const state:      StateUserStreamModel   = getState();
        const data:       Array<string>          = StateUserStream.map(state);
        const clusters:   Array<Cluster>         = StateUserStream.clusters(state);
        const pageSize:   number                 = StateUserStream.pageSize(state);
        const pageNumber: number                 = StateUserStream.page(state);

        const slice: Array<string> = CoreUtil.page<string>(data, clusters, pageSize, pageNumber);

        return slice.length === 0 ? of() :
            of(slice).
            pipe
            (
                tap(() => patchState({ paging: true })),
                switchMap((page: Array<string>) => this.cluster.snapshotFK(slice)),
                map((page: Array<Cluster>) =>
                    page.
                    map((item: Cluster) =>
                        ({
                            ...CoreUtil.clone<Cluster>(empty),
                            ...item
                        })
                    )
                ),
                tap((page: Array<Cluster>) =>
                    patchState
                    ({
                        page: pageNumber + 1,
                        paging: false,
                        clusters:
                        [
                            ...clusters,
                            ...page
                        ]
                    })
                )
            );
    }
}
