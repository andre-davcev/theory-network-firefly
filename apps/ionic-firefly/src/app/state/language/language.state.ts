
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { StoreOptions } from '@ngxs/store/src/symbols';
import { Platform } from '@ionic/angular';
import { Observable, of, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';

import { PlatformEnum } from '@theory/ionic';

import { LanguageInitialize, LanguageGet, LanguageSet } from './language.actions';


export interface StateLanguageModel
{
    language : string;
    error    : Error;
}

export const StateLanguageOptions: StoreOptions<StateLanguageModel> =
{
    name : 'language',

    defaults :
    {
        language : undefined,
        error    : undefined
    }
};

@State<StateLanguageModel>(StateLanguageOptions)

export class StateLanguage
{
    constructor(private globalization: Globalization, public platform: Platform, private translate: TranslateService) {}

    @Selector() static language(state: StateLanguageModel) {return state.language;}
    @Selector() static error(state: StateLanguageModel)    {return state.error;}

    @Selector() static errored(state: StateLanguageModel) {return state.error != null;}

    ngxsOnInit(context: StateContext<StateLanguageModel>)
    {
        context.dispatch(new LanguageInitialize());
    }

    @Action(LanguageInitialize)
    languageInitialize()
    {
        this.translate.setDefaultLang('en');
    }

    @Action(LanguageGet)
    languageGet({ patchState, dispatch }: StateContext<StateLanguageModel>)
    {
        let observable: Observable<{value:string}>;

        if (this.platform.is(PlatformEnum.Cordova))
        {
            observable = from(this.globalization.getLocaleName());
        }
        else
        {
            observable = of({value: navigator.language});
        }

        return observable.pipe
        (
            switchMap((language: {value:string}) => dispatch(new LanguageSet(language.value))),

            catchError((error: Error) => of(patchState({error: error})))
        )
    }

    @Action(LanguageSet)
    languageSet({ patchState }: StateContext<StateLanguageModel>, { payload }: LanguageSet)
    {
        const language: string = payload;

        this.translate.use(language);

        return of(patchState({language: language}));
    }
}
