import { StateContext, createSelector } from '@ngxs/store';
import { SetFormPristine, UpdateFormValue, SetFormDirty } from '@ngxs/form-plugin';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { FormGroup, AbstractControl } from '@angular/forms';

import { CoreUtil, CoreEnum } from '@theory/core';
import { ServiceFirestore, FirebaseDocument, ServiceStorage, DocumentSnapshot as FirestoreDocumentSnapshot } from '@theory/firebase';

import { FormNgxsStatus } from '../../enums';
import { FormNgxs } from '../../interfaces';
import { StateDocumentModel } from './document.model';
import { ActionsDocument } from './document.actions';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { ImageType } from '@firefly/core/enums';

export class StateDocument<T extends FirebaseDocument, M extends StateDocumentModel>
{
    protected collection: string;
    protected defaults:   M;
    protected empty:      T;
    protected service:    ServiceFirestore<T>;
    protected actions:    ActionsDocument;
    protected formPath:   string;

    protected static snapshotState(state: any):   FirestoreDocumentSnapshot { return state.snapshot; }
    protected static formState(state: any):       FormNgxs                   { return state.form; }
    protected static formGroupState(state: any):  FormGroup                  { return state.formGroup; }
    protected static isFormState(state: any):     boolean                    { return StateDocument.formGroupState(state) != null; }
    protected static dataState(state: any):       any                        { return StateDocument.formState(state).model; }
    protected static idState(state: any):         string                     { return StateDocument.dataState(state).id; }
    protected static isNewState(state: any):      boolean                    { return StateDocument.idState(state) === CoreEnum.IdNew; }
    protected static canUpdateState(state: any):  boolean                    { return StateDocument.formState(state).status === FormNgxsStatus.Valid && StateDocument.formState(state).dirty; }
    protected static foundState(state: any):      boolean                    { return Object.keys(StateDocument.dataState(state)).length > 0; }
    protected static metadataState(state: any):   any                        { return StateDocument.dataState(state).metadata; }

    public static snapshot()   { return createSelector([this], (state: any) => StateDocument.snapshotState(state)); }
    public static form()       { return createSelector([this], (state: any) => StateDocument.formState(state)); }
    public static formGroup()  { return createSelector([this], (state: any) => StateDocument.formGroupState(state)); }
    public static isForm()     { return createSelector([this], (state: any) => StateDocument.isFormState(state)); }
    public static data()       { return createSelector([this], (state: any) => StateDocument.dataState(state)); }
    public static id()         { return createSelector([this], (state: any) => StateDocument.idState(state)); }
    public static isNew()      { return createSelector([this], (state: any) => StateDocument.isNewState(state)); }
    public static canUpdate()  { return createSelector([this], (state: any) => StateDocument.canUpdateState(state)); }
    public static found()      { return createSelector([this], (state: any) => StateDocument.foundState(state)); }
    public static metadata()   { return createSelector([this], (state: any) => StateDocument.metadataState(state)); }

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
            switchMap((snapshot: FirestoreDocumentSnapshot) =>
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

        const snapshot:   FirestoreDocumentSnapshot = action.snapshot;
        const data:       T                          = action.data == null ? snapshot.data() : action.data;

        const formGroup:  FormGroup = this.service.formCreate(data);

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
                dispatch(new SetFormDirty(path))
            ),
            switchMap(() =>
                save ?
                    this.service.documentUpdate(StateDocument.snapshotState(state), partial) :
                    of(null)
            )
        );
    }

    public patchMetadata(context: StateContext<M>, action: any): Observable<void>
    {
        const { getState, dispatch } = context;

        const state : M      = getState();
        const path  : string = this.formPath;
        const value : T      = StateDocument.dataState(state);

        value.metadata =
        {
            ...value.metadata,
            ...action.metadata
        };

        return dispatch(new UpdateFormValue({ value, path }));
    }

    public create(context: StateContext<M>, action?: any): Observable<any>
    {
        const { getState, patchState, dispatch } = context;

        const state: M      = getState();
        const value: T      = StateDocument.dataState(state);
        const path:  string = this.formPath;

        return this.service.documentCreate(this.collection, value).
        pipe
        (
            tap((snapshot: FirestoreDocumentSnapshot) =>
                patchState({ snapshot } as M)
            ),

            map((snapshot: FirestoreDocumentSnapshot) =>
                ({
                    ...snapshot.data(),

                    id: snapshot.id,
                    metadata: { ...value.metadata }
                }) as T
            ),
            switchMap((object: T) =>
                dispatch
                ([
                    new UpdateFormValue({ value: object, path }),
                    ...this.ActionsCreate(),
                    ...this.ActionsQueryAdd(null, object)
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
        const snapshot: FirestoreDocumentSnapshot = StateDocument.snapshotState(state);
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

    protected updateMedia
    (
        context    : StateContext<M>,
        imageType  : ImageType,
        storage    : ServiceStorage
    ): Observable<any>
    {
        const { getState } = context;

        const state   : M               = getState();
        const form    : FormGroup       = StateDocument.formGroupState(state);
        const control : AbstractControl = form.get('metadata').get(imageType);

        if (control.invalid || control.pristine) { return of(null); }

        const id      : string = StateDocument.idState(state);
        const path    : string = `${this.collection}/${id}/${imageType}.jpeg`;
        const dataUri : string = control.value;

        return storage.storageUpload(dataUri, path).
        pipe
        (
            tap((url: string) =>
                this.patchMetadata(context, { [imageType]: url })
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

    private ActionsQueryAdd(snapshot: FirestoreDocumentSnapshot, data?: T): Array<any>
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
