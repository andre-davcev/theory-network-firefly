import { Component } from '@angular/core';
import { Pages, StateAlerts } from '@firefly/shared';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})
export class PageTabs {
  @Select(StateAlerts.unreadCount) unreadCount$!: Observable<number>;
  @Select(StateAlerts.unreadExists) unreadExists$!: Observable<boolean>;

  public Pages = Pages;
}
