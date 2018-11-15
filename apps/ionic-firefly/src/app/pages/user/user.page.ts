import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component
({
    selector    : 'app-page-user',
    templateUrl : 'user.page.html',
    styleUrls   : ['./user.page.scss']
})

export class PageUser
{
    public segment: string = 'assets';

    constructor(private modalController: ModalController)
    {

    }

    public segmentChanged(segment: string): void
    {
        this.segment = segment;
    }

    public dismiss(): void
    {
        this.modalController.dismiss();
    }
}
