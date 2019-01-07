import { StoreOptions } from '@ngxs/store/src/symbols';

import { StateGridModel } from './grid.state.model';

export const StateGridOptions: StoreOptions<StateGridModel> =
{
    name : 'grid',

    defaults :
    {
        iconPageSize:    64,
        iconCatalog:     [],
        iconCatalogLazy: [],
        iconCatalogPage: 0,
        iconAssets:      [],
        iconAssetsLazy:  [],
        iconAssetsPage:  0,
        iconLibrary:     [],
        iconLibraryLazy: [],
        iconLibraryPage: 0,

        imagePageSize:    20,
        imageCatalog:     [],
        imageCatalogLazy: [],
        imageCatalogPage: 0,
        imageAssets:      [],
        imageAssetsLazy:  [],
        imageAssetsPage:  0,
        imageLibrary:     [],
        imageLibraryLazy: [],
        imageLibraryPage: 0
    }
};
