import { Injectable } from '@angular/core';
import { Query } from '@angular/fire/compat/firestore';
import { FieldValue, Timestamp } from '@angular/fire/firestore';
import { SetFormPristine } from '@ngxs/form-plugin';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { LngLatLike } from 'mapbox-gl';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  CityInfo,
  Collection,
  Event,
  Interest,
  MetadataEvent,
  Place
} from '@firefly/cloud';
import { CoreEnum, ImageType } from '@theory/core';
import {
  DocumentSnapshot,
  ImageSize,
  QueryDocumentSnapshot,
  QuerySnapshot,
  ServiceStorage
} from '@theory/firebase';
import { MapboxPlaceType } from '@theory/mapbox';
import { StateDocument } from '@theory/ngxs';

import { ServiceEvents, ServiceLocation } from '../../../services';
import { StateUserAlerts } from '../../child';
import {
  ActionUserEventsAdd,
  ActionUserEventsRemove,
  ActionUserEventsSync,
  StateUserEvents
} from '../../query/user-events';
import { StateInterest } from '../interest';
import { StateUser } from '../user';
import {
  ActionEventAccept,
  ActionEventCreate,
  ActionEventDelete,
  ActionEventDeny,
  ActionEventGet,
  ActionEventImageSet,
  ActionEventImagesUpdate,
  ActionEventInterestAdd,
  ActionEventInterestRemove,
  ActionEventPatch,
  ActionEventPatchMetadata,
  ActionEventPlaceSet,
  ActionEventReset,
  ActionEventSave,
  ActionEventSet,
  ActionEventSetId,
  ActionEventSetIdAnonymous,
  ActionEventSetIdAnonymousPending,
  ActionEventTimeSet,
  ActionEventUpdate
} from './event.actions';
import { StateEventModel } from './event.state.model';
import { StateEventOptions } from './event.state.options';

@State<StateEventModel>(StateEventOptions)
@Injectable()
export class StateEvent extends StateDocument<Event, StateEventModel> {
  constructor(
    private store: Store,
    private storage: ServiceStorage,
    private location: ServiceLocation,
    public override service: ServiceEvents
  ) {
    super(
      Collection.Events,
      StateEventOptions.defaults as StateEventModel,
      service,
      {
        version: null,
        id: null,
        userId: null,
        dateCreated: null,
        dateUpdated: null,

        city: null,
        cityId: null,
        description: null,
        draft: false,
        geopoint: null,
        interests: [],
        interestsPending: [],
        name: null,
        notifyComplete: false,
        placeType: null,
        private: false,
        tagline: null,
        timeNotify: null,
        timeStart: null,
        timeEnd: null,
        phone: null,
        virtual: false,
        website: null,

        metadata: {
          icon: null,
          image: null,
          place: null,
          isEvent: false
        }
      },
      {
        ActionReset: ActionEventReset,
        ActionGet: ActionEventGet,
        ActionSet: ActionEventSet,
        ActionPatch: ActionEventPatch,
        ActionCreate: ActionEventCreate,
        ActionUpdate: ActionEventUpdate,
        ActionSave: ActionEventSave,
        ActionDelete: ActionEventDelete,

        ActionsReset: [],
        ActionsCreate: [],

        ActionsQueryAdd: [ActionUserEventsAdd],
        ActionsQueryRemove: [ActionUserEventsRemove],
        ActionsQuerySync: [ActionUserEventsSync]
      }
    );
  }

