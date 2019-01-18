import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action, Selector, Select, State, StateContext } from '@ngxs/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { StateUser } from '@firefly/core/state/user';
import { User, Event, Cluster } from '@firefly/core/models';
import { ServiceEvent } from '@firefly/core/services';
import { StateEventModel } from './event.state.model';
import { StateEventOptions } from './event.state.options';
import { ActionGetEvents, ActionSetEventId, ActionSetEvent } from './event.actions';
import { EventKey, AssetKey } from '@firefly/core/models';
import { ModelKey } from '@theory/firebase';
import { firestore } from 'firebase';
import { ValidatorsExtended } from '@theory/core';

@State<StateEventModel>(StateEventOptions)

export class StateEvent
{
    @Select(StateUser.user) user$:Observable<User>;

    constructor(private serviceEvent: ServiceEvent, private formBuilder: FormBuilder) {}

    @Selector() static entities(state: StateEventModel): Record<string, Event> { return state.entities; }
    @Selector() static id(state: StateEventModel): string                      { return state.id; }
    @Selector() static form(state: StateEventModel): FormGroup                 { return state.form; }

    @Selector() static events(state: StateEventModel): Array<Event> { return Object.keys(state.entities).map(id => state.entities[id]); }

    @Selector() static event(state: StateEventModel): Event
    {
        return state.form == null ? undefined : state.form.value
    }

    @Selector() static eventId(state: StateEventModel): string
    {
        return state.form == null ? undefined : state.form.get(ModelKey.Id).value;
    }

    @Selector() static eventDateCreated(state: StateEventModel): Date
    {
        return state.form == null ? undefined : (state.form.get(ModelKey.DateCreated).value as firestore.Timestamp).toDate();
    }

    @Selector() static eventDateUpdated(state: StateEventModel): Date
    {
        return state.form == null ? undefined : (state.form.get(ModelKey.DateUpdated).value as firestore.Timestamp).toDate();
    }

    @Selector() static eventName(state: StateEventModel): string
    {
        return state.form == null ? '' : state.form.get(AssetKey.Name).value;
    }

    @Selector() static eventDescription(state: StateEventModel): string
    {
        return state.form == null ? '' : state.form.get(AssetKey.Description).value;
    }

    @Selector() static eventIsPrivate(state: StateEventModel): boolean
    {
        return state.form == null ? true : state.form.get(AssetKey.Name).value;
    }

    @Selector() static eventUserId(state: StateEventModel): string
    {
        return state.form == null ? '' : state.form.get(AssetKey.UserId).value;
    }

    @Selector() static eventIsDraft(state: StateEventModel): string
    {
        return state.form == null ? '' : state.form.get(AssetKey.Draft).value;
    }

    @Selector() static eventTagline(state: StateEventModel): string
    {
        return state.form == null ? '' : state.form.get(EventKey.Tagline).value;
    }

    @Selector() static eventImageId(state: StateEventModel): string
    {
        return state.form == null ? '' : state.form.get(EventKey.ImageId).value;
    }

    @Selector() static eventImageUrl(state: StateEventModel): string
    {
        const imageId: string = StateEvent.eventImageId(state);

        // ToDo: Lookup imageId and return image url
        // ToDo: Setup image collection watcher
        return '';
    }

    @Selector() static eventPlaceId(state: StateEventModel): string
    {
        return state.form == null ? '' : state.form.get(AssetKey.Name).value;
    }

    @Selector() static eventPlace(state: StateEventModel): string
    {
        const placeId: string = StateEvent.eventPlaceId(state);

        // ToDo: Lookup placeId and return Place
        // ToDo: Setup place collection watcher
        return null;
    }

    @Selector() static eventClusterIds(state: StateEventModel): Array<string>
    {
        return state.form == null ? '' : state.form.get(EventKey.Clusters).value;
    }

    @Selector() static eventClusters(state: StateEventModel): Array<Cluster>
    {
        const clusterIds: Array<string> = StateEvent.eventClusterIds(state);

        // ToDo: Lookup cluster ids and return Cluster array
        // ToDo: Setup cluster collection watcher
        return [];
    }

    @Selector() static eventClusterCount(state: StateEventModel): number
    {
        const clusterIds: Array<string> = StateEvent.eventClusterIds(state);

        return clusterIds == null ? 0 : clusterIds.length;
    }

    @Selector() static eventClusterFirst(state: StateEventModel): Cluster
    {
        const clusters: Array<Cluster> = StateEvent.eventClusters(state);

        return clusters == null ? undefined : clusters[0];
    }

    @Selector() static eventIconUrl(state: StateEventModel): string
    {
        const cluster: Cluster = StateEvent.eventClusterFirst(state);
        const iconId: string   = cluster.icon; // ToDo: Change to StateIcon.iconUrl()

        // ToDo: Lookup iconId and return icon url
        // ToDo: Setup icon collection watcher
        return '';
    }

    @Selector() static eventIcon(state: StateEventModel): Array<string> { return state.form.get(EventKey.Clusters).value; }

    @Action(ActionGetEvents)
    getEvents({ patchState } : StateContext<StateEventModel>)
    {
        return this.user$.pipe(
            map((user:User) => user.uidInternal),
            switchMap(uidInternal => {
                return this.serviceEvent.
                getEvents(uidInternal).
                pipe
                (
                    map((events: Array<Event>) =>
                    {
                        const entities: Record<number, Event> = {};

                        events.forEach((event: Event) => entities[event.id] = event);

                        patchState({ entities });
                    })
                )
            })
        )
    }

    @Action(ActionSetEventId)
    setEventId({ patchState, getState, dispatch } : StateContext<StateEventModel>, { payload }: ActionSetEventId)
    {
        const id: string = payload;
        const entities : Record<string, Event> = StateEvent.entities(getState());
        const event: Event = id === 'new' ? { ...StateEventOptions.defaults.empty } : entities[id];

        patchState({ id });

        return dispatch(new ActionSetEvent(event));
    }

    @Action(ActionSetEvent)
    setEvent({ patchState } : StateContext<StateEventModel>, { payload }: ActionSetEvent)
    {
        const event: Event = payload;

        const form: FormGroup = this.formBuilder.group
        ({
            [AssetKey.Draft]       : event.draft,
            [AssetKey.Name]        : [event.name,        ValidatorsExtended.minLength(1)],
            [AssetKey.Description] : [event.description, ValidatorsExtended.minLength(1)],
            [AssetKey.Private]     : event.private,

            [EventKey.Tagline]  : [event.tagline, ValidatorsExtended.minLength(1)],
            [EventKey.ImageId]  : [event.imageId, Validators.required],
            [EventKey.PlaceId]  : [event.placeId, Validators.required],
            [EventKey.Clusters] : this.formBuilder.array(event.clusters, Validators.minLength(1))
        });

        patchState({ form });
/*
        return this.serviceEvent.
        setEvent(payload).
        pipe
        (
            map((event: Event) =>
            {
                const entities: Record<number, Event> = {};

                entities[event.id] = event;

                patchState({ entities });
            })
        )
*/
    }
}
