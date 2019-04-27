import { User as FirebaseUser, auth } from 'firebase/app';

import { State, Selector, Action, StateContext, Select} from '@ngxs/store';
import { Observable, of, from, combineLatest } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { ModelKey } from '@theory/firebase';
import { StateLanguage, ActionLanguageSet } from '@theory/capacitor';

import { User } from '@firefly/core/models';
import { ActionAlertsGet } from '@firefly/core/state/alert';
import { StateUserModel } from './user.state.model';
import { StateUserOptions } from './user.state.options';
import { ActionUserAuthenticate, ActionUserWatch, ActionUserAuthenticateCheck, ActionUserAddToken, ActionLoginEmail, ActionUserLogout, ActionUserWatchLanguage } from './user.actions';
import { ServiceUser } from '@firefly/core/services';

@State<StateUserModel>(StateUserOptions)

export class StateUser
{
    constructor
    (
        private fireAuth: AngularFireAuth,
        private firestore: AngularFirestore,
        private service: ServiceUser
    ) { }

    @Select(StateLanguage.language) language$: Observable<string>;
    @Select(StateUser.user)         user$:     Observable<User>;

    @Selector() static authData(state: StateUserModel)               {return state.authData;}
    @Selector() static user(state: StateUserModel)                   {return state.user;}
    @Selector() static authenticated(state: StateUserModel)          {return state.authenticated;}
    @Selector() static authenticating(state: StateUserModel)         {return state.authenticating;}
    @Selector() static loading(state: StateUserModel)                {return state.authenticating || state.initializing;}
    @Selector() static loadedNotAuthenticated(state: StateUserModel) {return !StateUser.loading && !StateUser.authenticated;}
    @Selector() static error(state: StateUserModel)                  {return state.error;}

    @Selector() static userId(state: StateUserModel)
    {
        const user: User = StateUser.user(state);

        return user == null ? undefined : user[ModelKey.Id];
    }

    @Selector() static errored(state: StateUserModel)   {return state.error != null;}
    @Selector() static userFound(state: StateUserModel) {return state.user != null;}

    ngxsOnInit(context: StateContext<StateUserModel>)
    {
        context.dispatch
        ([
            new ActionUserWatchLanguage()
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

    @Action(ActionUserWatch)
    userWatch({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: ActionUserWatch)
    {
        return this.service.valuesChanges(payload).pipe
        (
            filter((user: User) => user != null),
            tap((user: User) => patchState({ user })),
            tap((user: User) => dispatch([new ActionLanguageSet(user.language), new ActionAlertsGet()])),
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
    userAddToken({ getState }: StateContext<StateUserModel>, { payload }: ActionUserAddToken)
    {
        const user  : User   = StateUser.user(getState());
        const token : string = payload;

        user.tokens        = user.tokens == null ? {} : user.tokens;
        user.tokens[token] = token;

        return this.service.patch(user[ModelKey.Id], { tokens: user.tokens });
    }

    @Action(ActionLoginEmail)
    loginEmail({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: ActionLoginEmail)
    {
        patchState({ authenticating: true });

        return from(auth().signInWithEmailAndPassword(payload.id, payload.password)).pipe
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
}
