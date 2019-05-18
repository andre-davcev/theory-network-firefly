import { State, Selector, Action, StateContext } from '@ngxs/store';
import { LoadingController, ToastController } from '@ionic/angular';

import { StateIonicModel } from './ionic.state.model';
import { StateIonicOptions } from './ionic.state.options';
import { ActionIonicLoading, ActionIonicToast } from './ionic.actions';
import { from, Observable } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';

@State<StateIonicModel>(StateIonicOptions)

export class StateIonic
{
    constructor
    (
        private loading: LoadingController,
        private toast:   ToastController
    ) {}

    @Selector() static loading(state: StateIonicModel) {return state.loading;}

    @Action(ActionIonicLoading)
    loadingShow({ patchState, dispatch }: StateContext<StateIonicModel>, { payload }: ActionIonicLoading)
    {
        const { observable$, options, toast } = payload;

        patchState({ loading: true });

        const loading$: Observable<any> = from(this.loading.create(options)).
        pipe
        (
            tap((loading: HTMLIonLoadingElement) => loading.present()),
            switchMap((loading: HTMLIonLoadingElement) => observable$),
            switchMap(() => this.loading.dismiss()),
            tap(() => patchState({ loading: false }))
        );

        return toast == null ? loading$ : dispatch(new ActionIonicToast({ ...toast, observable$: loading$ }));
    }

    @Action(ActionIonicToast)
    toastShow({ }: StateContext<StateIonicModel>, { payload }: ActionIonicToast)
    {
        const { observable$, message, error, options } = payload;

        return observable$.pipe
        (
            switchMap(() => from(this.toast.create({ ...options, message }))),
            switchMap((toast: HTMLIonToastElement) => from(toast.present())),
            catchError((e: any) =>
                from(this.toast.create({ ...options, message: error })).pipe
                (
                    switchMap((toast: HTMLIonToastElement) => toast.present())
                )
            )
        );
    }
}
