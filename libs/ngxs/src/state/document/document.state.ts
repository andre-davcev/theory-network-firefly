import { StateContext, createSelector } from '@ngxs/store';
import { SetFormPristine, UpdateFormValue, SetFormDirty } from '@ngxs/form-plugin';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import { FormGroup } from '@angular/forms';

import { CoreUtil, CoreEnum } from '@theory/core';
import { ServiceFirestore, FirebaseDocument, ActionStorageUrlGet } from '@theory/firebase';

import { FormNgxsStatus } from '../../enums';
import { FormNgxs } from '../../interfaces';
import { StateDocumentModel } from './document.model';
import { ActionsDocument } from './document.actions';
import { DocumentSnapshot } from '@angular/fire/firestore';

export class StateDocument<T extends FirebaseDocument, M extends StateDocumentModel>
{
    protected collection: string;
    protected defaults:   M;
    protected empty:      T;
    protected service:    ServiceFirestore<T>;
    protected actions:    ActionsDocument;
    protected formPath:   string;

    protected static snapshotState(state: any):   firestore.DocumentSnapshot { return state.snapshot; }
    protected static formState(state: any):       FormNgxs                   { return state.form; }
    protected static formGroupState(state: any):  FormGroup                  { return state.formGroup; }
    protected static isFormState(state: any):     boolean                    { return StateDocument.formGroupState(state) != null; }
    protected static dataState(state: any):       any                        { return StateDocument.formState(state).model; }
    protected static idState(state: any):         string                     { return StateDocument.dataState(state).id; }
    protected static isNewState(state: any):      boolean                    { return StateDocument.idState(state) === CoreEnum.IdNew; }
    protected static canUpdateState(state: any):  boolean                    { return StateDocument.formState(state).status === FormNgxsStatus.Valid && StateDocument.formState(state).dirty; }
    protected static bucketPathState(state: any): string                     { return StateDocument.dataState(state).bucketPath; }
    protected static foundState(state: any):      boolean                    { return StateDocument.dataState(state) != null; }

    public static snapshot()   { return createSelector([this], StateDocument.snapshotState); }
    public static form()       { return createSelector([this], StateDocument.formState); }
    public static formGroup()  { return createSelector([this], StateDocument.formGroupState); }
    public static isForm()     { return createSelector([this], StateDocument.isFormState); }
    public static data()       { return createSelector([this], StateDocument.dataState); }
    public static id()         { return createSelector([this], StateDocument.idState); }
    public static isNew()      { return createSelector([this], StateDocument.isNewState); }
    public static canUpdate()  { return createSelector([this], StateDocument.canUpdateState); }
    public static bucketPath() { return createSelector([this], StateDocument.bucketPathState); }
    public static found()      { return createSelector([this], StateDocument.foundState); }

    constructor
    (
        collection: string,
        defaults:   M,
        service:    ServiceFirestore<T>,
        empty:      T,
        actions:    ActionsDocument
    )
    {
        this.collection = collection;
        this.defaults   = defaults;
        this.service    = service;
        this.empty      = empty;
        this.actions    = actions;
        this.formPath   = `${collection}.form`;
    }

    public reset({ patchState, dispatch }: StateContext<M>): Observable<any>
    {
        const defaults: M = CoreUtil.clone<M>(this.defaults);

        patchState(defaults);

        return dispatch
        ([
            new SetFormPristine(this.formPath),
            ...this.ActionsReset()
        ]);
    }

    public dirty({dispatch}: StateContext<M>): Observable<any>
    {
      return dispatch(new SetFormDirty(this.formPath));
    }

    public get(context: StateContext<M>, action: any): Observable<any>
    {
        const { dispatch }  = context;
        const { ActionSet } = this.actions;

        const id: string  = action.id;

        return this.service.documentGet(this.collection, id).
        pipe
        (
            switchMap((snapshot: firestore.DocumentSnapshot) =>
                dispatch
                ([
                    new ActionSet(snapshot),
                    ...this.ActionsQueryAdd(snapshot)
                ])
            )
        );
    }

    public watch(context: StateContext<M>, action: any): Observable<any>
    {
        const { dispatch }  = context;
        const { ActionSet } = this.actions;

        const id: string  = action.id;

        return this.service.documentWatch(this.collection, id).
        pipe
        (
            tap((snapshot: DocumentSnapshot<T>) =>
                dispatch(new ActionSet(snapshot))
            ),
            map((snapshot: DocumentSnapshot<T>) =>
                snapshot.data()
            )
        );
    }

    public set(context: StateContext<M>, action: any ): Observable<any>
    {
        const { patchState, dispatch } = context;
        const { ActionReset } = this.actions;

        const snapshot:   firestore.DocumentSnapshot = action.snapshot;
        const data:       T                          = action.data == null ? snapshot.data() : action.data;
        const bucketPath: string                     = data['bucketPath'];
        const formGroup:  FormGroup                  = this.service.formCreate(data);

        return dispatch(new ActionReset()).
        pipe
        (
            tap(() =>
                patchState
                ({
                    formGroup,
                    snapshot
                } as M)
            ),
            switchMap(() =>
                bucketPath == null ? of(null) : dispatch(new ActionStorageUrlGet(bucketPath))
            ),
            switchMap(() =>
                dispatch(new UpdateFormValue({ value: data, path: this.formPath}))
            )
        );
    }

