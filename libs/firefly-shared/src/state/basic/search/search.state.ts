import { Injectable } from '@angular/core';
import { List } from '@firefly/cloud';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import algoliaSearch, { SearchIndex } from 'algoliasearch/lite';
import { from, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  ActionSearchEvents,
  ActionSearchLists,
  ActionSearchReset
} from './search.actions';
import { StateSearchModel } from './search.state.model';
import { StateSearchOptions } from './search.state.options';

@State<StateSearchModel>(StateSearchOptions)
@Injectable()
export class StateSearch {
  public searchClient = algoliaSearch(
    '8NDQ1FNIDU',
    '45b11751dc7e276f781a85f719abda66'
  );

  public listsIndex: SearchIndex = this.searchClient.initIndex('lists');
  public eventsIndex: SearchIndex = this.searchClient.initIndex('events');

  @Selector() static searchResults(state: StateSearchModel): Array<List> {
    return state.searchResults;
  }
  @Selector() static searchResultsFound(state: StateSearchModel): boolean {
    return state.searchResults.length > 0;
  }

  @Action(ActionSearchReset)
  reset({ patchState }: StateContext<StateSearchModel>) {
    patchState({ searchResults: [] });
  }

  @Action(ActionSearchLists)
  searchLists(
    { patchState }: StateContext<StateSearchModel>,
    { searchString }: ActionSearchLists
  ) {
    let hits = [];

    if (searchString.length < 3) {
      return of(patchState({ searchResults: [] }));
    }

    return from(this.listsIndex.search(searchString)).pipe(
      tap((result) => {
        hits = result.hits;
        patchState({ searchResults: hits });
      })
    );
  }

  @Action(ActionSearchEvents)
  searchEvents(
    { patchState }: StateContext<StateSearchModel>,
    { searchString }: ActionSearchEvents
  ) {
    let hits = [];

    if (searchString.length < 3) {
      return of(patchState({ searchResults: [] }));
    }

    return from(this.eventsIndex.search(searchString)).pipe(
      tap((result) => {
        hits = result.hits;
        patchState({ searchResults: hits });
      })
    );
  }
}
