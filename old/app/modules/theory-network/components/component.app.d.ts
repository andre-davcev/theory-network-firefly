import { OnDestroy } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
export declare class AppComponent implements OnChanges, OnDestroy {
    class: string;
    private _classPrefix;
    classes: {
        [id: string]: string;
    };
    private _subscriptions;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    subscriptionsAdd(...subscriptions: Array<Subscription>): void;
    getClass(className: string): string;
    classesAdd(...classes: Array<string>): void;
    classesRemove(...classes: Array<string>): void;
    private classesRender();
    classPrefix: string;
}
