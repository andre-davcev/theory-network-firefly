import { State, Selector, Action, StateContext, NgxsOnInit, Store } from '@ngxs/store';
import { Observable, of, from, combineLatest } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FieldValue, serverTimestamp } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User as FirebaseUser } from '@angular/fire/auth';
import { UserCredential } from '@angular/fire/auth';

import { StateDocument } from '@theory/ngxs';
import { GeoPoint } from '@theory/firebase';
import { StateLanguage, ActionLanguageSet } from '@theory/capacitor';
import { User, SubscriptionPartial, AlertPartial, CityInfo, Token } from '@firefly/cloud';

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
    ActionUserIsPublisherSet,
    ActionUserAnonymousLogin,
    ActionUserNotificationsSet,
    ActionUserPatchMetadata,
    ActionUserResetPassword,
    ActionUserWatchCity, ActionUserResetAll, ActionUserSetErrorAuth
} from './user.actions';
import { ServiceUsers } from '../../../services';
import { ActionUserAlertsReset, ActionUserAlertsSetData } from '../../child/user-alerts/user-alerts.actions';
import { ActionUserInterestsReset } from '../../query/user-interests/user-interests.actions';
import { ActionUserEventsReset } from '../../query/user-events/user-events.actions';
import { ActionUserSubscriptionsReset } from '../../child/user-subscriptions/user-subscriptions.actions';
import { StateCityStream } from '../../child/city-stream/city-stream.state';
import { ActionNotificationsWatch } from '../../basic/notifications/notifications.actions';
import { Collection, EventType, InterestType } from '../../../enums';

import { ActionUserProfileReset } from '../user-profile/user-profile.actions';
import { StateCity } from '../city/city.state';
import { ActionInterestsPage, ActionInterestsSetSubscriptions, ActionInterestsSetType } from '../../composite/interests/interests.actions';
import { ActionCalendarSetType } from '../../composite/calendar/calendar.actions';

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
                tokens              : {}
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
    @Selector() static tokens(state:StateUserModel)                  : Record<string, Token> { return StateUser.dataState(state)?.tokens; }
    @Selector() static isPublisher(state: StateUserModel)            : boolean      { return StateUser.dataState(state).isPublisher; }
    @Selector() static email(state: StateUserModel)                  : string       { return StateUser.dataState(state).email; }
    @Selector() static userId(state: StateUserModel)                 : string       { return StateUser.dataState(state).userId; }
    @Selector() static initialized(state: StateUserModel)            : boolean      { return state.initialized; }

    public ngxsOnInit(context: StateContext<StateUserModel>)
    {
        context.dispatch
        ([
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

        return super.set(context, action).
        pipe
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
                    new ActionLanguageSet(StateUser.language(getState())),
                    new ActionInterestsSetSubscriptions(StateUser.subscriptionsStatus(getState()))
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
            map((userCredential: UserCredential) =>
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
    anonymousLogin({ dispatch, getState }: StateContext<StateUserModel>)
    {
        const initialized: boolean = StateUser.initialized(getState());

        return (
            initialized ?
                dispatch(new ActionUserResetAll()) :
                of(null)
        ).
        pipe
        (
            switchMap(() =>
                dispatch([
                  new ActionUserSetErrorAuth(),
                  new ActionInterestsSetSubscriptions(StateUser.subscriptionsStatus(getState()))
                ])
            ),
            switchMap(() =>
                from(this.auth.signInAnonymously())
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
        const authData$ : Observable<FirebaseUser>       = this.store.select(StateUser.authData);
        const city$     : Observable<CityInfo>           = this.store.select(StateCity.city);
        const geopoint$ : Observable<GeoPoint> = this.store.select(StateCity.geopoint);

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
        const tokens   : Record<string, Token> = StateUser.tokens(getState());
        const token    : string                = payload;
        const existing : Token                 = tokens[token];
        const now      : FieldValue            = serverTimestamp();

        tokens[token] = existing == null ?
        {
            token,
            usedFirst: now,
            usedLast: now
        } :
        {
            ...existing,
            usedLast: now
        };

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
            map((userCredential: UserCredential) =>
                userCredential.user
            ),
            switchMap((authData: FirebaseUser) =>
                dispatch(new ActionUserAuthenticateCheck(authData)).
                pipe
                (
                    switchMap(() =>
                        authData == null ?
                            of(null) :
                            dispatch(new ActionInterestsPage())
                    )
                )
            ),
            catchError((errorAuth: FirebaseError) =>
                of(patchState({ errorAuth, authenticating: false }))
            )
        );
    }

    @Action(ActionUserLogout)
    logout(context: StateContext<StateUserModel>)
    {
        const { patchState, dispatch } = context;

        patchState({ error: null, authData: null });

        return of(this.auth.signOut()).
        pipe
        (
            switchMap(() =>
                dispatch
                ([
                    new ActionInterestsSetType(InterestType.Unsubscribed),
                    new ActionCalendarSetType(EventType.Upcoming)
                ])
            ),
            switchMap(() =>
                dispatch(new ActionUserAnonymousLogin())
            ),
            switchMap(() =>
                dispatch(new ActionInterestsPage())
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

    @Action(ActionUserIsPublisherSet)
    isPublisherSet({ dispatch }: StateContext<StateUserModel>, { isPublisher }: ActionUserIsPublisherSet)
    {
        return dispatch(new ActionUserPatch({ isPublisher }, true)).
        pipe
        (
            filter(() =>
                !isPublisher
            ),
            switchMap(() =>
                dispatch
                ([
                    new ActionInterestsSetType(InterestType.Unsubscribed),
                    new ActionCalendarSetType(EventType.Upcoming)
                ])
            )
        );
    }

    @Action(ActionUserSetErrorAuth)
    setErrorAuth({ patchState }: StateContext<StateUserModel>, { errorAuth }: ActionUserSetErrorAuth)
    {
        patchState({ errorAuth });
    }
}
