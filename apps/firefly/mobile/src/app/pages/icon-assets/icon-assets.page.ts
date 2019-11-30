import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { StateUserIcons, ActionIconSetId, ActionIconUriSet, ActionClusterPatch, Icon, ActionClusterIconAdd } from '@firefly/core';

@Component
({
    selector    : 'app-page-icon-assets',
    templateUrl : 'icon-assets.page.html',
    styleUrls   : ['./icon-assets.page.scss']
})

export class PageIconAssets
{
  @Select(StateUserIcons.getUrls) iconAssets$: Observable<string>;
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

    constructor(private store: Store, private modalController: ModalController) {}

    public imageClicked(index: number): void
    {
        console.log(`icon ${index} clicked`);
        const urls: Array<string> = this.store.selectSnapshot(StateUserIcons.getUrls);
        const keys: Array<string> = this.store.selectSnapshot(StateUserIcons.keys);
        const iconUrl = urls[index];
        const id: string = keys[index];

        //const url: string = this.store.select(StateUserIcons.getUrls[index]);

        this.store.dispatch(new ActionIconSetId(id)).pipe
        (
            switchMap(() => this.store.dispatch
            ([
                //new ActionIconUriSet(this.iconAssets$[index]),
                new ActionClusterIconAdd(),
                new ActionClusterPatch({ iconUrl })
            ])),
            switchMap(() => this.modalController.dismiss())
        ).subscribe();
    }
}
