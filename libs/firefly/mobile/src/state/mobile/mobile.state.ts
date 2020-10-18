
import { Action, StateContext, State, Selector, Store } from '@ngxs/store';

import { StateMobileModel } from './mobile.state.model';
import {
    ActionMobileLoadingShow,
    ActionMobileToast,
    ActionMobileLoadingHide,
    ActionMobileMenuOpened,
    ActionMobileMenuClosed,
    ActionMobileNavigateRoot,
    ActionMobileAuthSelected,
    ActionMobileSlideAlertIndex,
    ActionMobileSlideAlertRestore,
    ActionMobileAuthSelect,
    ActionMobileFilterInterests,
    ActionMobileFilterEvents,
    ActionMobileFilterEventsUpcoming,
    ActionMobileFilterEventsCreated,
    ActionMobilePageInterests,
    ActionMobilePageEvents,
    ActionMobileFilterInterestsUnsubscribed,
    ActionMobileFilterInterestsSubscribed,
    ActionMobileFilterInterestsCreated
} from './mobile.actions';
import { StateMobileOptions } from './mobile.state.options';
import { LoadingController, ToastController, NavController, ActionSheetController } from '@ionic/angular';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { LoadingOptions, ToastOptions } from '@ionic/core';
import { Pages } from '@firefly/mobile/enums';
import { NgZone, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StateUserAlerts, ActionUserAlertsMarkRead, ActionUserInterestTypeSet, InterestType, StateUserInterests, ActionUserInterestsGetData, EventType, ActionUserEventTypeSet, ActionUserAlertsGetImages, StateUserEvents, ActionUserEventsGetData, StateUser, ActionUserSubscriptionsGet, ActionUserEventsGet, ActionUserAlertsGet, StateCityStream, StateUserSubscriptions, ActionUserInterestsGet, ActionCityStreamGet, ActionUserSubscriptionsSet } from '@firefly/core';
import { Alert } from '@firefly/cloud';

@State<StateMobileModel>(StateMobileOptions)
@Injectable()
export class StateMobile
{
    @Selector() static isLoading(state: StateMobileModel)            : boolean                { return state.loadingElement != null;}
    @Selector() static loadingElement(state: StateMobileModel)       : any                    { return state.loadingElement; }
    @Selector() static menuOpen(state: StateMobileModel)             : boolean                { return state.menuOpen; }
    @Selector() static menuClosed(state: StateMobileModel)           : boolean                { return !state.menuOpen; }
    @Selector() static pageRoot(state: StateMobileModel)             : string                 { return state.pageRoot; }
    @Selector() static pageChild(state: StateMobileModel)            : Record<string, string> { return state.pageChild; }
    @Selector() static pageAlerts(state: StateMobileModel)           : boolean                { return StateMobile.pageRoot(state) === `/${Pages.Home}/${Pages.Alert}`; }
    @Selector() static pageStream(state: StateMobileModel)           : boolean                { return StateMobile.pageRoot(state) === `/${Pages.Home}/${Pages.Stream}`; }
    @Selector() static pageHome(state: StateMobileModel)             : boolean                { return StateMobile.pageStream(state) || StateMobile.pageAlerts(state); }
    @Selector() static pageCalendar(state: StateMobileModel)         : boolean                { return StateMobile.pageRoot(state) === `/${Pages.Calendar}`; }
    @Selector() static pagePublishInterests(state: StateMobileModel) : boolean                { return StateMobile.pageRoot(state) === `/${Pages.AssetsInterests}`; }
    @Selector() static pagePublishEvents(state: StateMobileModel)    : boolean                { return StateMobile.pageRoot(state) === `/${Pages.AssetsEvents}`; }
    @Selector() static pageUserProfile(state: StateMobileModel)      : boolean                { return StateMobile.pageRoot(state) === `/${Pages.UserProfile}`; }
    @Selector() static indexAlerts(state: StateMobileModel)          : number                 { return state.indexAlerts; }

    constructor
    (
        private loading     : LoadingController,
        private toast       : ToastController,
        private nav         : NavController,
        private actionSheet : ActionSheetController,
        private translate   : TranslateService,
        private ngZone      : NgZone,
        private store       : Store
    ) { }

    @Action(ActionMobileLoadingShow)
    loadingShow({ dispatch, patchState }: StateContext<StateMobileModel>)
    {
        const options: LoadingOptions =
        {
            spinner:     'crescent',
            translucent: false,
            cssClass:    'cpt-loading'
        };

        return dispatch(new ActionMobileLoadingHide()).
        pipe
        (
            switchMap(() =>  from(this.loading.create(options))),
            tap((loadingElement: HTMLIonLoadingElement) => patchState({ loadingElement })),
            switchMap((loadingElement: HTMLIonLoadingElement) => from(loadingElement.present()))
        );
    }

    @Action(ActionMobileLoadingHide)
    loadingHide({ getState, patchState }: StateContext<StateMobileModel>)
    {
        const loading: HTMLIonLoadingElement = StateMobile.loadingElement(getState());

        if (loading != null)
        {
            loading.dismiss();
        }

        patchState({ loadingElement: undefined });
    }