  @Selector() static locationTypes(
    state: StateEventModel
  ): Array<MapboxPlaceType> {
    return StateEvent.dataState(state).locationTypes;
  }
  @Selector() static locationDefined(state: StateEventModel): boolean {
    return StateEvent.locationTypes(state) != null;
  }
  @Selector() static timeStart(state: StateEventModel): Timestamp {
    return StateEvent.dataState(state).timeStart;
  }
  @Selector() static timeEnd(state: StateEventModel): Timestamp {
    return StateEvent.dataState(state).timeEnd;
  }
  @Selector() static timeEndValid(state: StateEventModel): boolean {
    return StateEvent.formGroupState(state)?.get('timeEnd')?.errors == null;
  }
  @Selector() static timeStartValid(state: StateEventModel): boolean {
    return StateEvent.formGroupState(state)?.get('timeStart')?.errors == null;
  }
  @Selector() static private(state: StateEventModel): boolean {
    return StateEvent.dataState(state).private;
  }
  @Selector() static notifyComplete(state: StateEventModel): boolean {
    return StateEvent.dataState(state).notifyComplete;
  }
  @Selector() static timeNotify(state: StateEventModel): Timestamp {
    return StateEvent.dataState(state).timeNotify;
  }
  @Selector() static timeNotifyValid(state: StateEventModel): boolean {
    return StateEvent.formGroupState(state)?.get('timeNotify')?.errors == null;
  }
  @Selector() static interests(state: StateEventModel): Array<string> {
    return StateEvent.dataState(state).interests;
  }
  @Selector() static timeIsLocked(state: StateEventModel): boolean {
    return StateEvent.notifyComplete(state);
  }
  @Selector() static icon(state: StateEventModel): string {
    return StateEvent.metadataState(state).icon;
  }
  @Selector() static image(state: StateEventModel): string {
    return StateEvent.metadataState(state).image;
  }
  @Selector() static place(state: StateEventModel): Place {
    return StateEvent.metadataState(state).place;
  }
  @Selector() static virtual(state: StateEventModel): boolean {
    return StateEvent.dataState(state).virtual;
  }
  @Selector() static website(state: StateEventModel): string {
    return StateEvent.dataState(state).website;
  }
  @Selector() static websiteIsSet(state: StateEventModel): boolean {
    return (StateEvent.website(state) || '').trim().length > 0;
  }
  @Selector() static phone(state: StateEventModel): string {
    return StateEvent.dataState(state).phone;
  }
  @Selector() static phoneIsSet(state: StateEventModel): boolean {
    return (StateEvent.phone(state) || '').trim().length > 0;
  }
  @Selector() static draft(state: StateEventModel): boolean {
    return StateEvent.dataState(state).draft;
  }

  @Selector() static placeCenter(state: StateEventModel): LngLatLike | null {
    const place: Place = StateEvent.place(state);

    return place == null ? null : place.centerLike;
  }

  @Selector() static placeDefined(state: StateEventModel): boolean {
    return StateEvent.place(state) != null;
  }

  @Selector([StateUser.userId])
  static isOwner(state: StateEventModel, userId: string): boolean {
    return StateEvent.dataState(state).userId === userId;
  }

  @Selector([StateInterest.canEdit])
  static canAccept(state: StateEventModel, canEditInterest: boolean): boolean {
    return StateEvent.draft(state) && canEditInterest;
  }

  @Selector([StateUser.userId, StateInterest.canEdit])
  static canEditShow(
    state: StateEventModel,
    userId: string,
    canEditInterest: boolean
  ): boolean {
    return (
      (StateEvent.isOwner(state, userId) || StateEvent.isNewState(state)) &&
      !StateEvent.canAccept(state, canEditInterest)
    );
  }

  @Selector([StateUser.userId, StateInterest.canEdit])
  static canEdit(
    state: StateEventModel,
    userId: string,
    canEditInterest: boolean
  ): boolean {
    return (
      StateEvent.canEditShow(state, userId, canEditInterest) &&
      StateEvent.canUpdateState(state) &&
      !StateEvent.notifyComplete(state)
    );
  }

  @Selector([StateUser.userId])
  static canDeleteShow(state: StateEventModel, userId: string): boolean {
    return StateEvent.isOwner(state, userId) && !StateEvent.isNewState(state);
  }

  @Selector([StateUser.userId])
  static canDelete(state: StateEventModel, userId: string): boolean {
    return (
      StateEvent.canDeleteShow(state, userId) &&
      !StateEvent.notifyComplete(state)
    );
  }

  @Action(ActionEventReset)
  public override reset(context: StateContext<StateEventModel>) {
    return super.reset(context);
  }

  @Action(ActionEventGet)
  public override get(
    context: StateContext<StateEventModel>,
    action: ActionEventGet
  ) {
    return super.get(context, action);
  }

