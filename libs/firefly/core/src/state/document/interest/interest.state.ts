
import { Action, State, StateContext, Store, Selector } from '@ngxs/store';

import { CoreEnum } from '@theory/core';
import { StateDocument } from '@theory/ngxs';
import { Interest, Event } from '@firefly/cloud';
import { ServiceInterests } from '@firefly/core/services';
import { StateUser } from '@firefly/core/state/document/user';

import { StateInterestModel } from './interest.state.model';
import { StateInterestOptions } from './interest.state.options';
import {
    ActionInterestReset,
    ActionInterestDirty,
    ActionInterestGet,
    ActionInterestSet,
    ActionInterestPatch,
    ActionInterestCreate,
    ActionInterestSave,
    ActionInterestDelete,
    ActionInterestSetId,
    ActionInterestUpdate,
    ActionInterestEventsGet,
    ActionInterestEventsGetAnonymous,
    ActionInterestPatchMetadata,
    ActionInterestImagesUpdate,
    ActionInterestImageSet
} from './interest.actions';
import { ActionUserInterestsAdd, ActionUserInterestsRemove, ActionUserInterestsSync } from '../..//query/user-interests';
import { ActionCityStreamRemove, ActionCityStreamSync } from '../../child/city-stream/city-stream.actions';
import { ActionUserSubscriptionsRemove } from '../../child/user-subscriptions/user-subscriptions.actions';
import { DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot } from '@theory/firebase';
import { ImageSize, ServiceStorage } from '@theory/firebase';
import { switchMap, tap, map } from 'rxjs/operators';
import { of, from, forkJoin } from 'rxjs';
import { Query } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Collection, ImageType } from '@firefly/core/enums';
import { StateInterests } from '../../composite/interests/interests.state';

@State<StateInterestModel>(StateInterestOptions)
@Injectable()
export class StateInterest extends StateDocument<Interest, StateInterestModel>
{
    constructor
    (
        private store: Store,
        private storage: ServiceStorage,
        service: ServiceInterests
    )
    {
        super
        (
            Collection.Interests,
            StateInterestOptions.defaults,
            service,
            {
                version     : undefined,
                userId      : undefined,
                id          : undefined,
                dateCreated : undefined,
                dateUpdated : undefined,

                description     : null,
                name            : null,
                private         : true,
                subscriberCount : 0,
                tagline         : null,
                virtual         : false,

                metadata : { image: null }
            },
            {
                ActionReset:  ActionInterestReset,
                ActionGet:    ActionInterestGet,
                ActionSet:    ActionInterestSet,
                ActionPatch:  ActionInterestPatch,
                ActionCreate: ActionInterestCreate,
                ActionUpdate: ActionInterestUpdate,
                ActionSave:   ActionInterestSave,
                ActionDelete: ActionInterestDelete,

                ActionsReset:  [],
                ActionsCreate: [],

                ActionsQueryAdd:    [ActionUserInterestsAdd],
                ActionsQueryRemove: [ActionUserInterestsRemove, ActionCityStreamRemove, ActionUserSubscriptionsRemove],
                ActionsQuerySync:   [ActionUserInterestsSync, ActionCityStreamSync]
            }
        );
    }

    @Selector() static private(state: StateInterestModel): boolean      { return StateInterest.dataState(state).private; }
    @Selector([StateUser.userId]) static canEdit(state: StateInterestModel, userId: string): boolean
    {
      return StateInterest.dataState(state).userId === userId;
    }
    @Selector() static image(state: StateInterestModel): string { return StateInterest.metadataState(state).image; }

    @Selector() static events(state: StateInterestModel): Array<Event> { return state.events[StateInterest.idState(state)]; }
    @Selector([StateUser.userId])
    static pendingEvents(state: StateInterestModel, userId: string): Array<Event>
    {
        return StateInterest.dataState(state).userId === userId ?
            state.eventsPending[StateInterest.idState(state)] :
            [];
    }

    @Action(ActionInterestReset)
    reset(context: StateContext<StateInterestModel>)
    {
        return super.reset(context)
    }

    @Action(ActionInterestDirty)
    dirty(context: StateContext<StateInterestModel>)
    {
      return super.dirty(context)
    }

    @Action(ActionInterestGet)
    get(context: StateContext<StateInterestModel>, action: ActionInterestGet)
    {
        return super.get(context, action);
    }

    @Action(ActionInterestSet)
    set(context: StateContext<StateInterestModel>, action: ActionInterestSet)
    {
        return super.set(context, action);
    }

    @Action(ActionInterestPatch)
    patch(context : StateContext<StateInterestModel>, action: ActionInterestPatch)
    {
        return super.patch(context, action);
    }

    @Action(ActionInterestPatchMetadata)
    patchMetadata(context : StateContext<StateInterestModel>, action: ActionInterestPatchMetadata)
    {
        return super.patchMetadata(context, action);
    }

