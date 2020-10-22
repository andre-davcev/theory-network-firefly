import { User as FirebaseUser, auth, firestore, FirebaseError } from 'firebase/app';

import { State, Selector, Action, StateContext, NgxsOnInit, Store } from '@ngxs/store';
import { Observable, of, from, combineLatest } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map, finalize } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { StateLanguage, ActionLanguageSet } from '@theory/capacitor';

import { User, StreamInterest, SubscriptionPartial, Subscription, AlertPartial, CityInfo } from '@firefly/cloud';
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
    ActionUserSubscriptionToggle,
    ActionUserSubscriptionAdd,
    ActionUserSubscriptionRemove,
    ActionUserSubscriptionOnOff,
    ActionUserInterestTypeSet,
    ActionUserEventTypeSet,
    ActionUserIsPublisherSet,
    ActionUserAnonymousLogin,
    ActionUserSubscriptionsSet,
    ActionUserNotificationsSet,
    ActionUserPatchMetadata,
    ActionUserResetPassword,
    ActionUserInterestVirtualSet,
    ActionUserEventVirtualSet,
    ActionUserWatchCity, ActionUserResetAll, ActionUserSetErrorAuth
} from './user.actions';
import { ServiceUsers } from '@firefly/core/services';
import { StateDocument } from '@theory/ngxs';

import { ActionUserAlertsReset, ActionUserAlertsSetData } from '../../child/user-alerts/user-alerts.actions';
import { ActionUserInterestsReset } from '../../query/user-interests/user-interests.actions';
import { ActionUserEventsReset } from '../../query/user-events/user-events.actions';
import { ActionCityStreamSync } from '../../child/city-stream/city-stream.actions';
import { ActionUserSubscriptionsReset, ActionUserSubscriptionsSetData, ActionUserSubscriptionsAdd, ActionUserSubscriptionsRemove, ActionUserSubscriptionsSync } from '../../child/user-subscriptions/user-subscriptions.actions';
import { StateCityStream } from '../../child/city-stream/city-stream.state';
import { ActionNotificationsWatch } from '@firefly/mobile/state/notifications/notifications.actions';
import { Injectable } from '@angular/core';
import { StateUserSubscriptions } from '../../child/user-subscriptions/user-subscriptions.state';
import { InterestType, EventType, Collection } from '@firefly/core/enums';
import { ActionUserProfileReset } from '../user-profile/user-profile.actions';
import { StateCity } from '../city';

