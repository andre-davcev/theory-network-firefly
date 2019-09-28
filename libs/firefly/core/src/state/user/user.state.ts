import { User as FirebaseUser } from 'firebase/app';

import { State, Selector, Action, StateContext, Select, NgxsOnInit, Store} from '@ngxs/store';
import { Observable, of, from, combineLatest, forkJoin } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { StateLanguage, ActionLanguageSet } from '@theory/capacitor';

import { User, Alert } from '@firefly/core/models';
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
  ActionUserCreate,
  ActionUserSave,
  ActionUserDelete
} from './user.actions';
import { ServiceUsers } from '@firefly/core/services';
import { CoreUtil, CoreEnum } from '@theory/core';
import { FormNgxs, FormNgxsStatus } from '@theory/state';
import { FormGroup } from '@angular/forms';
import { SetFormPristine, UpdateFormValue } from '@ngxs/form-plugin';

@State<StateUserModel>(StateUserOptions)
export class StateUser implements NgxsOnInit
{
    constructor
    (
        private store:   Store,
        private service: ServiceUsers,
        private auth:    AngularFireAuth
    ) { }

    @Select(StateLanguage.language) language$: Observable<string>;
    @Select(StateUser.data)         data$:     Observable<User>;

    @Selector() static form(state: StateUserModel): FormNgxs       { return state.form; }
    @Selector() static formGroup(state: StateUserModel): FormGroup { return state.formGroup; }
    @Selector() static formPath(state: StateUserModel): string     { return state.formPath; }
    @Selector() static isForm(state: StateUserModel): boolean      { return StateUser.formGroup(state) != null; }
    @Selector() static data(state: StateUserModel): User           { return StateUser.form(state).model; }
    @Selector() static id(state: StateUserModel): string           { return StateUser.data(state).id; }
    @Selector() static isNew(state: StateUserModel): boolean       { return StateUser.id(state) === CoreEnum.IdNew; }
    @Selector() static canUpdate(state: StateUserModel): boolean   { return StateUser.form(state).status === FormNgxsStatus.Valid && StateUser.form(state).dirty; }

    @Selector() static authData(state: StateUserModel): FirebaseUser              { return state.authData; }
    @Selector() static authenticated(state: StateUserModel): boolean              { return state.authenticated; }
    @Selector() static authenticating(state: StateUserModel): boolean             { return state.authenticating; }
    @Selector() static loading(state: StateUserModel): boolean                    { return state.authenticating || state.initializing; }
    @Selector() static loadedNotAuthenticated(state: StateUserModel):boolean      { return !StateUser.loading(state) && !StateUser.authenticated(state); }
    @Selector() static error(state: StateUserModel): Error                        { return state.error; }
    @Selector() static errored(state: StateUserModel)                             { return state.error != null; }
    @Selector() static found(state: StateUserModel)                               { return StateUser.data(state) != null; }

    ngxsOnInit(context: StateContext<StateUserModel>)
    {
        context.dispatch
        ([
            new ActionUserWatchLanguage(),
            new ActionUserAuthenticate()
        ]);
    }

    @Action(ActionUserReset)
    reset({ patchState, getState, dispatch }: StateContext<StateUserModel>)
    {
        const defaults: StateUserModel = CoreUtil.clone<StateUserModel>(StateUserOptions.defaults);

        patchState(defaults);

        return dispatch
        ([
            new SetFormPristine(StateUser.formPath(getState()))
        ]);
    }

    @Action(ActionUserGet)
    get({ dispatch }: StateContext<StateUserModel>, { payload }: ActionUserGet)
    {
        const id: string = payload;

        const object$: Observable<User> = id === CoreEnum.IdNew ?
            of(this.service.build(this.store.selectSnapshot(StateUser.id), StateUserOptions.defaults.empty)) :
            this.service.snapshot(id);

        return object$.pipe
        (
            switchMap((object: User) =>
                dispatch
                ([
                    new ActionUserSet(object)
                ])
            )
        );
    }

