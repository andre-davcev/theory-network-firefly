
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Platform } from '@ionic/angular';
import { Observable, of, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';

import { PlatformEnum } from '@theory/ionic';

import { StateLanguageModel } from './language.state.model';
import { StateLanguageOptions } from './language.state.options';
import { ActionLanguageInitialize, ActionLanguageGet, ActionLanguageSet } from './language.actions';

@State<StateLanguageModel>(StateLanguageOptions)

export class StateLanguage
{
    constructor(private globalization: Globalization, public platform: Platform, private translate: TranslateService) {}

    @Selector() static language(state: StateLanguageModel): string {return state.language;}

    @Selector() static error(state: StateLanguageModel): any    {return state.error;}

    @Selector() static errored(state: StateLanguageModel): boolean {return state.error != null;}

    @Selector() static languageIso639_1(state: StateLanguageModel): string
    {
        const language: string =  StateLanguage.language(state);

        return language == null || language.length === 0 ? undefined : language.split('-')[0].toLowerCase();
    }

    ngxsOnInit(context: StateContext<StateLanguageModel>)
    {
        context.dispatch(new ActionLanguageInitialize());
    }

    @Action(ActionLanguageInitialize)
    languageInitialize()
    {
        this.translate.setDefaultLang('en');
    }

    @Action(ActionLanguageGet)
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
            switchMap((language: {value:string}) => dispatch(new ActionLanguageSet(language.value))),

            catchError((error: Error) => of(patchState({error: error})))
        )
    }

    @Action(ActionLanguageSet)
    languageSet({ patchState }: StateContext<StateLanguageModel>, { payload }: ActionLanguageSet)
    {
        const language: string = payload;

        this.translate.use(language);

        return of(patchState({language: language}));
    }
}
