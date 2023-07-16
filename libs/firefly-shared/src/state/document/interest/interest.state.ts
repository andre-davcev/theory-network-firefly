import { Injectable } from '@angular/core';
import { Query } from '@angular/fire/compat/firestore';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { forkJoin, from, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Collection, Event, Interest } from '@firefly/cloud';
import { CoreEnum, ImageType } from '@theory/core';
import {
  DocumentSnapshot,
  ImageSize,
  QueryDocumentSnapshot,
  QuerySnapshot,
  ServiceStorage
} from '@theory/firebase';
import { StateDocument } from '@theory/ngxs';

import { ServiceInterests } from '../../../services';
import {
  ActionCityStreamRemove,
  ActionCityStreamSync
} from '../../child/city-stream/city-stream.actions';
import { ActionUserSubscriptionsRemove } from '../../child/user-subscriptions/user-subscriptions.actions';
import { StateInterests } from '../../composite/interests/interests.state';
import {
  ActionUserInterestsAdd,
  ActionUserInterestsRemove,
  ActionUserInterestsSync
} from '../../query/user-interests';
import { ActionEventInterestAdd } from '../event/event.actions';
import { StateUser } from '../user';
import {
  ActionInterestCreate,
  ActionInterestDelete,
  ActionInterestDirty,
  ActionInterestEventsAdd,
  ActionInterestEventsGet,
  ActionInterestEventsGetAnonymous,
  ActionInterestEventsGetPending,
  ActionInterestEventsSet,
  ActionInterestGet,
  ActionInterestImageSet,
  ActionInterestImagesUpdate,
  ActionInterestPatch,
  ActionInterestPatchMetadata,
  ActionInterestReset,
  ActionInterestSave,
  ActionInterestSet,
  ActionInterestSetId,
  ActionInterestUpdate
} from './interest.actions';
import { InterestEvents } from './interest.events.enum';
import { StateInterestModel } from './interest.state.model';
import { StateInterestOptions } from './interest.state.options';

@State<StateInterestModel>(StateInterestOptions)
@Injectable()
export class StateInterest extends StateDocument<Interest, StateInterestModel> {
  @Selector() static private(state: StateInterestModel): boolean {
    return StateInterest.dataState(state).private;
  }
  @Selector() static image(state: StateInterestModel): string {
    return StateInterest.metadataState(state).image;
  }
  @Selector() static events(state: StateInterestModel): Array<Event> {
    return state.events[StateInterest.idState(state)] || [];
  }
  @Selector() static eventsPending(state: StateInterestModel): Array<Event> {
    return state.eventsPending[StateInterest.idState(state)] || [];
  }

  @Selector([StateUser.userId])
  static canEdit(state: StateInterestModel, userId: string): boolean {
    return StateInterest.dataState(state).userId === userId;
  }

  constructor(
    private store: Store,
    private storage: ServiceStorage,
    service: ServiceInterests
  ) {
    super(
      Collection.Interests,
      StateInterestOptions.defaults as StateInterestModel,
      service,
      {
        version: null,
        userId: null,
        id: null,
        dateCreated: null,
        dateUpdated: null,

        description: null,
        name: null,
        private: false,
        subscriberCount: 0,
        tagline: null,
        virtual: false,

        metadata: { image: null }
      },
      {
        ActionReset: ActionInterestReset,
        ActionGet: ActionInterestGet,
        ActionSet: ActionInterestSet,
        ActionPatch: ActionInterestPatch,
        ActionCreate: ActionInterestCreate,
        ActionUpdate: ActionInterestUpdate,
        ActionSave: ActionInterestSave,
        ActionDelete: ActionInterestDelete,

        ActionsReset: [],
        ActionsCreate: [],

        ActionsQueryAdd: [ActionUserInterestsAdd],
        ActionsQueryRemove: [
          ActionUserInterestsRemove,
          ActionCityStreamRemove,
          ActionUserSubscriptionsRemove
        ],
        ActionsQuerySync: [ActionUserInterestsSync, ActionCityStreamSync]
      }
    );
  }

  @Action(ActionInterestReset)
  public override reset(context: StateContext<StateInterestModel>) {
    return super.reset(context);
  }

  @Action(ActionInterestDirty)
  public override dirty(context: StateContext<StateInterestModel>) {
    return super.dirty(context);
  }

  @Action(ActionInterestGet)
  public override get(
    context: StateContext<StateInterestModel>,
    action: ActionInterestGet
  ) {
    return super.get(context, action);
  }

  @Action(ActionInterestSet)
  public override set(
    context: StateContext<StateInterestModel>,
    action: ActionInterestSet
  ) {
    return super.set(context, action);
  }

  @Action(ActionInterestPatch)
  public override patch(
    context: StateContext<StateInterestModel>,
    action: ActionInterestPatch
  ) {
    return super.patch(context, action);
  }

  @Action(ActionInterestPatchMetadata)
  public override patchMetadata(
    context: StateContext<StateInterestModel>,
    action: ActionInterestPatchMetadata
  ) {
    return super.patchMetadata(context, action);
  }

  @Action(ActionInterestCreate)
  public override create(context: StateContext<StateInterestModel>) {
    return super
      .create(context)
      .pipe(
        switchMap(() => context.dispatch(new ActionInterestImagesUpdate()))
      );
  }

  @Action(ActionInterestUpdate)
  public override update(context: StateContext<StateInterestModel>) {
    return context
      .dispatch(new ActionInterestImagesUpdate())
      .pipe(switchMap(() => super.update(context)));
  }

