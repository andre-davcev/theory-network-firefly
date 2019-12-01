import { User as FirebaseUser } from 'firebase/app';

import { State, Selector, Action, StateContext, Select, NgxsOnInit} from '@ngxs/store';
import { Observable, of, from, combineLatest } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { StateLanguage, ActionLanguageSet } from '@theory/capacitor';

import { User } from '@firefly/core/models';
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
    ActionUserCreate
} from './user.actions';
import { ServiceUsers } from '@firefly/core/services';
import { CoreUtil, CoreEnum } from '@theory/core';
import { FormNgxs, FormNgxsStatus } from '@theory/ngxs';
import { FormGroup } from '@angular/forms';
import { SetFormPristine, UpdateFormValue } from '@ngxs/form-plugin';

import { ActionUserAlertsDelete, ActionUserAlertsReset, ActionUserAlertsGetData } from '../../query/user-alerts/user-alerts.actions';
import { ActionUserClustersReset } from '../../query/user-clusters/user-clusters.actions';
import { ActionUserEventsReset } from '../../query/user-events/user-events.actions';
import { ActionUserIconsReset } from '../../query/user-icons/user-icons.actions';
import { ActionUserImagesReset } from '../../query/user-images/user-images.actions';
import { ActionUserStreamDelete, ActionUserStreamReset, ActionUserStreamGetData } from '../../query/user-stream/user-stream.actions';
import { ActionUserSubscriptionsDelete, ActionUserSubscriptionsReset } from '../../query/user-subscriptions/user-subscriptions.actions';

@State<StateUserModel>(StateUserOptions)
export class StateUser implements NgxsOnInit
{
    constructor
    (
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

    @Selector() static authData(state: StateUserModel): FirebaseUser              {return state.authData;}
    @Selector() static authenticated(state: StateUserModel): boolean              {return state.authenticated;}
    @Selector() static authenticating(state: StateUserModel): boolean             {return state.authenticating;}
    @Selector() static loading(state: StateUserModel): boolean                    {return state.authenticating || state.initializing;}
    @Selector() static loadedNotAuthenticated(state: StateUserModel):boolean      {return !StateUser.loading(state) && !StateUser.authenticated(state);}
    @Selector() static error(state: StateUserModel): Error                        {return state.error;}
    @Selector() static errored(state: StateUserModel)                             {return state.error != null;}
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

        return dispatch
        ([
            new ActionUserAlertsReset(),
            new ActionUserClustersReset(),
            new ActionUserEventsReset(),
            new ActionUserIconsReset(),
            new ActionUserImagesReset(),
            new ActionUserStreamReset(),
            new ActionUserSubscriptionsReset(),
            new SetFormPristine(StateUser.formPath(getState()))
        ]);
    }

    @Action(ActionUserGet)
    get({ dispatch, getState }: StateContext<StateUserModel>, { payload }: ActionUserGet)
    {
        const id: string = payload;

        const object$: Observable<User> = id === CoreEnum.IdNew ?
            of(this.service.build(id, StateUserOptions.defaults.empty)) :
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
            ),
            switchMap(() =>
                dispatch
                ([
                    new ActionUserAlertsGetData(),
                    new ActionUserStreamGetData()
                ])
            ),
            tap(() => patchState({ initializing: false })),
        );
    }

    @Action(ActionUserPatch)
    patch({ dispatch, getState } : StateContext<StateUserModel>, { payload }: ActionUserPatch)
    {
        const state: StateUserModel = getState();
        const data:  User           = StateUser.data(state);
        const value: User           = { ...data, ...payload };
        const path:  string         = StateUser.formPath(state);

        return dispatch(new UpdateFormValue({ value, path }));
    }

    @Action(ActionUserSave)
    save({ getState, dispatch }: StateContext<StateUserModel>)
    {
        const state:     StateUserModel = getState();
        const formPath:  string         = StateUser.formPath(state);
        const formGroup: FormGroup      = StateUser.formGroup(state);
        const id:        string         = StateUser.id(state);

        return this.service.patch(id, this.service.changedFields(formGroup)).
        pipe
        (
            switchMap(() => dispatch(new SetFormPristine(formPath)))
        );
    }

    @Action(ActionUserDelete)
    delete({ getState, dispatch }: StateContext<StateUserModel>)
    {
        const data: User = StateUser.data(getState());

        return this.service.delete(data).
        pipe
        (
            switchMap(() =>
                dispatch
                ([
                    new ActionUserAlertsDelete(),
                    new ActionUserStreamDelete(),
                    new ActionUserSubscriptionsDelete(),
                    new ActionUserReset()
                ]))
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
            switchMap((authData: FirebaseUser) => authData == null ? of(null) : dispatch(new ActionUserWatch(this.service.parseId(authData)))),
            catchError((error: Error) => of(patchState({error, authenticating: false, initializing: false})))
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

            catchError((error: Error) => of(patchState({ error})))
        );
    }

    @Action(ActionUserWatchLanguage)
    watchLanguage({ dispatch }: StateContext<StateUserModel>)
    {
        return combineLatest([this.data$, this.language$]).pipe
        (
            filter(([user, language]) => user != null && user.language != null && language != null),
            filter(([user, language]) => user.language !== language),
            switchMap(([user, language]) => dispatch(new ActionUserPatch({ language }))),
            switchMap(() => dispatch(new ActionUserSave()))
        );
    }

    @Action(ActionUserAddToken)
    addToken({ getState, dispatch }: StateContext<StateUserModel>, { payload }: ActionUserAddToken)
    {
        const user   : User   = StateUser.data(getState());
        const token  : string = payload;

        const tokens : Record<string, string> = user.tokens == null ? {[token]: token} : {...user.tokens, [token]: token};

        return dispatch(new ActionUserPatch({ tokens })).pipe
        (
            switchMap(() => dispatch(new ActionUserSave()))
        );
    }

    @Action(ActionUserCreate)
    userCreate({ patchState, dispatch, getState }: StateContext<StateUserModel>, { payload }: ActionUserCreate)
    {
        patchState({ authenticating: true });

        /*this.fireAuth.auth.signInWithEmailAndPassword(payload.id, payload.password).catch(function(error) {

          let errorCode = error.code;
          let errorMessage = error.message;
          console.log('errorCode' + errorCode);
          console.log('errorMessage: ' + errorMessage);


        });
        return null;*/
        return from(this.auth.auth.createUserWithEmailAndPassword(payload.id, payload.password)).pipe
        (
            map((userCredential: firebase.auth.UserCredential) => userCredential.user),
            switchMap((authData: FirebaseUser) => {
              var user = <User>{};
              user.id = this.service.parseId(authData);
              user.email = authData.email;

              patchState({ formGroup: this.service.formCreate(user) });
              dispatch(new UpdateFormValue({ value: user, path: StateUser.formPath(getState())}))

              const state: StateUserModel = getState();
              const data:  User           = StateUser.data(state);

              this.service.create(data);

              return dispatch(new ActionUserAuthenticateCheck(authData));
            }),
            catchError((error: Error) => of(patchState({ error, authenticating: false })))
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
