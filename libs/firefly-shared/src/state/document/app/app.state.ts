import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';
import { RouterState, RouterStateModel } from '@ngxs/router-plugin';
import {
  Action,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
  Store,
  createSelector
} from '@ngxs/store';
import { from, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { StateLocation } from '@theory/capacitor';
import { RouterStateParams } from '@theory/ngxs';

import { CoreUtil } from '@theory/core';
import { Pages } from '../../../enums';
import { StateCityStream } from '../../child/city-stream/city-stream.state';
import { StateCity } from '../city/city.state';
import { StateUser } from '../user/user.state';
import {
  ActionAppLoadingHide,
  ActionAppLoadingShow,
  ActionAppRouterWatch
} from './app.actions';
import { StateAppModel } from './app.state.model';
import { DEFAULT_ROUTER_STATE, StateAppOptions } from './app.state.options';

@State<StateAppModel>(StateAppOptions)
@Injectable()
export class StateApp implements NgxsOnInit {
  @Selector() static loading(state: StateAppModel): boolean {
    return state.loading;
  }
  @Selector() static isLoading(state: StateAppModel): boolean {
    return state.loadingElement != null;
  }
  @Selector() static loadingElement(state: StateAppModel): any {
    return state.loadingElement;
  }

  @Selector() static routerState(state: StateAppModel): RouterStateParams {
    return state.routerState;
  }

  public static onPage(page: Pages) {
    return createSelector(
      [StateApp.routerState],
      (routerState: RouterStateParams) => {
        const url: string = routerState.url;
        const parts: Array<string> = (url || '').split('/');
        const token: string = parts[parts.length - 1];

        const onPage: boolean = page === token;

        return onPage;
      }
    );
  }

  public static onTab(page: Pages) {
    return createSelector(
      [StateApp.routerState],
      (routerState: RouterStateParams) => {
        const url: string = routerState.url;
        const parts: Array<string> = (url || '').split('/');
        const token1: string = parts.length < 3 ? '' : parts[1];
        const token2: string = parts.length < 3 ? '' : parts[2];

        const onTab: boolean = token1 === Pages.Tabs && token2 === page;

        return onTab;
      }
    );
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

  constructor(private store: Store, private loading: LoadingController) {}

  public ngxsOnInit({ dispatch }: StateContext<StateAppModel>): void {
    dispatch(new ActionAppRouterWatch());
  }

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

  @Action(ActionAppRouterWatch)
  routerWatch({ patchState }: StateContext<StateAppModel>) {
    return this.store.select(RouterState).pipe(
      map((state: RouterStateModel<RouterStateParams>) => state?.state),
      tap((routerState: RouterStateParams | undefined) =>
        patchState({
          routerState:
            routerState ||
            CoreUtil.clone<RouterStateParams>(DEFAULT_ROUTER_STATE)
        })
      )
    );
  }
}
