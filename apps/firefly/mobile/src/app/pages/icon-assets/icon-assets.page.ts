import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StateUserIcons, Icon } from '@firefly/core';

@Component
({
    selector    : 'app-page-icon-assets',
    templateUrl : 'icon-assets.page.html',
    styleUrls   : ['./icon-assets.page.scss']
})

export class PageIconAssets
{
  @Select(StateUserIcons.getUrls) iconAssets$: Observable<Array<Icon>>;
    /*public urls: Array<string> =
    [
        'assets/images/temp-icon-1.png',
        'assets/images/temp-icon-2.png',
        'assets/images/temp-icon-3.png',
        'assets/images/temp-icon-4.png',
        'assets/images/temp-icon-5.png',
        'assets/images/temp-icon-6.png',
        'assets/images/temp-icon-7.png'
    ];*/

    public imageClicked(index: number): void
    {
        console.log(`icon ${index} clicked`);
    }
}
