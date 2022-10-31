import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

import { ServiceUtil } from '@firefly/shared';

@Component
({
    selector        : 'ff-list',
    templateUrl     : './list.component.html',
    styleUrls       : ['./list.component.scss'],
    changeDetection : ChangeDetectionStrategy.OnPush
})

export class ComponentList implements OnChanges
{
    public flattened: Array<any> = [];

    @Input() data: Array<any> = [];
    @Input() delete: boolean = false;

    @Input() icon     : string;
    @Input() title    : string;
    @Input() subtitle : string;

    @Output() deleted: EventEmitter<any> = new EventEmitter();
    @Output() clicked: EventEmitter<any> = new EventEmitter();

    constructor()
    {

    }

    ngOnChanges(changes: SimpleChanges)
    {
        if (changes.data && changes.data.currentValue)
        {
            const data     : Array<any> = [];
            const icon     : string     = this.icon;
            const title    : string     = this.title;
            const subtitle : string     = this.subtitle;

            for (const row of changes.data.currentValue)
            {
                data.push
                ({
                    icon     : ServiceUtil.property(row, icon),
                    title    : ServiceUtil.property(row, title),
                    subtitle : ServiceUtil.property(row, subtitle)
                });
            }

            this.flattened = data;
        }
    }

    public eventClicked(row: any)
    {
        this.clicked.emit(row);
    }

    public eventDeleted(row: any)
    {
        this.clicked.emit(row);
    }
}
