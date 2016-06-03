import {Component, OnChanges}    from '@angular/core';

import {TNInput}  from './theory.directive.input';

@Component
({
    selector : 'tn-input-email',

    template :
    `
    <form class="tn-input-container tn-email {{hostClasses}}" name="form" [class.tn-input-status-verified]="isVerified()" [class.tn-input-status-error]="isError()" [class.tn-input-status-rounded]="roundedIcons">
        <input class="tn-input" type="email" name="input" ngControl="valueControl" [(ngModel)]="value" placeholder="{{placeholder}}" required tn-trim="trim" tn-pattern="pattern">

        <ion-spinner icon="spiral" [hidden]="!verifying"></ion-spinner>
        <div class="tn-input-clear" [hidden]="!(clear && showClear)" (click)="clearValue()"></div>
    </form>
    `
})

export class TNInputEmail extends TNInput
{
    REGEX_EMAIL:string = '^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$';

    constructor()
    {
        super();
    }

    initialize(options?:Object)
    {
        this.pattern = this.REGEX_EMAIL;

        super.initialize(options);
    }
}