  @Action(ActionEventSet)
  public override set(
    context: StateContext<StateEventModel>,
    action: ActionEventSet
  ) {
    const { getState, dispatch } = context;

    const event: Event = action.data
      ? action.data
      : (action.snapshot.data() as Event);

    return super.set(context, action).pipe(
      switchMap(() =>
        event == null || StateEvent.isNewState(getState())
          ? of(null)
          : this.location.placeFromEvent(event).pipe(
              map((place: Place | null) => place as Place),
              switchMap((place: Place) =>
                dispatch(new ActionEventPlaceSet(place))
              )
            )
      ),
      switchMap(() =>
        StateEvent.image(getState()) == null
          ? of(null)
          : this.store.dispatch(new ActionEventImageSet())
      ),
      switchMap(() => dispatch(new SetFormPristine(this.formPath)))
    );
  }

  @Action(ActionEventPatch)
  public override patch(
    context: StateContext<StateEventModel>,
    action: ActionEventPatch
  ) {
    return super.patch(context, action);
  }

  @Action(ActionEventPatchMetadata)
  public override patchMetadata(
    context: StateContext<StateEventModel>,
    action: ActionEventPatchMetadata
  ) {
    return super.patchMetadata(context, action);
  }

  @Action(ActionEventCreate)
  public override create(context: StateContext<StateEventModel>) {
    const { dispatch } = context;

    return super
      .create(context)
      .pipe(switchMap(() => dispatch(new ActionEventImagesUpdate())));
  }

  @Action(ActionEventUpdate)
  public override update(context: StateContext<StateEventModel>) {
    return context
      .dispatch(new ActionEventImagesUpdate())
      .pipe(switchMap(() => super.update(context)));
  }

  @Action(ActionEventSave)
  public override save(context: StateContext<StateEventModel>) {
    return super.save(context);
  }

  @Action(ActionEventDelete)
  public override delete(context: StateContext<StateEventModel>) {
    return super.delete(context);
  }

  @Action(ActionEventSetId)
  public setId(
    { dispatch }: StateContext<StateEventModel>,
    { id, isAlert }: ActionEventSetId
  ) {
    const isNew: boolean = id === CoreEnum.IdNew;
    const isInterestOwner: boolean = this.store.selectSnapshot(
      StateInterest.canEdit
    );
    const userId: string = this.store.selectSnapshot(StateUser.id());

    this.empty.draft = !isInterestOwner;

    const snapshot: DocumentSnapshot<Event> = this.store.selectSnapshot(
      isAlert
        ? StateUserAlerts.snapshotLookup()
        : StateUserEvents.snapshotLookup()
    )[id];

    const data: Event = isNew
      ? this.service.formDataNew(userId, this.empty as Event)
      : this.store.selectSnapshot(
          isAlert ? StateUserAlerts.dataLookup() : StateUserEvents.dataLookup()
        )[id];

    return dispatch(new ActionEventSet(snapshot, data)).pipe(
      switchMap(() =>
        dispatch(new ActionEventPatchMetadata({ isEvent: false }))
      )
    );
  }

  @Action(ActionEventSetIdAnonymousPending)
  actionSetIdAnonymousPending(
    context: StateContext<StateEventModel>,
    { id }: ActionEventSetIdAnonymous
  ) {
    const pendingEvents: Event[] = this.store.selectSnapshot(
      StateInterest.eventsPending
    );
    const pendingEvent: Event[] = pendingEvents.filter(
      (event) => (event.id = id)
    );

    const query: Query = this.service
      .collection('events')
      .ref.where('id', '==', pendingEvent[0].id);

    return from(query.get()).pipe(
      map((snapshot: QuerySnapshot) => snapshot.docs),
      switchMap((snapshot: Array<QueryDocumentSnapshot>) => {
        const event: Event = snapshot[0].data() as Event;
        return this.store.dispatch(
          new ActionEventSet(snapshot[0] as DocumentSnapshot<Event>, event)
        );
      })
    );
  }

