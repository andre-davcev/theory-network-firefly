import { Injectable } from '@angular/core';
import { Query } from '@angular/fire/compat/firestore';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { forkJoin, from, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Collection, Event, List } from '@firefly/cloud';
import { CoreEnum, ImageType } from '@theory/core';
import {
  DocumentSnapshot,
  ImageSize,
  QueryDocumentSnapshot,
  QuerySnapshot,
  ServiceStorage
} from '@theory/firebase';
import { StateDocument } from '@theory/ngxs';

import { ServiceLists } from '../../../services';
import {
  ActionCityStreamRemove,
  ActionCityStreamSync
} from '../../child/city-stream/city-stream.actions';
import { ActionUserSubscriptionsRemove } from '../../child/user-subscriptions/user-subscriptions.actions';
import { StateLists } from '../../composite/lists/lists.state';
import {
  ActionUserListsAdd,
  ActionUserListsRemove,
  ActionUserListsSync
} from '../../query/user-lists';
import { ActionEventListAdd } from '../event/event.actions';
import { StateUser } from '../user';
import {
  ActionListCreate,
  ActionListDelete,
  ActionListDirty,
  ActionListEventsAdd,
  ActionListEventsGet,
  ActionListEventsGetAnonymous,
  ActionListEventsGetPending,
  ActionListEventsSet,
  ActionListGet,
  ActionListImageSet,
  ActionListImagesUpdate,
  ActionListPatch,
  ActionListPatchMetadata,
  ActionListReset,
  ActionListSave,
  ActionListSet,
  ActionListSetId,
  ActionListUpdate
} from './list.actions';
import { ListEvents } from './list.events.enum';
import { StateListModel } from './list.state.model';
import { StateListOptions } from './list.state.options';

@State<StateListModel>(StateListOptions)
@Injectable()
export class StateList extends StateDocument<List, StateListModel> {
  @Selector() static private(state: StateListModel): boolean {
    return StateList.dataState(state).private;
  }
  @Selector() static image(state: StateListModel): string {
    return StateList.metadataState(state).image;
  }
  @Selector() static events(state: StateListModel): Array<Event> {
    return state.events[StateList.idState(state)] || [];
  }
  @Selector() static eventsPending(state: StateListModel): Array<Event> {
    return state.eventsPending[StateList.idState(state)] || [];
  }

  @Selector([StateUser.userId])
  static canEdit(state: StateListModel, userId: string): boolean {
    return StateList.dataState(state).userId === userId;
  }

