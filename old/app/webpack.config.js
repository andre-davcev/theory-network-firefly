const {join}       = require('path');
const webpackMerge = require('webpack-merge');
const {dev, prod}  = require('@ionic/app-scripts/config/webpack.config');

const config =
{
    resolve :
    {
        alias :
        {
            'theory-network' : join(__dirname, '/modules/theory-network'),
            'firefly-core'   : join(__dirname, '/modules/firefly-core')
        }
    }
};

module.exports =
{
    dev  : webpackMerge(dev, config),
    prod : webpackMerge(prod, config)
}