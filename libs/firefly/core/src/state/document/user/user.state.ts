import { User as FirebaseUser, auth, firestore } from 'firebase/app';

import { State, Selector, Action, StateContext, Select, NgxsOnInit, Store} from '@ngxs/store';
import { Observable, of, from } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { StateLanguage, ActionLanguageSet, StateLocation } from '@theory/capacitor';

import { User, Location, StreamCluster, Subscription, SubscriptionPartial } from '@firefly/cloud';
import { StateUserModel } from './user.state.model';
import { StateUserOptions } from './user.state.options';
import {
    ActionUserAuthenticate,
    ActionUserWatch,
    ActionUserAuthenticateCheck,
    ActionUserAddToken,
    ActionUserLoginEmail,
    ActionUserLogout,
    ActionUserWatchLanguage,
    ActionUserReset,
    ActionUserGet,
    ActionUserSet,
    ActionUserPatch,
    ActionUserSave,
    ActionUserDelete,
    ActionUserCreate,
    ActionUserUpdate,
    ActionUserWatchLocation,
    ActionUserWatchCity,
    ActionUserWatchSubscriptionsStatus,
    ActionUserSubscriptionToggle
} from './user.actions';
import { ServiceUsers, ServiceLocation } from '@firefly/core/services';
import { CoreUtil } from '@theory/core';
import { StateDocument } from '@theory/ngxs';

import { ActionUserAlertsReset, ActionUserAlertsGetData } from '../../query/user-alerts/user-alerts.actions';
import { ActionUserClustersReset } from '../../query/user-clusters/user-clusters.actions';
import { ActionUserEventsReset } from '../../query/user-events/user-events.actions';
import { ActionUserIconsReset } from '../../query/user-icons/user-icons.actions';
import { ActionUserImagesReset } from '../../query/user-images/user-images.actions';
import { ActionUserStreamReset, ActionUserStreamSetData, ActionUserStreamSync } from '../../child/user-stream/user-stream.actions';
import { ActionUserSubscriptionsReset, ActionUserSubscriptionsSetData, ActionUserSubscriptionsSync, ActionUserSubscriptionsAdd } from '../../child/user-subscriptions/user-subscriptions.actions';
import { GeolocationPosition } from '@capacitor/core';
import { ServiceBigDataCloud, ResponseReverseGeocode } from '@theory/bigdatacloud';
import { LocationCity } from '@firefly/core/interfaces';
import { StateUserStreamOptions } from '../../child/user-stream/user-stream.state.options';
import { StateUserStream } from '../../child/user-stream/user-stream.state';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { StateUserSubscriptions } from '../../child/user-subscriptions';
import { StateClusterOptions } from '../cluster/cluster.state.options';
import { ActionStorageUrlGet } from '@theory/firebase';

@State<StateUserModel>(StateUserOptions)
export class StateUser extends StateDocument<User, StateUserModel> implements NgxsOnInit
{
    @Select(StateLanguage.language)        language$    : Observable<string>;
    @Select(StateLocation.location)        location$    : Observable<GeolocationPosition>;
    @Select(StateUserStream.initialized()) streamReady$ : Observable<boolean>;

    constructor
    (
        private auth         : AngularFireAuth,
        private bigdatacloud : ServiceBigDataCloud,
        private location     : ServiceLocation,
        private store        : Store,
                service      : ServiceUsers
    )
    {
        super
        (
            StateUserOptions.name as string,
            StateUserOptions.defaults,
            service,
            {
                version     : undefined,
                id          : undefined,
                userId      : undefined,
                dateCreated : undefined,
                dateUpdated : undefined,
                metadata    : {},

                cityId              : null,
                city                : null,
                email               : '',
                language            : 'en',
                geopoint            : null,
                phoneNumber         : '',
                providerId          : undefined,
                roleAdmins          : [],
                roleEditors         : [],
                subscriptions       : [],
                subscriptionsStatus : {},
                tokens              : []
            },
            {
                ActionReset  : ActionUserReset,
                ActionGet    : ActionUserGet,
                ActionSet    : ActionUserSet,
                ActionPatch  : ActionUserPatch,
                ActionCreate : ActionUserCreate,
                ActionUpdate : ActionUserUpdate,
                ActionSave   : ActionUserSave,
                ActionDelete : ActionUserDelete,
                ActionWatch  : ActionUserWatch,

                ActionsReset:
                [
                    ActionUserAlertsReset,
                    ActionUserClustersReset,
                    ActionUserEventsReset,
                    ActionUserIconsReset,
                    ActionUserImagesReset,
                    ActionUserStreamReset,
                    ActionUserSubscriptionsReset
                ],

                ActionsCreate: []
            }
        );
    }

