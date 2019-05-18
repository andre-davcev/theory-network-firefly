import { Observable } from 'rxjs';
import { LoadingOptions, ToastOptions } from '@ionic/core';

export interface ActionIonicLoadingOptions
{
    observable$: Observable<any>;
    options:     LoadingOptions;
    toast?:      ActionIonicToastOptions;
}

export interface ActionIonicToastOptions
{
    observable$?: Observable<any>;
    message?:     string;
    error?:       string;
    options:      ToastOptions;
}
