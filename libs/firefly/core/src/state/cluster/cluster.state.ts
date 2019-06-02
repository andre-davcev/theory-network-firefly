import { map, switchMap, tap, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action, Selector, Select, State, StateContext, Store } from '@ngxs/store';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { StateUser } from '@firefly/core/state/user';
import { User, Cluster, AssetKey, ClusterKey } from '@firefly/core/models';
import { ServiceCluster, ServiceIcon, ServiceUser, ServiceImage } from '@firefly/core/services';
import { FormCluster } from '@firefly/core/forms';
import { StateClusterModel } from './cluster.state.model';
import { StateClusterOptions } from './cluster.state.options';
import { ActionGetClusters, ActionClusterSet, ActionClusterSetId, ActionClusterCreate, ActionClusterSetIcon, ActionClusterWatch } from './cluster.actions';
import { ModelKey } from '@theory/firebase';
import { ValidatorsExtended, CoreEnum, DateUtil } from '@theory/core';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { SelectFactory } from '@ngxs/store/src/decorators/select';

@State<StateClusterModel>(StateClusterOptions)

export class StateCluster
{
    @Select(StateUser.user) user$:Observable<User>;

    @Selector() static clusterIconUrl(state: StateClusterModel): string
    {
        return state.iconUrl;
    }

    @Selector() static entities(state: StateClusterModel) {return state.entities;}
    //@Selector() static id(state: StateClusterModel)       {return state.id;}
    @Selector() static form(state: StateClusterModel)     {return state.form;}

    @Selector() static cluster(state: StateClusterModel): Cluster
    {
      return state.form == null ? undefined : state.form.value;
    }

    @Selector() static clusters(state: StateClusterModel)      {return Object.keys(state.entities).map(id => state.entities[id]);}
    @Selector() static clustersFound(state: StateClusterModel) {return Object.keys(state.entities).length > 0;}
    //@Selector() static entity(state: StateClusterModel)        {return state.entities[state.id];}

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
        private clusterService: ServiceCluster,
        private formCluster:    FormCluster,
        private formBuilder:    FormBuilder,
        private store: Store,
        private image: ServiceIcon,
        private webview: WebView,
        private icon: ServiceIcon,
        private user: ServiceUser
    ) {}

    @Action(ActionClusterSet)
    setCluster({ patchState } : StateContext<StateClusterModel>, { payload }: ActionClusterSet)
    {
        const cluster: Cluster  = payload;
        const id:    string = event[ModelKey.Id];

        const form: FormGroup = this.formBuilder.group
        ({
            [ModelKey.Id]          : id,
            [ModelKey.DateCreated] : cluster[ModelKey.DateCreated],
            [ModelKey.DateUpdated] : cluster[ModelKey.DateUpdated],

            [AssetKey.UserId]      : cluster[AssetKey.UserId],
            [AssetKey.Name]        : [cluster[AssetKey.Name],        [Validators.required, ValidatorsExtended.minLength(1)]],
            [AssetKey.Description] : [cluster[AssetKey.Description], [Validators.required, ValidatorsExtended.minLength(1)]],
            [AssetKey.Private]     : cluster[AssetKey.Private],
            [AssetKey.Draft]       : cluster[AssetKey.Draft],

            [ClusterKey.Tagline]   : [cluster[ClusterKey.Tagline], ValidatorsExtended.minLength(1)],
            [ClusterKey.IconId]   : [cluster[ClusterKey.IconId], [StateCluster.validateImage(this.store)]]
        });

        patchState({ form });
    }

    @Action(ActionClusterWatch, { cancelUncompleted: true })
    clusterWatch({ dispatch } : StateContext<StateClusterModel>, { payload }: ActionClusterWatch)
    {
        const cluster: Cluster  = payload;
        const id:    string = cluster[ModelKey.Id];

        const cluster$: Observable<Cluster> = id === CoreEnum.IdNew ? of(cluster) : this.clusterService.valuesChanges(id).

        pipe(switchMap((c: Cluster) =>
            this.image.getDownloadUrl(c[ClusterKey.IconId]).
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
            map((user:User) => user[ModelKey.Id]),
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
    setClusterId({ dispatch } : StateContext<StateClusterModel>, { payload }: ActionClusterSetId)
    {
        const id    : string            = payload;
        const isNew: boolean = id === CoreEnum.IdNew;
        const userId: string = this.store.selectSnapshot(StateUser.userId);

        const cluster: Cluster = !isNew ? undefined :
        {
            ...this.clusterService.clone(StateClusterOptions.defaults.empty),
            [ModelKey.Id]: id,
            [AssetKey.UserId]: userId
        };

        return dispatch(new ActionClusterWatch(cluster));

        /*patchState
        ({
            id,
            form: id === 'new' ? this.formCluster.build() : this.formCluster.build(state.entities[id])
        });*/
    }

    @Action(ActionClusterCreate)
    create({ getState, dispatch } : StateContext<StateClusterModel>)
    {
        console.log('set cluster' + JSON.stringify(getState().form.value));
        const state:   StateClusterModel = getState();
        const c:       Cluster           = StateCluster.cluster(state);
        const iconUrl: string            = StateCluster.clusterIcon(state);
       /* return this.clusterService
        .setCluster(getState().form.value)
        .pipe(
            map((cluster:Cluster) =>
            {
                const entities: Record<number, Cluster> = {};
                entities[cluster.id] = cluster;

                patchState({entities});
            })
        )*/

        return this.icon.createWithUploadForCluster(c, iconUrl).
        pipe
        (
            switchMap((cluster: Cluster) => this.clusterService.create(cluster).pipe
            (
                mergeMap(() =>
                    this.user.foreignKeyUpdate(cluster[AssetKey.UserId], this.clusterService.name, cluster[ModelKey.Id])
                ),
                tap(() => dispatch(new ActionClusterWatch(cluster)))
            ))
        );
    }

    @Action(ActionClusterSetIcon)
    setIconIndex({ patchState, getState }: StateContext<StateClusterModel>, { payload }: ActionClusterSetIcon)
    {
        const iconUrl: string = payload;
        const iconUrlNormalized: string = this.webview.convertFileSrc(iconUrl);

        patchState
        ({
            iconUrl,
            iconUrlNormalized
        });

        StateCluster.form(getState()).controls[ClusterKey.IconId].updateValueAndValidity();
    }

}
