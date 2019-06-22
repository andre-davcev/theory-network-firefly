import { User as FirebaseUser } from 'firebase/app';

import { State, Selector, Action, StateContext, Select, NgxsOnInit} from '@ngxs/store';
import { Observable, of, from, combineLatest, forkJoin } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { ModelKey } from '@theory/firebase';
import { StateLanguage, ActionLanguageSet } from '@theory/capacitor';

import { User, UserKey, Cluster, Stream, Alert, ClusterKey, StreamKey } from '@firefly/core/models';
import { StateUserModel } from './user.state.model';
import { StateUserOptions } from './user.state.options';
import {
  ActionUserAuthenticate,
  ActionUserWatch,
  ActionUserAuthenticateCheck,
  ActionUserAddToken,
  ActionLoginEmail,
  ActionUserLogout,
  ActionUserWatchLanguage,
  ActionUserWatchClusters,
  ActionUserWatchStream,
  ActionUserWatchSubscriptions,
  ActionUserSetStream,
  ActionUserSetClusters,
  ActionUserSetSubscriptions,
  ActionUserSet,
  ActionUserSetAlerts,
  ActionUserWatchAlerts,
  ActionUserSubscribe,
  ActionUserUnsubscribe
} from './user.actions';
import { ServiceUser, ServiceCluster, ServiceAlerts } from '@firefly/core/services';
import { CoreUtil } from '@theory/core';
import { StateClusterOptions } from '../cluster/cluster.state.options';

