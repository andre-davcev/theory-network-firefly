
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
        "id": "cordova-plugin-facebook4.FacebookConnectPlugin",
        "file": "plugins/cordova-plugin-facebook4/www/facebook-native.js",
        "pluginId": "cordova-plugin-facebook4",
        "clobbers": [
          "facebookConnectPlugin"
        ]
      },
      {
        "id": "cordova-plugin-globalization.GlobalizationError",
        "file": "plugins/cordova-plugin-globalization/www/GlobalizationError.js",
        "pluginId": "cordova-plugin-globalization",
        "clobbers": [
          "window.GlobalizationError"
        ]
      },
      {
        "id": "cordova-plugin-globalization.globalization",
        "file": "plugins/cordova-plugin-globalization/www/globalization.js",
        "pluginId": "cordova-plugin-globalization",
        "clobbers": [
          "navigator.globalization"
        ]
      },
      {
        "id": "cordova-plugin-mauron85-background-geolocation.BackgroundGeolocation",
        "file": "plugins/cordova-plugin-mauron85-background-geolocation/www/BackgroundGeolocation.js",
        "pluginId": "cordova-plugin-mauron85-background-geolocation",
        "clobbers": [
          "BackgroundGeolocation"
        ]
      },
      {
        "id": "cordova-plugin-mauron85-background-geolocation.radio",
        "file": "plugins/cordova-plugin-mauron85-background-geolocation/www/radio.js",
        "pluginId": "cordova-plugin-mauron85-background-geolocation"
      }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-facebook4": "2.4.0",
      "cordova-plugin-globalization": "1.11.0",
      "cordova-plugin-mauron85-background-geolocation": "3.0.0-alpha.41"
    };
    // BOTTOM OF METADATA
    });
    