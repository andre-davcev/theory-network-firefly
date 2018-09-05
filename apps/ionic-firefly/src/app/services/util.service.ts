import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ServiceUtil
{
    public static property(value: any, property: string)
    {
        if (value == null || property == null)
        {
            return null;
        }
        else
        {
            const keys: Array<string> = property.split('.');
            let key: string;
            let process: boolean = true;

            for (const key of keys)
            {
                value = value[key];

                if (value == null)
                {
                    return value;
                }
            }

            return value;
        }
    }
}
