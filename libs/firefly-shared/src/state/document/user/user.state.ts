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

import { EventType, InterestType } from '../../../enums';
import { ServiceUsers } from '../../../services';
import { ActionNotificationsWatch } from '../../basic/notifications/notifications.actions';
import { StateCityStream } from '../../child/city-stream/city-stream.state';
import {
  ActionUserAlertsReset,
  ActionUserAlertsSetData
} from '../../child/user-alerts/user-alerts.actions';
import { ActionUserSubscriptionsReset } from '../../child/user-subscriptions/user-subscriptions.actions';
import { ActionUserEventsReset } from '../../query/user-events/user-events.actions';
import { ActionUserInterestsReset } from '../../query/user-interests/user-interests.actions';
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

import { ActionCalendarSetType } from '../../composite/calendar/calendar.actions';
import {
  ActionInterestsPage,
  ActionInterestsSetSubscriptions,
  ActionInterestsSetType
} from '../../composite/interests/interests.actions';
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
          ActionUserInterestsReset
        ],

        ActionsCreate: []
      }
    );
  }

  @Selector() static authData(state: StateUserModel): FirebaseUser | null {
    return state.authData;
  }
  @Selector() static authenticated(state: StateUserModel): boolean {
    return state.authData != null;
  }
  @Selector() static isAnonymous(state: StateUserModel): boolean {
    return (
      (StateUser.authenticated(state) &&
        StateUser.authData(state)?.isAnonymous) ||
      false
    );
  }
  @Selector([StateLocation.permissionDenied]) static isUser(
    state: StateUserModel,
    permissionDenied: boolean
  ): boolean {
    return (
      StateUser.authenticated(state) &&
      !StateUser.isAnonymous(state) &&
      !permissionDenied
    );
  }
  @Selector() static authenticating(state: StateUserModel): boolean {
    return state.authenticating;
  }
  @Selector() static language(state: StateUserModel): string | null {
    const user: User = StateUser.dataState(state);

    return user == null ? null : user.language;
  }
  @Selector() static loading(state: StateUserModel): boolean {
    return state.authenticating || !state.initialized;
  }
  @Selector() static loadedNotAuthenticated(state: StateUserModel): boolean {
    return !StateUser.loading(state) && !StateUser.authenticated(state);
  }
  @Selector() static error(state: StateUserModel): Error | null {
    return state.error;
  }
  @Selector() static errored(state: StateUserModel): boolean {
    return StateUser.error(state) != null;
  }
  @Selector() static errorAuth(state: StateUserModel): FirebaseError | null {
    return state.errorAuth;
  }
  @Selector() static errorAuthCode(state: StateUserModel): string | undefined {
    return StateUser.errorAuth(state)?.code;
  }
  @Selector() static erroredAuth(state: StateUserModel): boolean {
    return StateUser.errorAuth(state) != null;
  }
  @Selector() static subscriptionsStatus(
    state: StateUserModel
  ): Record<string, SubscriptionPartial> | null {
    const user: User = StateUser.dataState(state);
    return user == null
      ? null
      : !user.subscriptionsStatus
      ? {}
      : user.subscriptionsStatus;
  }
  @Selector() static notifications(
    state: StateUserModel
  ): Record<string, AlertPartial> | null {
    const user: User = StateUser.dataState(state);
    return user == null ? null : !user.notifications ? {} : user.notifications;
  }
  @Selector() static tokens(state: StateUserModel): Record<string, Token> {
    return StateUser.dataState(state)?.tokens || {};
  }
  @Selector() static isPublisher(state: StateUserModel): boolean {
    return StateUser.dataState(state).isPublisher;
  }
  @Selector() static email(state: StateUserModel): string {
    return StateUser.dataState(state).email;
  }
  @Selector() static userId(state: StateUserModel): string {
    return StateUser.dataState(state).userId;
  }
  @Selector() static initialized(state: StateUserModel): boolean {
    return state.initialized;
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
    const { dispatch, getState } = context;

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
          new ActionLanguageSet(StateUser.language(getState()) || 'en-us'),
          new ActionInterestsSetSubscriptions(
            StateUser.subscriptionsStatus(getState())
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
            geopoint: this.store.selectSnapshot(StateCity.geopoint) || undefined
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
      switchMap(() =>
        dispatch([
          new ActionUserSetErrorAuth(),
          new ActionInterestsSetSubscriptions(
            StateUser.subscriptionsStatus(getState())
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
  watchLanguage({ dispatch, getState }: StateContext<StateUserModel>) {
    return this.store.select(StateLanguage.language).pipe(
      filter(
        (language: string) =>
          language != null && StateUser.language(getState()) !== language
      ),
      switchMap((language: string) =>
        dispatch(new ActionUserPatch({ language }, true))
      )
    );
  }

  @Action(ActionUserAddTokenAfterLogin)
  addTokenAfterLogin(
    { getState, dispatch }: StateContext<StateUserModel>,
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
    { getState, dispatch }: StateContext<StateUserModel>,
    { payload }: ActionUserAddToken
  ) {
    const tokens: Record<string, Token> = StateUser.tokens(getState());
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

    return dispatch(new ActionUserPatch({ tokens }, true));
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
            authData == null ? of(null) : dispatch(new ActionInterestsPage())
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
          new ActionInterestsSetType(InterestType.Unsubscribed),
          new ActionCalendarSetType(EventType.Upcoming)
        ])
      ),
      switchMap(() => dispatch(new ActionUserAnonymousLogin())),
      switchMap(() => dispatch(new ActionInterestsPage())),
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
          new ActionInterestsSetType(InterestType.Unsubscribed),
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
