import { User as FirebaseUser, auth, firestore } from 'firebase/app';

import { State, Selector, Action, StateContext, Select, NgxsOnInit, Store} from '@ngxs/store';
import { Observable, of, from } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map, finalize } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { StateLanguage, ActionLanguageSet, StateLocation } from '@theory/capacitor';

import { User, Location, StreamInterest, Subscription, SubscriptionPartial } from '@firefly/cloud';
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
    ActionUserSubscriptionToggle,
    ActionUserNotLoggedIn
} from './user.actions';
import { ServiceUsers, ServiceLocation } from '@firefly/core/services';
import { CoreUtil } from '@theory/core';
import { StateDocument } from '@theory/ngxs';

import { ActionUserAlertsReset, ActionUserAlertsGetData } from '../../query/user-alerts/user-alerts.actions';
import { ActionUserInterestsReset } from '../../query/user-interests/user-interests.actions';
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
import { StateInterestOptions } from '../interest/interest.state.options';
import { ActionStorageUrlGet } from '@theory/firebase';
import { ActionNotificationsWatch } from '@firefly/mobile/state/notifications/notifications.actions';

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
                    ActionUserInterestsReset,
                    ActionUserEventsReset,
                    ActionUserIconsReset,
                    ActionUserImagesReset,
                    ActionUserSubscriptionsReset
                ],

                ActionsCreate: []
            }
        );
    }

    @Selector() static authData(state: StateUserModel)               : FirebaseUser { return state.authData; }
    @Selector() static initialized(state: StateUserModel)            : boolean      { return state.initialized; }
    @Selector() static authenticated(state: StateUserModel)          : boolean      { return state.authenticated; }
    @Selector() static authenticating(state: StateUserModel)         : boolean      { return state.authenticating; }
    @Selector() static city(state: StateUserModel)                   : Location     { const user: User = StateUser.dataState(state); return user == null ? null : user.city; }
    @Selector() static cityId(state: StateUserModel)                 : string       { const city: Location = StateUser.city(state); return city == null ? null : city.cityId; }
    @Selector() static language(state: StateUserModel)               : string       { const user: User = StateUser.dataState(state); return user == null ? null : user.language; }
    @Selector() static loading(state: StateUserModel)                : boolean      { return state.authenticating || !state.initialized; }
    @Selector() static loadedNotAuthenticated(state: StateUserModel) : boolean      { return !StateUser.loading(state) && !StateUser.authenticated(state); }
    @Selector() static error(state: StateUserModel)                  : Error        { return state.error; }
    @Selector() static errored(state: StateUserModel)                : boolean      { return state.error != null; }
    @Selector() static subscriptionsStatus(state: StateUserModel)    : Record<string, SubscriptionPartial> { const user: User = StateUser.dataState(state); return user == null ? null : user.subscriptionsStatus; }
    @Selector() static subscriptionsUnfiltered(state: StateUserModel) : Record<string, string> { return state.subscriptionsUnfiltered; }
    @Selector() static tokens(state:StateUserModel)                  : Array<string>{ const user: User = StateUser.dataState(state); return user == null ? null : user.tokens; }

    @Selector([StateUserStream.data()])
    public static stream(state: StateUserModel, stream: Array<StreamInterest>): Array<StreamInterest>
    {
        const unfiltered    : Record<string, string>              = StateUser.subscriptionsUnfiltered(state);
        const subscriptions : Record<string, SubscriptionPartial> = StateUser.subscriptionsStatus(state);

        return !subscriptions ?
            stream :
            stream.
            filter((interest: StreamInterest) =>
                (subscriptions[interest.id] == null || unfiltered[interest.id] != null) // && interest.userId !== userId
            );
    }

    @Selector([StateUserStream.data()])
    public static streamFound(state: StateUserModel, stream: Array<StreamInterest>): boolean
    {
        return StateUser.stream(state, stream).length > 0;
    }

    @Selector([StateUserStream.data()])
    public static streamEmpty(state: StateUserModel, stream: Array<StreamInterest>): boolean
    {
        return StateUser.stream(state, stream).length === 0;
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
        return of(null);
    }

    @Action(ActionUserGet)
    get(context: StateContext<StateUserModel>, action: ActionUserGet)
    {
        return super.get(context, action);
    }

    @Action(ActionUserSet)
    set(context: StateContext<StateUserModel>, action: ActionUserSet)
    {
        const { dispatch, getState } = context;

        return super.set(context, action).pipe
        (
            tap(() =>
                dispatch
                ([
                    new ActionUserWatchLocation(),
                    new ActionUserWatchLanguage(),
                    new ActionUserWatchCity(),
                    new ActionNotificationsWatch()
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

    @Action(ActionUserNotLoggedIn)
    userNotLoggedIn({ patchState, dispatch}: StateContext<StateUserModel>)
    {
        return of(null).
        pipe
        (
            tap(() =>
                dispatch
                ([
                  new ActionUserWatchLocation(false),
                  new ActionUserWatchCity()
                ])
            ),
            switchMap(() =>
                this.streamReady$.pipe
                (
                    filter((ready: boolean) => ready),
                    take(1)
                )
            )
        )
    }

    @Action(ActionUserAuthenticate)
    authenticate({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        patchState({ authenticating: true });

        return this.auth.authState.pipe
        (
            take(1),

            tap((authData: FirebaseUser) =>
                patchState({ authData, authenticated: authData != null})
            ),
            switchMap((authData: FirebaseUser) =>
                authData == null ?
                    dispatch(new ActionUserNotLoggedIn()) :
                    dispatch(new ActionUserGet(authData.uid))
            ),
            tap(() =>
                patchState({ authenticating: false })
            ),
            catchError((error: Error) =>
                of(patchState({ error, authenticating: false }))
            ),
            finalize(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionUserAuthenticateCheck)
    authenticateCheck({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: ActionUserAuthenticateCheck)
    {
        const authData:      FirebaseUser = payload;
        const authenticated: boolean      = authData != null;

        return of(null).
        pipe
        (
            tap(() =>
                patchState
                ({
                    authData,
                    authenticated,
                    authenticating: false,
                    error: authenticated ? null : { name: 'Failed Login', message: 'Unable to login' }
                })
            ),
            switchMap(() =>
                authenticated ?
                    dispatch(new ActionUserGet(authData.uid)) :
                    of(null)
            )
        );
    }

    @Action(ActionUserWatchLocation, { cancelUncompleted: true })
    watchLocation({ dispatch, getState }: StateContext<StateUserModel>, { save }: ActionUserWatchLocation)
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
                dispatch(new ActionUserPatch(locationCity, save))
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
                this.service.documentWatch<Record<string, StreamInterest>>(StateUserStreamOptions.name as string, cityId)
            ),
            filter((snapshot: DocumentSnapshot<Record<string, StreamInterest>>) =>
                snapshot.exists
            ),
            map((snapshot: DocumentSnapshot<Record<string, StreamInterest>>) =>
                snapshot.data()
            ),
            switchMap((stream: Record<string, StreamInterest>) =>
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

        return dispatch(new ActionUserPatch({ tokens }, true));
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
    logout(context: StateContext<StateUserModel>)
    {
        const { patchState } = context;

        const defaults: StateUserModel = CoreUtil.clone<StateUserModel>(StateUserOptions.defaults);
        patchState(defaults);

        return of(this.auth.auth.signOut()).pipe
        (
            switchMap(() =>
                super.reset(context)
            ),
            tap(() =>
                patchState({ initialized: true })
            ),

            catchError((error: Error) =>
                of(patchState({ error }))
            )
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
        const streamInterest     : StreamInterest = this.store.selectSnapshot(StateUserStream.dataLookup())[id];

        subscriptionPartial = subscriptionsStatus[id] =
        {
            on: subscriptionIsNew ? true : !subscriptionPartial.on
        };

        if (!subscriptionIsNew)
        {
            subscription.on = subscriptionPartial.on;
        }

        if (streamInterest != null)
        {
            streamInterest.on = subscriptionsStatus[id].on;
        }

        return dispatch
        ([
            new ActionUserPatch({ subscriptionsStatus }, true),
            new ActionUserStreamSync(streamInterest)
        ]).
        pipe
        (
            switchMap(() =>
                !subscriptionIsNew ?
                    dispatch(new ActionUserSubscriptionsSync(subscription)) :
                    this.service.documentGet(StateInterestOptions.name as string, id).
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
