import { CityInfo } from '../interfaces';
import { DocumentBase } from './base.document';

export interface City extends DocumentBase, CityInfo
{
    nearby: Record<string, number>;
}