  @Action(ActionInterestSave)
  public override save(context: StateContext<StateInterestModel>) {
    return super.save(context);
  }

  @Action(ActionInterestDelete)
  public override delete(context: StateContext<StateInterestModel>) {
    return super.delete(context);
  }

  @Action(ActionInterestSetId)
  setId(
    { dispatch }: StateContext<StateInterestModel>,
    { id }: ActionInterestSetId
  ) {
    const isNew: boolean = id === CoreEnum.IdNew;

    const userId: string = this.store.selectSnapshot(StateUser.id());
    const snapshot: DocumentSnapshot<Interest> = this.store.selectSnapshot(
      StateInterests.snapshotLookup
    )[id];

    const data: Interest = isNew
      ? this.service.formDataNew(userId, this.empty as Interest)
      : this.store.selectSnapshot(StateInterests.dataLookup)[id];

    return dispatch(new ActionInterestSet(snapshot, data));
  }

  @Action(ActionInterestEventsGet)
  eventsGet({ getState, dispatch }: StateContext<StateInterestModel>) {
    const query: Query = this.service
      .collection(Collection.Events)
      .ref.where(
        'interests',
        'array-contains',
        StateInterest.idState(getState())
      );

    return dispatch(
      new ActionInterestEventsSet(query, InterestEvents.Confirmed)
    );
  }

  @Action(ActionInterestEventsGetPending)
  eventsGetPending({ dispatch, getState }: StateContext<StateInterestModel>) {
    const id: string = StateInterest.idState(getState());

    if (id == null) {
      return of(null);
    }

    const query: Query = this.service
      .collection(Collection.Events)
      .ref.where('interestsPending', 'array-contains', id)
      .where('timeStart', '>', new Date())
      .orderBy('timeStart', 'asc');

    return dispatch(new ActionInterestEventsSet(query, InterestEvents.Pending));
  }

  @Action(ActionInterestEventsGetAnonymous)
  eventsGetAnonymous({ dispatch, getState }: StateContext<StateInterestModel>) {
    const id: string = StateInterest.idState(getState());

    if (id == null) {
      return of(null);
    }

    const query: Query = this.service
      .collection(Collection.Events)
      .ref.where('interests', 'array-contains', id)
      .where('timeStart', '>', new Date())
      .orderBy('timeStart', 'asc')
      .limit(5);

    return dispatch(
      new ActionInterestEventsSet(query, InterestEvents.Confirmed)
    );
  }

  @Action(ActionInterestEventsSet)
  eventsSet(
    { patchState, getState }: StateContext<StateInterestModel>,
    { query, key }: ActionInterestEventsSet
  ) {
    const list: Array<Event> = [];
    const state: StateInterestModel = getState();
    const id: string = StateInterest.idState(state);

    return from(query.get()).pipe(
      map((snapshot: QuerySnapshot) => snapshot.docs),
      tap((page: Array<QueryDocumentSnapshot>) =>
        page.forEach((document: QueryDocumentSnapshot) =>
          list.push({
            ...(document.data() as Event),
            metadata: {}
          })
        )
      ),
      switchMap(() =>
        list.length === 0
          ? of(null)
          : forkJoin(
              list.map((item: Event) =>
                of(item).pipe(
                  switchMap(() =>
                    item.metadata.image
                      ? of(item.metadata.image)
                      : this.storage.downloadUrl(
                          `${Collection.Events}/${item.id}/${ImageType.Image}.jpeg`,
                          ImageSize.Small
                        )
                  ),
                  map((image: string | null) => image as string),
                  map((image: string) => (item.metadata.image = image))
                )
              )
            )
      ),
      tap(() =>
        patchState({
          [key]: {
            ...StateInterest.dataState(getState())[key],
            [id]: list
          }
        })
      )
    );
  }

  @Action(ActionInterestEventsAdd)
  eventsAdd(
    { dispatch, getState, patchState }: StateContext<StateInterestModel>,
    { event }: ActionInterestEventsAdd
  ) {
    const state: StateInterestModel = getState();
    const interest: Interest = StateInterest.dataState(state);
    const id: string = StateInterest.idState(state);
    const isOwner: boolean = event.userId == interest.userId;
    const eventsKey: string = isOwner
      ? InterestEvents.Confirmed
      : InterestEvents.Pending;
    const events: Record<string, Array<Event>> = isOwner
      ? state.events
      : state.eventsPending;
    const interestEvents: Array<Event> = events[id] || [];

    interestEvents.unshift(event);
    events[id] = interestEvents;

    return dispatch(new ActionEventInterestAdd(interest, !isOwner)).pipe(
      tap(() => patchState({ [eventsKey]: events }))
    );
  }

  @Action(ActionInterestImagesUpdate)
  imagesUpdate(context: StateContext<StateInterestModel>) {
    return super.updateMedia(context, ImageType.Image, this.storage);
  }

  @Action(ActionInterestImageSet)
  imageSet(context: StateContext<StateInterestModel>) {
    const { getState, dispatch } = context;
    const interest = StateInterest.dataState(getState());

    return dispatch(new ActionInterestPatchMetadata({})).pipe(
      switchMap(() =>
        this.storage.downloadUrl(
          `${Collection.Interests}/${interest.id}/${ImageType.Image}.jpeg`,
          ImageSize.Medium
        )
      ),
      map((image: string | null) => image as string),
      switchMap((image: string) =>
        dispatch(new ActionInterestPatchMetadata({ image }))
      )
    );
  }
}
