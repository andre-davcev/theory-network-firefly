import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  ActionLanguageGet,
  ActionLanguageInitialize,
  ActionLanguageSet
} from './language.actions';
import { StateLanguageModel } from './language.state.model';
import { StateLanguageOptions } from './language.state.options';

@State<StateLanguageModel>(StateLanguageOptions)
@Injectable()
export class StateLanguage {
  constructor(private translate: TranslateService) {}

  @Selector([StateLanguage]) static language(
    state: StateLanguageModel
  ): string {
    return state.language || 'en-us';
  }

  @Selector([StateLanguage]) static error(state: StateLanguageModel): any {
    return state.error;
  }

  @Selector([StateLanguage.error]) static errored(error: any): boolean {
    return error != null;
  }

  @Selector([StateLanguage.language]) static languageIso639_1(
    language: string
  ): string {
    return language.split('-')[0].toLowerCase();
  }

  public ngxsOnInit(context: StateContext<StateLanguageModel>): void {
    context.dispatch([new ActionLanguageInitialize(), new ActionLanguageGet()]);
  }

  @Action(ActionLanguageInitialize)
  languageInitialize() {
    this.translate.setDefaultLang('en');
  }

  @Action(ActionLanguageGet)
  languageGet({ patchState, dispatch }: StateContext<StateLanguageModel>) {
    return from(Device.getLanguageCode()).pipe(
      map((language: { value: string }) => language.value),
      switchMap((language: string) =>
        dispatch(new ActionLanguageSet(language))
      ),
      catchError((error: Error) => of(patchState({ error })))
    );
  }

  @Action(ActionLanguageSet)
  languageSet(
    { patchState }: StateContext<StateLanguageModel>,
    { payload }: ActionLanguageSet
  ) {
    const language: string = payload;

    if (language != null) {
      this.translate.use(language);

      patchState({ language });
    }
  }
}
