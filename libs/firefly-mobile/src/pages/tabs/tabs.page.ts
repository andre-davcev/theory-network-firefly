import { Component } from '@angular/core';
import { Pages } from '@firefly/shared';

@Component({
  selector: 'app-page-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})
export class PageTabs {
  public Pages = Pages;
}
