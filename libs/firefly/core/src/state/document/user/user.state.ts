import { User as FirebaseUser, auth, firestore } from 'firebase/app';

import { State, Selector, Action, StateContext, NgxsOnInit, Store } from '@ngxs/store';
import { Observable, of, from, combineLatest } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map, finalize } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { StateLanguage, ActionLanguageSet, StateLocation } from '@theory/capacitor';

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
    ActionUserWatchLocation,
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
    ActionUserEventVirtualSet, ActionUserWatchCity
} from './user.actions';
import { ServiceUsers, ServiceLocation } from '@firefly/core/services';
import { CoreUtil } from '@theory/core';
import { StateDocument } from '@theory/ngxs';

import { ActionUserAlertsReset, ActionUserAlertsSetData } from '../../child/user-alerts/user-alerts.actions';
import { ActionUserInterestsReset } from '../../query/user-interests/user-interests.actions';
import { ActionUserEventsReset } from '../../query/user-events/user-events.actions';
import { ActionUserStreamReset, ActionUserStreamSetData, ActionUserStreamSync } from '../../child/user-stream/user-stream.actions';
import { ActionUserSubscriptionsReset, ActionUserSubscriptionsSetData, ActionUserSubscriptionsAdd, ActionUserSubscriptionsRemove, ActionUserSubscriptionsSync } from '../../child/user-subscriptions/user-subscriptions.actions';
import { GeolocationPosition } from '@capacitor/core';
import { ServiceBigDataCloud, ResponseReverseGeocode } from '@theory/bigdatacloud';
import { StateUserStream } from '../../child/user-stream/user-stream.state';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { ActionNotificationsWatch } from '@firefly/mobile/state/notifications/notifications.actions';
import { Injectable } from '@angular/core';
import { StateUserSubscriptions } from '../../child/user-subscriptions/user-subscriptions.state';
import { InterestType, EventType, Collection } from '@firefly/core/enums';

@State<StateUserModel>(StateUserOptions)
@Injectable()
export class StateUser extends StateDocument<User, StateUserModel> implements NgxsOnInit
{
    constructor
    (
        private auth         : AngularFireAuth,
        private bigdatacloud : ServiceBigDataCloud,
        private location     : ServiceLocation,
        private store        : Store,
                service      : ServiceUsers
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
                    ActionUserInterestsReset,
                    ActionUserEventsReset,
                    ActionUserSubscriptionsReset,
                    ActionUserStreamReset
                ],