    @Selector() static authData(state: StateUserModel)               : FirebaseUser { return state.authData; }
    @Selector() static authenticated(state: StateUserModel)          : boolean      { return state.authenticated; }
    @Selector() static authenticating(state: StateUserModel)         : boolean      { return state.authenticating; }
    @Selector() static city(state: StateUserModel)                   : Location     { const user: User = StateUser.dataState(state); return user == null ? null : user.city; }
    @Selector() static cityId(state: StateUserModel)                 : string       { const city: Location = StateUser.city(state); return city == null ? null : city.cityId; }
    @Selector() static language(state: StateUserModel)               : string       { const user: User = StateUser.dataState(state); return user == null ? null : user.language; }
    @Selector() static loading(state: StateUserModel)                : boolean      { return state.authenticating || state.initializing; }
    @Selector() static loadedNotAuthenticated(state: StateUserModel) : boolean      { return !StateUser.loading(state) && !StateUser.authenticated(state); }
    @Selector() static error(state: StateUserModel)                  : Error        { return state.error; }
    @Selector() static errored(state: StateUserModel)                : boolean      { return state.error != null; }
    @Selector() static subscriptionsStatus(state: StateUserModel)    : Record<string, SubscriptionPartial> { const user: User = StateUser.dataState(state); return user == null ? null : user.subscriptionsStatus; }
    @Selector() static subscriptionsUnfiltered(state: StateUserModel) : Record<string, string> { return state.subscriptionsUnfiltered; }

    @Selector([StateUserStream.data()])
    public static stream(state: StateUserModel, stream: Array<StreamCluster>): Array<StreamCluster>
    {
        const unfiltered    : Record<string, string>              = StateUser.subscriptionsUnfiltered(state);
        const subscriptions : Record<string, SubscriptionPartial> = StateUser.subscriptionsStatus(state);
        const userId        : string                              = StateUser.idState(state);

        return stream.
            filter((cluster: StreamCluster) =>
                (subscriptions[cluster.id] == null || unfiltered[cluster.id] != null) // && cluster.userId !== userId
            );
    }

    ngxsOnInit(context: StateContext<StateUserModel>)
    {
        context.dispatch
        ([
            new ActionUserAuthenticate()
        ]);
    }

    @Action(ActionUserReset)
    reset(context: StateContext<StateUserModel>)
    {
        return super.reset(context)
    }

    @Action(ActionUserGet)
    get(context: StateContext<StateUserModel>, action: ActionUserGet)
    {
        return super.get(context, action);
    }

    @Action(ActionUserSet)
    set(context: StateContext<StateUserModel>, action: ActionUserSet)
    {
        const { dispatch, patchState, getState } = context;

        return super.set(context, action).pipe
        (
            tap(() =>
                dispatch
                ([
                    new ActionUserWatchLocation(),
                    new ActionUserWatchLanguage(),
                    new ActionUserWatchCity()
                ])
            ),
            switchMap(() =>
                dispatch
                ([
                    new ActionUserAlertsGetData(),
                    new ActionLanguageSet(StateUser.language(getState()))
                ])
            ),
            switchMap(() =>
                this.streamReady$.pipe
                (
                    filter((ready: boolean) => ready),
                    take(1)
                )
            ),
            tap(() =>
                patchState({ initializing: false })
            )
        );
    }

    @Action(ActionUserPatch)
    patch(context: StateContext<StateUserModel>, action: ActionUserPatch)
    {
        return super.patch(context, action);
    }

