import { User as FirebaseUser } from 'firebase/app';

import { State, Selector, Action, StateContext, Select, NgxsOnInit} from '@ngxs/store';
import { Observable, of, from, combineLatest, forkJoin } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { ModelKey } from '@theory/firebase';
import { StateLanguage, ActionLanguageSet } from '@theory/capacitor';

import { User, UserKey, Cluster } from '@firefly/core/models';
import { ActionAlertsGet } from '@firefly/core/state/alert';
import { StateUserModel } from './user.state.model';
import { StateUserOptions } from './user.state.options';
import { ActionUserAuthenticate, ActionUserWatch, ActionUserAuthenticateCheck, ActionUserAddToken, ActionLoginEmail, ActionUserLogout, ActionUserWatchLanguage, ActionUserWatchClusters } from './user.actions';
import { ServiceUser, ServiceCluster, ServiceImage } from '@firefly/core/services';
import { AngularFireStorage } from '@angular/fire/storage';

@State<StateUserModel>(StateUserOptions)
export class StateUser implements NgxsOnInit
{
    constructor
    (
        private fireAuth: AngularFireAuth,
        private service: ServiceUser,
        private cluster: ServiceCluster,
        private image:   ServiceImage,
        private storage: AngularFireStorage
    ) { }

    @Select(StateLanguage.language) language$: Observable<string>;
    @Select(StateUser.user)         user$:     Observable<User>;

    @Selector() static authData(state: StateUserModel): FirebaseUser              {return state.authData;}
    @Selector() static user(state: StateUserModel): User                          {return state.user;}
    @Selector() static authenticated(state: StateUserModel): boolean              {return state.authenticated;}
    @Selector() static authenticating(state: StateUserModel): boolean             {return state.authenticating;}
    @Selector() static loading(state: StateUserModel): boolean                    {return state.authenticating || state.initializing;}
    @Selector() static loadedNotAuthenticated(state: StateUserModel):boolean      {return !StateUser.loading(state) && !StateUser.authenticated(state);}
    @Selector() static error(state: StateUserModel): Error                        {return state.error;}
    @Selector() static clusterMap(state: StateUserModel): Record<string, Cluster> { return state.clusters;}
    @Selector() static errored(state: StateUserModel)                             {return state.error != null;}
    @Selector() static userFound(state: StateUserModel)                           {return state.user != null;}

    @Selector() static userId(state: StateUserModel): string
    {
        const user: User = StateUser.user(state);

        return user == null ? undefined : user[ModelKey.Id];
    }

    @Selector() static clusters(state: StateUserModel): Array<Cluster>
    {
        const clusters: Record<string, Cluster> = StateUser.clusterMap(state);

        return Object.keys(clusters).map(((id: string) => clusters[id]));
    }

    @Selector() static clustersFound(state: StateUserModel): boolean
    {
        return Object.keys(StateUser.clusterMap(state)).length > 0;
    }

    ngxsOnInit(context: StateContext<StateUserModel>)
    {
        context.dispatch
        ([
            new ActionUserWatchLanguage(),
            new ActionUserAuthenticate()
        ]);
    }

