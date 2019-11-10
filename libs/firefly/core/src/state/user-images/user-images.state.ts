import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { of, empty } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { CoreUtil, TypeOf } from '@theory/core';
import { Image, UserImage } from '@firefly/core/models';
import { ServiceUserImages, ServiceImages } from '@firefly/core/services';
import { StateReferenceTable, Default } from '@theory/ngxs';

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
    @Selector() static sort(state: StateUserImagesModel):          boolean                   { return Object.keys(StateUserImages.sortFields(state)).length > 0; }
    @Selector() static count(state: StateUserImagesModel):         number                    { return Object.keys(StateUserImages.data(state)).length; }
    @Selector() static found(state: StateUserImagesModel):         boolean                   { return StateUserImages.count(state) > 0; }
    @Selector() static getAll(state: StateUserImagesModel):        boolean                   { return StateUserImages.sort(state) && state.sortByEntity; }

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
        const state: StateUserImagesModel = getState();

        const id:          string  = this.store.selectSnapshot(StateUser.id);
        const initialized: boolean = StateUserImages.initialized(state);

        return initialized ? of({}) : dispatch
        ([
            new ActionUserImagesReset()
        ]).
        pipe
        (
            switchMap(() =>
                this.service.get(id)
            ),
            switchMap((data: Record<string, UserImage>) =>
                dispatch(new ActionUserImagesSet(data))
            ),
            switchMap(() =>
                StateUserImages.getAll(state) ? of(null) : dispatch(new ActionUserImagesSort())
            ),
            switchMap(() =>
                fetch ? dispatch(new ActionUserImagesGet()) : of(null)
            ),
            map(() =>
                patchState({ initialized: true })
            )
        );
    }

    @Action(ActionUserImagesGet)
    get({ getState, patchState }: StateContext<StateUserImagesModel>)
    {
        return super.page
        (
            getState(),
            this.images
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
        const keys: Array<string> = this.sort(getState());

        patchState({ keys });
    }

    @Action(ActionUserImagesAdd)
    add({ patchState, getState }: StateContext<StateUserImagesModel>, { payload }: ActionUserImagesAdd)
    {
        const entity: Image = payload;

        const partial: Partial<StateUserImagesModel> =
        this.addData
        (
            getState(),
            entity
        );

        patchState(partial);
    }

    @Action(ActionUserImagesRemove)
    remove({ patchState, getState }: StateContext<StateUserImagesModel>, { payload }: ActionUserImagesRemove)
    {
        const partial: Partial<StateUserImagesModel> =
        this.removeData
        (
            getState(),
            payload
        );

        patchState(partial);
    }

    @Action(ActionUserImagesSync)
    sync({ patchState, getState}: StateContext<StateUserImagesModel>, { payload }: ActionUserImagesSync)
    {
        const after: Image = payload;

        const partial: Partial<StateUserImagesModel> = this.syncData
        (
            getState(),
            after
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
