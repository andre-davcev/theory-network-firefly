import { Pipe, PipeTransform } from '@angular/core';
import { firestore } from 'firebase';
import { TimestampFormat } from './timestamp-format.enum';
import { DatePipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { StateLanguage } from '@theory/capacitor';
import { tap } from 'rxjs/operators';

@Pipe({ name: 'timestamp', pure: false })
export class PipeTimestamp implements PipeTransform
{
    private locale: string = 'en-US';

    constructor
    (
        private date  : DatePipe,
        private store : Store
    )
    {
        this.store.select(StateLanguage.language).pipe(
            tap((language: string) =>
                this.locale = language
            )
        ).
        subscribe();
    }

    public transform(value: firestore.Timestamp, name: TimestampFormat = TimestampFormat.MediumDate, timezone: string = 'GMT'): string
    {
        if (value == null) { return ''; }

        const date: Date = value.toDate();

        if (name === TimestampFormat.ShortTime || name === TimestampFormat.MediumDate || name === TimestampFormat.Short)
        {
            return this.date.transform(date, name, timezone, this.locale);
        }
        else if (name === TimestampFormat.DateShort)
        {
            return date.toLocaleDateString(this.locale, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        }
        else if (name === TimestampFormat.DateLong)
        {
            return date.toLocaleDateString(this.locale, { weekday: 'long',  year: 'numeric', month: 'long',  day: 'numeric' });
        }
        else if (name === TimestampFormat.IsoString)
        {
            return date.toISOString();
        }

        return '';
    }
}
