/*
* Customisation of webpack.config.js, located in node_modules/@ionic/app-scripts/config
* It adds the TsconfigPathsPlugin to take into account paths config from tsconfig.json
* And adds environment variables support
*
* Source:
* https://stackoverflow.com/questions/41512923/how-to-extend-default-webpack-config-in-ionic-v2
* https://github.com/TypeStrong/ts-loader
* https://github.com/gshigeto/ionic-environment-variables
* */

const path  = require('path');
const paths = require('tsconfig-paths-webpack-plugin');

const resolveConfig =
{
    extensions : ['.ts', '.js', '.json'],
    modules    : [path.resolve('node_modules')],
    plugins    : [new paths({})]
};

const config = require('../node_modules/@ionic/app-scripts/config/webpack.config');

config.dev.resolve  = resolveConfig;
config.prod.resolve = resolveConfig;

config.dev.resolve.alias  = {'@app/env': path.resolve('../src/environments/environment.ts')};
config.prod.resolve.alias = {'@app/env': path.resolve('../src/environments/environment.prod.ts')};
