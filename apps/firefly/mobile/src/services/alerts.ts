import {Injectable}     from '@angular/core';

import {Alert} from '../models/alert';
import {Temp}  from './temp';

@Injectable()
export class Alerts
{
    alerts:Array<Alert>;
    unviewed:number;

    constructor(temp:Temp)
    {
        this.alerts = temp.alerts;

        let unviewed = this.alerts.length;

        for (let alert of this.alerts)
        {
            if (alert.read)
            {
                unviewed++;
            }
        }

        this.unviewed = unviewed;
    }

    view(index:number)
    {
        if (!this.alerts[index].read)
        {
            this.unviewed--;

            this.alerts[index].read = true;
        }

        if (this.unviewed === 0)
        {
            this.unviewed = null;
        }
    }

    delete(index:number)
    {
        let size = this.alerts.length;

        this.alerts.splice(index, 1);

        if (size > 1)
        {
            if (index == (size - 1))
            {
                this.view(index - 1);
            }
            else
            {
                this.view(index);
            }
        }
    }
}