                ActionsCreate: []
            }
        );
    }

    @Selector() static authData(state: StateUserModel)               : FirebaseUser { return state.authData; }
    @Selector() static isAnonymous(state: StateUserModel)            : boolean      { return StateUser.authData(state).isAnonymous; }
    @Selector() static authenticated(state: StateUserModel)          : boolean      { return state.authenticated; }
    @Selector() static authenticating(state: StateUserModel)         : boolean      { return state.authenticating; }
    @Selector() static city(state: StateUserModel)                   : CityInfo     { return state.city; }
    @Selector() static cityId(state: StateUserModel)                 : string       { const city: CityInfo = StateUser.city(state); return city == null ? null : city.id; }
    @Selector() static cityFound(state: StateUserModel)              : boolean      { return StateUser.city(state) != null; }
    @Selector() static cityIsNew(state: StateUserModel)              : boolean      { return state.cityIsNew; }
    @Selector() static geopoint(state: StateUserModel)               : firestore.GeoPoint { return state.geopoint; }
    @Selector() static language(state: StateUserModel)               : string       { const user: User = StateUser.dataState(state); return user == null ? null : user.language; }
    @Selector() static loading(state: StateUserModel)                : boolean      { return state.authenticating || !state.initialized; }
    @Selector() static loadedNotAuthenticated(state: StateUserModel) : boolean      { return !StateUser.loading(state) && !StateUser.authenticated(state); }
    @Selector() static error(state: StateUserModel)                  : Error        { return state.error; }
    @Selector() static errored(state: StateUserModel)                : boolean      { return state.error != null; }
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

    @Selector([StateUserStream.initialized()])
    static initialized(state: StateUserModel, streamInitialized: boolean) : boolean
    {
        return state.initialized && StateUser.cityFound(state) && streamInitialized;
    }

    ngxsOnInit(context: StateContext<StateUserModel>)
    {
        context.dispatch
        ([
            new ActionUserAuthenticate(),
            new ActionUserWatchLocation()
        ]);
    }

    @Action(ActionUserReset)
    reset(context: StateContext<StateUserModel>)
    {
        return of(null);
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
                this.store.select(StateUserStream.initialized()).pipe
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

        patchState({ authenticating: true });

        return from(this.auth.createUserWithEmailAndPassword(credentials.id, credentials.password)).
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
        return super.watch(context, action);
    }

    @Action(ActionUserAnonymousLogin)
    anonymousLogin({ dispatch, patchState }: StateContext<StateUserModel>)
    {
        return dispatch(new ActionUserReset()).
        pipe
        (
            switchMap(() =>
                this.auth.signInAnonymously()
            ),
            tap(() =>
                patchState({ initialized: true })
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
                patchState({ authData, authenticated: authData != null && !authData.isAnonymous})
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
                    authenticated,
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

    @Action(ActionUserWatchLocation, { cancelUncompleted: true })
    watchLocation({ dispatch, getState, patchState }: StateContext<StateUserModel>)
    {
        return this.store.select(StateLocation.location).pipe
        (
            filter((location: GeolocationPosition) =>
                location != null
            ),
            map((location: GeolocationPosition) =>
                new firestore.GeoPoint(location.coords.latitude, location.coords.longitude)
            ),

            switchMap((geopoint: firestore.GeoPoint) =>
                this.bigdatacloud.reverseGeocode(geopoint.latitude, geopoint.longitude).
                pipe
                (
                    switchMap((response: ResponseReverseGeocode) =>
                        this.location.cityInfo(response)
                    ),
                    tap((city: CityInfo) =>
                        patchState({ city, geopoint })
                    )
                )
            ),
            switchMap((city: CityInfo) =>
                this.service.documentWatch<Record<string, StreamInterest>>(Collection.Streams, city.id)
            ),

            tap((snapshot: DocumentSnapshot<Record<string, StreamInterest>>) =>
                patchState(({ cityIsNew: !snapshot.exists }))
            ),
            map((snapshot: DocumentSnapshot<Record<string, StreamInterest>>) =>
                snapshot.exists ? snapshot.data() : {}
            ),
            switchMap((stream: Record<string, StreamInterest>) =>
                dispatch(new ActionUserStreamSetData(stream, true))
            )
        );
    }

    @Action(ActionUserWatchCity, { cancelUncompleted: true })
    watchCity({ dispatch }: StateContext<StateUserModel>)
    {
        const user$:     Observable<User>               = this.store.select(StateUser.dataState);
        const city$:     Observable<CityInfo>           = this.store.select(StateUser.city);
        const geopoint$: Observable<firestore.GeoPoint> = this.store.select(StateUser.geopoint);

        return combineLatest([user$, city$, geopoint$]).
        pipe
        (
            filter(([user, city, geopoint]) =>
                user != null && city != null && geopoint !=null
            ),
            switchMap(([user, city, geopoint]) =>
                dispatch(new ActionUserPatch({ city, geopoint}, true))
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
        patchState({ authenticating: true });
        return from(this.auth.signInWithEmailAndPassword(payload.id, payload.password)).pipe
        (
            map((userCredential: firebase.auth.UserCredential) => userCredential.user),
            switchMap((authData: FirebaseUser) => dispatch(new ActionUserAuthenticateCheck(authData))),
            catchError((error: Error) => of(patchState({ error, authenticating: false })))
        );
    }

    @Action(ActionUserLogout)
    logout(context: StateContext<StateUserModel>)
    {
        const { patchState } = context;

        const defaults: StateUserModel = CoreUtil.clone<StateUserModel>(StateUserOptions.defaults);
        patchState(defaults);

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
    resetPassord({ dispatch }: StateContext<StateUserModel>, { payload }: ActionUserResetPassword)
    {
      return of(this.auth.sendPasswordResetEmail(payload.id));
    }

    @Action(ActionUserSubscriptionsSet)
    subscriptionsGet({ dispatch }: StateContext<StateUserModel>)
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
        const streamInterest         : StreamInterest                      = this.store.selectSnapshot(StateUserStream.dataLookup())[id];
        const streamInterestSnapshot : firestore.DocumentSnapshot          = this.store.selectSnapshot(StateUserStream.snapshotLookup())[id];

        subscriptionsStatus[id] = { on : true };
        streamInterest.on       = true;

        return dispatch
        ([
            new ActionUserPatch({ subscriptionsStatus }, true),
            new ActionUserStreamSync(streamInterest),
            new ActionUserSubscriptionsAdd(streamInterestSnapshot, streamInterest)
        ]);
    }

    @Action(ActionUserSubscriptionRemove)
    subscriptionRemove({ dispatch, getState }: StateContext<StateUserModel>, { id }: ActionUserSubscriptionRemove)
    {
        const state: StateUserModel = getState();

        const subscriptionsStatus : Record<string, SubscriptionPartial> = StateUser.subscriptionsStatus(state);
        const streamInterest      : StreamInterest                      = this.store.selectSnapshot(StateUserStream.dataLookup())[id];

        delete subscriptionsStatus[id];
        delete streamInterest.on;

        return dispatch
        ([
            new ActionUserPatch({ subscriptionsStatus }, true),
            new ActionUserStreamSync(streamInterest),
            new ActionUserSubscriptionsRemove(id)
        ]);
    }

    @Action(ActionUserSubscriptionOnOff)
    subscriptionOnOff({ dispatch, getState }: StateContext<StateUserModel>, { id, on }: ActionUserSubscriptionOnOff)
    {
        const state: StateUserModel = getState();

        const subscriptionsStatus    : Record<string, SubscriptionPartial> = StateUser.subscriptionsStatus(state);
        const streamInterest         : StreamInterest                      = this.store.selectSnapshot(StateUserStream.dataLookup())[id];
        const subscription           : Subscription                        = this.store.selectSnapshot(StateUserSubscriptions.dataLookup())[id];

        subscriptionsStatus[id].on = on;

        const actions: Array<any> =
        [
            new ActionUserPatch({ subscriptionsStatus }, true)
        ];

        if (streamInterest != null && streamInterest.on != null)
        {
            streamInterest.on = on;

            actions.push(new ActionUserStreamSync(streamInterest));
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
        const notifications: Record<string, AlertPartial> = this.store.selectSnapshot(StateUser.notifications);

        return dispatch(new ActionUserAlertsSetData(notifications, true));
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
}
