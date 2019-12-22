import {Component} from '@angular/core';
import { Select } from '@ngxs/store';
import { StateMobile } from '@firefly/mobile';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component
({
    selector    : 'app-page-assets-images',
    templateUrl : 'assets-images.page.html',
    styleUrls   : ['./assets-images.page.scss']
})

export class PageAssetsImages
{
    @Select(StateMobile.menuOpen) menuOpen$: Observable<boolean>;

    constructor
    (
        private menu : MenuController
    )
    { }

    add(): void
    {

    }

    public menuOpen(): void
    {
        this.menu.open();
    }
}
