import { State, Action, StateContext, Store } from '@ngxs/store';
import { Image } from '@firefly/core/models';
import { ServiceImages } from '@firefly/core/services';
import { StateQuery } from '@theory/ngxs';

import { StateUserImagesModel } from './user-images.state.model';
import { StateUserImagesOptions } from './user-images.state.options';
import {
    ActionUserImagesAdd,
    ActionUserImagesReset,
    ActionUserImagesRemove,
    ActionUserImagesGetData,
    ActionUserImagesGet,
    ActionUserImagesSync
} from './user-images.actions';
import { StateUser } from '../user';
import { Query } from '@angular/fire/firestore';

@State<StateUserImagesModel>(StateUserImagesOptions)

export class StateUserImages extends StateQuery<Image, StateUserImagesModel>
{
    constructor
    (
        private store:   Store,
        private service: ServiceImages
    )
    {
        super
        (
            StateUserImagesOptions.defaults,
            {
                ActionReset   : ActionUserImagesReset,
                ActionGetData : ActionUserImagesGetData,
                ActionGet     : ActionUserImagesGet,
                ActionAdd     : ActionUserImagesAdd,
                ActionRemove  : ActionUserImagesRemove,
                ActionSync    : ActionUserImagesSync
            }
        );
    }

    @Action(ActionUserImagesReset)
    reset(context: StateContext<StateUserImagesModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.id);
        const query: Query   = userId == null ? undefined : this.service.collection('events').ref.where('userId', '==', userId);

        return super.reset(context, query);
    }

    @Action(ActionUserImagesGetData)
    getData(context: StateContext<StateUserImagesModel>)
    {
        return super.getData(context);
    }

    @Action(ActionUserImagesGet)
    get(context: StateContext<StateUserImagesModel>)
    {
        return super.get(context);
    }

    @Action(ActionUserImagesAdd)
    add(context: StateContext<StateUserImagesModel>, action: ActionUserImagesAdd)
    {
        return super.add(context, action);
    }

    @Action(ActionUserImagesRemove)
    remove(context: StateContext<StateUserImagesModel>, action: ActionUserImagesRemove)
    {
        return super.remove(context, action);
    }

    @Action(ActionUserImagesSync)
    sync(context: StateContext<StateUserImagesModel>, action: ActionUserImagesSync)
    {
        return super.sync(context, action);
    }
}
