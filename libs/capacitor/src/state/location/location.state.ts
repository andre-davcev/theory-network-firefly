import { Injectable } from '@angular/core';
import {
  Geolocation,
  PermissionStatus,
  Position
} from '@capacitor/geolocation';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LngLatLike } from 'mapbox-gl';
import { from, of } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';

import { PermissionState } from '@capacitor/core';
import { ActionLocationWatch } from './location.actions';
import { StateLocationModel } from './location.state.model';
import { StateLocationOptions } from './location.state.options';

@State<StateLocationModel>(StateLocationOptions)
@Injectable()
export class StateLocation {
  @Selector() static location(state: StateLocationModel): Position | null {
    return state.location;
  }
  @Selector() static error(state: StateLocationModel): Error | null {
    return state.error;
  }
  @Selector() static loading(state: StateLocationModel): boolean {
    return state.location == null;
  }
  @Selector() static errored(state: StateLocationModel): boolean {
    return state.error != null;
  }
  @Selector() static isValid(state: StateLocationModel): boolean {
    return state.location != null && state.location.coords != null;
  }
  @Selector() static permissionState(
    state: StateLocationModel
  ): PermissionState {
    return state.permissionState;
  }
  @Selector() static permissionDenied(state: StateLocationModel): boolean {
    return StateLocation.permissionState(state) === 'denied';
  }

  @Selector()
  static locationLike(state: StateLocationModel): LngLatLike | null {
    return !StateLocation.isValid(state)
      ? null
      : [
          StateLocation.location(state)?.coords.longitude || 0,
          StateLocation.location(state)?.coords.latitude || 0
        ];
  }

  ngxsOnInit(context: StateContext<StateLocationModel>) {
    context.dispatch(new ActionLocationWatch());
  }

  @Action(ActionLocationWatch, { cancelUncompleted: true })
  locationWatch({ patchState }: StateContext<StateLocationModel>) {
    return from(Geolocation.checkPermissions()).pipe(
      switchMap((status: PermissionStatus) =>
        status.location === 'prompt' ||
        status.location === 'prompt-with-rationale'
          ? from(Geolocation.requestPermissions())
          : of(status)
      ),
      tap((status: PermissionStatus) =>
        patchState({ permissionState: status.location })
      ),
      filter((status: PermissionStatus) => status.location === 'granted'),
      switchMap(() => from(Geolocation.getCurrentPosition())),
      tap((location: Position | null | undefined) => patchState({ location })),
      catchError((error: any) => of(error))
    );
  }
}
