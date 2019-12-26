import { User as FirebaseUser, auth, firestore } from 'firebase/app';

import { State, Selector, Action, StateContext, Select, NgxsOnInit} from '@ngxs/store';
import { Observable, of, from, combineLatest } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { StateLanguage, ActionLanguageSet, StateLocation } from '@theory/capacitor';

import { User } from '@firefly/cloud';
import { StateUserModel } from './user.state.model';
import { StateUserOptions } from './user.state.options';
import {
    ActionUserAuthenticate,
    ActionUserWatch,
    ActionUserAuthenticateCheck,
    ActionUserAddToken,
    ActionUserLoginEmail,
    ActionUserLogout,
    ActionUserWatchProperties,
    ActionUserReset,
    ActionUserGet,
    ActionUserSet,
    ActionUserPatch,
    ActionUserSave,
    ActionUserDelete,
    ActionUserCreate,
    ActionUserUpdate
} from './user.actions';
import { ServiceUsers } from '@firefly/core/services';
import { CoreUtil } from '@theory/core';
import { StateDocument } from '@theory/ngxs';

import { ActionUserAlertsReset, ActionUserAlertsGetData } from '../../query/user-alerts/user-alerts.actions';
import { ActionUserClustersReset } from '../../query/user-clusters/user-clusters.actions';
import { ActionUserEventsReset } from '../../query/user-events/user-events.actions';
import { ActionUserIconsReset } from '../../query/user-icons/user-icons.actions';
import { ActionUserImagesReset } from '../../query/user-images/user-images.actions';
import { ActionUserStreamReset, ActionUserStreamGetData } from '../../query/user-stream/user-stream.actions';
import { ActionUserSubscriptionsReset } from '../../child/user-subscriptions/user-subscriptions.actions';
import { GeolocationPosition } from '@capacitor/core';

@State<StateUserModel>(StateUserOptions)
export class StateUser extends StateDocument<User, StateUserModel> implements NgxsOnInit
{
    constructor
    (
        private auth: AngularFireAuth,
        service: ServiceUsers
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
                dateLoggedIn        : null,
                email               : '',
                language            : 'en',
                location            : null,
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

    @Selector() static authData(state: StateUserModel):               FirebaseUser { return state.authData; }
    @Selector() static authenticated(state: StateUserModel):          boolean      { return state.authenticated; }
    @Selector() static authenticating(state: StateUserModel):         boolean      { return state.authenticating; }
    @Selector() static loading(state: StateUserModel):                boolean      { return state.authenticating || state.initializing; }
    @Selector() static loadedNotAuthenticated(state: StateUserModel): boolean      { return !StateUser.loading(state) && !StateUser.authenticated(state); }
    @Selector() static error(state: StateUserModel):                  Error        { return state.error; }
    @Selector() static errored(state: StateUserModel):                boolean      { return state.error != null; }

    @Select(StateUser.found())      found$    : Observable<boolean>;
    @Select(StateLanguage.language) language$ : Observable<string>;
    @Select(StateLocation.location) location$ : Observable<GeolocationPosition>;
    @Select(StateLocation.cityId)   cityId$   : Observable<string>;

    ngxsOnInit(context: StateContext<StateUserModel>)
    {
        context.dispatch
        ([
            new ActionUserWatchProperties(),
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
        const { dispatch, patchState } = context;

        return super.set(context, action).pipe
        (
            switchMap(() =>
                dispatch
                ([
                    new ActionUserAlertsGetData(),
                    new ActionUserStreamGetData()
                ])
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
        const { dispatch } = context;

        return super.watch(context, action).pipe
        (
            filter((user: User) =>
                user != null
            ),
            tap((user: User) =>
                dispatch(new ActionLanguageSet(user.language))
            )
        );
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
                    of(patchState({initializing: false})) :
                    dispatch(new ActionUserWatch(authData.uid))
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
                dispatch(new ActionUserWatch(authData.uid))
            ),
            tap(() =>
                patchState({ authenticated: false })
            )
        );
    }

    @Action(ActionUserWatchProperties)
    watchProperties({ dispatch }: StateContext<StateUserModel>)
    {
        return combineLatest([this.language$, this.location$, this.cityId$, this.found$]).pipe
        (
            filter(([language, location, cityId, found]) =>
                found && language != null && location != null && cityId != null
            ),
            switchMap(([language, location, cityId]) =>
                dispatch
                (
                    new ActionUserPatch
                    ({
                        language,
                        cityId,

                        location     : new firestore.GeoPoint(location.coords.latitude, location.coords.longitude),
                        dateLoggedIn : firestore.Timestamp.now()
                    }, true)
                )
            )
        );
    }

    @Action(ActionUserAddToken)
    addToken({ getState, dispatch }: StateContext<StateUserModel>, { payload }: ActionUserAddToken)
    {
        const user   : User   = StateUser.dataState(getState());
        const token  : string = payload;

        const tokens : Array<string> = user.tokens == null ? [token] : [...user.tokens, token];

        return dispatch(new ActionUserPatch({ tokens })).pipe
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
}
