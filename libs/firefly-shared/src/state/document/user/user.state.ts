import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FieldValue, GeoPoint, serverTimestamp } from '@angular/fire/firestore';
import {
  Action,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
  Store
} from '@ngxs/store';
import { Observable, combineLatest, from, of } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  switchMap,
  take,
  tap
} from 'rxjs/operators';

import {
  AlertPartial,
  CityInfo,
  Collection,
  SubscriptionPartial,
  Token,
  User
} from '@firefly/cloud';
import {
  ActionLanguageSet,
  StateLanguage,
  StateLocation
} from '@theory/capacitor';
import { User as FirebaseUser, UserCredential } from '@theory/firebase';
import { StateDocument } from '@theory/ngxs';

import { EventType, TagListDefault } from '../../../enums';
import { ServiceUsers } from '../../../services';
import { ActionNotificationsWatch } from '../../basic/notifications/notifications.actions';
import { StateCityStream } from '../../child/city-stream/city-stream.state';
import {
  ActionUserAlertsReset,
  ActionUserAlertsSetData
} from '../../child/user-alerts/user-alerts.actions';
import { ActionUserSubscriptionsReset } from '../../child/user-subscriptions/user-subscriptions.actions';
import { ActionUserEventsReset } from '../../query/user-events/user-events.actions';
import { ActionUserListsReset } from '../../query/user-lists/user-lists.actions';
import {
  ActionUserAddToken,
  ActionUserAddTokenAfterLogin,
  ActionUserAnonymousLogin,
  ActionUserAuthenticate,
  ActionUserAuthenticateCheck,
  ActionUserCreate,
  ActionUserDelete,
  ActionUserGet,
  ActionUserIsPublisherSet,
  ActionUserLoginEmail,
  ActionUserLogout,
  ActionUserNotificationsSet,
  ActionUserPatch,
  ActionUserPatchMetadata,
  ActionUserReset,
  ActionUserResetAll,
  ActionUserResetPassword,
  ActionUserSave,
  ActionUserSet,
  ActionUserSetErrorAuth,
  ActionUserUpdate,
  ActionUserWatch,
  ActionUserWatchCity,
  ActionUserWatchLanguage
} from './user.actions';
import { StateUserModel } from './user.state.model';
import { StateUserOptions } from './user.state.options';

import { Navigate } from '@ngxs/router-plugin';
import { ActionTagsGet } from '../../basic/tags/tags.actions';
import { ActionCalendarSetType } from '../../composite/calendar/calendar.actions';
import {
  ActionListsPage,
  ActionListsSetSubscriptions,
  ActionListsTagSet
} from '../../composite/lists/lists.actions';
import { StateApp } from '../app/app.state';
import { StateCity } from '../city/city.state';
import { ActionUserProfileReset } from '../user-profile/user-profile.actions';

