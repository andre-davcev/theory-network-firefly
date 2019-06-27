import { User as FirebaseUser } from 'firebase/app';

import { State, Selector, Action, StateContext, Select, NgxsOnInit} from '@ngxs/store';
import { Observable, of, from, combineLatest, forkJoin } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { StateLanguage, ActionLanguageSet } from '@theory/capacitor';

import { User, Cluster, Stream, Alert, Subscription } from '@firefly/core/models';
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

        return user == null ? undefined : user.id;
    }

    @Selector() static clusterMap(state: StateUserModel): Record<string, Cluster> { return state.clusterMap; }
    @Selector() static clusters(state: StateUserModel): Array<Cluster>
    {
        const clusterMap: Record<string, Cluster> = StateUser.clusterMap(state);

        return Object.keys(clusterMap).map(((id: string) => clusterMap[id]));
    }
    @Selector() static clustersFound(state: StateUserModel): boolean
    {
        return Object.keys(StateUser.clusterMap(state)).length > 0;
    }

    @Selector() static subscriptionMap(state: StateUserModel): Record<string, Cluster> { return state.subscriptionMap; }
    @Selector() static subscriptionsKeys(state: StateUserModel): Record<string, string> { return StateUser.user(state).subscriptions; }
    @Selector() static subscriptions(state: StateUserModel): Array<Subscription>
    {
        const subscriptionsKeys: Record<string, string>  = StateUser.subscriptionsKeys(state);
        const subscriptionMap:   Record<string, Cluster> = StateUser.subscriptionMap(state);

        return Object.
            keys(subscriptionsKeys).
            map(((id: string) => subscriptionMap[id])).
            map((cluster: Cluster) => ({ ...cluster, on: true }));
    }
    @Selector() static subscriptionsFound(state: StateUserModel): boolean
    {
        return Object.keys(StateUser.subscriptionsKeys(state)).length > 0;
    }

    @Selector() static subscriptionsOffKeys(state: StateUserModel): Record<string, string> { return StateUser.user(state).subscriptionsOff; }
    @Selector() static subscriptionsOff(state: StateUserModel): Array<Subscription>
    {
        const subscriptionsOffKeys: Record<string, string>  = StateUser.subscriptionsOffKeys(state);
        const subscriptionMap:      Record<string, Cluster> = StateUser.subscriptionMap(state);

        return Object.
            keys(subscriptionsOffKeys).
            map(((id: string) => subscriptionMap[id])).
            map((cluster: Cluster) => ({ ...cluster, on: false }));
    }
    @Selector() static subscriptionsOffFound(state: StateUserModel): boolean
    {
        return Object.keys(StateUser.subscriptionsOffKeys(state)).length > 0;
    }

    @Selector() static subscriptionsAllKeys(state: StateUserModel): Record<string, string>
    {
        return {
            ...StateUser.subscriptionsKeys(state),
            ...StateUser.subscriptionsOffKeys(state)
        };
    }
    @Select() static subscriptionsAll(state: StateUserModel): Array<Subscription>
    {
        return [
          ...StateUser.subscriptions(state),
          ...StateUser.subscriptionsOff(state)
        ].
        sort((a: Cluster, b: Cluster) =>
            a.name.localeCompare(b.name)
        );
    }
    @Selector() static subscriptionsAllFound(state: StateUserModel): boolean
    {
        return Object.keys(StateUser.subscriptionsAllKeys(state)).length > 0;
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

                let clustersAreEqual:         boolean;
                let streamIsEqual:            boolean;
                let subscriptionsAreEqual:    boolean;
                let subscriptionsOffAreEqual: boolean;
                let subscriptionsChanged:     boolean;
                let alertsAreEqual:           boolean;

                if (previous != null)
                {
                    clustersAreEqual         = this.service.keysAreEqual(user.clusters,         previous.clusters);
                    streamIsEqual            = this.service.keysAreEqual(user.stream,           previous.stream);
                    subscriptionsAreEqual    = this.service.keysAreEqual(user.subscriptions,    previous.subscriptions);
                    subscriptionsOffAreEqual = this.service.keysAreEqual(user.subscriptionsOff, previous.subscriptionsOff);
                    alertsAreEqual           = this.service.keysAreEqual(user.alerts,           previous.alerts);

                    subscriptionsChanged = !subscriptionsAreEqual || !subscriptionsOffAreEqual;
                }

                if (previous == null || !clustersAreEqual)             { dispatch(new ActionUserWatchClusters(user)); }
                if (previous == null || !streamIsEqual)                { dispatch(new ActionUserWatchStream(user)); }
                if (previous == null || subscriptionsChanged)          { dispatch(new ActionUserWatchSubscriptions(user)); }
                if (true || previous == null || !subscriptionsChanged) { dispatch(new ActionUserWatchAlerts(user)); }
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

        return this.service.patch(user.id, { tokens });
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

        return this.cluster.valuesChangesClusters(user.clusters, empty).
        pipe
        (
            tap((clusters: Record<string, Cluster>) =>
                dispatch(new ActionUserSetClusters(clusters))
            )
        );
    }

    @Action(ActionUserWatchSubscriptions, { cancelUncompleted: true })
    watchSubscriptions({ dispatch }: StateContext<StateUserModel>, { payload }: ActionUserWatchSubscriptions)
    {
        const user: User     = payload;
        const empty: Cluster = StateClusterOptions.defaults.empty;

        const subscriptionsKeys =
        {
            ...user.subscriptions,
            ...user.subscriptionsOff
        };

        return this.cluster.valuesChangesClusters(subscriptionsKeys, empty).
        pipe
        (
            tap((subscriptions: Record<string, Cluster>) =>
                dispatch(new ActionUserSetSubscriptions(subscriptions))
            )
        )
    }

    @Action(ActionUserWatchStream, { cancelUncompleted: true })
    watchStream({ dispatch }: StateContext<StateUserModel>, { payload }: ActionUserWatchStream)
    {
        const user: User = payload;
        const subscriptions: Record<string, string> =
        {
            ...user.subscriptions,
            ...user.subscriptionsOff
        };
        const empty: Cluster = StateClusterOptions.defaults.empty;

        return this.cluster.valuesChangesClusters(user.stream, empty).
        pipe
        (
            switchMap((stream: Array<Stream>) =>
                dispatch(new ActionUserSetStream(stream))
            )
        );
    }

    @Action(ActionUserWatchAlerts, { cancelUncompleted: true })
    watchAlerts({ dispatch }: StateContext<StateUserModel>, { payload }: ActionUserWatchAlerts)
    {
        const user: User = payload;
        const userId: string = user.id;

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
        patchState({ clusterMap: payload });
    }

    @Action(ActionUserSetSubscriptions)
    userSetSubscriptions({ patchState }: StateContext<StateUserModel>, { payload }: ActionUserSetSubscriptions)
    {
        patchState({ subscriptionMap: payload });
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
        const userId: string        = user.id;

        const clusters:    Record<string, Cluster> = StateUser.clusterMap(state);
        const cluster:     Cluster                 = clusters[key];
        const stream:      Array<Stream>           = StateUser.stream(state);
        const streamIndex: number                  = stream.findIndex((s: Stream ) => key === s.id);
        const streamItem:  Stream                  = stream[streamIndex];

        const subscribers:  Record<string, string>  = cluster.subscribers;
        const subscriptions: Record<string, string> = StateUser.subscriptionsKeys(state);

        subscribers[userId] = userId;
        subscriptions[key]  = key;

        streamItem.subscribed      = true;
        streamItem.subscribedCount = Object.keys(streamItem.subscribers).length + 1;

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
        const userId: string        = user.id;

        const clusters:    Record<string, Cluster> = StateUser.clusterMap(state);
        const cluster:     Cluster                 = clusters[key];
        const stream:      Array<Stream>           = StateUser.stream(state);
        const streamIndex: number                  = stream.findIndex((s: Stream ) => key === s.id);
        const streamItem:  Stream                  = stream[streamIndex];

        const subscribers:  Record<string, string>  = cluster.subscribers;
        const subscriptions: Record<string, string> = StateUser.subscriptionsKeys(state);

        delete subscribers[userId];
        delete subscriptions[key];

        streamItem.subscribed      = false;
        streamItem.subscribedCount = Object.keys(streamItem.subscribers).length;

        stream[streamIndex] = streamItem;

        patchState({ stream });

        return forkJoin
        (
            this.cluster.patch(key,    { subscribers   }),
            this.service.patch(userId, { subscriptions })
        );
    }
}
