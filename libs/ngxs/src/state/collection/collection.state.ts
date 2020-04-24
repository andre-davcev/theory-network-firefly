import { OrderBy, ImageSize, FirebaseDocument, ServiceStorage } from '@theory/firebase';
import { firestore } from 'firebase/app';
import { createSelector, StateContext } from '@ngxs/store';
import { ActionsCollection } from './collection.actions';
import { CoreUtil, CoreEnum } from '@theory/core';
import { Observable, of, forkJoin } from 'rxjs';
import { PageSize } from '../../enums';
import { StateCollectionModel } from './collection.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { ImageType } from '@firefly/core/enums';

export abstract class StateCollection<T extends FirebaseDocument, M extends StateCollectionModel<T>>
{
    protected defaults: M;
    protected actions:  ActionsCollection;
    protected storage:  ServiceStorage;

    constructor
    (
        defaults : M,
        actions  : ActionsCollection,
        storage  : ServiceStorage
    )
    {
        this.defaults = CoreUtil.clone<M>(defaults);
        this.actions  = actions;
        this.storage  = storage;
    }

    protected static initializedState(state: any):      boolean                                    { return state.initialized; }
    protected static loadingState(state: any):          boolean                                    { return state.loading; }
    protected static pageSizeState(state: any):         number                                     { return state.pageSize; }
    protected static finishedPagingState(state: any):   boolean                                    { return state.finishedPaging; }
    protected static orderByState(state: any):          string                                     { return state.orderBy; }
    protected static orderByDirectionState(state: any): OrderBy                                    { return state.orderByDirection; }
    protected static snapshotsState(state: any):        Array<firestore.DocumentSnapshot>          { return state.snapshots; }
    protected static snapshotLookupState(state: any):   Record<string, firestore.DocumentSnapshot> { return state.snapshotLookup; }
    protected static dataState(state: any):             Array<any>                                 { return state.data; }
    protected static dataLookupState(state: any):       Record<string, any>                        { return state.dataLookup; }
    protected static countState(state: any):            number                                     { return StateCollection.snapshotsState(state).length; }
    protected static foundState(state: any):            boolean                                    { return StateCollection.countState(state) > 0; }
    protected static emptyState(state: any):            boolean                                    { return StateCollection.countState(state) === 0; }
    protected static canPageState(state: any):          boolean                                    { return StateCollection.pageSizeState(state) !== PageSize.None; }
    protected static keysState(state: any):             Array<string>                              { return Object.keys(StateCollection.snapshotLookupState(state));}
    protected static noDataState(state: any):           boolean                                    { return StateCollection.initializedState(state) && !StateCollection.loadingState(state) && !StateCollection.foundState(state); }

    public static initialized()      { return createSelector([this], (state: any) => StateCollection.initializedState(state)); }
    public static loading()          { return createSelector([this], (state: any) => StateCollection.loadingState(state)); }
    public static pageSize()         { return createSelector([this], (state: any) => StateCollection.pageSizeState(state)); }
    public static finishedPaging()   { return createSelector([this], (state: any) => StateCollection.finishedPagingState(state)); }
    public static orderBy()          { return createSelector([this], (state: any) => StateCollection.orderByState(state)); }
    public static orderByDirection() { return createSelector([this], (state: any) => StateCollection.orderByDirectionState(state)); }
    public static snapshots()        { return createSelector([this], (state: any) => StateCollection.snapshotsState(state)); }
    public static snapshotLookup()   { return createSelector([this], (state: any) => StateCollection.snapshotLookupState(state)); }
    public static data()             { return createSelector([this], (state: any) => StateCollection.dataState(state)); }
    public static dataLookup()       { return createSelector([this], (state: any) => StateCollection.dataLookupState(state)); }
    public static count()            { return createSelector([this], (state: any) => StateCollection.countState(state)); }
    public static found()            { return createSelector([this], (state: any) => StateCollection.foundState(state)); }
    public static empty()            { return createSelector([this], (state: any) => StateCollection.emptyState(state)); }
    public static canPage()          { return createSelector([this], (state: any) => StateCollection.canPageState(state)); }
    public static keys()             { return createSelector([this], (state: any) => StateCollection.keysState(state)); }
    public static noData()           { return createSelector([this], (state: any) => StateCollection.noDataState(state)); }

    public reset(context: StateContext<M>, action: any): Observable<any>
    {
        const { patchState } = context;

        const defaults: M = CoreUtil.clone<M>(this.defaults);

        return of(patchState(defaults));
    }