@State<StateUserModel>(StateUserOptions)
@Injectable()
export class StateUser
  extends StateDocument<User, StateUserModel>
  implements NgxsOnInit
{
  constructor(
    private auth: AngularFireAuth,
    private store: Store,
    service: ServiceUsers
  ) {
    super(
      Collection.Users,
      StateUserOptions.defaults as StateUserModel,
      service,
      {
        version: null,
        id: null,
        userId: null,
        dateCreated: null,
        dateUpdated: null,
        metadata: {},

        city: null,
        email: '',
        isPublisher: false,
        language: 'en',
        geopoint: null,
        notifications: {},
        phoneNumber: '',
        providerId: null,
        subscriptions: [],
        subscriptionsStatus: {},
        tokens: {}
      },
      {
        ActionReset: ActionUserReset,
        ActionGet: ActionUserGet,
        ActionSet: ActionUserSet,
        ActionPatch: ActionUserPatch,
        ActionCreate: ActionUserCreate,
        ActionUpdate: ActionUserUpdate,
        ActionSave: ActionUserSave,
        ActionDelete: ActionUserDelete,
        ActionWatch: ActionUserWatch,

        ActionsReset: [
          ActionUserAlertsReset,
          ActionUserSubscriptionsReset,

          ActionUserProfileReset,

          ActionUserEventsReset,
          ActionUserListsReset
        ],

        ActionsCreate: []
      }
    );
  }

  @Selector([StateUser]) static authData(
    state: StateUserModel
  ): FirebaseUser | null {
    return state.authData;
  }

  @Selector([StateUser.authData]) static authenticated(
    authData: FirebaseUser | null
  ): boolean {
    return authData != null;
  }

  @Selector([StateUser.authenticated, StateUser.authData]) static isAnonymous(
    authenticated: boolean,
    authData: FirebaseUser | null
  ): boolean {
    return (authenticated && authData?.isAnonymous) || false;
  }
  @Selector([
    StateUser.authenticated,
    StateUser.isAnonymous,
    StateLocation.permissionDenied
  ])
  static isUser(
    authenticated: boolean,
    isAnonymous: boolean,
    permissionDenied: boolean
  ): boolean {
    return authenticated && !isAnonymous && !permissionDenied;
  }

  @Selector([StateUser]) static authenticating(state: StateUserModel): boolean {
    return state.authenticating;
  }

  @Selector([StateUser.data()]) static language(form: User): string | null {
    return form.language || null;
  }

  @Selector([StateUser.authenticating, StateUser.initialized]) static loading(
    authenticating: boolean,
    initialized: boolean
  ): boolean {
    return authenticating || !initialized;
  }

  @Selector([StateUser.loading, StateUser.authenticated])
  static loadedNotAuthenticated(
    loading: boolean,
    authenticated: boolean
  ): boolean {
    return !loading && !authenticated;
  }

  @Selector([StateUser]) static error(state: StateUserModel): Error | null {
    return state.error;
  }

  @Selector([StateUser.error]) static errored(error: Error | null): boolean {
    return error != null;
  }

  @Selector([StateUser]) static errorAuth(
    state: StateUserModel
  ): FirebaseError | null {
    return state.errorAuth;
  }

  @Selector([StateUser.errorAuth]) static errorAuthCode(
    errorAuth: FirebaseError | null
  ): string | undefined {
    return errorAuth?.code;
  }

  @Selector([StateUser.errorAuth]) static erroredAuth(
    errorAuth: FirebaseError | null
  ): boolean {
    return errorAuth != null;
  }

  @Selector([StateUser.data()]) static subscriptionsStatus(
    form: User
  ): Record<string, SubscriptionPartial> | null {
    return form == null
      ? null
      : !form.subscriptionsStatus
      ? {}
      : form.subscriptionsStatus;
  }

  @Selector([StateUser.data()]) static notifications(
    form: User
  ): Record<string, AlertPartial> | null {
    return form == null ? null : !form.notifications ? {} : form.notifications;
  }

  @Selector([StateUser.data()]) static tokens(
    form: User
  ): Record<string, Token> {
    return form?.tokens || {};
  }

  @Selector([StateUser.data()]) static isPublisher(form: User): boolean {
    return form.isPublisher || false;
  }

  @Selector([StateUser.data()]) static email(form: User): string | undefined {
    return form.email;
  }

  @Selector([StateUser.data()]) static userId(form: User): string {
    return form.userId;
  }

  @Selector([StateUser]) static initialized(state: StateUserModel): boolean {
    return state.initialized;
  }

  @Selector([
    StateUser.initialized,
    StateCity.found,
    StateCityStream.cityStreamSet,
    StateLocation.permissionDenied
  ])
  static ready(
    userInitialized: boolean,
    cityFound: boolean,
    cityStreamSet: boolean,
    locationDenied: boolean
  ): boolean {
    return locationDenied || (userInitialized && cityFound && cityStreamSet);
  }

  public ngxsOnInit(context: StateContext<StateUserModel>) {
    context.dispatch([new ActionUserWatchCity()]);
  }

  @Action(ActionUserReset)
  public override reset() {
    return of(null);
  }

  @Action(ActionUserResetAll)
  public resetAll(context: StateContext<StateUserModel>) {
    return super.reset(context);
  }

  @Action(ActionUserGet)
  public override get(
    context: StateContext<StateUserModel>,
    action: ActionUserGet
  ) {
    return super.get(context, action);
  }

  @Action(ActionUserSet)
  public override set(
    context: StateContext<StateUserModel>,
    action: ActionUserSet
  ) {
    const { dispatch } = context;

    return super.set(context, action).pipe(
      tap(() =>
        dispatch([
          new ActionUserWatchLanguage(),
          new ActionNotificationsWatch()
        ])
      ),
      switchMap(() =>
        dispatch([
          new ActionUserNotificationsSet(),
          new ActionLanguageSet(
            this.store.selectSnapshot(StateUser.language) || 'en-us'
          ),
          new ActionListsSetSubscriptions(
            this.store.selectSnapshot(StateUser.subscriptionsStatus)
          )
        ])
      ),
      switchMap(() =>
        this.store.select(StateCityStream.cityStreamSet).pipe(
          filter((ready: boolean) => ready),
          take(1)
        )
      )
    );
  }

  @Action(ActionUserPatch)
  public override patch(
    context: StateContext<StateUserModel>,
    action: ActionUserPatch
  ) {
    return super.patch(context, action);
  }

  @Action(ActionUserPatchMetadata)
  public override patchMetadata(
    context: StateContext<StateUserModel>,
    action: ActionUserPatchMetadata
  ) {
    return super.patchMetadata(context, action);
  }

  @Action(ActionUserCreate)
  public override create(
    context: StateContext<StateUserModel>,
    { credentials }: ActionUserCreate
  ): Observable<any> {
    const { patchState, dispatch } = context;

    return dispatch(new ActionUserResetAll()).pipe(
      tap(() => patchState({ errorAuth: null, authenticating: true })),
      switchMap(() =>
        from(
          this.auth.createUserWithEmailAndPassword(
            credentials.id,
            credentials.password
          )
        )
      ),
      map((userCredential: UserCredential) => userCredential.user),
      switchMap((authData: FirebaseUser | null) =>
        dispatch([
          new ActionUserPatch({
            id: authData?.uid,
            userId: authData?.uid,
            email: authData?.email || undefined,
            city: this.store.selectSnapshot(StateCity.city) || undefined,
            geopoint:
              this.store.selectSnapshot(StateCity.geopoint) || undefined,
            isPublisher: false
          })
        ]).pipe(
          switchMap(() => super.create(context)),
          switchMap(() =>
            dispatch(new ActionUserAuthenticateCheck(authData as FirebaseUser))
          )
        )
      ),
      catchError((errorAuth: FirebaseError) =>
        of(patchState({ errorAuth, authenticating: false }))
      )
    );
  }

  @Action(ActionUserUpdate)
  public override update(context: StateContext<StateUserModel>) {
    return super.update(context);
  }

  @Action(ActionUserSave)
  public override save(context: StateContext<StateUserModel>) {
    return super.save(context);
  }

  @Action(ActionUserDelete)
  public override delete(context: StateContext<StateUserModel>) {
    return super
      .delete(context)
      .pipe(switchMap(() => context.dispatch(new ActionUserLogout())));
  }

  @Action(ActionUserWatch, { cancelUncompleted: true })
  public override watch(
    context: StateContext<StateUserModel>,
    action: ActionUserWatch
  ) {
    return super.watch(context, action);
  }

  @Action(ActionUserAnonymousLogin)
  public anonymousLogin({ dispatch, getState }: StateContext<StateUserModel>) {
    const initialized: boolean = StateUser.initialized(getState());

    return of(null).pipe(
      switchMap(() =>
        initialized ? dispatch(new ActionUserResetAll()) : of(null)
      ),
      tap(() => dispatch(new ActionUserWatchLanguage())),
      switchMap(() =>
        dispatch([
          new ActionUserSetErrorAuth(),
          new ActionListsSetSubscriptions(
            this.store.selectSnapshot(StateUser.subscriptionsStatus)
          )
        ])
      ),
      switchMap(() => from(this.auth.signInAnonymously())),
      catchError((errorAuth: FirebaseError) =>
        dispatch(new ActionUserSetErrorAuth(errorAuth))
      )
    );
  }

  @Action(ActionUserAuthenticate)
  authenticate({ patchState, dispatch }: StateContext<StateUserModel>) {
    patchState({ authenticating: true });

    return this.auth.authState.pipe(
      take(1),
      tap((authData: FirebaseUser | null) => patchState({ authData })),
      switchMap((authData: FirebaseUser | null) =>
        authData == null || authData.isAnonymous
          ? dispatch(new ActionUserAnonymousLogin())
          : dispatch(new ActionUserGet(authData.uid))
      ),
      tap(() => patchState({ authenticating: false })),
      catchError((error: Error) =>
        of(patchState({ error, authenticating: false }))
      ),
      finalize(() => patchState({ initialized: true }))
    );
  }

  @Action(ActionUserAuthenticateCheck)
  authenticateCheck(
    { patchState, dispatch }: StateContext<StateUserModel>,
    { payload }: ActionUserAuthenticateCheck
  ) {
    const authData: FirebaseUser | null = payload;
    const authenticated: boolean = authData != null;

    return of(null).pipe(
      tap(() =>
        patchState({
          authData,
          authenticating: false,
          error: authenticated
            ? null
            : { name: 'Failed Login', message: 'Unable to login' }
        })
      ),
      switchMap(() =>
        authenticated
          ? dispatch(new ActionUserGet(authData?.uid as string))
          : of(null)
      )
    );
  }

  @Action(ActionUserWatchCity, { cancelUncompleted: true })
  watchCity({ dispatch }: StateContext<StateUserModel>) {
    const authData$: Observable<FirebaseUser | null> = this.store.select(
      StateUser.authData
    );
    const city$: Observable<CityInfo | null> = this.store.select(
      StateCity.city
    );
    const geopoint$: Observable<GeoPoint | null> = this.store.select(
      StateCity.geopoint
    );

    return combineLatest([city$, geopoint$, authData$]).pipe(
      filter(
        ([city, geopoint, authData]) =>
          authData != null && city != null && geopoint != null
      ),
      switchMap(([city, geopoint]) =>
        this.store.select(StateUser.found()).pipe(
          filter((userFound: boolean) => userFound),
          take(1),
          switchMap(() =>
            dispatch(
              new ActionUserPatch(
                { city: city || undefined, geopoint: geopoint || undefined },
                this.store.selectSnapshot(StateUser.authenticated)
              )
            )
          )
        )
      )
    );
  }

  @Action(ActionUserWatchLanguage, { cancelUncompleted: true })
  watchLanguage({ dispatch }: StateContext<StateUserModel>) {
    return this.store.select(StateLanguage.language).pipe(
      tap(() => dispatch(new ActionTagsGet())),
      filter(
        (language: string) =>
          language != null &&
          this.store.selectSnapshot(StateUser.language) !== language &&
          this.store.selectSnapshot(StateUser.isUser)
      ),
      switchMap((language: string) =>
        dispatch(
          new ActionUserPatch(
            { language },
            this.store.selectSnapshot(StateUser.authenticated)
          )
        )
      )
    );
  }

  @Action(ActionUserAddTokenAfterLogin)
  addTokenAfterLogin(
    { dispatch }: StateContext<StateUserModel>,
    { token }: ActionUserAddTokenAfterLogin
  ) {
    return this.store.select(StateUser.authenticated).pipe(
      filter((authenticated: boolean) => authenticated),
      take(1),
      switchMap(() => dispatch(new ActionUserAddToken(token)))
    );
  }

  @Action(ActionUserAddToken)
  addToken(
    { dispatch }: StateContext<StateUserModel>,
    { payload }: ActionUserAddToken
  ) {
    const tokens: Record<string, Token> = this.store.selectSnapshot(
      StateUser.tokens
    );
    const token: string = payload;
    const existing: Token = tokens[token];
    const now: FieldValue = serverTimestamp();

    tokens[token] =
      existing == null
        ? {
            token,
            usedFirst: now,
            usedLast: now
          }
        : {
            ...existing,
            usedLast: now
          };

    return dispatch(
      new ActionUserPatch(
        { tokens },
        this.store.selectSnapshot(StateUser.authenticated)
      )
    );
  }

  @Action(ActionUserLoginEmail)
  loginEmail(
    { patchState, dispatch }: StateContext<StateUserModel>,
    { payload }: ActionUserLoginEmail
  ) {
    return dispatch(new ActionUserResetAll()).pipe(
      tap(() => patchState({ errorAuth: null, authenticating: true })),
      switchMap(() =>
        from(this.auth.signInWithEmailAndPassword(payload.id, payload.password))
      ),
      map((userCredential: UserCredential) => userCredential.user),
      switchMap((authData: FirebaseUser | null) =>
        dispatch(new ActionUserAuthenticateCheck(authData)).pipe(
          switchMap(() =>
            authData == null ? of(null) : dispatch(new ActionListsPage())
          )
        )
      ),
      catchError((errorAuth: FirebaseError) =>
        of(patchState({ errorAuth, authenticating: false }))
      )
    );
  }

  @Action(ActionUserLogout)
  logout(context: StateContext<StateUserModel>) {
    const { patchState, dispatch } = context;

    patchState({ error: null, authData: null });

    return of(this.auth.signOut()).pipe(
      switchMap(() =>
        dispatch([
          new ActionListsTagSet({ index: 0, key: TagListDefault.Popular }),
          new ActionCalendarSetType(EventType.Upcoming)
        ])
      ),
      switchMap(() => dispatch(new ActionUserAnonymousLogin())),
      switchMap(() => dispatch(new ActionListsPage())),
      switchMap(() =>
        dispatch(new Navigate(this.store.selectSnapshot(StateApp.homePath)))
      ),
      catchError((error: Error) => of(patchState({ error })))
    );
  }

  @Action(ActionUserResetPassword)
  resetPassord(
    { dispatch, patchState }: StateContext<StateUserModel>,
    { payload }: ActionUserResetPassword
  ) {
    patchState({ errorAuth: null });

    return from(this.auth.sendPasswordResetEmail(payload.id)).pipe(
      catchError((errorAuth: FirebaseError) =>
        dispatch(new ActionUserSetErrorAuth(errorAuth))
      )
    );
  }

  @Action(ActionUserNotificationsSet)
  notificationsSet({ dispatch }: StateContext<StateUserModel>) {
    const notifications: Record<string, AlertPartial> =
      this.store.selectSnapshot(StateUser.notifications) || {};
    const alerts: Record<string, AlertPartial> = {};

    const dateCutoff: Date = new Date();
    dateCutoff.setDate(dateCutoff.getDate() + 1); // Add 1 day
    const timeCutoff: number = dateCutoff.getTime();

    Object.keys(notifications).forEach((id: string) => {
      if (notifications[id].timeStart.toDate().getTime() > timeCutoff) {
        alerts[id] = notifications[id];
      }
    });

    return dispatch(new ActionUserAlertsSetData(alerts, true));
  }

  @Action(ActionUserIsPublisherSet)
  isPublisherSet(
    { dispatch }: StateContext<StateUserModel>,
    { isPublisher }: ActionUserIsPublisherSet
  ) {
    return dispatch(new ActionUserPatch({ isPublisher }, true)).pipe(
      filter(() => !isPublisher),
      switchMap(() =>
        dispatch([
          new ActionListsTagSet({ index: 0, key: TagListDefault.Popular }),
          new ActionCalendarSetType(EventType.Upcoming)
        ])
      )
    );
  }

  @Action(ActionUserSetErrorAuth)
  setErrorAuth(
    { patchState }: StateContext<StateUserModel>,
    { errorAuth }: ActionUserSetErrorAuth
  ) {
    patchState({ errorAuth });
  }
}