    @Action(ActionUserCreate)
    create(context: StateContext<StateUserModel>, { credentials }: ActionUserCreate): Observable<any>
    {
        const { patchState, dispatch } = context;

        patchState({ authenticating: true });

        return from(this.auth.auth.createUserWithEmailAndPassword(credentials.id, credentials.password)).
        pipe
        (
            map((userCredential: auth.UserCredential) =>
                userCredential.user
            ),
            switchMap((authData: FirebaseUser) =>
                dispatch
                ([
                    new ActionUserPatch
                    ({
                        id:     authData.uid,
                        userId: authData.uid,
                        email:  authData.email
                    })
                ]).
                pipe
                (
                    switchMap(() =>
                        super.create(context)
                    ),
                    switchMap(() =>
                        dispatch(new ActionUserAuthenticateCheck(authData))
                    )
                )
            ),
            catchError((error: Error) =>
                of(patchState({ error, authenticating: false }))
            )
        );
    }

    @Action(ActionUserUpdate)
    update(context: StateContext<StateUserModel>)
    {
        return super.update(context);
    }

    @Action(ActionUserSave)
    save(context: StateContext<StateUserModel>)
    {
        return super.save(context);
    }

    @Action(ActionUserDelete)
    delete(context: StateContext<StateUserModel>)
    {
        return super.delete(context);
    }

    @Action(ActionUserWatch, { cancelUncompleted: true })
    watch(context: StateContext<StateUserModel>, action: ActionUserWatch)
    {
        return super.watch(context, action);
    }

