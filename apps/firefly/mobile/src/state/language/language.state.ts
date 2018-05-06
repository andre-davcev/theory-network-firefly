
import {State, Selector, Action, StateContext} from '@ngxs/store';

import {Observable}                 from 'rxjs/Observable';
import {map, catchError, switchMap} from 'rxjs/operators';
import {of}                         from 'rxjs/observable/of';

import {Globalization}    from '@ionic-native/globalization';
import {Platform}         from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';

import { PlatformEnum } from '../../enums/platform.enum';
import { LanguageInitialize, LanguageGet, LanguageSet } from './language.actions';

export interface StateLanguageModel
{
    language : string;
    error    : Error;
}

@State<StateLanguageModel>
({
    name : 'language',

    defaults :
    {
        language : undefined,
        error    : undefined
    }
})

export class StateLanguage
{
    constructor(private globalization: Globalization, public platform: Platform, private translate: TranslateService) {}

    @Selector() static language(state: StateLanguageModel) {return state.language;}
    @Selector() static error(state: StateLanguageModel)    {return state.error;}

    @Selector() static errored(state: StateLanguageModel) {return state.error != null;}

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
            observable = Observable.fromPromise(this.globalization.getLocaleName());
        }
        else
        {
            observable = Observable.of({value: navigator.language});
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