    @Action(ActionInterestCreate)
    create(context: StateContext<StateInterestModel>)
    {
        return super.create(context).
        pipe
        (
            switchMap(() =>
                context.dispatch(new ActionInterestImagesUpdate())
            )
        );
    }

    @Action(ActionInterestUpdate)
    update(context: StateContext<StateInterestModel>)
    {
        return context.dispatch(new ActionInterestImagesUpdate()).
        pipe
        (
            switchMap(() =>
                super.update(context)
            )
        );
    }

    @Action(ActionInterestSave)
    save(context: StateContext<StateInterestModel>)
    {
        return super.save(context);
    }

    @Action(ActionInterestDelete)
    delete(context: StateContext<StateInterestModel>)
    {
        return super.delete(context);
    }

    @Action(ActionInterestSetId)
    setId({ dispatch }: StateContext<StateInterestModel>, { id }: ActionInterestSetId)
    {
        const isNew: boolean = id === CoreEnum.IdNew;

        const userId:   string           = this.store.selectSnapshot(StateUser.id());
        const snapshot: DocumentSnapshot = this.store.selectSnapshot(StateInterests.snapshotLookup)[id];

        const data: Interest = isNew ?
            this.service.formDataNew(userId, this.empty) :
            this.store.selectSnapshot(StateInterests.dataLookup)[id];

        return dispatch(new ActionInterestSet(snapshot, data));
    }

    @Action(ActionInterestEventsGet)
    eventsGet({ patchState, getState }: StateContext<StateInterestModel>)
    {
        const userId : string = this.store.selectSnapshot(StateUser.id());

        const query : Query = userId == null ?
            undefined :
            this.service.
                collection('events').
                ref.
                where('userId', '==', userId).
                where('interests', 'array-contains', StateInterest.idState(getState()));

        const events: Array<Event> = [];

        return from(query.get()).pipe
        (
            map((snapshot: QuerySnapshot) =>
                snapshot.docs
            ),
            tap((page: Array<QueryDocumentSnapshot>) =>
                page.forEach((document: QueryDocumentSnapshot) =>
                    events.push
                    ({
                        ...document.data() as Event,
                        metadata: {}
                    })
                )
            ),
          switchMap(() =>
              forkJoin
              (
                  events.
                      map((item: Event) =>
                          of(item).
                          pipe
                          (
                              switchMap(() =>
                                  item.metadata.image ?
                                      of(item.metadata.image) :
                                      this.storage.downloadUrl(`${Collection.Events}/${item.id}/${ImageType.Image}.jpeg`, ImageSize.Small)
                              ),
                              map((image: string) =>
                                  item.metadata.image = image
                              )
                          )
                )
              )
          ),
          tap(() =>
              patchState({ events })
          )
      )
    }

    @Action(ActionInterestEventsGetAnonymous)
    eventsGetAnonymous({ patchState, getState}: StateContext<StateInterestModel>)
    {
        const interestId: string = StateInterest.idState(getState());

        if (interestId == null) { return of(null); }

        const query: Query = this.service.
            collection('events').
            ref.
            where('interests', 'array-contains', interestId).
            where('timeStart', '>', new Date()).
            orderBy('timeStart', 'asc').
            limit(5);

        const events: Array<Event> = [];

        return from(query.get()).pipe
        (
            map((snapshot: QuerySnapshot) =>
                snapshot.docs
            ),
            tap((page: Array<QueryDocumentSnapshot>) =>
                page.forEach((document: QueryDocumentSnapshot) =>
                    events.push
                    ({
                        ...document.data() as Event,
                        metadata: {}
                    })
            )),
            switchMap(() =>
                events.length === 0 ? of(null) : forkJoin
                (
                    events.
                        map((item: Event) =>
                            of(item).
                            pipe
                            (
                                switchMap(() =>
                                    item.metadata.image ?
                                        of(item.metadata.image) :
                                        this.storage.downloadUrl(`${Collection.Events}/${item.id}/${ImageType.Image}.jpeg`, ImageSize.Small)
                                ),
                                map((image: string) =>
                                    item.metadata.image = image
                                )
                            )
                  )
                )
            ),
            tap(() =>
                patchState({ events })
            )
        )
    }

    @Action(ActionInterestImagesUpdate)
    imagesUpdate(context : StateContext<StateInterestModel>)
    {
        return super.updateMedia(context, ImageType.Image, this.storage);
    }

    @Action(ActionInterestImageSet)
    imageSet(context : StateContext<StateInterestModel>)
    {
      const { getState, dispatch } = context;
      const interest = StateInterest.dataState(getState());

      return dispatch(new ActionInterestPatchMetadata({})).
      pipe
      (
          switchMap(() => this.storage.downloadUrl(`${Collection.Interests}/${interest.id}/${ImageType.Image}.jpeg`, ImageSize.Medium)),
          switchMap((image: string) =>
              dispatch(new ActionInterestPatchMetadata( { image } ))
          )
      );
    }
}