    @Action(ActionMobileToast)
    toastShow({ }: StateContext<StateMobileModel>, { payload }: ActionMobileToast)
    {
        const message: string = payload;

        const options: ToastOptions = { duration: 3000 };

        return from(this.toast.create({ ...options, message })).
        pipe
        (
            switchMap((toast: HTMLIonToastElement) => from(toast.present()))
        );
    }

    @Action(ActionMobileMenuOpened)
    menuOpened({ patchState }: StateContext<StateMobileModel>)
    {
        patchState({ menuOpen: true });
    }

    @Action(ActionMobileMenuClosed)
    menuClosed({ patchState }: StateContext<StateMobileModel>)
    {
        patchState({ menuOpen: false });
    }

    @Action(ActionMobileNavigateRoot)
    navigateRoot({ patchState, getState }: StateContext<StateMobileModel>, { page, child }: ActionMobileNavigateRoot)
    {
        const pageChild: Record<string, string> = StateMobile.pageChild(getState());
        const parts: Array<string> = [ ...page.split('/') ];

        child = child == null ? pageChild[page] : child;

        if (child != null)
        {
            parts.push(...child.split('/'));

            pageChild[page] = child;
        }

        const pageRoot: string = `/${parts.join('/')}`;

        return from(this.ngZone.run(() => this.nav.navigateRoot(pageRoot))).
        pipe
        (
            tap(() =>
                patchState({ pageRoot, pageChild })
            )
        );
    }

    @Action(ActionMobileAuthSelect)
    authSelect({ dispatch }: StateContext<StateMobileModel>)
    {
        return this.translate.
        get
        ([
            'general.authenticate',
            'general.login',
            'general.signup',
            'general.resetPassword'
        ]).
        pipe
        (
            switchMap((translations: Record<string, string>) =>
                from(this.actionSheet.create
                  ({
                      header: translations['general.authenticate'],

                      buttons:
                      [
                          {
                              text : translations['general.login'],
                              handler : () => { dispatch(new ActionMobileAuthSelected(Pages.Login)); }
                          },
                          {
                              text    : translations['general.signup'],
                              handler : () => { dispatch(new ActionMobileAuthSelected(Pages.SignUp)); }
                          },
                          {
                              text    : translations['general.resetPassword'],
                              handler : () => { dispatch(new ActionMobileAuthSelected(Pages.ResetPassword)); }
                          }
                      ]
                  }))
            ),
            switchMap((actionSheet: HTMLIonActionSheetElement) =>
                actionSheet.present()
            )
        );
    }

    @Action(ActionMobileAuthSelected)
    authSelected(context: StateContext<StateMobileModel>, { page }: ActionMobileAuthSelected)
    {

    }

    @Action(ActionMobileSlideAlertRestore)
    slideAlertRestore({ dispatch }: StateContext<StateMobileModel>, { slides }: ActionMobileSlideAlertRestore)
    {
        return slides == null ?
            of(null) :
            this.store.selectOnce(StateMobile.indexAlerts).
            pipe
            (
                switchMap((index: number) =>
                    from(slides.slideTo(index, 0)).
                    pipe
                    (
                        switchMap(() =>
                            dispatch(new ActionMobileSlideAlertIndex(index))
                        )
                    )
                )
            );
    }

    @Action(ActionMobileSlideAlertIndex)
    slideAlertIndex({ patchState, dispatch }: StateContext<StateMobileModel>, { index }: ActionMobileSlideAlertIndex)
    {
        patchState({ indexAlerts: index });

        return this.store.selectOnce(StateUserAlerts.unreadList).
        pipe
        (
            map((unread: Array<Alert>) =>
                unread[index]
            ),
            filter((alert: Alert) =>
                alert != null
            ),
            switchMap((alert: Alert) =>
                dispatch(new ActionUserAlertsMarkRead(alert.id))
            )
        );
    }

    @Action(ActionMobileFilterInterests)
    filterInterests({ dispatch }: StateContext<StateMobileModel>, { type }: ActionMobileFilterInterests)
    {
        type = type || this.store.selectSnapshot(StateUser.interestType);

        return type === InterestType.Unsubscribed ?
                dispatch(new ActionMobileFilterInterestsUnsubscribed()) :
            type === InterestType.Subscribed ?
                dispatch(new ActionMobileFilterInterestsSubscribed()) :
                dispatch(new ActionMobileFilterInterestsCreated());
    }

    @Action(ActionMobileFilterInterestsUnsubscribed)
    filterInterestsUnsubscribed({ dispatch }: StateContext<StateMobileModel>)
    {
        return dispatch(new ActionUserInterestTypeSet(InterestType.Unsubscribed));
    }

