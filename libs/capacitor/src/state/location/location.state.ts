
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { from, of } from 'rxjs';
import { GeolocationPosition, Plugins } from '@capacitor/core';
import { tap, catchError, switchMap, map } from 'rxjs/operators';

import { StateLocationModel } from './location.state.model';
import { StateLocationOptions } from './location.state.options';
import { ActionLocationWatch } from './location.actions';
import { ServiceBigDataCloud, ResponseReverseGeocode } from '@theory/bigdatacloud';
import { ServiceLocation } from '@firefly/core';

const { Geolocation } = Plugins;

@State<StateLocationModel>(StateLocationOptions)

export class StateLocation
{
    constructor
    (
        private bigdatacloud: ServiceBigDataCloud
    ) { }

    @Selector() static location(state: StateLocationModel) : GeolocationPosition { return state.location; }
    @Selector() static cityId(state: StateLocationModel)   : string              { return state.cityId; }
    @Selector() static error(state: StateLocationModel)    : Error               { return state.error; }

    @Selector() static loading(state: StateLocationModel)       : boolean { return state.location == null; }
    @Selector() static errored(state: StateLocationModel)       : boolean { return state.error != null; }
    @Selector() static locationValid(state: StateLocationModel) : boolean { return state.location != null && state.location.coords != null;}

    ngxsOnInit(context: StateContext<StateLocationModel>)
    {
        context.dispatch(new ActionLocationWatch());
    }

    @Action(ActionLocationWatch)
    locationWatch({ patchState }: StateContext<StateLocationModel>)
    {
        return from(Geolocation.getCurrentPosition()).
        pipe
        (
            tap((location: GeolocationPosition) =>
                patchState({ location })
            ),
            switchMap((location: GeolocationPosition) =>
                this.bigdatacloud.reverseGeocode(location.coords.latitude, location.coords.longitude)
            ),
            map((response: ResponseReverseGeocode) =>
                ServiceLocation.cityId(response.countryCode, response.principalSubdivision, response.locality)
            ),
            tap((cityId: string) =>
                patchState({ cityId })
            ),
            catchError((error: any) => of(error))
        );
    }
}
