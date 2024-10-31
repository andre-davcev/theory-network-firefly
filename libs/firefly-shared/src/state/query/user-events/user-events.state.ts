import { Injectable } from '@angular/core';
import { Query } from '@angular/fire/compat/firestore';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Collection, Event } from '@firefly/cloud';
import { CoreEnum, ImageType } from '@theory/core';
import { DocumentSnapshot, ServiceStorage } from '@theory/firebase';
import { StateQuery } from '@theory/ngxs';

import { EventType } from '../../../enums';
import { ServiceEvents } from '../../../services';
import { CalendarFilter } from '../../composite/calendar/calendar.filter.model';
import {
  ActionAppLoadingHide,
  ActionAppLoadingShow
} from '../../document/app/app.actions';
import { StateUser } from '../../document/user';
import {
  ActionUserEventsAdd,
  ActionUserEventsDelete,
  ActionUserEventsFilter,
  ActionUserEventsGet,
  ActionUserEventsGetData,
  ActionUserEventsRemove,
  ActionUserEventsReset,
  ActionUserEventsSync
} from './user-events.actions';
import { StateUserEventsModel } from './user-events.state.model';
import { StateUserEventsOptions } from './user-events.state.options';

@State<StateUserEventsModel>(StateUserEventsOptions)
@Injectable()
export class StateUserEvents extends StateQuery<Event, StateUserEventsModel> {
  @Selector([StateUserEvents]) static filter(
    state: StateUserEventsModel
  ): CalendarFilter {
    return state.filter;
  }

  @Selector([StateUserEvents.filter]) static type(
    filter: CalendarFilter
  ): EventType {
    return filter.type;
  }

  @Selector([StateUserEvents.filter]) static virtual(
    filter: CalendarFilter
  ): boolean {
    return filter.virtual;
  }

  constructor(
    private store: Store,
    private service: ServiceEvents,
    storage: ServiceStorage
  ) {
    super(
      StateUserEventsOptions.defaults as StateUserEventsModel,
      {
        ActionReset: ActionUserEventsReset,
        ActionGetData: ActionUserEventsGetData,
        ActionGet: ActionUserEventsGet,
        ActionAdd: ActionUserEventsAdd,
        ActionRemove: ActionUserEventsRemove,
        ActionSync: ActionUserEventsSync,
        ActionFilter: ActionUserEventsFilter
      },
      storage
    );
  }

  @Action(ActionUserEventsReset)
  public override reset(context: StateContext<StateUserEventsModel>) {
    const dateCutoff: Date = new Date();
    dateCutoff.setHours(dateCutoff.getHours() - 6);

    const userId: string = this.store.selectSnapshot(StateUser.id());
    const query: Query | undefined =
      userId == null
        ? undefined
        : this.service
            .collection(Collection.Events)
            .ref.where('userId', '==', userId)
            .where('timeEnd', '>', dateCutoff);

    return super.reset(context, { query });
  }

  @Action(ActionUserEventsGetData)
  public override getData(context: StateContext<StateUserEventsModel>) {
    return super.getData(context);
  }

  @Action(ActionUserEventsGet)
  public override get(context: StateContext<StateUserEventsModel>) {
    return super.get(context, {
      collection: Collection.Events,
      imageType: ImageType.Image
    });
  }

  @Action(ActionUserEventsAdd)
  public override add(
    context: StateContext<StateUserEventsModel>,
    action: ActionUserEventsAdd
  ) {
    return super.add(context, action);
  }

  @Action(ActionUserEventsRemove)
  public override remove(
    context: StateContext<StateUserEventsModel>,
    action: ActionUserEventsRemove
  ) {
    return super.remove(context, action);
  }

  @Action(ActionUserEventsSync)
  public override sync(
    context: StateContext<StateUserEventsModel>,
    action: ActionUserEventsSync
  ) {
    return super.sync(context, action);
  }

  @Action(ActionUserEventsDelete)
  delete(
    { dispatch, getState }: StateContext<StateUserEventsModel>,
    { id }: ActionUserEventsDelete
  ) {
    const snapshot: DocumentSnapshot<Event> =
      StateUserEvents.snapshotLookupState(getState())[id];

    const delete$: Observable<any> =
      id === CoreEnum.IdNew ? of(null) : this.service.documentDelete(snapshot);

    return delete$.pipe(
      switchMap(() => dispatch(new ActionUserEventsRemove(id)))
    );
  }

  @Action(ActionUserEventsFilter)
  public override filter(
    context: StateContext<StateUserEventsModel>,
    { filter }: ActionUserEventsFilter
  ) {
    const { patchState, dispatch, getState } = context;

    const state: StateUserEventsModel = getState();

    filter = filter || StateUserEvents.filter(state);

    patchState({ filter });

    const initialized: boolean = StateUserEvents.initializedState(state);

    return initialized
      ? super.filter(context)
      : dispatch(new ActionAppLoadingShow()).pipe(
          switchMap(() => dispatch(new ActionUserEventsGetData())),
          switchMap(() => dispatch(new ActionAppLoadingHide()))
        );
  }

  public override keys(
    context: StateContext<StateUserEventsModel>
  ): Array<string> {
    const { getState } = context;

    const state: StateUserEventsModel = getState();
    const lookup: Record<string, Event> =
      StateUserEvents.dataLookupState(state);
    const keys: Array<string> = StateUserEvents.keysState(state);
    const virtual: boolean = this.store.selectSnapshot(StateUserEvents.virtual);

    return keys.filter((id: string) => !virtual || lookup[id]?.virtual);
  }
}