  constructor(
    private store: Store,
    private storage: ServiceStorage,
    service: ServiceLists
  ) {
    super(
      Collection.Lists,
      StateListOptions.defaults as StateListModel,
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
        ActionReset: ActionListReset,
        ActionGet: ActionListGet,
        ActionSet: ActionListSet,
        ActionPatch: ActionListPatch,
        ActionCreate: ActionListCreate,
        ActionUpdate: ActionListUpdate,
        ActionSave: ActionListSave,
        ActionDelete: ActionListDelete,

        ActionsReset: [],
        ActionsCreate: [],

        ActionsQueryAdd: [ActionUserListsAdd],
        ActionsQueryRemove: [
          ActionUserListsRemove,
          ActionCityStreamRemove,
          ActionUserSubscriptionsRemove
        ],
        ActionsQuerySync: [ActionUserListsSync, ActionCityStreamSync]
      }
    );
  }

  @Action(ActionListReset)
  public override reset(context: StateContext<StateListModel>) {
    return super.reset(context);
  }

  @Action(ActionListDirty)
  public override dirty(context: StateContext<StateListModel>) {
    return super.dirty(context);
  }

  @Action(ActionListGet)
  public override get(
    context: StateContext<StateListModel>,
    action: ActionListGet
  ) {
    return super.get(context, action);
  }

  @Action(ActionListSet)
  public override set(
    context: StateContext<StateListModel>,
    action: ActionListSet
  ) {
    return super.set(context, action);
  }

  @Action(ActionListPatch)
  public override patch(
    context: StateContext<StateListModel>,
    action: ActionListPatch
  ) {
    return super.patch(context, action);
  }

  @Action(ActionListPatchMetadata)
  public override patchMetadata(
    context: StateContext<StateListModel>,
    action: ActionListPatchMetadata
  ) {
    return super.patchMetadata(context, action);
  }

  @Action(ActionListCreate)
  public override create(context: StateContext<StateListModel>) {
    return super
      .create(context)
      .pipe(switchMap(() => context.dispatch(new ActionListImagesUpdate())));
  }

  @Action(ActionListUpdate)
  public override update(context: StateContext<StateListModel>) {
    return context
      .dispatch(new ActionListImagesUpdate())
      .pipe(switchMap(() => super.update(context)));
  }

  @Action(ActionListSave)
  public override save(context: StateContext<StateListModel>) {
    return super.save(context);
  }

  @Action(ActionListDelete)
  public override delete(context: StateContext<StateListModel>) {
    return super.delete(context);
  }

  @Action(ActionListSetId)
  setId({ dispatch }: StateContext<StateListModel>, { id }: ActionListSetId) {
    const isNew: boolean = id === CoreEnum.IdNew;

    const userId: string = this.store.selectSnapshot(StateUser.id());
    const snapshot: DocumentSnapshot<List> = this.store.selectSnapshot(
      StateLists.snapshotLookup
    )[id];

    const data: List = isNew
      ? this.service.formDataNew(userId, this.empty as List)
      : this.store.selectSnapshot(StateLists.dataLookup)[id];

    return dispatch(new ActionListSet(snapshot, data));
  }

  @Action(ActionListEventsGet)
  eventsGet({ getState, dispatch }: StateContext<StateListModel>) {
    const query: Query = this.service
      .collection(Collection.Events)
      .ref.where('lists', 'array-contains', StateList.idState(getState()));

    return dispatch(new ActionListEventsSet(query, ListEvents.Confirmed));
  }

  @Action(ActionListEventsGetPending)
  eventsGetPending({ dispatch, getState }: StateContext<StateListModel>) {
    const id: string = StateList.idState(getState());

    if (id == null) {
      return of(null);
    }

    const query: Query = this.service
      .collection(Collection.Events)
      .ref.where('listsPending', 'array-contains', id)
      .where('timeEnd', '>', new Date())
      .orderBy('timeEnd', 'asc');

    return dispatch(new ActionListEventsSet(query, ListEvents.Pending));
  }

  @Action(ActionListEventsGetAnonymous)
  eventsGetAnonymous({ dispatch, getState }: StateContext<StateListModel>) {
    const id: string = StateList.idState(getState());

    if (id == null) {
      return of(null);
    }

    const query: Query = this.service
      .collection(Collection.Events)
      .ref.where('lists', 'array-contains', id)
      .where('timeEnd', '>', new Date())
      .orderBy('timeEnd', 'asc')
      .limit(5);

    return dispatch(new ActionListEventsSet(query, ListEvents.Confirmed));
  }

  @Action(ActionListEventsSet)
  eventsSet(
    { patchState, getState }: StateContext<StateListModel>,
    { query, key }: ActionListEventsSet
  ) {
    const list: Array<Event> = [];
    const state: StateListModel = getState();
    const id: string = StateList.idState(state);

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
            ...StateList.dataState(getState())[key],
            [id]: list
          }
        })
      )
    );
  }

  @Action(ActionListEventsAdd)
  eventsAdd(
    { dispatch, getState, patchState }: StateContext<StateListModel>,
    { event }: ActionListEventsAdd
  ) {
    const state: StateListModel = getState();
    const list: List = StateList.dataState(state);
    const id: string = StateList.idState(state);
    const isOwner: boolean = event.userId == list.userId;
    const eventsKey: string = isOwner
      ? ListEvents.Confirmed
      : ListEvents.Pending;
    const events: Record<string, Array<Event>> = isOwner
      ? state.events
      : state.eventsPending;
    const listEvents: Array<Event> = events[id] || [];

    listEvents.unshift(event);
    events[id] = listEvents;

    return dispatch(new ActionEventListAdd(list, !isOwner)).pipe(
      tap(() => patchState({ [eventsKey]: events }))
    );
  }

  @Action(ActionListImagesUpdate)
  imagesUpdate(context: StateContext<StateListModel>) {
    return super.updateMedia(context, ImageType.Image, this.storage);
  }

  @Action(ActionListImageSet)
  imageSet(context: StateContext<StateListModel>) {
    const { getState, dispatch } = context;
    const list = StateList.dataState(getState());

    return dispatch(new ActionListPatchMetadata({})).pipe(
      switchMap(() =>
        this.storage.downloadUrl(
          `${Collection.Lists}/${list.id}/${ImageType.Image}.jpeg`,
          ImageSize.Medium
        )
      ),
      map((image: string | null) => image as string),
      switchMap((image: string) =>
        dispatch(new ActionListPatchMetadata({ image }))
      )
    );
  }
}
