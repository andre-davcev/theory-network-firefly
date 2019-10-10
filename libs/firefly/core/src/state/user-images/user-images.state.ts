import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { Image, UserImage } from '@firefly/core/models';
import { ServiceUserImages, ServiceImages } from '@firefly/core/services';
import { StateReferenceTable } from '@theory/state';

import { StateUserImagesModel } from './user-images.state.model';
import { StateUserImagesOptions } from './user-images.state.options';
import {
    ActionUserImagesAdd,
    ActionUserImagesReset,
    ActionUserImagesRemove,
    ActionUserImagesGetData,
    ActionUserImagesSort,
    ActionUserImagesGet,
    ActionUserImagesSet,
    ActionUserImagesDelete,
    ActionUserImagesSync
} from './user-images.actions';
import { StateUser } from '../user';

@State<StateUserImagesModel>(StateUserImagesOptions)

export class StateUserImages extends StateReferenceTable<UserImage, Image, StateUserImagesModel>
{
    @Selector() static data(state: StateUserImagesModel):          Record<string, UserImage> { return state.data; }
    @Selector() static keys(state: StateUserImagesModel):          Array<string>             { return state.keys; }
    @Selector() static lookup(state: StateUserImagesModel):        Record<string, Image>     { return state.lookup; }
    @Selector() static list(state: StateUserImagesModel):          Array<Image>              { return state.list; }
    @Selector() static offset(state: StateUserImagesModel):        number                    { return state.offset; }
    @Selector() static pageSize(state: StateUserImagesModel):      number                    { return state.pageSize; }
    @Selector() static initialized(state: StateUserImagesModel):   boolean                   { return state.initialized; }
    @Selector() static sortField(state: StateUserImagesModel):     string                    { return state.sortField; }
    @Selector() static sortAscending(state: StateUserImagesModel): boolean                   { return state.sortAscending; }
    @Selector() static sortFields(state: StateUserImagesModel):    Record<string, TypeOf>    { return state.sortFields; }
    @Selector() static sortType(state: StateUserImagesModel):      TypeOf                    { return state.sortFields[state.sortField]; }
    @Selector() static sortByEntity(state: StateUserImagesModel):  boolean                   { return state.sortByEntity; }
    @Selector() static count(state: StateUserImagesModel):         number                    { return Object.keys(StateUserImages.data(state)).length; }

    constructor
    (
        private store:   Store,
        private service: ServiceUserImages,
        private images:  ServiceImages
    )
    {
        super();
    }

    @Action(ActionUserImagesReset)
    reset({ patchState }: StateContext<StateUserImagesModel>)
    {
        const defaults: StateUserImagesModel = CoreUtil.clone<StateUserImagesModel>(StateUserImagesOptions.defaults);

        return patchState(defaults);
    }

    @Action(ActionUserImagesGetData)
    getData({ dispatch, patchState, getState }: StateContext<StateUserImagesModel>, { fetch }: ActionUserImagesGetData)
    {
        const id:          string  = this.store.selectSnapshot(StateUser.id);
        const initialized: boolean = StateUserImages.initialized(getState());

        return initialized ? of() : dispatch
        ([
            new ActionUserImagesReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, UserImage>) =>
                dispatch([
                    new ActionUserImagesSet(data),
                    new ActionUserImagesSort()
                ])
            ),
            switchMap(() =>
                dispatch(fetch ? new ActionUserImagesGet() : of())
            ),
            map(() =>
                patchState({ initialized: true })
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
    sortData({ getState, patchState }: StateContext<StateUserImagesModel>)
    {
        const state: StateUserImagesModel      = getState();
        const data:  Record<string, UserImage> = StateUserImages.data(state);

        const sortField:     string  = StateUserImages.sortField(state);
        const sortAscending: boolean = StateUserImages.sortAscending(state);
        const sortType:      TypeOf  = StateUserImages.sortFields(state)[sortField];

        const keys: Array<string> = this.sort(data, sortField, sortAscending, sortType);

        patchState({ keys });
    }

    @Action(ActionUserImagesAdd)
    add({ patchState, getState }: StateContext<StateUserImagesModel>, { payload }: ActionUserImagesAdd)
    {
        const state:  StateUserImagesModel = getState();
        const entity: Image                = payload;

        const sortFields:    Record<string, TypeOf> = StateUserImages.sortFields(state);
        const sortField:     string                 = StateUserImages.sortField(state);
        const sortAscending: boolean                = StateUserImages.sortAscending(state);
        const sortType:      TypeOf                 = sortFields[sortField];

        const object: UserImage =
        {
            sort: this.sortFields(sortFields, entity)
        };

        const partial: Partial<StateUserImagesModel> =
        this.addData
        (
            entity.id,
            entity,
            object,
            StateUserImages.data(state),
            StateUserImages.keys(state),
            StateUserImages.lookup(state),
            StateUserImages.list(state),
            StateUserImages.offset(state),
            sortField,
            sortAscending,
            sortType
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

    @Action(ActionUserImagesSync)
    sync({ patchState, getState}: StateContext<StateUserImagesModel>, { payload }: ActionUserImagesSync)
    {
        const state:  StateUserImagesModel  = getState();
        const lookup: Record<string, Image> = StateUserImages.lookup(state);
        const after:  Image                 = payload;
        const before: Image                 = lookup[after.id];

        const partial: Partial<StateUserImagesModel> = this.syncData
        (
            before,
            after,
            StateUserImages.list(state),
            lookup,
            StateUserImages.data(state),
            StateUserImages.sortField(state),
            StateUserImages.sortAscending(state),
            StateUserImages.sortType(state)
        );

        patchState(partial);
    }

    @Action(ActionUserImagesDelete)
    delete({ dispatch }: StateContext<StateUserImagesModel>)
    {
        return dispatch
        ([
            new ActionUserImagesReset()
        ]);
    }
}