    @Action(ActionUserAuthenticate)
    userAuthenticate({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        patchState({ authenticating: true, initializing: true });

        return this.fireAuth.authState.pipe
        (
            take(1),
            tap((authData: FirebaseUser) => patchState({ authData, authenticating: false, authenticated: authData != null })),
            switchMap((authData: FirebaseUser) => authData == null ? of() : dispatch(new ActionUserWatch(this.service.parseId(authData)))),
            tap(() => patchState({ initializing: false })),
            catchError((error: Error) => of(patchState({error, authenticating: false, initializing: false})))
        );
    }

    @Action(ActionUserAuthenticateCheck)
    userAuthenticateCheck({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: ActionUserAuthenticateCheck)
    {
        return of(payload).
        pipe
        (
            filter((authData: FirebaseUser) =>
            {
                const authenticated: boolean = authData != null;

                patchState
                ({
                    authData,
                    user: undefined,
                    authenticated,
                    authenticating: authenticated,
                    error: authenticated ? undefined : { name: 'Failed Login', message: 'Unable to login' }
                });

                return authenticated;
            }),

            switchMap((authData: FirebaseUser) => dispatch(new ActionUserWatch(this.service.parseId(authData)))),
            tap(() => patchState({ authenticated: false }))
        );
    }

    @Action(ActionUserWatch, { cancelUncompleted: true })
    userWatch({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: ActionUserWatch)
    {
        return this.service.valuesChanges(payload).pipe
        (
            filter((user: User) => user != null),
            map((user: User) =>
            {
                const empty: User = JSON.parse(JSON.stringify(StateUserOptions.defaults.empty));

                return {
                    ...empty,
                    ...user
                };
            }),
            tap((user: User) => console.log(user)),
            tap((user: User) => patchState({ user })),
            tap((user: User) => dispatch
            ([
                new ActionLanguageSet(user.language),
                new ActionUserWatchClusters(user[UserKey.Clusters]),
                new ActionAlertsGet()
            ])),
            catchError((error: Error) => of(patchState({ error})))
        );
    }

    @Action(ActionUserWatchLanguage)
    userWatchLanguage()
    {
        return combineLatest([this.user$, this.language$]).pipe
        (
            filter(([user, language]) => user != null && user.language != null && language != null),
            filter(([user, language]) => user.language !== language),
            switchMap(([user, language]) => this.service.patch(user.id, { language }))
        );
    }

    @Action(ActionUserAddToken)
    userAddToken({ getState, patchState }: StateContext<StateUserModel>, { payload }: ActionUserAddToken)
    {
        const user   : User   = StateUser.user(getState());
        const token  : string = payload;
        const tokens : Array<string> = user.tokens == null ? [token] : [...user.tokens, token];

        user.tokens = tokens;

        patchState({ user });

        return this.service.patch(user[ModelKey.Id], { tokens });
    }

    @Action(ActionLoginEmail)
    loginEmail({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: ActionLoginEmail)
    {
        patchState({ authenticating: true });

        return from(this.fireAuth.auth.signInWithEmailAndPassword(payload.id, payload.password)).pipe
        (
            map((userCredential: firebase.auth.UserCredential) => userCredential.user),
            switchMap((authData: FirebaseUser) => dispatch(new ActionUserAuthenticateCheck(authData))),
            catchError((error: Error) => of(patchState({ error, authenticating: false })))
        );
    }

    @Action(ActionUserLogout)
    userLogout({ patchState }: StateContext<StateUserModel>)
    {
        return of(this.fireAuth.auth.signOut()).pipe
        (
            tap(() => patchState({ authenticated: false, authData: undefined, user: undefined })),
            catchError((error: Error) => of(patchState({ error })))
        );
    }

    @Action(ActionUserWatchClusters, { })
    watchUserClusters({ patchState }: StateContext<StateUserModel>, { payload }: ActionUserWatchClusters)
    {
        const ids: Array<string> = payload == null ? [] : payload;
        const streams$: Array<Observable<Cluster>> = ids.map((id: string) => this.cluster.valuesChanges(id));

        return combineLatest(streams$).
        pipe
        (
            switchMap((clusters: Array<Cluster>) =>
                forkJoin(clusters.map((cluster: Cluster) =>
                    this.storage.
                    ref(this.image.toBucketPath(cluster.iconId)).
                    getDownloadURL().
                    pipe
                    (
                        tap((url: string) => cluster.iconId = url),
                        map(() => cluster)
                    )
                ))
            ),
            map((clusters: Array<Cluster>) =>
                clusters.reduce((record, cluster: Cluster): Record<string, Cluster> => {
                    record[cluster[ModelKey.Id]] = cluster;
                    return record;
                }, {})
            ),
            tap((clusters: Record<string, Cluster>) => patchState({ clusters }))
        )
    }
}