@State<StateUserModel>(StateUserOptions)
export class StateUser implements NgxsOnInit
{
    constructor
    (
        private fireAuth: AngularFireAuth,
        private service: ServiceUser,
        private cluster: ServiceCluster,
        private alerts: ServiceAlerts
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
    @Selector() static errored(state: StateUserModel)                             {return state.error != null;}
    @Selector() static userFound(state: StateUserModel)                           {return state.user != null;}

    @Selector() static userId(state: StateUserModel): string
    {
        const user: User = StateUser.user(state);

        return user == null ? undefined : user[ModelKey.Id];
    }

    @Selector() static clusterMap(state: StateUserModel): Record<string, Cluster> { return state.clusters; }
    @Selector() static clusters(state: StateUserModel): Array<Cluster>
    {
        const clusters: Record<string, Cluster> = StateUser.clusterMap(state);

        return Object.keys(clusters).map(((id: string) => clusters[id]));
    }
    @Selector() static clustersFound(state: StateUserModel): boolean
    {
        return Object.keys(StateUser.clusterMap(state)).length > 0;
    }

    @Selector() static subscriptionKeys(state: StateUserModel): Record<string, string> { return StateUser.user(state).subscriptions; }
    @Selector() static subscriptionsMap(state: StateUserModel): Record<string, Cluster> {return state.clusters;}
    @Selector() static subscriptions(state: StateUserModel): Array<Cluster>
    {
        const subscriptions: Record<string, Cluster> = StateUser.subscriptionsMap(state);

        return Object.keys(subscriptions).map(((id: string) => subscriptions[id]));
    }
    @Selector() static subscriptionsFound(state: StateUserModel): boolean
    {
        return Object.keys(StateUser.subscriptionsMap(state)).length > 0;
    }

    @Selector() static stream(state: StateUserModel): Array<Stream> { return state.stream == null ? [] : state.stream; }
    @Selector() static streamFound(state: StateUserModel): boolean { return StateUser.stream(state).length > 0; }

    @Selector() static alerts(state: StateUserModel): Array<Alert> { return state.alerts == null ? [] : state.alerts; }
    @Selector() static alertsFound(state: StateUserModel): boolean { return StateUser.alerts(state).length > 0; }

    @Selector() static homeLoaded(state: StateUserModel): boolean { return state.streamLoaded && state.alertsLoaded; }

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
    userWatch({ patchState, dispatch, getState }: StateContext<StateUserModel>, { payload }: ActionUserWatch)
    {
        return this.service.valuesChanges(payload).pipe
        (
            filter((user: User) => user != null),
            map((user: User) =>
            {
                const empty: User = CoreUtil.clone<User>(StateUserOptions.defaults.empty);

                return {
                    ...empty,
                    ...user
                };
            }),
            tap((user: User) =>
            {
                const previous: User = StateUser.user(getState());

                let clustersAreEqual:      boolean;
                let streamIsEqual:         boolean;
                let subscriptionsAreEqual: boolean;
                let alertsAreEqual:        boolean;

                if (previous != null)
                {
                    clustersAreEqual      = this.service.keysAreEqual(user[UserKey.Clusters],      previous[UserKey.Clusters]);
                    streamIsEqual         = this.service.keysAreEqual(user[UserKey.Stream],        previous[UserKey.Stream]);
                    subscriptionsAreEqual = this.service.keysAreEqual(user[UserKey.Subscriptions], previous[UserKey.Subscriptions]);
                    alertsAreEqual        = this.service.keysAreEqual(user[UserKey.Alerts],        previous[UserKey.Alerts]);
                }

                if (previous == null || !clustersAreEqual)      { dispatch(new ActionUserWatchClusters(user)); }
                if (previous == null || !streamIsEqual)         { dispatch(new ActionUserWatchStream(user)); }
                if (previous == null || !subscriptionsAreEqual) { dispatch(new ActionUserWatchSubscriptions(user)); }
                if (true || previous == null || !subscriptionsAreEqual) { dispatch(new ActionUserWatchAlerts(user)); }
            }),
            tap((user: User) =>
                dispatch
                ([
                    new ActionLanguageSet(user.language),
                    new ActionUserSet(user)
                ])
            ),

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
        const tokens : Record<string, string> = user.tokens == null ? {[token]: token} : {...user.tokens, [token]: token};

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

    @Action(ActionUserWatchClusters, { cancelUncompleted: true })
    watchClusters({ dispatch }: StateContext<StateUserModel>, { payload }: ActionUserWatchClusters)
    {
        const user: User     = payload;
        const empty: Cluster = StateClusterOptions.defaults.empty;

        return this.cluster.valuesChangesClusters(user[UserKey.Clusters]).
        pipe
        (
            map((clusters: Array<Cluster>) =>
            (
                clusters.map((cluster: Cluster) =>
                ({
                    ...CoreUtil.clone<Cluster>(empty),
                    ...cluster
                }))
            )),
            map((clusters: Array<Cluster>) =>
                clusters.reduce((record, cluster: Cluster): Record<string, Cluster> => {
                    record[cluster[ModelKey.Id]] = cluster;
                    return record;
                }, {})
            ),
            tap((clusters: Record<string, Cluster>) =>
                dispatch(new ActionUserSetClusters(clusters))
            )
        )
    }

    @Action(ActionUserWatchSubscriptions, { cancelUncompleted: true })
    watchSubscriptions({ dispatch }: StateContext<StateUserModel>, { payload }: ActionUserWatchSubscriptions)
    {
        const user: User     = payload;
        const empty: Cluster = StateClusterOptions.defaults.empty;

        return this.cluster.valuesChangesClusters(user[UserKey.Subscriptions]).
        pipe
        (
            map((subscriptions: Array<Cluster>) =>
            (
                subscriptions.map((cluster: Cluster) =>
                ({
                    ...CoreUtil.clone<Cluster>(empty),
                    ...cluster
                }))
            )),
            map((subscriptions: Array<Cluster>) =>
                subscriptions.reduce((record, cluster: Cluster): Record<string, Cluster> => {
                    record[cluster[ModelKey.Id]] = cluster;
                    return record;
                }, {})
            ),
            tap((subscriptions: Record<string, Cluster>) =>
                dispatch(new ActionUserSetSubscriptions(subscriptions))
            )
        )
    }

    @Action(ActionUserWatchStream, { cancelUncompleted: true })
    watchStream({ dispatch }: StateContext<StateUserModel>, { payload }: ActionUserWatchStream)
    {
        const user: User = payload;
        const subscriptions: Record<string, string> = user[UserKey.Subscriptions];
        const empty: Cluster = StateClusterOptions.defaults.empty;

        return this.cluster.valuesChangesClusters(user[UserKey.Stream]).
        pipe
        (
            map((clusters: Array<Cluster>) =>
                clusters.
                filter((cluster: Cluster) => subscriptions[cluster[ModelKey.Id]] == null).
                map((cluster: Cluster) =>
                ({
                    ...CoreUtil.clone<Cluster>(empty),
                    ...cluster
                })).
                map((cluster: Cluster) =>
                ({
                    ...cluster,
                    [StreamKey.Subscribed]: false,
                    [StreamKey.SubscribedCount]: Object.keys(cluster[ClusterKey.Subscribers]).length
                }))
            ),
            switchMap((stream: Array<Stream>) =>
                dispatch(new ActionUserSetStream(stream))
            )
        );
    }

    @Action(ActionUserWatchAlerts, { cancelUncompleted: true })
    watchAlerts({ dispatch }: StateContext<StateUserModel>, { payload }: ActionUserWatchAlerts)
    {
        const user: User = payload;
        const userId: string = user[ModelKey.Id];

        return this.alerts.getMock(userId).
        pipe
        (
            switchMap((alerts: Array<Alert>) =>
                dispatch(new ActionUserSetAlerts(alerts))
            )
        );
    }

    @Action(ActionUserSet)
    userSet({ patchState }: StateContext<StateUserModel>, { payload }: ActionUserSet)
    {
        patchState({ user: payload });
    }

    @Action(ActionUserSetClusters)
    userSetClusters({ patchState }: StateContext<StateUserModel>, { payload }: ActionUserSetClusters)
    {
        patchState({ clusters: payload });
    }

    @Action(ActionUserSetSubscriptions)
    userSetSubscriptions({ patchState }: StateContext<StateUserModel>, { payload }: ActionUserSetSubscriptions)
    {
        patchState({ subscriptions: payload });
    }

    @Action(ActionUserSetStream)
    userSetStream({ patchState }: StateContext<StateUserModel>, { payload }: ActionUserSetStream)
    {
        patchState({ stream: payload, streamLoaded: true });
    }

    @Action(ActionUserSetAlerts)
    userSetAlerts({ patchState }: StateContext<StateUserModel>, { payload }: ActionUserSetAlerts)
    {
        patchState({ alerts: payload, alertsLoaded: true });
    }

    @Action(ActionUserSubscribe)
    userSubscribe({ getState, patchState }: StateContext<StateUserModel>, { payload }: ActionUserSubscribe)
    {
        const key: string           = payload;
        const state: StateUserModel = getState();
        const user: User            = StateUser.user(state);
        const userId: string        = user[ModelKey.Id];

        const clusters:    Record<string, Cluster> = StateUser.clusterMap(state);
        const cluster:     Cluster                 = clusters[key];
        const stream:      Array<Stream>           = StateUser.stream(state);
        const streamIndex: number                  = stream.findIndex((s: Stream ) => key === s[ModelKey.Id]);
        const streamItem:  Stream                  = stream[streamIndex];

        const subscribers:  Record<string, string>  = cluster[ClusterKey.Subscribers];
        const subscriptions: Record<string, string> = StateUser.subscriptionKeys(state);

        subscribers[userId] = userId;
        subscriptions[key]  = key;

        streamItem[StreamKey.Subscribed]      = true;
        streamItem[StreamKey.SubscribedCount] = Object.keys(streamItem[ClusterKey.Subscribers]).length + 1;

        stream[streamIndex] = streamItem;

        patchState({ stream });

        return forkJoin
        (
            this.cluster.patch(key,    { subscribers   }),
            this.service.patch(userId, { subscriptions })
        );
    }

    @Action(ActionUserUnsubscribe)
    userUnsubscribe({ getState, patchState }: StateContext<StateUserModel>, { payload }: ActionUserUnsubscribe)
    {
        const key: string           = payload;
        const state: StateUserModel = getState();
        const user: User            = StateUser.user(state);
        const userId: string        = user[ModelKey.Id];

        const clusters:    Record<string, Cluster> = StateUser.clusterMap(state);
        const cluster:     Cluster                 = clusters[key];
        const stream:      Array<Stream>           = StateUser.stream(state);
        const streamIndex: number                  = stream.findIndex((s: Stream ) => key === s[ModelKey.Id]);
        const streamItem:  Stream                  = stream[streamIndex];

        const subscribers:  Record<string, string>  = cluster[ClusterKey.Subscribers];
        const subscriptions: Record<string, string> = StateUser.subscriptionKeys(state);

        delete subscribers[userId];
        delete subscriptions[key];

        streamItem[StreamKey.Subscribed]      = false;
        streamItem[StreamKey.SubscribedCount] = Object.keys(streamItem[ClusterKey.Subscribers]).length;

        stream[streamIndex] = streamItem;

        patchState({ stream });

        return forkJoin
        (
            this.cluster.patch(key,    { subscribers   }),
            this.service.patch(userId, { subscriptions })
        );
    }
}
