import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { StateImageModel } from './image.state.model';
import { StateImageOptions } from './image.state.options';
import { ActionImageUploadClear, ActionImageUpload, ActionImageSave, ActionImageEventsReset, ActionImageEventsAdd, ActionImageEventsGet, ActionImageEventsRemove, ActionImageReset, ActionImageGet } from './image.actions';
import { CoreEnum, CoreUtil, FormNgxs, FormNgxsStatus } from '@theory/core';
import { StorageFormat } from '@theory/firebase/enums';
import { tap, catchError, filter, switchMap, take, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { StateUser } from '../user';
import { Upload } from '@firefly/core/interfaces';
import { Event, Image } from '@firefly/core/models';
import { ServiceImages } from '@firefly/core/services';
import { SetFormPristine, UpdateFormValue } from '@ngxs/form-plugin';
import { FormGroup } from '@angular/forms';

@State<StateImageModel>(StateImageOptions)

export class StateImage
{
    private formPath: string = `${StateImageOptions.name}.form`;

    constructor
    (
        private store: Store,
        private service: ServiceImages,
        private storage: AngularFireStorage
    ) { }

    @Selector() static form(state: StateImageModel): FormNgxs { return state.form; }
    @Selector() static formGroup(state: StateImageModel): FormGroup { return state.formGroup; }
    @Selector() static data(state: StateImageModel): Event { return StateImage.form(state).model; }
    @Selector() static id(state: StateImageModel): string { return StateImage.data(state).id; }
    @Selector() static isNew(state: StateImageModel): boolean { return  StateImage.id(state) === CoreEnum.IdNew; }
    @Selector() static canUpdate(state: StateImageModel): boolean { return StateImage.form(state).status === FormNgxsStatus.Valid && StateImage.form(state).dirty; }
    @Selector() static url(state: StateImageModel): string { return state.url; }

    @Selector() static upload(state: StateImageModel): Upload         { return state.upload; }
    @Selector() static uploadPath(state: StateImageModel): string     { return StateImage.upload(state).path; }
    @Selector() static uploadProgress(state: StateImageModel): number { return StateImage.upload(state).progress; }
    @Selector() static uploadError(state: StateImageModel): any       { return StateImage.upload(state).error; }

    @Selector() static uploadErrored(state: StateImageModel): boolean
    {
        return StateImage.uploadError(state) != null;
    }

    @Selector() static uploadCompleted(state: StateImageModel): boolean
    {
        return StateImage.uploadProgress(state) === 100 && !StateImage.uploadErrored(state);
    }

   @Action(ActionImageReset)
   reset({ patchState, dispatch }: StateContext<StateImageModel>)
    {
        const defaults: StateImageModel = CoreUtil.clone<StateImageModel>(StateImageOptions.defaults);

        patchState(defaults)

        return dispatch
        ([
            new SetFormPristine(this.formPath)
        ]);
    }

    @Action(ActionImageGet)
    get({ patchState, dispatch } : StateContext<StateImageModel>, { payload }: ActionImageGet)
    {
        const id: string = payload;
        const userId: string = this.store.selectSnapshot(StateUser.userId);
        const defaults: Image = StateImageOptions.defaults.empty;
        const item$: Observable<Image> = id === CoreEnum.IdNew ?
            of(this.service.build(userId, defaults)) :
            this.service.valuesChanges(id);

        return dispatch(new ActionImageReset()).
        pipe
        (
            switchMap(() => item$),
            take(1),
            switchMap((item: Image) =>
                this.service.getDownloadUrl(item.id).pipe
                (
                    map((url: string) =>
                        patchState
                        ({
                            url,
                            formGroup: this.service.formCreate(event)
                        })
                    ),
                    switchMap(() =>
                        dispatch
                        ([
                            new UpdateFormValue({ value: event, path: this.formPath })
                        ])
                    )
                )
            )
        );
    };

    @Action(ActionEventCreate)
    create({ getState, dispatch }: StateContext<StateEventModel>)
    {
        const state:    StateEventModel = getState();
        const data:     Event           = StateEvent.data(state);
        const imageUrl: string          = StateEvent.imageId(state);

        return forkJoin
        (
            this.image.createWithUpload(data, imageUrl),
            this.service.create(data).pipe,
            dispatch(new ActionUserEventsAdd(data))
        );
    }

    @Action(ActionEventDelete)
    delete({ getState, dispatch }: StateContext<StateEventModel>)
    {
        const id: string = StateEvent.id(getState());

        return dispatch
        ([
            new ActionEventReset(),
    /*
        database.collection('image-events').doc(imageId).update({ [id]: FieldValue.delete() }),
    */
            new ActionUserEventsRemove(id)
        ]);
    }

    @Action(ActionImageUploadClear)
    clear({ patchState } : StateContext<StateImageModel>)
    {
        patchState({ upload: { ...StateImageOptions.defaults.upload } });
    }

    @Action(ActionImageUpload)
    upload({ patchState, getState, dispatch } : StateContext<StateImageModel>, { path, file }: ActionImageUpload)
    {
        dispatch( new ActionImageUploadClear());

        const data: string = `${CoreEnum.DataUri}${file}`;

        const task: AngularFireUploadTask = this.storage.ref(path).putString(data, StorageFormat.DataUrl);

        return task.percentageChanges().

        pipe
        (
            tap((progress: number) => patchState({ upload: { ...StateImage.upload(getState()), progress } })),
            catchError((error: Error) => of(patchState({ upload: { ...StateImage.upload(getState()), error } })))
        );
    }

    @Action(ActionImageSave)
    save({ patchState, getState, dispatch }: StateContext<StateImageModel>, { collection, file, fileName }: ActionImageSave)
    {
        const timestamp: string = new Date().toISOString();
        const name: string = fileName == null ? `image_${timestamp}.jpg` : fileName;
        const userId: string = this.store.selectSnapshot(StateUser.userId);
        const path: string = `${userId}/${collection}/${name}`;

        patchState({ upload: { ...StateImage.upload(getState()), path }});

        return dispatch(new ActionImageUpload(path, file)).

        pipe
        (
            filter(() => StateImage.uploadCompleted(getState())),
            tap(() => console.log('ToDo: WRITE TO COLLECTION WITH switchMap'))
        );
    }
}
