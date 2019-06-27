import { StoreOptions } from '@ngxs/store/src/symbols';
import { AssetKey, ClusterKey } from '@firefly/core/models';
import { StateClusterModel } from './cluster.state.model';

export const StateClusterOptions: StoreOptions<StateClusterModel> =
{
    name : 'cluster',

    defaults :
    {
        form                :
        {
          model : {},
          dirty : false,
          status : '',
          errors : {}
        },
        formGroup: undefined,
        empty               :
        {
          version     : undefined,
          id          : undefined,
          dateCreated : undefined,
          dateUpdated : undefined,

          [AssetKey.UserId]      : undefined,
          [AssetKey.Name]        : null,
          [AssetKey.Description] : null,
          [AssetKey.Private]     : false,
          [AssetKey.Draft]       : false,


          [ClusterKey.Tagline]     : null,
          [ClusterKey.IconId]      : undefined,
          [ClusterKey.Events]      : {},
          [ClusterKey.Subscribers] : {}
        },

        entities            : {},
        iconUrl             : undefined,
        iconUrlNormalized   : undefined
    }
};
