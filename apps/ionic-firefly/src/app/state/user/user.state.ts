import * as firebase from 'firebase/app';

import { State, Selector, Action, StateContext, Select} from '@ngxs/store';
import { StoreOptions } from '@ngxs/store/src/symbols';
import { Observable, of, from } from 'rxjs';
import { catchError, switchMap, take, filter, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthProvider } from '@theory/firebase';
import { User } from '@firefly/core';

import { StateLanguage } from '../language/language.state';
import { LanguageGet, LanguageSet } from '../language/language.actions';
import { UserAuthenticate, UserAuthenticateCheck, UserGet, LoginEmail, UserLogout, UserAddToken} from './user.actions';
import { ActionAlertsGet } from '../alert/alert.actions';
import { NotificationsGet } from '../notifications/notifications.actions';

export interface StateUserModel
{
    authData       : firebase.User;
    user           : User;
    error          : Error;
    authenticated  : boolean;
    authenticating : boolean;
    initializing   : boolean;
}

export const StateUserOptions: StoreOptions<StateUserModel> =
{
    name : 'user',

    defaults :
    {
        authData       : undefined,
        user           : undefined,
        error          : undefined,
        authenticated  : false,
        authenticating : false,
        initializing   : false
    }
};

@State<StateUserModel>(StateUserOptions)

export class StateUser
{
    constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {}

    @Select(StateLanguage.language) language$: Observable<string>;

    @Selector() static authData(state: StateUserModel)               {return state.authData;}
    @Selector() static user(state: StateUserModel)                   {return state.user;}
    @Selector() static authenticated(state: StateUserModel)          {return state.authenticated;}
    @Selector() static authenticating(state: StateUserModel)         {return state.authenticating;}
    @Selector() static loading(state: StateUserModel)                {return state.authenticating || state.initializing;}
    @Selector() static loadedNotAuthenticated(state: StateUserModel) {return !StateUser.loading && !StateUser.authenticated;}
    @Selector() static error(state: StateUserModel)                  {return state.error;}

    @Selector() static errored(state: StateUserModel)   {return state.error != null;}
    @Selector() static userFound(state: StateUserModel) {return state.user != null;}

    @Action(UserAuthenticate)
    userAuthenticate({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        patchState({authenticating: true, initializing: true});

        return this.auth.authState.pipe
        (
            switchMap((authData: firebase.User) =>
            {
                if (authData == null)
                {
                    patchState({authenticated: false, authData: authData, authenticating: false});

                    return dispatch(new LanguageGet());
                }
                else
                {
                    patchState({authData: authData, authenticating: false});

                    return dispatch(new UserGet(authData));
                }
            }),

            take(1),

            tap(() => patchState({initializing: false})),

            catchError((error: Error) => of(patchState({error: error, authenticating: false, initializing: false})))
        );
    }

    @Action(UserAuthenticateCheck)
    userAuthenticateCheck({ patchState }: StateContext<StateUserModel>, { payload }: UserAuthenticateCheck)
    {
        return this.language$.pipe
        (
            filter((language: string) => language != null),

            take(1),

            tap((language: string) =>
            {
                const authData: firebase.User = payload;

                if (authData == null)
                {
                    patchState({authData: undefined, authenticated: false, error: {name: 'Failed Login', message: 'Unable to login'}});
                }
                else
                {
                    const user : Partial<User> =
                    {
                        uid      : authData.uid,
                        language : language
                    };

                    console.log(authData);

                    const providerData : firebase.UserInfo = authData.providerData[0];

                    const displayName : string = providerData.displayName;
                    const email       : string = providerData.email;
                    const phoneNumber : string = providerData.phoneNumber;
                    const photoURL    : string = providerData.photoURL;
                    const providerId  : string = providerData.providerId;

                    if (displayName != null) {user.displayName = displayName;}
                    if (email       != null) {user.email       = email;}
                    if (phoneNumber != null) {user.phoneNumber = phoneNumber;}
                    if (photoURL    != null) {user.photoURL    = photoURL;}

                    user.uidInternal = providerId + ':' + providerId === AuthProvider.Email ? email : user.uid;

                    patchState({authData: authData, authenticated: true, user: user as User, authenticating: false});
                }
            })
        );
    }

    @Action(UserGet)
    userGet({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: UserGet)
    {
        const providerData: firebase.UserInfo = payload.providerData[0];
        const providerId: string = providerData.providerId;
        const uidInternal: string = providerId + ':' + (providerId === AuthProvider.Email ? providerData.email : providerData.uid);

        return this.firestore.doc<User>(`user/${uidInternal}`).valueChanges().pipe
        (
            filter((user: User) => user != null),

            take(1),

            switchMap((user: User) =>
            {
                let dependencies$: Observable<void> = of();

                if (user == null)
                {
                    patchState({error: {name: 'Could not find user', message: 'Could not find user'}});
                }
                else
                {
                    patchState({user: user, authenticated: true, authenticating: false});

                    dependencies$ = dispatch([new LanguageSet(user.language), new ActionAlertsGet(), new NotificationsGet()]);
//                    dispatch(new NotificationsWatch());
                }

                return dependencies$;
            }),

            catchError((error: Error) => of(patchState({error: error})))
        );
    }

    @Action(UserAddToken)
    userAddToken({ getState }: StateContext<StateUserModel>, { payload }: UserAddToken)
    {
        const user   : User                   = getState().user;
        const token  : string                 = payload;
        const tokens : Record<string, string> = user.tokens == null ? {} : user.tokens;

        tokens[token] = token;

        return user.tokens != null && user.tokens[token] != null ? of(null) : this.firestore.collection<User>('user').doc(user.uidInternal).update({tokens});
    }

    @Action(LoginEmail)
    loginEmail({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: LoginEmail)
    {
        patchState({authenticating: true});

        return from(firebase.auth().signInWithEmailAndPassword(payload.id, payload.password)).pipe
        (
            switchMap((authData: firebase.auth.UserCredential) => dispatch(new UserAuthenticateCheck(authData.user))),

            catchError((error: Error) => of(patchState({error: error, authenticating: false})))
        );
    }

    @Action(UserLogout)
    userLogout({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        return of(this.auth.auth.signOut()).pipe
        (
            tap(() =>
            {
                patchState
                ({
                    authenticated: false,
                    authData: undefined,
                    user: undefined
                });

                dispatch(new UserLogout());
            }),

            catchError((error: Error) => of(patchState({error: error})))
        );
    }
}
