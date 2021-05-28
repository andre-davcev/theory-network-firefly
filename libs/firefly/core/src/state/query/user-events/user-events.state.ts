import { State, Action, StateContext, Store } from '@ngxs/store';

import { Event } from '@firefly/cloud';

import { StateUserEventsModel } from './user-events.state.model';
import { StateUserEventsOptions } from './user-events.state.options';
import {
    ActionUserEventsAdd,
    ActionUserEventsRemove,
    ActionUserEventsGet,
    ActionUserEventsSync,
    ActionUserEventsGetData,
    ActionUserEventsReset,
    ActionUserEventsDelete,
    ActionUserEventsFilter
} from './user-events.actions';
import { StateUser } from '../../document/user';
import { StateQuery } from '@theory/ngxs';
import { ServiceEvents } from '@firefly/core/services';
import { Query } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { DocumentSnapshot, ServiceStorage } from '@theory/firebase';
import { Collection, ImageType } from '@firefly/core/enums';
import { Observable, of } from 'rxjs';
import { CoreEnum } from '@theory/core';

@State<StateUserEventsModel>(StateUserEventsOptions)
@Injectable()
export class StateUserEvents extends StateQuery<Event, StateUserEventsModel>
{

    constructor
    (
        private store:   Store,
        private service: ServiceEvents,
                storage: ServiceStorage
    )
    {
        super
        (
            StateUserEventsOptions.defaults,
            {
                ActionReset   : ActionUserEventsReset,
                ActionGetData : ActionUserEventsGetData,
                ActionGet     : ActionUserEventsGet,
                ActionAdd     : ActionUserEventsAdd,
                ActionRemove  : ActionUserEventsRemove,
                ActionSync    : ActionUserEventsSync,
                ActionFilter  : ActionUserEventsFilter
            },
            storage
        );
    }

    @Action(ActionUserEventsReset)
    reset(context: StateContext<StateUserEventsModel>)
    {
        const dateCutoff: Date = new Date();
        dateCutoff.setHours(dateCutoff.getHours() - 6);

        const userId: string = this.store.selectSnapshot(StateUser.id());
        const query: Query   = userId == null ? undefined : this.service.
            collection(Collection.Events).ref.
            where('userId', '==', userId).
            where('timeStart', '>', dateCutoff);

        return super.reset(context, { query });
    }

    @Action(ActionUserEventsGetData)
    getData(context: StateContext<StateUserEventsModel>)
    {
        return super.getData(context);
    }

    @Action(ActionUserEventsGet)
    get(context: StateContext<StateUserEventsModel>)
    {
        return super.get(context).
        pipe
        (
            switchMap(() =>
                super.getMedia(context, Collection.Events, ImageType.Image)
            )
        );
    }

    @Action(ActionUserEventsAdd)
    add(context: StateContext<StateUserEventsModel>, action: ActionUserEventsAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserEventsRemove)
    remove(context: StateContext<StateUserEventsModel>, action: ActionUserEventsRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserEventsSync)
    sync(context: StateContext<StateUserEventsModel>, action: ActionUserEventsSync)
    {
        return super.sync(context, action);
    }

    @Action(ActionUserEventsDelete)
    delete({ dispatch, getState }: StateContext<StateUserEventsModel>, { id }: ActionUserEventsDelete)
    {
        const snapshot: DocumentSnapshot = StateUserEvents.snapshotLookupState(getState())[id];

        const delete$: Observable<any> = id === CoreEnum.IdNew ?
            of(null) :
            this.service.documentDelete(snapshot);

        return delete$.
        pipe
        (
            switchMap(() =>
                dispatch(new ActionUserEventsRemove(id))
            )
        )
    }

    @Action(ActionUserEventsFilter)
    filter(context: StateContext<StateUserEventsModel>, action: ActionUserEventsFilter)
    {
        return super.filter(context, action);
    }
}
