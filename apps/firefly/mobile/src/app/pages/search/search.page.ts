import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { BaseComponent } from '@theory/core';
import { StateSearch, ActionMobileLoadingShow } from '@firefly/mobile/src/state';
import { Observable } from 'rxjs';
import { Interest } from '../../../../../cloud/src/library/documents';
import { ActionInterestGet } from '@firefly/core';
import { switchMap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { Pages } from '@firefly/mobile';


@Component
({
    selector    : 'app-page-search',
    templateUrl : 'search.page.html',
    styleUrls   : ['./search.page.scss']
})

export class PageSearch extends BaseComponent implements OnInit
{
    @Select(StateSearch.searchResults)      searchResults$:      Observable<Array<Interest>>;
    @Select(StateSearch.searchResultsFound) searchResultsFound$: Observable<boolean>;


    constructor(private store: Store) { super(); }

    public ngOnInit(): void
    {
    }

    public selectSearchInterest(interest: Interest)
    {
      this.store.dispatch(new ActionInterestGet(interest.id)).pipe
      (
        switchMap(() =>
          this.store.dispatch([
            new ActionMobileLoadingShow(),
            new Navigate([Pages.InterestDetail], {id: interest.id})
          ])
        )
      )
    }

}
