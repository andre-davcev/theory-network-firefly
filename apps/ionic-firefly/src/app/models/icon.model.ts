import * as firebase from 'firebase/app';

import { Asset } from './asset.model';

export interface Icon extends Asset
{
    url: string;
}
