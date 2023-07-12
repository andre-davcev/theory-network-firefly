import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { from, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { StateLocation } from '@theory/capacitor';
import { StateCityStream } from '../../child/city-stream/city-stream.state';
import { StateCity } from '../city/city.state';
import { StateUser } from '../user/user.state';
import { ActionAppLoadingHide, ActionAppLoadingShow } from './app.actions';
import { StateAppModel } from './app.state.model';
import { StateAppOptions } from './app.state.options';

@State<StateAppModel>(StateAppOptions)
@Injectable()
export class StateApp {
  @Selector() static loading(state: StateAppModel): boolean {
    return state.loading;
  }
  @Selector() static isLoading(state: StateAppModel): boolean {
    return state.loadingElement != null;
  }
  @Selector() static loadingElement(state: StateAppModel): any {
    return state.loadingElement;
  }

  @Selector([
    StateUser.initialized,
    StateCity.found,
    StateCityStream.cityStreamSet,
    StateLocation.permissionDenied
  ])
  static initialized(
    state: StateAppModel,
    userInitialized: boolean,
    cityFound: boolean,
    cityStreamSet: boolean,
    locationDenied: boolean
  ): boolean {
    return locationDenied || (userInitialized && cityFound && cityStreamSet);
  }

  constructor(private loading: LoadingController) {}

  @Action(ActionAppLoadingShow)
  loadingShow({ patchState, getState }: StateContext<StateAppModel>) {
    patchState({ loading: true });

    const options: LoadingOptions = {
      spinner: 'crescent',
      translucent: false,
      cssClass: 'cpt-loading'
    };

    return of(StateApp.loadingElement(getState())).pipe(
      filter((loadingElement: HTMLIonLoadingElement) => loadingElement == null),
      switchMap(() => from(this.loading.create(options))),
      tap((loadingElement: HTMLIonLoadingElement) =>
        patchState({ loadingElement })
      ),
      switchMap((loadingElement: HTMLIonLoadingElement) =>
        from(loadingElement.present())
      )
    );
  }

  @Action(ActionAppLoadingHide)
  loadingHide({ patchState, getState }: StateContext<StateAppModel>) {
    patchState({ loading: false });
    return of(StateApp.loadingElement(getState())).pipe(
      tap((loading: HTMLIonLoadingElement) =>
        patchState({ loadingElement: null })
      ),
      filter((loading: HTMLIonLoadingElement) => loading != null),
      tap((loading: HTMLIonLoadingElement) => loading.dismiss())
    );
  }
}
