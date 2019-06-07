
import { Action, StateContext, State, Selector } from '@ngxs/store';

import { StateMobileModel } from './mobile.state.model';
import { ActionMobileLoadingShow, ActionMobileToast, ActionMobileLoadingHide } from './mobile.actions';
import { StateMobileOptions } from './mobile.state.options';
import { LoadingController, ToastController } from '@ionic/angular';
import { switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { LoadingOptions, ToastOptions } from '@ionic/core';

@State<StateMobileModel>(StateMobileOptions)

export class StateMobile
{
    @Selector() static isLoading(state: StateMobileModel): boolean {return state.loadingElement != null;}
    @Selector() static loadingElement(state: StateMobileModel): any { return state.loadingElement; }

    constructor
    (
        private loading: LoadingController,
        private toast:   ToastController
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
}
