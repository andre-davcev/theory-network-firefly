import { ReferenceTable } from '@theory/ngxs';

export interface UserSubscription extends ReferenceTable
{
    on: boolean;
}
