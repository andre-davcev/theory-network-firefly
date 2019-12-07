import { OrderBy, ImageSize, Document } from '@theory/firebase';
import { firestore } from 'firebase/app';
import { createSelector, StateContext } from '@ngxs/store';
import { ActionsCollection } from './collection.actions';
import { CoreUtil, CoreEnum } from '@theory/core';
import { Observable, of } from 'rxjs';
import { PageSize } from '../../enums';
import { StateCollectionModel } from './collection.model';

export class StateCollection<T extends Document, M extends StateCollectionModel<T>>
{
    protected defaults: M;
    protected actions:  ActionsCollection;

    constructor
    (
        defaults: M,
        actions:  ActionsCollection
    )
    {
        this.defaults = CoreUtil.clone<M>(defaults);
        this.actions  = actions;
    }

    protected static initializedState(state: any):      boolean                                    { return state.initialized; }
    protected static loadingState(state: any):          boolean                                    { return state.loading; }
    protected static pageSizeState(state: any):         number                                     { return state.pageSize; }
    protected static finishedPagingState(state: any):   boolean                                    { return state.finishedPaging; }
    protected static orderByState(state: any):          string                                     { return state.orderBy; }
    protected static orderByDirectionState(state: any): OrderBy                                    { return state.orderByDirection; }
    protected static imageSizeState(state: any):        ImageSize                                  { return state.imageSize; }
    protected static snapshotsState(state: any):        Array<firestore.DocumentSnapshot>          { return state.snapshots; }
    protected static snapshotLookupState(state: any):   Record<string, firestore.DocumentSnapshot> { return state.snapshotLookup; }
    protected static dataState(state: any):             Array<any>                                 { return state.data; }
    protected static dataLookupState(state: any):       Record<string, any>                        { return state.dataLookup; }
    protected static countState(state: any):            number                                     { return StateCollection.snapshotsState(state).length; }
    protected static foundState(state: any):            boolean                                    { return StateCollection.countState(state) > 0; }
    protected static canPageState(state: any):          boolean                                    { return StateCollection.pageSizeState(state) === PageSize.None; }
    protected static keysState(state: any):             Array<string>                              { return Object.keys(StateCollection.snapshotLookupState(state));}
    protected static noDataState(state: any):           boolean                                    { return StateCollection.initializedState(state) && !StateCollection.loadingState(state) && !StateCollection.foundState(state); }

    public static initialized()      { return createSelector([this], StateCollection.initializedState); }
    public static loading()          { return createSelector([this], StateCollection.loadingState); }
    public static pageSize()         { return createSelector([this], StateCollection.pageSizeState); }
    public static finishedPaging()   { return createSelector([this], StateCollection.finishedPagingState); }
    public static orderBy()          { return createSelector([this], StateCollection.orderByState); }
    public static orderByDirection() { return createSelector([this], StateCollection.orderByDirectionState); }
    public static imageSize()        { return createSelector([this], StateCollection.imageSizeState); }
    public static snapshots()        { return createSelector([this], StateCollection.snapshotsState); }
    public static snapshotLookup()   { return createSelector([this], StateCollection.snapshotLookupState); }
    public static data()             { return createSelector([this], StateCollection.dataState); }
    public static dataLookup()       { return createSelector([this], StateCollection.dataLookupState); }
    public static count()            { return createSelector([this], StateCollection.countState); }
    public static found()            { return createSelector([this], StateCollection.foundState); }
    public static canPage()          { return createSelector([this], StateCollection.canPageState); }
    public static keys()             { return createSelector([this], StateCollection.keysState); }
    public static noData()           { return createSelector([this], StateCollection.noData); }

    public reset(context: StateContext<M>, action: any): Observable<any>
    {
        const { patchState } = context;

        const defaults: M = CoreUtil.clone<M>(this.defaults);

        return of(patchState(defaults));
    }

    public add(context: StateContext<M>, action: any): Observable<any>
    {
        const { getState, patchState } = context;
        const { snapshots, snapshotLookup, data, dataLookup, orderBy, orderByDirection } = getState();

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

        const { snapshots, snapshotLookup, data, dataLookup } = getState();

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
}
