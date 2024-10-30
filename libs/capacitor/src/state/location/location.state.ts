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
  @Selector([StateLocation]) static location(
    state: StateLocationModel
  ): Position | null {
    return state.location;
  }
  @Selector([StateLocation]) static error(
    state: StateLocationModel
  ): Error | null {
    return state.error;
  }
  @Selector([StateLocation.location]) static loading(
    location: Position | null
  ): boolean {
    return location == null;
  }
  @Selector([StateLocation.error]) static errored(
    error: Error | null
  ): boolean {
    return error != null;
  }
  @Selector([StateLocation.location]) static isValid(
    location: Position | null
  ): boolean {
    return location?.coords != null;
  }
  @Selector([StateLocation]) static permissionState(
    state: StateLocationModel
  ): PermissionState {
    return state.permissionState;
  }
  @Selector([StateLocation.permissionState]) static permissionDenied(
    permissionState: PermissionState
  ): boolean {
    return permissionState === 'denied';
  }

  @Selector([StateLocation.isValid, StateLocation.location])
  static locationLike(
    isValid: boolean,
    location: Position | null
  ): LngLatLike | null | undefined {
    return !isValid
      ? null
      : [location?.coords.longitude || 0, location?.coords.latitude || 0];
  }

  @Selector([StateLocation.isValid, StateLocation.location])
  static locationLiteral(
    isValid: boolean,
    location: Position | null
  ): MapboxGeocoder.LngLatLiteral | null {
    return !isValid
      ? null
      : {
          longitude: location?.coords.longitude || 0,
          latitude: location?.coords.latitude || 0
        };
  }

  public ngxsOnInit(context: StateContext<StateLocationModel>): void {
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