  @Action(ActionEventSetIdAnonymous)
  actionSetIdAnonymous(
    context: StateContext<StateEventModel>,
    { id }: ActionEventSetIdAnonymous
  ) {
    const { dispatch } = context;

    const query: Query = this.service
      .collection('events')
      .ref.where('id', '==', id);

    return from(query.get()).pipe(
      map((snapshot: QuerySnapshot) => snapshot.docs),
      switchMap((snapshot: Array<QueryDocumentSnapshot>) => {
        const event: Event = snapshot[0].data() as Event;
        return dispatch(
          new ActionEventSet(snapshot[0] as DocumentSnapshot<Event>, event)
        );
      }),
      switchMap(() => dispatch(new ActionEventPatchMetadata({ isEvent: true })))
    );
  }

  @Action(ActionEventImagesUpdate)
  imagesUpdate(context: StateContext<StateEventModel>) {
    return super.updateMedia(context, ImageType.Image, this.storage);
  }

  @Action(ActionEventImageSet)
  imageSet(context: StateContext<StateEventModel>) {
    const { getState, dispatch } = context;
    const event = StateEvent.dataState(getState());

    return dispatch(new ActionEventPatchMetadata({})).pipe(
      switchMap(() =>
        this.storage.downloadUrl(
          `${Collection.Events}/${event.id}/${ImageType.Image}.jpeg`,
          ImageSize.Medium
        )
      ),
      map((image: string | null | undefined) => image as string),
      switchMap((image: string) =>
        dispatch(new ActionEventPatchMetadata({ image }))
      )
    );
  }

  @Action(ActionEventPlaceSet)
  placeSet(
    { dispatch, getState }: StateContext<StateEventModel>,
    { place }: ActionEventPlaceSet
  ) {
    const state: StateEventModel = getState();
    const metadata: MetadataEvent = StateEvent.metadataState(state);
    const city: CityInfo = place?.city || StateEvent.dataState(state).city;

    metadata.place = place;

    return dispatch([
      new ActionEventPatch({
        geopoint: place?.geopoint,
        city,
        cityId: city.id
      }),
      new ActionEventPatchMetadata(metadata)
    ]);
  }

  @Action(ActionEventInterestAdd)
  interestAdd(
    { dispatch, getState }: StateContext<StateEventModel>,
    { interest, pending }: ActionEventInterestAdd
  ) {
    const key: string = pending ? 'interestsPending' : 'interests';

    const interests: Array<string> =
      StateEvent.dataState(getState())[key] || [];
    const id: string = interest.id;

    const save: boolean = id !== CoreEnum.IdNew;

    if (interests.includes(id)) {
      return of(null);
    }

    interests.push(interest.id);

    return dispatch(new ActionEventPatch({ [key]: interests }, save));
  }

  @Action(ActionEventInterestRemove)
  interestRemove(
    { dispatch, getState }: StateContext<StateEventModel>,
    { interest, pending }: ActionEventInterestRemove
  ) {
    const key: string = pending ? 'interestsPending' : 'interests';
    const interestId: string = interest.id;

    const save: boolean = interestId !== CoreEnum.IdNew;

    const interests: Array<string> = StateEvent.dataState(getState())[
      key
    ].filter((id: string) => id !== interestId);

    return dispatch(new ActionEventPatch({ [key]: interests }, save));
  }

  @Action(ActionEventAccept)
  eventAccept(
    { dispatch }: StateContext<StateEventModel>,
    { interest }: ActionEventInterestAdd
  ) {
    return dispatch(new ActionEventInterestRemove(interest, true)).pipe(
      switchMap(() => dispatch(new ActionEventInterestAdd(interest, false)))
    );
  }

  @Action(ActionEventDeny)
  eventDeny({ dispatch, getState }: StateContext<StateEventModel>) {
    const interest: Interest = this.store.selectSnapshot(StateInterest.data());

    return dispatch(new ActionEventInterestRemove(interest, true)).pipe(
      switchMap(() =>
        dispatch(new ActionEventPatch(StateEvent.dataState(getState()), true))
      )
    );
  }

  @Action(ActionEventTimeSet)
  timeSet(
    { dispatch }: StateContext<StateEventModel>,
    { key, value }: ActionEventTimeSet
  ) {
    const timestamp: FieldValue = Timestamp.fromDate(new Date(value));

    return dispatch([new ActionEventPatch({ [key]: timestamp })]);
  }
}
