import { Component } from '@angular/core';
import { Style } from '@capacitor/status-bar';
import { MenuController } from '@ionic/angular';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Color, IconSize, IconType, Pages } from '@firefly/shared';
import { ActionDeviceStatusBarSet } from '@theory/capacitor';
import { StateMobile } from '../../state';

@Component({
  selector: 'app-page-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['./categories.page.scss']
})
export class PageCategories {
  @Select(StateMobile.menuOpen) menuOpen$!: Observable<boolean>;

  public Pages: any = Pages;

  public IconType: any = IconType;
  public IconSize: any = IconSize;
  public Color: any = Color;

  constructor(private menu: MenuController, private store: Store) {}

  public ionViewWillEnter(): void {
    this.store.dispatch(new ActionDeviceStatusBarSet({ style: Style.Dark }));
  }

  public navigate(page: Pages.AssetsEvents | Pages.AssetsInterests): void {
    const tab: Pages.Events | Pages.Lists =
      page === Pages.AssetsEvents ? Pages.Events : Pages.Lists;

    this.store.dispatch(new Navigate([Pages.Tabs, tab, page]));
  }

  public menuOpen(): void {
    this.menu.open();
  }
}
