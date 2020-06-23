
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
    ActionInterestEventsReset,
    ActionInterestSetIdAnonymous,
    ActionInterestEventsGetAnonymous,
    ActionInterestPatchMetadata
} from './interest.actions';
import { ActionUserInterestsAdd, ActionUserInterestsRemove, StateUserInterests, ActionUserInterestsSync } from '../..//query/user-interests';
import { ActionUserStreamRemove } from '../../child/user-stream/user-stream.actions';
import { ActionUserSubscriptionsRemove } from '../../child/user-subscriptions/user-subscriptions.actions';
import { firestore } from 'firebase/app';
import { ImageSize, ActionStorageUrlsGet, ServiceStorage } from '@theory/firebase';
import { switchMap, tap, map } from 'rxjs/operators';
import { of, from, forkJoin } from 'rxjs';
import { Query } from '@angular/fire/firestore';
import { StateLanguage } from '@theory/capacitor';
import { StateUserStream } from '@firefly/core/state/child/user-stream';
import { Injectable } from '@angular/core';
import { Collection, ImageType } from '@firefly/core/enums';

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
                ActionsQueryRemove: [ActionUserInterestsRemove, ActionUserStreamRemove, ActionUserSubscriptionsRemove],
                ActionsQuerySync:   [ActionUserInterestsSync]
            }
        );
    }

    @Selector() static events(state: StateInterestModel):  Array<Event> { return state.events.filter((event: Event) => !event.draft); }
    @Selector() static private(state: StateInterestModel): boolean      { return StateInterest.dataState(state).private; }
    @Selector([StateUser.userId]) static pendingEvents(state: StateInterestModel, userId: string): Event[] { return state.events.filter((event: Event) => event.draft && (StateInterest.dataState(state).userId === userId || event.userId === userId)) }
    @Selector([StateUser.userId]) static canEdit(state: StateInterestModel, userId: string): boolean
    {
      return StateInterest.dataState(state).userId === userId;
    }
    @Selector() static image(state: StateInterestModel): string { return StateInterest.metadataState(state).image; }

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
        return super.create(context);
    }

    @Action(ActionInterestUpdate)
    update(context: StateContext<StateInterestModel>)
    {
        return super.update(context);
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

        const userId:   string                     = this.store.selectSnapshot(StateUser.id());
        const snapshot: firestore.DocumentSnapshot = this.store.selectSnapshot(StateUserInterests.snapshotLookup())[id];

        const data: Interest = isNew ?
            this.service.formDataNew(userId, this.empty) :
            this.store.selectSnapshot(StateUserInterests.dataLookup())[id];

        return dispatch(new ActionInterestSet(snapshot, data));
    }

    @Action(ActionInterestSetIdAnonymous)
    setIdAnonymous({ dispatch }: StateContext<StateInterestModel>, { id }: ActionInterestSetIdAnonymous)
    {
        const snapshot: firestore.DocumentSnapshot = this.store.selectSnapshot(StateUserStream.snapshotLookup())[id];
        const data: Interest = this.store.selectSnapshot(StateUserStream.dataLookup())[id];

        return dispatch(new ActionInterestSet(snapshot, data));
    }

    @Action(ActionInterestEventsReset)
    eventsReset({ patchState }: StateContext<StateInterestModel>)
    {
      patchState(
        {
          events: []
        }
      )
    }

    @Action(ActionInterestEventsGet)
    eventsGet({ patchState, getState, dispatch}: StateContext<StateInterestModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id());
        const query: Query   = userId == null ? undefined : this.service.collection('events').ref
          .where('userId', '==', userId).where('interests', 'array-contains', StateInterest.idState(getState()));
        var events: Event[] = new Array();

        return from(query.get()).pipe
        (
          map((snapshot: firestore.QuerySnapshot) =>
            snapshot.docs
          ),
          tap((page: Array<firestore.QueryDocumentSnapshot>) =>
          {
            const language: string = this.store.selectSnapshot(StateLanguage.language);
            const options: any = { weekday: 'long',
              year: 'numeric', month: 'long', day: 'numeric'};
            const optionsShort: any = { weekday: 'short',
              year: 'numeric', month: 'short', day: 'numeric'};

            let timeStart: Date;
            let timeStartPrevious: Date;
            let timeStartFormatted: string;
            let timeStartFormattedShort: string;

            page.forEach((document: firestore.QueryDocumentSnapshot) =>
            {
              const event: Event = document.data() as Event;

              timeStart = new Date(event.timeStart);
              timeStartFormatted = timeStart.toLocaleDateString(language, options);
              timeStartFormattedShort = timeStart.toLocaleDateString(language, optionsShort);

              if(event.metadata === undefined)
                event.metadata = {};

              if(timeStartPrevious === undefined || timeStart.getTime() != timeStartPrevious.getTime())
                event.metadata.timeStartFormatted = timeStartFormatted;

              event.metadata.timeStartFormattedShort = timeStartFormattedShort;
              event.metadata.timeStartDate = timeStart;
              timeStartPrevious = timeStart;

              events.push(event);
            })
          }),
          switchMap(() =>
              forkJoin
              (
                  events.
                      map((item: Event) =>
                          of(item).
                          pipe
                          (
                              switchMap(() =>
                                  item.metadata.icon ?
                                      of(item.metadata.icon) :
                                      this.storage.downloadUrl(`${Collection.Events}/${item.id}/${ImageType.Image}.jpeg`, ImageSize.Small)
                              ),
                              map((icon: string) =>
                                  item.metadata.icon = icon
                              )
                          )
                )
              )
          ),
          tap(() =>
            patchState
            ({
              events
            })
          )
      )
    }

    @Action(ActionInterestEventsGetAnonymous)
    eventsGetAnonymous({ patchState, getState, dispatch}: StateContext<StateInterestModel>)
    {
        const interestId: string = StateInterest.idState(getState());

        if (interestId == null) { return of(null); }

        const currentDate = Date();
        const query: Query   = this.service.collection('events').ref
          .where('interests', 'array-contains', interestId)
          .where('timeStart', "<", currentDate.toString())
          .orderBy('timeStart', 'asc')
          .limit(5);
        var events: Event[] = new Array();

        return from(query.get()).pipe
        (
          map((snapshot: firestore.QuerySnapshot) =>
            snapshot.docs
          ),
          tap((page: Array<firestore.QueryDocumentSnapshot>) =>
          {
            const language: string = this.store.selectSnapshot(StateLanguage.language);
            const options: any = { weekday: 'long',
              year: 'numeric', month: 'long', day: 'numeric'};
            const optionsShort: any = { weekday: 'short',
              year: 'numeric', month: 'short', day: 'numeric'};

            let timeStart: Date;
            let timeStartPrevious: Date;
            let timeStartFormatted: string;
            let timeStartFormattedShort: string;

            page.forEach((document: firestore.QueryDocumentSnapshot) =>
            {
              const event: Event = document.data() as Event;

              timeStart = new Date(event.timeStart);
              timeStartFormatted = timeStart.toLocaleDateString(language, options);
              timeStartFormattedShort = timeStart.toLocaleDateString(language, optionsShort);

              if(event.metadata === undefined)
                event.metadata = {};

              if(timeStartPrevious === undefined || timeStart.getTime() != timeStartPrevious.getTime())
                event.metadata.timeStartFormatted = timeStartFormatted;

              event.metadata.timeStartFormattedShort = timeStartFormattedShort;
              event.metadata.timeStartDate = timeStart;
              timeStartPrevious = timeStart;

              events.push(event);
            })
          }),
          switchMap(() =>
              forkJoin
              (
                  events.
                      map((item: Event) =>
                          of(item).
                          pipe
                          (
                              switchMap(() =>
                                  item.metadata.icon ?
                                      of(item.metadata.icon) :
                                      this.storage.downloadUrl(`${Collection.Events}/${item.id}/${ImageType.Image}.jpeg`, ImageSize.Small)
                              ),
                              map((icon: string) =>
                                  item.metadata.icon = icon
                              )
                          )
                )
              )
          ),
          tap(() =>
            patchState
            ({
              events
            })
          )
      )
    }
}
