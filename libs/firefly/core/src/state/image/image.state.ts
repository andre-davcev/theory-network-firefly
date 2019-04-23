import { State, Selector, Action, StateContext, Store, Select } from '@ngxs/store';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { StateImageModel } from './image.state.model';
import { StateImageOptions } from './image.state.options';
import { ActionImageUploadClear, ActionImageUpload, ActionImageSave } from './image.actions';
import { CoreEnum } from '@theory/core';
import { StorageFormat } from '@theory/firebase/enums';
import { tap, catchError, map, filter, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StateUser } from '../user';
import { Upload } from '@firefly/core/interfaces';

@State<StateImageModel>(StateImageOptions)

export class StateImage
{
    constructor(private store: Store, private storage: AngularFireStorage) {}

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
