import {Component, OnInit} from '@angular/core';

import {TNInput} from '../input';

@Component
({
    selector : 'tn-input-email',

    template :
    `
    <form class="tn-input-container tn-email {{hostClasses}}" name="form" [class.tn-input-status-verified]="isVerified()" [class.tn-input-status-error]="isError()" [class.tn-input-status-rounded]="roundedIcons" [formGroup]="form">
        <input class="tn-input" type="email" formControlName="input" ngControl="input" [ngModel]="value" (ngModelChange)="onChange($event)" placeholder="{{placeholder}}" tn-trim="trim" tn-pattern="pattern" #input>

        <ion-spinner icon="spiral" *ngIf="isVerifying()"></ion-spinner>
        <div class="tn-input-clear" *ngIf="clear && showClear" (click)="clearValue()"></div>
    </form>
    `
})

export class InputEmail extends TNInput implements OnInit
{
    constructor()
    {
        super();
    }

    ngOnInit()
    {
        super.ngOnInit();
    }
}