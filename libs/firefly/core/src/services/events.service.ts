
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Event } from '@firefly/cloud';
import { ServiceFirestore } from '@theory/firebase';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DateUtil, Regex, ValidatorsExtended } from '@theory/core';
import { firestore } from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class ServiceEvents extends ServiceFirestore<Event>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder
    )
    {
        super(firestore, formBuilder);
    }

    private static validateTime(): ValidatorFn
    {
        const validator: ValidatorFn = (control: AbstractControl): Record<string, any> =>
        {
            const form: FormGroup = control.parent as FormGroup;

            let valid: boolean = false;

            if (form != null)
            {
                const start: firestore.Timestamp = form.get('timeStart').value;
                const end:   firestore.Timestamp = form.get('timeEnd').value;

                if (start != null && end != null)
                {
                    const timeStart: Date = start.toDate();
                    const timeEnd:   Date = end.toDate();

                    valid = timeEnd.getTime() > timeStart.getTime();
                }
            }

            return valid ? null : { timeEndInvalid: true };
        };

        return validator;
    }

    private static validateTimeNotify(): ValidatorFn
    {
        const validator: ValidatorFn = (control: AbstractControl): Record<string, any> =>
        {
            const value: firestore.Timestamp = control.value;

            let valid: boolean = false;

            if (value != null)
            {
                const timeNotify: Date = value.toDate();
                const threshold:  Date = DateUtil.atHourNext(new Date(), 2);

                valid = timeNotify.getTime() >= threshold.getTime();
            }

            return valid ? null : { timeNotifyInvalid: true };
        };

        return validator;
    }

    public formDataNew(userId: string, defaults: Event): Event
    {
        const event: Event =
        {
            ...super.formDataNew(userId, defaults),

            timeStart:  firestore.Timestamp.fromDate(DateUtil.atHourNext()),
            timeEnd:    firestore.Timestamp.fromDate(DateUtil.atHourNext(new Date(), 2)),
            timeNotify: firestore.Timestamp.fromDate(DateUtil.atHourNext(new Date(), 2))
        };

        return event;
    }

    public formCreate(event: Event): FormGroup
    {
        //temporary
        if(!event.metadata)
        {
            event.metadata =
            {
                icon : '',
                image : '',
                place : null
            }
        }

        return super.formCreate
        ({
            ...event,

            description : [event.description,    [Validators.required, ValidatorsExtended.minLength(1)]],
            geopoint    : [event.geopoint,       [Validators.required]],
            interests   : [event.interests,      []],
            name        : [event.name,           [Validators.required, ValidatorsExtended.minLength(1)]],
            tagline     : [event.tagline,        [Validators.required, ValidatorsExtended.minLength(1)]],
            timeStart   : [event.timeStart,      [ServiceEvents.validateTime()]],
            timeEnd     : [event.timeEnd,        [ServiceEvents.validateTime()]],
            timeNotify  : [event.timeNotify,     [ServiceEvents.validateTimeNotify()]],
            phone       : [event.phone,          [Validators.pattern(Regex.Numbers)]],
            website     : [event.website,        [Validators.pattern(Regex.WebsiteSecure)]],

            metadata : this.formBuilder.group
            ({
                icon  : [event.metadata.icon,  []],
                image : [event.metadata.image, [Validators.required]],
                place : [event.metadata.place, []]
            })
        });
    }
}
