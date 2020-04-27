import { User as FirebaseUser, auth, firestore } from 'firebase/app';

import { State, Selector, Action, StateContext, NgxsOnInit, Store } from '@ngxs/store';
import { Observable, of, from } from 'rxjs';
import { catchError, switchMap, take, filter, tap, map, finalize } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { StateLanguage, ActionLanguageSet, StateLocation } from '@theory/capacitor';

import { User, Location, StreamInterest, SubscriptionPartial, Subscription, AlertPartial } from '@firefly/cloud';
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
    ActionUserWatchCity,
    ActionUserSubscriptionToggle,
    ActionUserNotLoggedIn,
    ActionUserSubscriptionAdd,
    ActionUserSubscriptionRemove,
    ActionUserSubscriptionOnOff,
    ActionUserInterestTypeSet,
    ActionUserEventTypeSet,
    ActionUserIsPublisherSet,
    ActionUserAnonymousLogin,
    ActionUserSubscriptionsSet,
    ActionUserNotificationsSet,
    ActionUserPatchMetadata
} from './user.actions';
import { ServiceUsers, ServiceLocation } from '@firefly/core/services';
import { CoreUtil } from '@theory/core';
import { StateDocument } from '@theory/ngxs';

import { ActionUserAlertsReset, ActionUserAlertsSetData } from '../../child/user-alerts/user-alerts.actions';
import { ActionUserInterestsReset } from '../../query/user-interests/user-interests.actions';
import { ActionUserEventsReset } from '../../query/user-events/user-events.actions';
import { ActionUserIconsReset } from '../../query/user-icons/user-icons.actions';
import { ActionUserImagesReset } from '../../query/user-images/user-images.actions';
import { ActionUserStreamSetData, ActionUserStreamSync } from '../../child/user-stream/user-stream.actions';
import { ActionUserSubscriptionsReset, ActionUserSubscriptionsSetData, ActionUserSubscriptionsAdd, ActionUserSubscriptionsRemove, ActionUserSubscriptionsSync } from '../../child/user-subscriptions/user-subscriptions.actions';
import { GeolocationPosition } from '@capacitor/core';
import { ServiceBigDataCloud, ResponseReverseGeocode } from '@theory/bigdatacloud';
import { LocationCity } from '@firefly/core/interfaces';
import { StateUserStream } from '../../child/user-stream/user-stream.state';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { ActionNotificationsWatch } from '@firefly/mobile/state/notifications/notifications.actions';
import { Injectable } from '@angular/core';
import { StateUserSubscriptions } from '../../child/user-subscriptions/user-subscriptions.state';
import { ActionStorageUrlGet } from '@theory/firebase';
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

                cityId              : null,
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
                    ActionUserIconsReset,
                    ActionUserImagesReset,
                    ActionUserSubscriptionsReset
                ],

                ActionsCreate: []
            }
        );
    }

    @Selector() static authData(state: StateUserModel)               : FirebaseUser { return state.authData; }
    @Selector() static initialized(state: StateUserModel)            : boolean      { return state.initialized; }
    @Selector() static authenticated(state: StateUserModel)          : boolean      { return state.authenticated; }
    @Selector() static authenticating(state: StateUserModel)         : boolean      { return state.authenticating; }
    @Selector() static city(state: StateUserModel)                   : Location     { const user: User = StateUser.dataState(state); return user == null ? null : user.city; }
    @Selector() static cityId(state: StateUserModel)                 : string       { const city: Location = StateUser.city(state); return city == null ? null : city.cityId; }
    @Selector() static language(state: StateUserModel)               : string       { const user: User = StateUser.dataState(state); return user == null ? null : user.language; }
    @Selector() static loading(state: StateUserModel)                : boolean      { return state.authenticating || !state.initialized; }
    @Selector() static loadedNotAuthenticated(state: StateUserModel) : boolean      { return !StateUser.loading(state) && !StateUser.authenticated(state); }
    @Selector() static error(state: StateUserModel)                  : Error        { return state.error; }
    @Selector() static errored(state: StateUserModel)                : boolean      { return state.error != null; }
    @Selector() static subscriptionsStatus(state: StateUserModel)    : Record<string, SubscriptionPartial> { const user: User = StateUser.dataState(state); return user == null ? null : !user.subscriptionsStatus ? {} : user.subscriptionsStatus; }
    @Selector() static notifications(state: StateUserModel)          : Record<string, AlertPartial>        { const user: User = StateUser.dataState(state); return user == null ? null : !user.notifications ? {} : user.notifications; }
    @Selector() static tokens(state:StateUserModel)                  : Array<string>{ const user: User = StateUser.dataState(state); return user == null ? null : user.tokens; }
    @Selector() static interestType(state:StateUserModel)            : InterestType { return state.interestType; }
    @Selector() static eventType(state:StateUserModel)               : EventType    { return state.eventType; }
    @Selector() static isPublisher(state: StateUserModel)            : boolean      { return StateUser.dataState(state).isPublisher; }
    @Selector() static email(state: StateUserModel)                  : string       { return StateUser.dataState(state).email; }
    @Selector() static userId(state: StateUserModel)                 : string       { return StateUser.dataState(state).userId; }

    @Selector() static streamEmptyMessage(state: StateUserModel) : string
    {
        const interestType: InterestType = StateUser.interestType(state);

        return interestType === InterestType.Unsubscribed ?
            'page.stream.empty.unsubscribed' :
            interestType === InterestType.Subscribed ?
            'page.stream.empty.subscribed' :
            'page.stream.empty.created';
    }

    @Selector() static eventsEmptyMessage(state: StateUserModel) : string
    {
        const eventType: EventType = StateUser.eventType(state);

        return eventType === EventType.New ?
            'page.events.empty.new' :
            eventType === EventType.Upcoming ?
            'page.events.empty.upcoming' :
            'page.events.empty.created';
    }

    ngxsOnInit(context: StateContext<StateUserModel>)
    {
        context.dispatch
        ([
            new ActionUserAuthenticate()
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
                    new ActionUserWatchLocation(),
                    new ActionUserWatchLanguage(),
                    new ActionUserWatchCity(),
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
        return super.watch(context, action);
    }

    @Action(ActionUserNotLoggedIn)
    userNotLoggedIn({ patchState, dispatch}: StateContext<StateUserModel>)
    {
        return of(null).
        pipe
        (
            tap(() =>
                dispatch
                ([
                  new ActionUserWatchLocation(false),
                  new ActionUserWatchCity()
                ])
            ),
            switchMap(() =>
                this.store.dispatch(new ActionUserAnonymousLogin())
            ),
            switchMap(() =>
                this.store.select(StateUserStream.initialized()).pipe
                (
                    filter((ready: boolean) => ready),
                    take(1)
                )
            )
        )
    }

    @Action(ActionUserAnonymousLogin)
    anonymousLogin({ patchState, dispatch }: StateContext<StateUserModel>)
    {
      return this.auth.auth.signInAnonymously();
    }

    @Action(ActionUserAuthenticate)
    authenticate({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        patchState({ authenticating: true });

        return this.auth.authState.pipe
        (
            take(1),

            tap((authData: FirebaseUser) =>
                patchState({ authData, authenticated: authData != null && !authData.isAnonymous})
            ),
            switchMap((authData: FirebaseUser) =>
                authData == null || authData.isAnonymous ?
                    dispatch(new ActionUserNotLoggedIn()) :
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
    watchLocation({ dispatch, getState }: StateContext<StateUserModel>, { save }: ActionUserWatchLocation)
    {
        return this.store.select(StateLocation.location).pipe
        (
            filter((location: GeolocationPosition) =>
                location != null
            ),
            switchMap((location: GeolocationPosition) =>
                this.bigdatacloud.reverseGeocode(location.coords.latitude, location.coords.longitude)
            ),
            filter((response: ResponseReverseGeocode) =>
                StateUser.cityId(getState()) !== ServiceLocation.cityIdFromResponse(response)
            ),
            switchMap((response: ResponseReverseGeocode) =>
                this.location.locationCityFromResponse(response)
            ),
            switchMap((locationCity: LocationCity) =>
                dispatch(new ActionUserPatch(locationCity, save))
            )
        );
    }

    @Action(ActionUserWatchCity, { cancelUncompleted: true })
    watchCity({ dispatch }: StateContext<StateUserModel>)
    {
        return this.store.select(StateUser.cityId).
        pipe
        (
            filter((cityId: string) =>
                cityId != null
            ),
            switchMap((cityId: string) =>
                this.service.documentWatch<Record<string, StreamInterest>>(Collection.Streams, cityId)
            ),
            filter((snapshot: DocumentSnapshot<Record<string, StreamInterest>>) =>
                snapshot.exists
            ),
            map((snapshot: DocumentSnapshot<Record<string, StreamInterest>>) =>
                snapshot.data()
            ),
            switchMap((stream: Record<string, StreamInterest>) =>
                dispatch(new ActionUserStreamSetData(stream, true))
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

        return from(this.auth.auth.signInWithEmailAndPassword(payload.id, payload.password)).pipe
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

        return of(this.auth.auth.signOut()).pipe
        (
            switchMap(() =>
                super.reset(context)
            ),
            tap(() =>
                patchState({ initialized: true })
            ),
            switchMap(() =>
              this.store.dispatch(new ActionUserAnonymousLogin())
            ),
            catchError((error: Error) =>
                of(patchState({ error }))
            )
        );
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
            new ActionUserSubscriptionsAdd(streamInterestSnapshot, streamInterest),
            new ActionStorageUrlGet(streamInterest.bucketPath)
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
    notificationsGet({ dispatch }: StateContext<StateUserModel>)
    {
        const notifications: Record<string, AlertPartial> = this.store.selectSnapshot(StateUser.notifications);

        return dispatch(new ActionUserAlertsSetData(notifications, true));
    }

    @Action(ActionUserInterestTypeSet)
    interestTypeSet({ patchState }: StateContext<StateUserModel>, { interestType }: ActionUserInterestTypeSet)
    {
        patchState({ interestType });
    }

    @Action(ActionUserEventTypeSet)
    eventTypeSet({ patchState }: StateContext<StateUserModel>, { eventType }: ActionUserEventTypeSet)
    {
        patchState({ eventType });
    }

    @Action(ActionUserIsPublisherSet)
    isPublisherSet({ dispatch }: StateContext<StateUserModel>, { isPublisher }: ActionUserIsPublisherSet)
    {
        return dispatch(new ActionUserPatch({ isPublisher }, true));
    }
}
