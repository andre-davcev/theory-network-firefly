
import {State, Selector, Action, StateContext} from '@ngxs/store';

import {Observable}                 from 'rxjs/Observable';
import {map, catchError, switchMap, take, filter, tap} from 'rxjs/operators';
import {of}                         from 'rxjs/observable/of';

import {Platform} from 'ionic-angular';

import * as firebase from 'firebase/app';

import { PlatformEnum } from '../../enums/platform.enum';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Select } from '@ngxs/store';
import { StateLanguage } from '../language/language.state';
import { LanguageGet, LanguageSet } from '../language/language.actions';
import { AuthProvider } from '../../enums/auth.provider';
import { Credentials } from '../../models/credentials';
import { User } from '../../models/user';
import { UserAuthenticate, UserAuthenticateCheck, UserGet, LoginEmail, LoginFacebook, LoginFacebookBrowser, LoginFacebookDevice, LoginGoogle, LoginGoogleBrowser, LoginGoogleDevice, UserLogout } from './user.actions';

export interface StateUserModel
{
    authData      : firebase.User;
    user          : User;
    error         : Error;
    authenticated : boolean;
}

@State<StateUserModel>
({
    name : 'user',

    defaults :
    {
        authData      : undefined,
        user          : undefined,
        error         : undefined,
        authenticated : false
    }
})

export class StateUser
{
    constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private facebook: Facebook, private googlePlus: GooglePlus, private platform:Platform) {}

    @Select(StateLanguage.language) language$: Observable<string>;

    @Selector() static authData(state: StateUserModel)      {return state.authData;}
    @Selector() static user(state: StateUserModel)          {return state.authenticated;}
    @Selector() static authenticated(state: StateUserModel) {return state.user;}
    @Selector() static error(state: StateUserModel)         {return state.error;}

    @Selector() static errored(state: StateUserModel)   {return state.error != null;}
    @Selector() static userFound(state: StateUserModel) {return state.user != null;}

    @Action(UserAuthenticate)
    userAuthenticate({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        return this.auth.authState.pipe
        (
            switchMap((authData: firebase.User) =>
            {
                if (authData == null)
                {
                    patchState({authenticated: false, authData: authData});

                    return dispatch(new LanguageGet());
                }
                else
                {
                    patchState({authData: authData});

                    return dispatch(new UserGet(authData));
                }
            }),

            take(1),

            catchError((error: Error) => of(patchState({error: error})))
        );
    }

    @Action(UserAuthenticateCheck)
    userAuthenticateCheck({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: UserAuthenticateCheck)
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

                    patchState({authData: authData, authenticated: true, user: user as User});
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

            tap((user: User) =>
            {
                if (user == null)
                {
                    patchState({error: {name: 'Could not find user', message: 'Could not find user'}});
                }
                else
                {
                    dispatch(new LanguageSet(user.language));

                    patchState({user: user, authenticated: true});
                }
            }),

            catchError((error: Error) => of(patchState({error: error})))
        );
    }

    @Action(LoginEmail)
    loginEmail({ patchState, dispatch }: StateContext<StateUserModel>, { payload }: LoginEmail)
    {
        return Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(payload.id, payload.password)).pipe
        (
            switchMap((authData: firebase.User) => dispatch(new UserAuthenticateCheck(authData))),

            catchError((error: Error) => of(patchState({error: error})))
        );
    }

    @Action(LoginFacebook)
    loginFacebook({ dispatch }: StateContext<StateUserModel>)
    {
        return this.platform.is(PlatformEnum.Cordova) ? dispatch(new LoginFacebookDevice()) : dispatch(new LoginFacebookBrowser());
    }

    @Action(LoginFacebookBrowser)
    loginFacebookBrowser({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        return Observable.fromPromise(this.auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())).pipe
        (
            switchMap((response: any) => dispatch(new UserAuthenticateCheck(response.user))),

            catchError((error: Error) => of(patchState({error: error})))
        );
    }

    @Action(LoginFacebookDevice)
    loginFacebookDevice({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        return Observable.fromPromise(this.facebook.login(['email'])).pipe
        (
            switchMap((response: FacebookLoginResponse) =>
            {
                const credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

                return Observable.fromPromise(firebase.auth().signInWithCredential(credential));
            }),

            switchMap((response: FacebookLoginResponse) =>
            {
                const credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

                return Observable.fromPromise(firebase.auth().signInWithCredential(credential));
            }),

            switchMap((response: any) =>
            {
                const authData: firebase.User = response as firebase.User;

                return dispatch(new UserAuthenticateCheck(authData));
            }),

            catchError((error: Error) => of(patchState({error: error})))
        );
    }

    @Action(LoginGoogle)
    loginGoogle({ dispatch }: StateContext<StateUserModel>)
    {
        return this.platform.is(PlatformEnum.Cordova) ? dispatch(new LoginGoogleDevice()) : dispatch(new LoginGoogleBrowser());
    }

    @Action(LoginGoogleBrowser)
    loginGoogleBrowser({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        return Observable.fromPromise(this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe
        (
            switchMap((response: any) => dispatch(new UserAuthenticateCheck(response.user))),

            catchError((error: Error) => of(patchState({error: error})))
        );
    }

    @Action(LoginGoogleDevice)
    loginGoogleDevice({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        return Observable.fromPromise(this.facebook.login(['email'])).pipe
        (
            switchMap((response: FacebookLoginResponse) =>
            {
                const credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

                return Observable.fromPromise(firebase.auth().signInWithCredential(credential));
            }),

            switchMap((response: FacebookLoginResponse) =>
            {
                const credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

                return Observable.fromPromise(firebase.auth().signInWithCredential(credential));
            }),

            switchMap((response: any) =>
            {
                const authData: firebase.User = response as firebase.User;

                return dispatch(new UserAuthenticateCheck(authData));
            }),

            catchError((error: Error) => of(patchState({error: error})))
        );
    }

    @Action(UserLogout)
    userLogout({ patchState, dispatch }: StateContext<StateUserModel>)
    {
        return Observable.of(this.auth.auth.signOut()).pipe
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