    @Action(ActionUserSet)
    set({ patchState, getState, dispatch }: StateContext<StateUserModel>, { payload }: ActionUserSet)
    {
        const object: User = payload;

        return dispatch(new ActionUserReset()).
        pipe
        (
            map(() => patchState({ formGroup: this.service.formCreate(object) }) ),
            switchMap(() =>
                dispatch(new UpdateFormValue({ value: object, path: StateUser.formPath(getState())}))
            )
        );
    }

    @Action(ActionUserPatch)
    patch({ dispatch, getState } : StateContext<StateUserModel>, { payload, save }: ActionUserPatch)
    {
        const value: Partial<User>    = payload;
        const state: StateUserModel   = getState();
        const path:  string           = StateUser.formPath(state);
        const save$: Observable<void> = save ? this.service.patch(StateUser.id(state), value) : of();

        return save$.pipe
        (
            switchMap(() => dispatch(new UpdateFormValue({ value, path })))
        );
    }

    @Action(ActionUserCreate)
    create({ getState }: StateContext<StateUserModel>)
    {
        const state: StateUserModel = getState();
        const data:  User           = StateUser.data(state);

        return this.service.create(data);
    }

    @Action(ActionUserSave)
    save({ getState }: StateContext<StateUserModel>)
    {
        const data: User = StateUser.data(getState());

        return this.service.patch(data.id, data);
    }

    @Action(ActionUserDelete)
    delete({ getState, dispatch }: StateContext<StateUserModel>)
    {
        const data: User = StateUser.data(getState());

        return this.service.delete(data).
        pipe
        (
            switchMap(() => dispatch(new ActionUserReset()))
        );
    }

    @Action(ActionUserAuthenticate)
    authenticate({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        patchState({ authenticating: true, initializing: true });

        return this.auth.authState.pipe
        (
            take(1),
            tap((authData: FirebaseUser) => patchState({ authData, authenticating: false, authenticated: authData != null })),
            switchMap((authData: FirebaseUser) => authData == null ? of() : dispatch(new ActionUserWatch(this.service.parseId(authData)))),
            tap(() => patchState({ initializing: false })),
            catchError((error: Error) => of(patchState({ error, authenticating: false, initializing: false })))
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

            switchMap((authData: FirebaseUser) => dispatch(new ActionUserWatch(this.service.parseId(authData)))),
            tap(() => patchState({ authenticated: false }))
        );
    }

    @Action(ActionUserWatch, { cancelUncompleted: true })
    watch({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: ActionUserWatch)
    {
        return this.service.valuesChanges(payload).pipe
        (
            filter((user: User) => user != null),
            tap((user: User) =>
                dispatch
                ([
                    new ActionLanguageSet(user.language),
                    new ActionUserSet(user)
                ])
            ),

            catchError((error: Error) => of(patchState({ error })))
        );
    }

    @Action(ActionUserWatchLanguage)
    watchLanguage({ dispatch }: StateContext<StateUserModel>)
    {
        return combineLatest([this.data$, this.language$]).pipe
        (
            filter(([user, language]) => user != null && user.language != null && language != null),
            filter(([user, language]) => user.language !== language),
            switchMap(([user, language]) => dispatch(new ActionUserPatch({ language }, true)))
        );
    }

    @Action(ActionUserAddToken)
    addToken({ getState, dispatch }: StateContext<StateUserModel>, { payload }: ActionUserAddToken)
    {
        const user   : User   = StateUser.data(getState());
        const token  : string = payload;

        const tokens : Record<string, string> = user.tokens == null ? {[token]: token} : {...user.tokens, [token]: token};

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
    logout({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        return of(this.auth.auth.signOut()).pipe
        (
            switchMap(() => dispatch(new ActionUserReset())),
            catchError((error: Error) => of(patchState({ error })))
        );
    }
}
