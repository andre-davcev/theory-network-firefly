import { StateReferenceTableModel } from '@theory/ngxs';
import { Image, UserImage } from '@firefly/core/models';

export interface StateUserImagesModel extends StateReferenceTableModel<UserImage, Image>
{

}