    @Action(ActionMobileFilterInterestsSubscribed)
    filterInterestsSubscribed({ dispatch }: StateContext<StateMobileModel>)
    {
        return this.store.selectSnapshot(StateUserSubscriptions.initialized()) ?
            dispatch(new ActionUserInterestTypeSet(InterestType.Subscribed)) :
            dispatch(new ActionMobileLoadingShow()).
            pipe
            (
                switchMap(() => this.store.dispatch(new ActionUserSubscriptionsSet())),
                switchMap(() => this.store.dispatch(new ActionMobileLoadingHide())),
                switchMap(() => this.store.dispatch(new ActionUserInterestTypeSet(InterestType.Subscribed)))
            );
    }

    @Action(ActionMobileFilterInterestsCreated)
    filterInterestsCreated({ dispatch }: StateContext<StateMobileModel>)
    {
        return this.store.selectSnapshot(StateUserInterests.initialized()) ?
            dispatch(new ActionUserInterestTypeSet(InterestType.Created)) :
            dispatch(new ActionMobileLoadingShow()).
            pipe
            (
                switchMap(() => this.store.dispatch(new ActionUserInterestsGetData())),
                switchMap(() => this.store.dispatch(new ActionMobileLoadingHide())),
                switchMap(() => this.store.dispatch(new ActionUserInterestTypeSet(InterestType.Created)))
            );
    }

    @Action(ActionMobileFilterEvents)
    filterEvents({ dispatch }: StateContext<StateMobileModel>, { type }: ActionMobileFilterEvents)
    {
        type = type || this.store.selectSnapshot(StateUser.eventType);

        return type === EventType.Upcoming ?
            dispatch(new ActionMobileFilterEventsUpcoming()) :
            dispatch(new ActionMobileFilterEventsCreated());
    }

    @Action(ActionMobileFilterEventsUpcoming)
    filterEventsUpcoming({ dispatch }: StateContext<StateMobileModel>)
    {
        return this.store.selectSnapshot(StateUserAlerts.empty()) || this.store.selectSnapshot(StateUserAlerts.alerts)[0].metadata.image != null ?
            dispatch(new ActionUserEventTypeSet(EventType.Upcoming)) :
            dispatch(new ActionMobileLoadingShow()).
            pipe
            (
                switchMap(() => this.store.dispatch(new ActionUserAlertsGetImages())),
                switchMap(() => this.store.dispatch(new ActionMobileLoadingHide())),
                switchMap(() => this.store.dispatch(new ActionUserEventTypeSet(EventType.Upcoming)))
            );
    }

    @Action(ActionMobileFilterEventsCreated)
    filterEventsCreated({ dispatch }: StateContext<StateMobileModel>)
    {
        return this.store.selectSnapshot(StateUserEvents.initialized()) ?
            dispatch(new ActionUserEventTypeSet(EventType.Created)) :
            dispatch(new ActionMobileLoadingShow()).
            pipe
            (
                switchMap(() => this.store.dispatch(new ActionUserEventsGetData())),
                switchMap(() => this.store.dispatch(new ActionMobileLoadingHide())),
                switchMap(() => this.store.dispatch(new ActionUserEventTypeSet(EventType.Created)))
            );
    }

    @Action(ActionMobilePageInterests)
    pageInterests({ dispatch }: StateContext<StateMobileModel>, { infiniteScroll }: ActionMobilePageInterests)
    {
        const interestType: InterestType = this.store.selectSnapshot(StateUser.interestType);

        const finishedPaging : boolean = this.store.selectSnapshot
        (
            interestType === InterestType.Unsubscribed ?
                StateCityStream.finishedPaging() :
            interestType === InterestType.Subscribed ?
                StateUserSubscriptions.finishedPaging() :
                StateUserEvents.finishedPaging()
        );

        return finishedPaging ?
            from(infiniteScroll.complete()).
            pipe
            (
                tap(() =>
                    infiniteScroll.disabled = true
                )
            ):

            dispatch
            (
                interestType === InterestType.Unsubscribed ?
                    new ActionCityStreamGet() :
                interestType === InterestType.Subscribed ?
                    new ActionUserSubscriptionsGet() :
                    new ActionUserInterestsGet()
            ).
            pipe
            (
                switchMap(() =>
                    from(infiniteScroll.complete())
                )
            );
    }

    @Action(ActionMobilePageEvents)
    pageEvents({ dispatch }: StateContext<StateMobileModel>, { infiniteScroll }: ActionMobilePageEvents)
    {
        const eventType : EventType = this.store.selectSnapshot(StateUser.eventType);

        const finishedPaging : boolean = this.store.selectSnapshot
        (
            eventType === EventType.Upcoming ?
                StateUserAlerts.finishedPaging() :
                StateUserEvents.finishedPaging()
        );

        return finishedPaging ?
            from(infiniteScroll.complete()).
            pipe
            (
                tap(() =>
                    infiniteScroll.disabled = true
                )
            ):

            dispatch
            (
                eventType === EventType.Upcoming ?
                    new ActionUserAlertsGet() :
                    new ActionUserEventsGet()
            ).
            pipe
            (
                switchMap(() =>
                    from(infiniteScroll.complete())
                )
            );
    }
}