    public add(context: StateContext<M>, action: any): Observable<any>
    {
        const { getState, patchState } = context;
        const { snapshots, snapshotLookup, data, dataLookup, orderBy, orderByDirection, initialized } = getState();

        if (!initialized) { return of(null); }

        const snapshot: firestore.DocumentSnapshot = action.snapshot;

        const id:     string = snapshot.id;
        const entity: T      = action.entity == null ? snapshot.data() : action.entity;
        const count:  number = data.length;
        const value:  any    = entity[orderBy];

        let sortIndex = 0;

        if ((count === 0) ||
            (orderByDirection === OrderBy.Ascending  && value > data[count-1][orderBy]) ||
            (orderByDirection === OrderBy.Descending && value < data[count-1][orderBy]))
        {
            snapshots.push(snapshot);
            data.push(entity);
        }
        else
        {
            if ((orderByDirection === OrderBy.Ascending  && value < data[0][orderBy]) ||
                (orderByDirection === OrderBy.Descending && value > data[0][orderBy]))
            {
                sortIndex = 0;
            }
            else
            {
                sortIndex = data.findIndex((object: T) =>
                    (orderByDirection === OrderBy.Ascending  && value > object[orderBy]) ||
                    (orderByDirection === OrderBy.Descending && value < object[orderBy])
                ) + 1;
            }

            snapshots.splice(sortIndex, 0, snapshot);
            data.splice(sortIndex, 0, entity);
        }

        snapshotLookup[id] = snapshot;
        dataLookup[id]     = entity;

        patchState
        ({
            snapshots,
            snapshotLookup,
            data,
            dataLookup
        } as M)

        return of(sortIndex);
    }

    public remove(context: StateContext<M>, action: any): Observable<any>
    {
        const { getState, patchState } = context;

        const { snapshots, snapshotLookup, data, dataLookup, initialized } = getState();

        if (!initialized) { return of(null); }

        const id:    string = action.id;
        const index: number = data.findIndex((entity: T) => entity.id === id);

        delete snapshotLookup[id];
        delete dataLookup[id];

        snapshots.splice(index, 1);
        data.splice(index, 1);

        patchState
        ({
            snapshots,
            snapshotLookup,
            data,
            dataLookup
        } as M);

        return of(index);
    }

    public sync(context: StateContext<M>, action: any): Observable<any>
    {
        const { getState, patchState }  = context;

        if (!StateCollection.initializedState(getState())) { return of(null); }

        const after: T       = action.object;
        const id:    string  = after.id;
        const state: M       = getState();
        const sync:  boolean = id !== CoreEnum.IdNew;

        let changedOrderBy: boolean = false;
        let indexOld:       number  = -1;
        let indexNew:       number  = -1;

        if (sync)
        {
            const { data, dataLookup, orderBy } = getState();

            const before : T = dataLookup[id];

            indexOld       = data.findIndex((entity: T) => entity.id === id);
            changedOrderBy = before == null ||  before[orderBy] !== after[orderBy];
            dataLookup[id] = after;

            if (changedOrderBy)
            {
                const { snapshots, snapshotLookup, orderByDirection } = state;

                const snapshot : firestore.DocumentSnapshot = snapshotLookup[id];
                const count    : number = data.length;
                const value    : any    = after[orderBy];

                indexNew = data.findIndex((object: T, index: number) =>
                    (orderByDirection === OrderBy.Ascending  && value > object[orderBy]) ||
                    (orderByDirection === OrderBy.Descending && value < object[orderBy]) ||
                    index === count
                );

                snapshots.splice(indexOld, 1);
                data.splice(indexOld, 1);

                snapshots.splice(indexNew, 0, snapshot);
                data.splice(indexNew, 0, after);

                patchState({ snapshots } as M);
            }
            else
            {
                data[indexOld] = after;
            }

            patchState({ data, dataLookup } as M);
        }

        return of
        ({
            sync,
            changedOrderBy,
            indexOld,
            indexNew
        });
    }

    public get(context: StateContext<M>): Observable<any>
    {
        return of(null);
    }

    public getMedia(context: StateContext<M>, collection: string, imageType: string): Observable<any>
    {
        const { getState, patchState } = context;

        const state      : M                 = getState();
        const dataLookup : Record<string, T> = StateCollection.dataLookupState(state);
        const imageSize  : ImageSize         = imageType === ImageType.Icon ? ImageSize.Small : ImageSize.Medium;
        const items      : Array<T>          = StateCollection.dataState(state);

        return of(items).
        pipe
        (
            map((data: Array<T>) =>
                data.
                map((item: T) =>
                    of(item).
                    pipe
                    (
                        switchMap(() =>
                            this.storage.downloadUrl(`${collection}/${item.id}/${imageType}.jpeg`, imageSize)
                        ),
                        map((image: string) =>
                            ({
                                ...item,
                                metadata : { ...item.metadata, [imageType]: image }
                            })
                        )
                    )
                )
            ),
            switchMap((items$: Array<Observable<T>>) =>
                forkJoin(items$).
                pipe
                (
                    tap((data: Array<T>) =>
                        data.forEach((document: T) =>
                            dataLookup[document.id] = document
                        )
                    ),
                    tap((data: Array<T>) =>
                        patchState
                        ({
                            data,
                            dataLookup
                        } as M)
                    )
                )
            )
        );
    }
}
