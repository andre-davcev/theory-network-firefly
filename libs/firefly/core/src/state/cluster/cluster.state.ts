import { map, switchMap, tap, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action, Selector, Select, State, StateContext, Store } from '@ngxs/store';
import { FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { StateUser } from '@firefly/core/state/user';
import { User, Cluster } from '@firefly/core/models';
import { ServiceClusters, ServiceIcons, ServiceUser } from '@firefly/core/services';
import { StateClusterModel } from './cluster.state.model';
import { StateClusterOptions } from './cluster.state.options';
import { ActionGetClusters, ActionClusterSet, ActionClusterSetId, ActionClusterCreate, ActionClusterSetIcon, ActionClusterWatch } from './cluster.actions';
import { CoreEnum, FormNgxs } from '@theory/core';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { UpdateFormValue, SetFormPristine } from '@ngxs/form-plugin';
import { ActionMapSearchResultClear } from '../../../../../mapbox';

@State<StateClusterModel>(StateClusterOptions)

export class StateCluster
{
    @Select(StateUser.user) user$:Observable<User>;

    @Selector() static clusterIconUrl(state: StateClusterModel): string
    {
        return state.iconUrl;
    }

    @Selector() static entities(state: StateClusterModel) {return state.entities;}
    @Selector() static form(state: StateClusterModel): FormNgxs {return state.form;}
    @Selector() static formGroup(state: StateClusterModel): FormGroup { return state.formGroup; }
    @Selector() static cluster(state: StateClusterModel): Cluster{return StateCluster.form(state).model;}
    @Selector() static clusters(state: StateClusterModel)      {return Object.keys(state.entities).map(id => state.entities[id]);}
    @Selector() static clustersFound(state: StateClusterModel) {return Object.keys(state.entities).length > 0;}


    @Selector() static clusterIcon(state: StateClusterModel): string
    {
      return state.iconUrl;
    }


    @Selector() static clusterIconNormalized(state: StateClusterModel): string
    {
      return state.iconUrlNormalized;
    }

    public static validateImage(store: Store): ValidatorFn
    {
        const validator: ValidatorFn = (control: AbstractControl): Record<string, any> =>
        {
            const url: string = store.selectSnapshot(StateCluster.clusterIconUrl);

            return url != null ? null : { imageUrlInvalid: true };
        };

        return validator;
    }

    constructor
    (
        private clusterService: ServiceClusters,
        private store: Store,
        private image: ServiceIcons,
        private webview: WebView,
        private icon: ServiceIcons,
        private user: ServiceUser
    ) {}

    @Action(ActionClusterSet)
    setCluster({ dispatch } : StateContext<StateClusterModel>, { payload }: ActionClusterSet)
    {
        const value: Cluster  = payload;
        const path: string ='cluster.form';

        return dispatch(new UpdateFormValue({ value, path }))

    }

    @Action(ActionClusterWatch, { cancelUncompleted: true })
    clusterWatch({ dispatch } : StateContext<StateClusterModel>, { payload }: ActionClusterWatch)
    {
        const cluster: Cluster  = payload;
        const id:    string = cluster.id;

        const cluster$: Observable<Cluster> = id === CoreEnum.IdNew ? of(cluster) : this.clusterService.valuesChanges(id).

        pipe(switchMap((c: Cluster) =>
            this.image.getDownloadUrl(c.iconId).
            pipe
            (
                switchMap((url: string) => dispatch(new ActionClusterSetIcon(url))),
                map(() => c)
            )
        ));

        return cluster$.pipe(tap((c: Cluster) => dispatch(new ActionClusterSet(c))));
    }

    @Action(ActionGetClusters)
    getClusters({ patchState } : StateContext<StateClusterModel>)
    {
        return this.user$.pipe(
            map((user:User) => user.id),
            switchMap(userId => {
                return this.clusterService
                .getClusters(userId)
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

    @Action(ActionClusterSetId)
    setClusterId({ patchState, dispatch } : StateContext<StateClusterModel>, { payload }: ActionClusterSetId)
    {
        const id    : string            = payload;
        const userId: string = this.store.selectSnapshot(StateUser.userId);
        const defaults: Cluster = StateClusterOptions.defaults.empty;
        const cluster: Cluster = id !== CoreEnum.IdNew ? undefined : this.clusterService.build(userId, defaults)

        const formGroup: FormGroup = this.clusterService.formCreate(cluster);

        patchState
        ({
            formGroup,
            iconUrl: undefined,
            iconUrlNormalized: undefined
        })

        return dispatch
        ([
          new ActionMapSearchResultClear(),
          new SetFormPristine('cluster.form'),
          new UpdateFormValue({ value: cluster, path: 'cluster.form'}),
          new ActionClusterWatch(cluster)
        ]);
    }

    @Action(ActionClusterCreate)
    create({ getState, dispatch } : StateContext<StateClusterModel>)
    {
        //console.log('set cluster' + JSON.stringify(getState().form.value));
        const state:   StateClusterModel = getState();
        const c:       Cluster           = StateCluster.cluster(state);
        const iconUrl: string            = StateCluster.clusterIcon(state);

        return this.icon.createWithUploadForCluster(c, iconUrl).
        pipe
        (
            switchMap((cluster: Cluster) => this.clusterService.create(cluster).pipe
            (
                mergeMap(() =>
                    this.user.foreignKeyUpdate(cluster.userId, this.clusterService.name, cluster.id)
                ),
                tap(() => dispatch(new ActionClusterWatch(cluster)))
            ))
        );
    }

    @Action(ActionClusterSetIcon)
    setIcon({ patchState, getState }: StateContext<StateClusterModel>, { payload }: ActionClusterSetIcon)
    {
        const iconUrl: string = payload;
        const iconUrlNormalized: string = this.webview.convertFileSrc(iconUrl);
        const formGroup: FormGroup      = StateCluster.formGroup(getState());

        this.clusterService.iconIdSet(formGroup, iconUrl);

        patchState
        ({
            iconUrl,
            iconUrlNormalized
        });
    }
}
