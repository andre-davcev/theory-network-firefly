import { Component, OnInit } from '@angular/core';
import { Style } from '@capacitor/status-bar';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable, from } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { Pages, StateApp } from '@firefly/shared';
import {
  ActionDeviceStatusBarSet,
  ActionDeviceStatusBarShow
} from '@theory/capacitor';

@Component({
  selector: 'app-page-auth',
  templateUrl: 'auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class PageAuth implements OnInit {
  @Select(StateApp.initialized) initialized$!: Observable<boolean>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    from(this.store.dispatch(new ActionDeviceStatusBarShow()))
      .pipe(
        switchMap(() => this.initialized$),
        filter((initialized: boolean) => initialized),
        switchMap(() =>
          this.store.dispatch(new Navigate([Pages.Home, Pages.Stream]))
        )
      )
      .subscribe();
  }

  public ionViewWillEnter(): void {
    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Light }));
  }
}
