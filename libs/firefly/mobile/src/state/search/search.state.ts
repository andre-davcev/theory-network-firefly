import { StateSearchModel } from "./search.state.model";
import { StateSearchOptions } from './search.state.options';
import { Injectable } from '@angular/core';
import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { ActionSearchReset, ActionSearchInterests, ActionSearchEvents } from './search.actions';
import algoliaSearch, { SearchIndex } from 'algoliasearch/lite';
import { of, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Interest } from '@firefly/cloud';
import { StateMobile } from '../mobile';

@State<StateSearchModel>(StateSearchOptions)
@Injectable()
export class StateSearch
{
  @Selector() static searchResults(state: StateSearchModel) : Array<Interest>  { return state.searchResults; }
  @Selector() static searchResultsFound(state: StateSearchModel) : boolean { return state.searchResults.length > 0 }

  public searchClient = algoliaSearch('8NDQ1FNIDU','45b11751dc7e276f781a85f719abda66');

  public interestsIndex: SearchIndex = this.searchClient.initIndex('interests');
  public eventsIndex: SearchIndex = this.searchClient.initIndex('events');

  constructor
  (
    private store : Store
  ){}

  @Action(ActionSearchReset)
  reset({ patchState }: StateContext<StateSearchModel>)
  {
      patchState({ searchResults: []})
  }

  @Action(ActionSearchInterests)
  searchInterests({ patchState }: StateContext<StateSearchModel>, { searchString } : ActionSearchInterests)
  {
      let hits = [];

      if(searchString.length<3)
      {
        return of(patchState({ searchResults : []}))
      }

      return from(this.interestsIndex.search(searchString)).pipe
      (
        tap((result) => {
          hits = result.hits;
          patchState({ searchResults : hits});
        })
      )
  }

  @Action(ActionSearchEvents)
  searchEvents({ patchState }: StateContext<StateSearchModel>, { searchString } : ActionSearchEvents)
  {
      let hits = [];

      if(searchString.length<3)
      {
        return of(patchState({ searchResults : []}))
      }

      return from(this.eventsIndex.search(searchString)).pipe
      (
        tap((result) => {
          hits = result.hits;
          patchState({ searchResults : hits});
        })
      )
  }

}