@State<StateUserModel>(StateUserOptions)
@Injectable()
export class StateUser extends StateDocument<User, StateUserModel> implements NgxsOnInit
{
    constructor
    (
        private auth    : AngularFireAuth,
        private store   : Store,
                service : ServiceUsers
    )
    {
        super
        (
            Collection.Users,
            StateUserOptions.defaults,
            service,
            {
                version     : undefined,
                id          : undefined,
                userId      : undefined,
                dateCreated : undefined,
                dateUpdated : undefined,
                metadata    : {},

                city                : null,
                email               : '',
                isPublisher         : false,
                language            : 'en',
                geopoint            : null,
                notifications       : {},
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
                    ActionUserSubscriptionsReset,

                    ActionUserProfileReset,

                    ActionUserEventsReset,
                    ActionUserInterestsReset,
                ],

                ActionsCreate: []
            }
        );
    }

    @Selector() static authData(state: StateUserModel)               : FirebaseUser { return state.authData; }
    @Selector() static authenticated(state: StateUserModel)          : boolean      { return state.authData != null; }
    @Selector() static isAnonymous(state: StateUserModel)            : boolean      { return StateUser.authenticated(state) && StateUser.authData(state).isAnonymous; }
    @Selector() static isUser(state: StateUserModel)                 : boolean      { return StateUser.authenticated(state) && !StateUser.isAnonymous(state); }
    @Selector() static authenticating(state: StateUserModel)         : boolean      { return state.authenticating; }
    @Selector() static language(state: StateUserModel)               : string       { const user: User = StateUser.dataState(state); return user == null ? null : user.language; }
    @Selector() static loading(state: StateUserModel)                : boolean      { return state.authenticating || !state.initialized; }
    @Selector() static loadedNotAuthenticated(state: StateUserModel) : boolean      { return !StateUser.loading(state) && !StateUser.authenticated(state); }
    @Selector() static error(state: StateUserModel)                  : Error         { return state.error; }
    @Selector() static errored(state: StateUserModel)                : boolean       { return StateUser.error(state) != null; }
    @Selector() static errorAuth(state: StateUserModel)              : FirebaseError { return state.errorAuth; }
    @Selector() static errorAuthCode(state: StateUserModel)          : string        { return StateUser.errorAuth(state)?.code; }
    @Selector() static erroredAuth(state: StateUserModel)            : boolean       { return StateUser.errorAuth(state) != null; }
    @Selector() static subscriptionsStatus(state: StateUserModel)    : Record<string, SubscriptionPartial> { const user: User = StateUser.dataState(state); return user == null ? null : !user.subscriptionsStatus ? {} : user.subscriptionsStatus; }
    @Selector() static notifications(state: StateUserModel)          : Record<string, AlertPartial>        { const user: User = StateUser.dataState(state); return user == null ? null : !user.notifications ? {} : user.notifications; }
    @Selector() static tokens(state:StateUserModel)                  : Array<string>{ const user: User = StateUser.dataState(state); return user == null ? null : user.tokens; }
    @Selector() static interestType(state:StateUserModel)            : InterestType { return state.interestType; }
    @Selector() static interestVirtual(state:StateUserModel)         : boolean      { return state.interestVirtual; }
    @Selector() static eventType(state:StateUserModel)               : EventType    { return state.eventType; }
    @Selector() static eventVirtual(state: StateUserModel)           : boolean      { return state.eventVirtual; }
    @Selector() static isPublisher(state: StateUserModel)            : boolean      { return StateUser.dataState(state).isPublisher; }
    @Selector() static email(state: StateUserModel)                  : string       { return StateUser.dataState(state).email; }
    @Selector() static userId(state: StateUserModel)                 : string       { return StateUser.dataState(state).userId; }

    @Selector() static streamEmptyMessage(state: StateUserModel) : string
    {
        const type: InterestType = StateUser.interestType(state);

        return StateUser.interestVirtual(state) ?
            'page.stream.empty.virtual' :
            type === InterestType.Unsubscribed ?
            'page.stream.empty.unsubscribed' :
            type === InterestType.Subscribed ?
            'page.stream.empty.subscribed' :
            'page.stream.empty.created';
    }

    @Selector() static eventsEmptyMessage(state: StateUserModel) : string
    {
        const type: EventType = StateUser.eventType(state);

        return StateUser.eventVirtual(state) ?
            'page.events.empty.virtual' :
            type === EventType.New ?
            'page.events.empty.new' :
            type === EventType.Upcoming ?
            'page.events.empty.upcoming' :
            'page.events.empty.created';
    }

    @Selector
    ([
        StateCity.found,
        StateCityStream.initialized()
    ])
    static initialized(state: StateUserModel, cityFound: boolean, streamInitialized: boolean) : boolean
    {
        return state.initialized && cityFound && streamInitialized;
    }

    public ngxsOnInit(context: StateContext<StateUserModel>)
    {
        context.dispatch
        ([
            new ActionUserAuthenticate(),
            new ActionUserWatchCity()
        ]);
    }

    @Action(ActionUserReset)
    reset(context: StateContext<StateUserModel>)
    {
        return of(null);
    }

    @Action(ActionUserResetAll)
    resetAll(context: StateContext<StateUserModel>)
    {
        return super.reset(context);
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
                    new ActionUserWatchLanguage(),
                    new ActionNotificationsWatch()
                ])
            ),
            switchMap(() =>
                dispatch
                ([
                    new ActionUserNotificationsSet(),
                    new ActionLanguageSet(StateUser.language(getState()))
                ])
            ),
            switchMap(() =>
                this.store.select(StateCityStream.initialized()).pipe
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

    @Action(ActionUserPatchMetadata)
    patchMetadata(context : StateContext<StateUserModel>, action: ActionUserPatchMetadata)
    {
        return super.patchMetadata(context, action);
    }

    @Action(ActionUserCreate)
    create(context: StateContext<StateUserModel>, { credentials }: ActionUserCreate): Observable<any>
    {
        const { patchState, dispatch } = context;

        return dispatch(new ActionUserResetAll()).
        pipe
        (
            tap(() =>
                patchState({ errorAuth: null, authenticating: true })
            ),
            switchMap(() =>
                from(this.auth.createUserWithEmailAndPassword(credentials.id, credentials.password))
            ),
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
            catchError((errorAuth: FirebaseError) =>
                of(patchState({ errorAuth, authenticating: false }))
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

    @Action(ActionUserAnonymousLogin)
    anonymousLogin({ dispatch, patchState }: StateContext<StateUserModel>)
    {
        return dispatch(new ActionUserResetAll()).
        pipe
        (
            tap(() =>
                dispatch(new ActionUserSetErrorAuth())
            ),
            switchMap(() =>
                this.auth.signInAnonymously()
            ),
            tap(() =>
                patchState({ initialized: true })
            ),
            catchError((errorAuth: FirebaseError) =>
                dispatch(new ActionUserSetErrorAuth(errorAuth))
            )
        );
    }

    @Action(ActionUserAuthenticate)
    authenticate({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        patchState({ authenticating: true });

        return this.auth.authState.
        pipe
        (
            take(1),

            tap((authData: FirebaseUser) =>
                patchState({ authData })
            ),
            switchMap((authData: FirebaseUser) =>
                authData == null || authData.isAnonymous ?
                    dispatch(new ActionUserAnonymousLogin()) :
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

    @Action(ActionUserWatchCity, { cancelUncompleted: true })
    watchCity({ dispatch }: StateContext<StateUserModel>)
    {
        const authData$ : Observable<firebase.User>      = this.store.select(StateUser.authData);
        const city$     : Observable<CityInfo>           = this.store.select(StateCity.city);
        const geopoint$ : Observable<firestore.GeoPoint> = this.store.select(StateCity.geopoint);

        return combineLatest([authData$, city$, geopoint$]).
        pipe
        (
            filter(([authData, city, geopoint]) =>
                authData != null && !authData.isAnonymous && city != null && geopoint != null
            ),
            switchMap(([authData, city, geopoint]) =>
                this.store.select(StateUser.found()).
                pipe
                (
                    filter((userFound: boolean) =>
                        userFound
                    ),
                    take(1),
                    switchMap(() =>
                        dispatch(new ActionUserPatch({ city, geopoint }, true))
                    )
                )
            )
        );
    }

    @Action(ActionUserWatchLanguage, { cancelUncompleted: true })
    watchLanguage({ dispatch, getState }: StateContext<StateUserModel>)
    {
        return this.store.select(StateLanguage.language).pipe
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
        return dispatch(new ActionUserResetAll()).
        pipe
        (
            tap(() => patchState({ errorAuth: null, authenticating: true })),
            switchMap(() =>
                from(this.auth.signInWithEmailAndPassword(payload.id, payload.password))
            ),
            map((userCredential: firebase.auth.UserCredential) => userCredential.user),
            switchMap((authData: FirebaseUser) => dispatch(new ActionUserAuthenticateCheck(authData))),
            catchError((errorAuth: FirebaseError) =>
                of(patchState({ errorAuth, authenticating: false }))
            )
        );
    }

    @Action(ActionUserLogout)
    logout(context: StateContext<StateUserModel>)
    {
        const { patchState } = context;

        patchState({ error: null });

        return of(this.auth.signOut()).
        pipe
        (
            switchMap(() =>
                this.store.dispatch(new ActionUserAnonymousLogin())
            ),
            catchError((error: Error) =>
                of(patchState({ error }))
            )
        );
    }

    @Action(ActionUserResetPassword)
    resetPassord({ dispatch, patchState }: StateContext<StateUserModel>, { payload }: ActionUserResetPassword)
    {
        patchState({ errorAuth: null });

        return from(this.auth.sendPasswordResetEmail(payload.id)).
        pipe
        (
            catchError((errorAuth: FirebaseError) =>
                dispatch(new ActionUserSetErrorAuth(errorAuth))
            )
        );
    }

    @Action(ActionUserSubscriptionsSet)
    subscriptionsSet({ dispatch }: StateContext<StateUserModel>)
    {
        const subscriptions: Record<string, SubscriptionPartial> = this.store.selectSnapshot(StateUser.subscriptionsStatus);

        return dispatch(new ActionUserSubscriptionsSetData(subscriptions, true));
    }

    @Action(ActionUserSubscriptionToggle)
    subscriptionToggle({ dispatch, getState }: StateContext<StateUserModel>, { id, permanent }: ActionUserSubscriptionToggle)
    {
        const subscription : SubscriptionPartial = StateUser.subscriptionsStatus(getState())[id];

        return !permanent ?
                  dispatch(new ActionUserSubscriptionOnOff(id, !subscription.on)) :
                  (subscription == null ?
                      dispatch(new ActionUserSubscriptionAdd(id)) :
                      dispatch(new ActionUserSubscriptionRemove(id))
                  );
    }

    @Action(ActionUserSubscriptionAdd)
    subscriptionAdd({ dispatch, getState }: StateContext<StateUserModel>, { id }: ActionUserSubscriptionAdd)
    {
        const state: StateUserModel = getState();

        const subscriptionsStatus    : Record<string, SubscriptionPartial> = StateUser.subscriptionsStatus(state);
        const streamInterest         : StreamInterest                      = this.store.selectSnapshot(StateCityStream.dataLookup())[id];
        const streamInterestSnapshot : firestore.DocumentSnapshot          = this.store.selectSnapshot(StateCityStream.snapshotLookup())[id];

        subscriptionsStatus[id] = { on : true };
        streamInterest.on       = true;

        return dispatch
        ([
            new ActionUserPatch({ subscriptionsStatus }, true),
            new ActionCityStreamSync(streamInterest),
            new ActionUserSubscriptionsAdd(streamInterestSnapshot, streamInterest)
        ]);
    }

    @Action(ActionUserSubscriptionRemove)
    subscriptionRemove({ dispatch, getState }: StateContext<StateUserModel>, { id }: ActionUserSubscriptionRemove)
    {
        const state: StateUserModel = getState();

        const subscriptionsStatus : Record<string, SubscriptionPartial> = StateUser.subscriptionsStatus(state);
        const streamInterest      : StreamInterest                      = this.store.selectSnapshot(StateCityStream.dataLookup())[id];

        delete subscriptionsStatus[id];
        delete streamInterest.on;

        return dispatch
        ([
            new ActionUserPatch({ subscriptionsStatus }, true),
            new ActionCityStreamSync(streamInterest),
            new ActionUserSubscriptionsRemove(id)
        ]);
    }

    @Action(ActionUserSubscriptionOnOff)
    subscriptionOnOff({ dispatch, getState }: StateContext<StateUserModel>, { id, on }: ActionUserSubscriptionOnOff)
    {
        const state: StateUserModel = getState();

        const subscriptionsStatus    : Record<string, SubscriptionPartial> = StateUser.subscriptionsStatus(state);
        const streamInterest         : StreamInterest                      = this.store.selectSnapshot(StateCityStream.dataLookup())[id];
        const subscription           : Subscription                        = this.store.selectSnapshot(StateUserSubscriptions.dataLookup())[id];

        subscriptionsStatus[id].on = on;

        const actions: Array<any> =
        [
            new ActionUserPatch({ subscriptionsStatus }, true)
        ];

        if (streamInterest != null && streamInterest.on != null)
        {
            streamInterest.on = on;

            actions.push(new ActionCityStreamSync(streamInterest));
        }

        if (subscription != null)
        {
            subscription.on = on;

            actions.push(new ActionUserSubscriptionsSync(subscription))
        }

        return dispatch(actions);
    }

    @Action(ActionUserNotificationsSet)
    notificationsSet({ dispatch }: StateContext<StateUserModel>)
    {
        const notifications : Record<string, AlertPartial> = this.store.selectSnapshot(StateUser.notifications);
        const alerts        : Record<string, AlertPartial> = {};

        const dateCutoff: Date = new Date();
        dateCutoff.setDate(dateCutoff.getDate() + 1); // Add 1 day
        const timeCutoff: number = dateCutoff.getTime();

        Object.keys(notifications).forEach((id: string) =>
        {
            if (notifications[id].timeStart.toDate().getTime() > timeCutoff)
            {
                alerts[id] = notifications[id];
            }
        });

        return dispatch(new ActionUserAlertsSetData(alerts, true));
    }

    @Action(ActionUserInterestTypeSet)
    interestTypeSet({ patchState }: StateContext<StateUserModel>, { interestType }: ActionUserInterestTypeSet)
    {
        patchState({ interestType });
    }

    @Action(ActionUserInterestVirtualSet)
    interestVirtualSet({ patchState }: StateContext<StateUserModel>, { virtual }: ActionUserInterestVirtualSet)
    {
        patchState({ interestVirtual: virtual });
    }

    @Action(ActionUserEventTypeSet)
    eventTypeSet({ patchState }: StateContext<StateUserModel>, { eventType }: ActionUserEventTypeSet)
    {
        patchState({ eventType });
    }

    @Action(ActionUserEventVirtualSet)
    eventVirtualSet({ patchState }: StateContext<StateUserModel>, { virtual }: ActionUserEventVirtualSet)
    {
        patchState({ eventVirtual: virtual });
    }

    @Action(ActionUserIsPublisherSet)
    isPublisherSet({ dispatch }: StateContext<StateUserModel>, { isPublisher }: ActionUserIsPublisherSet)
    {
        return dispatch(new ActionUserPatch({ isPublisher }, true));
    }

    @Action(ActionUserSetErrorAuth)
    setErrorAuth({ patchState }: StateContext<StateUserModel>, { errorAuth }: ActionUserSetErrorAuth)
    {
        patchState({ errorAuth });
    }
}