    @Action(ActionUserAuthenticate)
    authenticate({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        patchState({ authenticating: true, initializing: true });
        return this.auth.authState.pipe
        (
            take(1),
            tap((authData: FirebaseUser) =>
                patchState({ authData, authenticating: false, authenticated: authData != null })
            ),
            switchMap((authData: FirebaseUser) =>
                authData == null ?
                    of(patchState({ initializing: false})) :
                    dispatch(new ActionUserGet(authData.uid))
            ),
            catchError((error: Error) =>
                of(patchState({ error, authenticating: false, initializing: false}))
            )
        );
    }

    @Action(ActionUserAuthenticateCheck)
    authenticateCheck({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: ActionUserAuthenticateCheck)
    {
        return of(payload).
        pipe
        (
            tap(() => dispatch(new ActionUserReset())),
            filter((authData: FirebaseUser) =>
            {
                const authenticated: boolean = authData != null;

                patchState
                ({
                    authData,
                    authenticated,
                    authenticating: authenticated,
                    error: authenticated ? undefined : { name: 'Failed Login', message: 'Unable to login' }
                });

                return authenticated;
            }),

            switchMap((authData: FirebaseUser) =>
                dispatch(new ActionUserGet(authData.uid))
            ),
            tap(() =>
                patchState({ authenticated: false })
            )
        );
    }

    @Action(ActionUserWatchLocation, { cancelUncompleted: true })
    watchLocation({ dispatch, getState }: StateContext<StateUserModel>)
    {
        return this.location$.pipe
        (
            filter((location: GeolocationPosition) =>
                location != null
            ),
            switchMap((location: GeolocationPosition) =>
                this.bigdatacloud.reverseGeocode(location.coords.latitude, location.coords.longitude)
            ),
            filter((response: ResponseReverseGeocode) =>
                StateUser.cityId(getState()) !== ServiceLocation.cityIdFromResponse(response)
            ),
            switchMap((response: ResponseReverseGeocode) =>
                this.location.locationCityFromResponse(response)
            ),
            switchMap((locationCity: LocationCity) =>
                dispatch(new ActionUserPatch(locationCity, true))
            )
        );
    }

    @Action(ActionUserWatchCity, { cancelUncompleted: true })
    watchCity({ dispatch }: StateContext<StateUserModel>)
    {
        return this.store.select(StateUser.cityId).
        pipe
        (
            filter((cityId: string) =>
                cityId != null
            ),
            switchMap((cityId: string) =>
                this.service.documentWatch<Record<string, StreamCluster>>(StateUserStreamOptions.name as string, cityId)
            ),
            filter((snapshot: DocumentSnapshot<Record<string, StreamCluster>>) =>
                snapshot.exists
            ),
            map((snapshot: DocumentSnapshot<Record<string, StreamCluster>>) =>
                snapshot.data()
            ),
            switchMap((stream: Record<string, StreamCluster>) =>
                dispatch(new ActionUserStreamSetData(stream, true))
            )
        );
    }

    @Action(ActionUserWatchSubscriptionsStatus)
    watchSubscriptions({ dispatch }: StateContext<StateUserModel>)
    {
        const subscriptions: Record<string, SubscriptionPartial> = this.store.selectSnapshot(StateUser.subscriptionsStatus);
        dispatch(new ActionUserSubscriptionsSetData(subscriptions, true));
    }

    @Action(ActionUserWatchLanguage, { cancelUncompleted: true })
    watchLanguage({ dispatch, getState }: StateContext<StateUserModel>)
    {
        return this.language$.pipe
        (
            filter((language: string) =>
                language != null && StateUser.language(getState()) !== language
            ),
            switchMap((language: string) =>
                dispatch(new ActionUserPatch({ language }, true))
            )
        );
    }

    @Action(ActionUserAddToken)
    addToken({ getState, dispatch }: StateContext<StateUserModel>, { payload }: ActionUserAddToken)
    {
        const user   : User   = StateUser.dataState(getState());
        const token  : string = payload;

        const tokens : Array<string> = user.tokens == null ? [token] : [...user.tokens, token];

        return dispatch(new ActionUserPatch({ tokens })).
        pipe
        (
            switchMap(() => dispatch(new ActionUserSave()))
        );
    }

    @Action(ActionUserLoginEmail)
    loginEmail({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: ActionUserLoginEmail)
    {
        patchState({ authenticating: true });

        return from(this.auth.auth.signInWithEmailAndPassword(payload.id, payload.password)).pipe
        (
            map((userCredential: firebase.auth.UserCredential) => userCredential.user),
            switchMap((authData: FirebaseUser) => dispatch(new ActionUserAuthenticateCheck(authData))),
            catchError((error: Error) => of(patchState({ error, authenticating: false })))
        );
    }

    @Action(ActionUserLogout)
    logout({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        const defaults: StateUserModel = CoreUtil.clone<StateUserModel>(StateUserOptions.defaults);
        patchState(defaults);
        return of(this.auth.auth.signOut()).pipe
        (
            switchMap(() => dispatch(new ActionUserReset())),
            catchError((error: Error) => of(patchState({ error })))
        );
    }

    @Action(ActionUserSubscriptionToggle)
    subscriptionToggle({ dispatch, getState, patchState }: StateContext<StateUserModel>, { id, filter }: ActionUserSubscriptionToggle)
    {
        const state               : StateUserModel                      = getState();
        const subscriptionsStatus : Record<string, SubscriptionPartial> = StateUser.subscriptionsStatus(state);

        if (!filter)
        {
            const subscriptionsUnfiltered: Record<string, string> = StateUser.subscriptionsUnfiltered(getState());

            subscriptionsUnfiltered[id] = id;

            patchState({ subscriptionsUnfiltered });
        }

        let subscriptionPartial : SubscriptionPartial = subscriptionsStatus[id];
        let subscription        : Subscription        = this.store.selectSnapshot(StateUserSubscriptions.dataLookup())[id];

        const subscriptionIsNew : boolean       = subscription == null;
        const streamCluster     : StreamCluster = this.store.selectSnapshot(StateUserStream.dataLookup())[id];

        subscriptionPartial = subscriptionsStatus[id] =
        {
            on: subscriptionIsNew ? true : !subscriptionPartial.on
        };

        if (!subscriptionIsNew)
        {
            subscription.on = subscriptionPartial.on;
        }

        if (streamCluster != null)
        {
            streamCluster.on = subscriptionsStatus[id].on;
        }

        return dispatch
        ([
            new ActionUserPatch({ subscriptionsStatus }, true),
            new ActionUserStreamSync(streamCluster)
        ]).
        pipe
        (
            switchMap(() =>
                !subscriptionIsNew ?
                    dispatch(new ActionUserSubscriptionsSync(subscription)) :
                    this.service.documentGet(StateClusterOptions.name as string, id).
                    pipe
                    (
                        switchMap((snapshot: firestore.DocumentSnapshot) =>
                            dispatch(new ActionUserSubscriptionsAdd(snapshot, { ...snapshot.data() as Subscription, on: subscriptionPartial.on })).
                            pipe
                            (
                                switchMap(() =>
                                    dispatch(new ActionStorageUrlGet((snapshot.data() as Subscription).bucketPath))
                                )
                            )
                        )
                    )
            )
        );
    }
}
