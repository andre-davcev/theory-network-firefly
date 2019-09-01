import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs/operators';

import { CoreUtil } from '@theory/core';
import { StateUser } from '@firefly/core/state';
import { Image, UserImage } from '@firefly/core/models';
import { ServiceUserImages, ServiceImages } from '@firefly/core/services';
import { SortField, StateReferenceTable } from '@theory/state';

import { StateUserImagesModel } from './user-images.state.model';
import { StateUserImagesOptions } from './user-images.state.options';
import {
    ActionUserImagesAdd,
    ActionUserImagesReset,
    ActionUserImagesRemove,
    ActionUserImagesGetData,
    ActionUserImagesSort,
    ActionUserImagesGet,
    ActionUserImagesSet
} from './user-images.actions';

@State<StateUserImagesModel>(StateUserImagesOptions)

export class StateUserImages extends StateReferenceTable<UserImage, Image, StateUserImagesModel>
{
    @Selector() static data(state: StateUserImagesModel):      Record<string, UserImage> { return state.data; }
    @Selector() static keys(state: StateUserImagesModel):      Array<string>               { return state.keys; }
    @Selector() static lookup(state: StateUserImagesModel):    Record<string, Image>     { return state.lookup; }
    @Selector() static list(state: StateUserImagesModel):      Array<Image>              { return state.list; }
    @Selector() static offset(state: StateUserImagesModel):    number                      { return state.offset; }
    @Selector() static pageSize(state: StateUserImagesModel):  number                      { return state.pageSize; }
    @Selector() static sortField(state: StateUserImagesModel): SortField                   { return state.sortField; }

    constructor
    (
        private store: Store,
        private service: ServiceUserImages,
        private images: ServiceImages
    )
    {
        super();
    }

    @Action(ActionUserImagesReset)
    reset({ patchState }: StateContext<StateUserImagesModel>)
    {
        const defaults: StateUserImagesModel = CoreUtil.clone<StateUserImagesModel>(StateUserImagesOptions.defaults);

        patchState(defaults);
    }

    @Action(ActionUserImagesGetData)
    getData({ dispatch }: StateContext<StateUserImagesModel>)
    {
        const userId: string = this.store.selectSnapshot(StateUser.userId);

        return dispatch(new ActionUserImagesReset()).
        pipe
        (
            switchMap(() =>
                this.service.get(userId)
            ),
            switchMap((data: Record<string, UserImage>) =>
                dispatch([
                    new ActionUserImagesSet(data),
                    new ActionUserImagesSort()
                ])
            )
        );
    }

    @Action(ActionUserImagesGet)
    get({ getState, patchState }: StateContext<StateUserImagesModel>)
    {
        const state: StateUserImagesModel = getState();

        return super.page
        (
            this.images,
            StateUserImages.keys(state),
            StateUserImages.lookup(state),
            StateUserImages.list(state),
            StateUserImages.pageSize(state),
            StateUserImages.offset(state)
        ).
        pipe
        (
            tap((partial: Partial<StateUserImagesModel>) =>
                patchState(partial)
            )
        );
    }
    @Action(ActionUserImagesSet)
    set({ patchState }: StateContext<StateUserImagesModel>, { payload }: ActionUserImagesSet)
    {
        patchState({ data: payload == null ? {} : payload });
    }

    @Action(ActionUserImagesSort)
    sortData({ getState, patchState }: StateContext<StateUserImagesModel>, { payload }: ActionUserImagesSort)
    {
        const state:     StateUserImagesModel      = getState();
        const data:      Record<string, UserImage> = StateUserImages.data(state);
        const sortField: SortField                 = payload == null ? StateUserImages.sortField(state) : payload;
        const keys:      Array<string>             = this.sort(data, sortField);

        patchState
        ({
            keys,
            sortField
        });
    }

    @Action(ActionUserImagesAdd)
    add({ patchState, getState }: StateContext<StateUserImagesModel>, { payload }: ActionUserImagesAdd)
    {
        const state: StateUserImagesModel = getState();
        const image: Image              = payload;

        const userImage: UserImage =
        {
            sort: { name: Image.name }
        };

        const partial: Partial<StateUserImagesModel> =
        this.addData
        (
            image.id,
            image,
            userImage,
            StateUserImages.data(state),
            StateUserImages.keys(state),
            StateUserImages.lookup(state),
            StateUserImages.list(state),
            StateUserImages.offset(state),
            StateUserImages.sortField(state)
        );

        patchState(partial);
    }

    @Action(ActionUserImagesRemove)
    remove({ patchState, getState }: StateContext<StateUserImagesModel>, { payload }: ActionUserImagesRemove)
    {
        const state: StateUserImagesModel = getState();

        const partial: Partial<StateUserImagesModel> =
        this.removeData
        (
            payload,
            StateUserImages.data(state),
            StateUserImages.keys(state),
            StateUserImages.lookup(state),
            StateUserImages.list(state),
            StateUserImages.offset(state)
        );

        patchState(partial);
    }
}
