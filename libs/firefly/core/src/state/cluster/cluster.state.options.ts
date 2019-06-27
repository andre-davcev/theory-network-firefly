import { StoreOptions } from '@ngxs/store/src/symbols';
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

          userId      : undefined,
          name        : null,
          description : null,
          private     : false,
          draft       : false,


          tagline     : null,
          iconId      : undefined,
          events      : {},
          subscribers : {}
        },

        entities            : {},
        iconUrl             : undefined,
        iconUrlNormalized   : undefined
    }
};
