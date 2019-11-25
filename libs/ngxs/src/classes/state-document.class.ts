import { ServiceFirestore, Model, ActionStorageGetUrl } from '@theory/firebase';

import { StateDocumentModel, ActionsDocument, FormNgxs } from '../interfaces';
import { CoreUtil, CoreEnum } from '@theory/core';
import { StateContext, Selector, createSelector } from '@ngxs/store';
import { SetFormPristine, UpdateFormValue } from '@ngxs/form-plugin';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { firestore } from 'firebase/app';
import { FormGroup } from '@angular/forms';
import { FormNgxsStatus } from '../enums';

export class StateDocument<T extends Model, M extends StateDocumentModel<T>>
{
    protected collection: string;
    protected defaults:   M;
    protected empty:      T;
    protected service:    ServiceFirestore<T>;
    protected actions:    ActionsDocument;
    protected formPath:   string;

    public static snapshot()   { return createSelector([this], (state: any) => { return state.snapshot as firestore.DocumentSnapshot; }); }
    public static form()       { return createSelector([this], (state: any) => { return state.form as FormNgxs }); }
    public static formGroup()  { return createSelector([this], (state: any) => { return state.formGroup as FormGroup; }); }
    public static isForm()     { return createSelector([this], (state: any) => { return state.formGroup != null; }); }
    public static data()       { return createSelector([this], (state: any) => { return state.form.model as any; }); }
    public static id()         { return createSelector([this], (state: any) => { return state.form.model.id as string; }); }
    public static isNew()      { return createSelector([this], (state: any) => { return state.form.mode.id === CoreEnum.IdNew; }); }
    public static canUpdate()  { return createSelector([this], (state: any) => { return state.form.status === FormNgxsStatus.Valid && state.form.dirty as boolean; }); }
    public static bucketPath() { return createSelector([this], (state: any) => { return state.form.model.bucketPath as string; }); }

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
        this.formPath   = `${name}.form`;
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

    public set(context: StateContext<M>, action: any ): Observable<any>
    {
        const { getState, patchState, dispatch } = context;
        const { ActionReset } = this.actions;

        const snapshot:   firestore.DocumentSnapshot = action.snapshot;
        const data:       T                          = action.data == null ? snapshot.data() : action.data;
        const bucketPath: string                     = StateDocument.bucketPath()(getState());
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
                bucketPath == null ? of(null) : dispatch(new ActionStorageGetUrl(bucketPath))
            ),
            switchMap(() =>
                dispatch(new UpdateFormValue({ value: data, path: this.formPath}))
            )
        );
    }

    public patch(context: StateContext<M>, action: any): Observable<any>
    {
        const { getState, dispatch } = context;

        const partial: Partial<T> = action.partial;
        const state:   M          = getState();
        const data:    T          = StateDocument.data()(state);
        const value:   T          = { ...data, ...partial };
        const path:    string     = this.formPath;

        return dispatch
        ([
            new UpdateFormValue({ value, path }),
            ...this.ActionsQuerySync(value)
        ]);
    }

    public create(context: StateContext<M>)
    {
        const { getState, patchState, dispatch } = context;

        const state: M       = getState();
        const isNew: boolean = StateDocument.isNew()(state);
        const value: T       = StateDocument.data()(state);
        const path:  string  = this.formPath;

        return !isNew ?
            of(false) :
            this.service.documentCreate(this.collection, value).
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

    public save(context: StateContext<M>): Observable<any>
    {
        const { getState, dispatch } = context;
        const { ActionCreate }       = this.actions;

        const state:     M          = getState();
        const formGroup: FormGroup  = StateDocument.formGroup()(state);
        const isNew:     boolean    = StateDocument.isNew()(state);
        const partial:   Partial<T> = this.service.formFieldsChanged(formGroup);

        const snapshot: firestore.DocumentSnapshot = StateDocument.snapshot()(state);

        return isNew ?
          dispatch(new ActionCreate()) :
          this.service.documentUpdate(snapshot, partial).
          pipe
          (
              switchMap(() => dispatch(new SetFormPristine(this.formPath)))
          );
    }

    public delete(context: StateContext<M>): Observable<any>
    {
        const { getState, dispatch } = context;
        const { ActionReset } = this.actions;

        const state:    M                          = getState();
        const snapshot: firestore.DocumentSnapshot = StateDocument.snapshot()(state);
        const isNew:    boolean                    = StateDocument.isNew()(state);
        const id:       string                     = StateDocument.id()(state);

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