    public patch(context: StateContext<M>, action: any): Observable<any>
    {
        const { getState, dispatch } = context;
        const { partial, save } = action;

        const state:   M      = getState();
        const data:    T      = StateDocument.dataState(state);
        const value:   T      = { ...data, ...partial };
        const path:    string = this.formPath;

        return dispatch
        ([
            new UpdateFormValue({ value, path }),
            ...this.ActionsQuerySync(value)
        ]).
        pipe
        (
            switchMap(() =>
                save ?
                    this.service.documentUpdate(StateDocument.snapshotState(state), partial) :
                    of(null)
            )
        );
    }

    public create(context: StateContext<M>, action?: any)
    {
        const { getState, patchState, dispatch } = context;

        const state: M      = getState();
        const value: T      = StateDocument.dataState(state);
        const path:  string = this.formPath;

        return this.service.documentCreate(this.collection, value).
        pipe
        (
            tap((snapshot: firestore.DocumentSnapshot) =>
                patchState({ snapshot } as M)
            ),
            switchMap((snapshot: firestore.DocumentSnapshot) =>
                dispatch
                ([
                    new UpdateFormValue({ value, path }),
                    ...this.ActionsCreate(),
                    ...this.ActionsQueryAdd(snapshot)
                ])
            ),
            map(() =>
                true
            )
        );
    }

    public update(context: StateContext<M>): Observable<any>
    {
        const { getState, dispatch } = context;

        const state      : M          = getState();
        const data       : T          = StateDocument.dataState(state);
        const formGroup  : FormGroup  = StateDocument.formGroupState(state);
        const changed    : Partial<T> = this.service.formFieldsChanged(formGroup);
        const hasChanged : boolean    = Object.keys(changed).length > 0;
        const value      : T          = { ...data };

        const update$: Observable<any> = !hasChanged ?
            of(null) :
            this.service.documentUpdate(StateDocument.snapshotState(state), changed);

        return update$.pipe
        (
            map(() => changed),
            switchMap(() => dispatch(this.ActionsQuerySync(value)))
        );
    }

    public save(context: StateContext<M>): Observable<any>
    {
        const { getState, dispatch }         = context;
        const { ActionCreate, ActionUpdate } = this.actions;

        const isNew: boolean = StateDocument.isNewState(getState());

        return dispatch(isNew ? new ActionCreate() : new ActionUpdate()).
        pipe
        (
            switchMap(() =>
                dispatch(new SetFormPristine(this.formPath))
            )
        );
    }

    public delete(context: StateContext<M>): Observable<any>
    {
        const { getState, dispatch } = context;
        const { ActionReset } = this.actions;

        const state:    M                          = getState();
        const snapshot: firestore.DocumentSnapshot = StateDocument.snapshotState(state);
        const isNew:    boolean                    = StateDocument.isNewState(state);
        const id:       string                     = StateDocument.idState(state);

        const delete$: Observable<any> = isNew ?
            of(null) :
            this.service.documentDelete(snapshot).pipe();

        return delete$.
        pipe
        (
            switchMap(() =>
                dispatch
                ([
                    new ActionReset(),
                    ...this.ActionsQueryRemove(id)
                ])
            ),
            map(() =>
                !isNew
            )
        );
    }

    private ActionsReset(): Array<any>
    {
        const actions: Array<any> = this.actions.ActionsReset == null ? [] : this.actions.ActionsReset;

        return actions.map((ActionReset: any) =>
            new ActionReset()
        );
    }

    private ActionsCreate(): Array<any>
    {
        const actions: Array<any> = this.actions.ActionsCreate == null ? [] : this.actions.ActionsCreate;

        return actions.map((ActionCreate: any) =>
            new ActionCreate()
        );
    }

    private ActionsQueryAdd(snapshot: firestore.DocumentSnapshot, data?: T): Array<any>
    {
        const actions: Array<any> = this.actions.ActionsQueryAdd == null ? [] : this.actions.ActionsQueryAdd;

        return actions.map((ActionQueryAdd: any) =>
            new ActionQueryAdd(snapshot, data)
        );
    }

    private ActionsQueryRemove(id: string): Array<any>
    {
        const actions: Array<any> = this.actions.ActionsQueryRemove == null ? [] : this.actions.ActionsQueryRemove;

        return actions.map((ActionQueryRemove: any) =>
            new ActionQueryRemove(id)
        );
    }

    private ActionsQuerySync(data: T): Array<any>
    {
        const actions: Array<any> = this.actions.ActionsQuerySync == null ? [] : this.actions.ActionsQuerySync;

        return actions.map((ActionQuerySync: any) =>
            new ActionQuerySync(data)
        );
    }
}
