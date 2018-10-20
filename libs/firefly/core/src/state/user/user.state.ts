import { User as FirebaseUser, auth, UserInfo } from 'firebase/app';

import { State, Selector, Action, StateContext, Select} from '@ngxs/store';
import { Observable, of, from } from 'rxjs';
import { catchError, switchMap, take, filter, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthProvider } from '@theory/firebase';

import { StateLanguage, ActionLanguageGet, ActionLanguageSet } from '@firefly/core/state/language';
import { User } from '@firefly/core/models';
import { ActionAlertsGet } from '@firefly/core/state/alert';
import { StateUserModel } from './user.state.model';
import { StateUserOptions } from './user.state.options';
import { ActionUserAuthenticate, ActionUserGet, ActionUserAuthenticateCheck, ActionUserAddToken, ActionLoginEmail, ActionUserLogout } from './user.actions';

@State<StateUserModel>(StateUserOptions)

export class StateUser
{
    constructor(private fireAuth: AngularFireAuth, private firestore: AngularFirestore) {}

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

    @Action(ActionUserAuthenticate)
    userAuthenticate({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        patchState({authenticating: true, initializing: true});

        return this.fireAuth.authState.pipe
        (
            switchMap((authData: FirebaseUser) =>
            {
                if (authData == null)
                {
                    patchState({authenticated: false, authData: authData, authenticating: false});

                    return dispatch(new ActionLanguageGet());
                }
                else
                {
                    patchState({authData: authData, authenticating: false});

                    return dispatch(new ActionUserGet(authData));
                }
            }),

            take(1),

            tap(() => patchState({initializing: false})),

            catchError((error: Error) => of(patchState({error: error, authenticating: false, initializing: false})))
        );
    }

    @Action(ActionUserAuthenticateCheck)
    userAuthenticateCheck({ patchState }: StateContext<StateUserModel>, { payload }: ActionUserAuthenticateCheck)
    {
        return this.language$.pipe
        (
            filter((language: string) => language != null),

            take(1),

            tap((language: string) =>
            {
                const authData: FirebaseUser = payload;

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

                    const providerData : UserInfo = authData.providerData[0];

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

    @Action(ActionUserGet)
    userGet({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: ActionUserGet)
    {
        const providerData: UserInfo = payload.providerData[0];
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
                    patchState({ user: user, authenticated: true, authenticating: false });

                    dependencies$ = dispatch([new ActionLanguageSet(user.language), new ActionAlertsGet()]);
//                    dispatch(new NotificationsWatch());
                }

                return dependencies$;
            }),

            catchError((error: Error) => of(patchState({error: error})))
        );
    }

    @Action(ActionUserAddToken)
    userAddToken({ getState }: StateContext<StateUserModel>, { payload }: ActionUserAddToken)
    {
        const user   : User                   = getState().user;
        const token  : string                 = payload;
        const tokens : Record<string, string> = user.tokens == null ? {} : user.tokens;

        tokens[token] = token;

        return user.tokens != null && user.tokens[token] != null ? of(null) : this.firestore.collection<User>('user').doc(user.uidInternal).update({tokens});
    }

    @Action(ActionLoginEmail)
    loginEmail({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: ActionLoginEmail)
    {
        patchState({authenticating: true});

        return from(auth().signInWithEmailAndPassword(payload.id, payload.password)).pipe
        (
            switchMap((authData: firebase.auth.UserCredential) => dispatch(new ActionUserAuthenticateCheck(authData.user))),

            catchError((error: Error) => of(patchState({error: error, authenticating: false})))
        );
    }

    @Action(ActionUserLogout)
    userLogout({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        return of(this.fireAuth.auth.signOut()).pipe
        (
            tap(() =>
            {
                patchState
                ({
                    authenticated: false,
                    authData: undefined,
                    user: undefined
                });

                dispatch(new ActionUserLogout());
            }),

            catchError((error: Error) => of(patchState({error: error})))
        );
    }
}
