import { StoreOptions } from '@ngxs/store/src/symbols';
import { AssetKey, ClusterKey } from '@firefly/core/models';
import { StateClusterModel } from './cluster.state.model';
import { ModelKey } from '@theory/firebase';

export const StateClusterOptions: StoreOptions<StateClusterModel> =
{
    name : 'cluster',

    defaults :
    {
        //id                  : undefined,
        form                : undefined,
        empty               :
        {
          [ModelKey.Version]     : undefined,
          [ModelKey.Id]          : undefined,
          [ModelKey.DateCreated] : undefined,
          [ModelKey.DateUpdated] : undefined,

          [AssetKey.UserId]      : undefined,
          [AssetKey.Name]        : null,
          [AssetKey.Description] : null,
          [AssetKey.Private]     : false,
          [AssetKey.Draft]       : false,


          [ClusterKey.Tagline]  : null,
          [ClusterKey.IconId]   : undefined,
          [ClusterKey.Events]   : {}
        },

        entities            : {},
        iconUrl             : undefined,
        iconUrlNormalized   : undefined
    }
};
