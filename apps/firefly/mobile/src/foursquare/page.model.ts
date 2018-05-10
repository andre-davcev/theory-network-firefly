import { PageInfo } from './page-info.model';
import { User } from './user-model';

export interface Page
{
    pageInfo : PageInfo;
    user     : User;
}
