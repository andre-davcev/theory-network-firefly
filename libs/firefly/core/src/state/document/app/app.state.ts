import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { from, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { StateAppModel } from './app.state.model';
import { StateAppOptions } from './app.state.options';
import {
    ActionAppLoadingShow,
    ActionAppLoadingHide
} from './app.actions';

import { LoadingOptions } from '@ionic/core';
import { LoadingController } from '@ionic/angular';
import { StateCity } from '../city';
import { StateCityStream } from '../../child';
import { StateUser } from '../user';

@State<StateAppModel>(StateAppOptions)
@Injectable()
export class StateApp
{
    @Selector() static loading(state: StateAppModel)        : boolean { return state.loading; }
    @Selector() static isLoading(state: StateAppModel)      : boolean { return state.loadingElement != null;}
    @Selector() static loadingElement(state: StateAppModel) : any     { return state.loadingElement; }

    @Selector
    ([
        StateUser.initialized,
        StateCity.found,
        StateCityStream.initialized(),
    ])
    static initialized(userInitialized: boolean, cityFound: boolean, streamInitialized: boolean) : boolean
    {
        return userInitialized && cityFound && streamInitialized;
    }

    constructor
    (
        private loading : LoadingController
    )
    { }

    @Action(ActionAppLoadingShow)
    loadingShow({ patchState, getState }: StateContext<StateAppModel>)
    {
        patchState({ loading: true });

        const options: LoadingOptions =
        {
            spinner:     'crescent',
            translucent: false,
            cssClass:    'cpt-loading'
        };

        return of(StateApp.loadingElement(getState())).
        pipe
        (
            filter((loadingElement: HTMLIonLoadingElement) =>
                loadingElement == null
            ),
            switchMap(() =>
                from(this.loading.create(options))
            ),
            tap((loadingElement: HTMLIonLoadingElement) =>
                patchState({ loadingElement })
            ),
            switchMap((loadingElement: HTMLIonLoadingElement) =>
                from(loadingElement.present())
            )
        );
    }

    @Action(ActionAppLoadingHide)
    loadingHide({ patchState, getState }: StateContext<StateAppModel>)
    {
        patchState({ loading: false });
        return of(StateApp.loadingElement(getState())).
        pipe
        (
            tap((loading: HTMLIonLoadingElement) =>
                patchState({ loadingElement: null })
            ),
            filter((loading: HTMLIonLoadingElement) =>
                loading != null
            ),
            tap((loading: HTMLIonLoadingElement) =>
                loading.dismiss()
            )
        );
    }
}
