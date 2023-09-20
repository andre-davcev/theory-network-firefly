
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-calendar.Calendar",
          "file": "plugins/cordova-plugin-calendar/www/Calendar.js",
          "pluginId": "cordova-plugin-calendar",
        "clobbers": [
          "Calendar"
        ]
        },
      {
          "id": "mx.ferreyra.callnumber.CallNumber",
          "file": "plugins/mx.ferreyra.callnumber/www/CallNumber.js",
          "pluginId": "mx.ferreyra.callnumber",
        "clobbers": [
          "call"
        ]
        },
      {
          "id": "cordova-plugin-ionic.common",
          "file": "plugins/cordova-plugin-ionic/dist/common.js",
          "pluginId": "cordova-plugin-ionic",
        "clobbers": [
          "IonicCordova"
        ]
        },
      {
          "id": "uk.co.workingedge.phonegap.plugin.launchnavigator.Common",
          "file": "plugins/uk.co.workingedge.phonegap.plugin.launchnavigator/www/common.js",
          "pluginId": "uk.co.workingedge.phonegap.plugin.launchnavigator",
        "clobbers": [
          "launchnavigator"
        ]
        },
      {
          "id": "uk.co.workingedge.phonegap.plugin.launchnavigator.LocalForage",
          "file": "plugins/uk.co.workingedge.phonegap.plugin.launchnavigator/www/localforage.v1.5.0.min.js",
          "pluginId": "uk.co.workingedge.phonegap.plugin.launchnavigator",
        "clobbers": [
          "localforage"
        ]
        },
      {
          "id": "cordova-plugin-actionsheet.ActionSheet",
          "file": "plugins/cordova-plugin-actionsheet/www/ActionSheet.js",
          "pluginId": "cordova-plugin-actionsheet",
        "clobbers": [
          "window.plugins.actionsheet"
        ]
        },
      {
          "id": "cordova-plugin-ionic.guards",
          "file": "plugins/cordova-plugin-ionic/dist/guards.js",
          "pluginId": "cordova-plugin-ionic",
        "runs": true
        },
      {
          "id": "uk.co.workingedge.phonegap.plugin.launchnavigator.LaunchNavigator",
          "file": "plugins/uk.co.workingedge.phonegap.plugin.launchnavigator/www/ios/launchnavigator.js",
          "pluginId": "uk.co.workingedge.phonegap.plugin.launchnavigator",
        "merges": [
          "launchnavigator"
        ]
        },
      {
          "id": "cordova-plugin-dialogs.notification",
          "file": "plugins/cordova-plugin-dialogs/www/notification.js",
          "pluginId": "cordova-plugin-dialogs",
        "merges": [
          "navigator.notification"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "mx.ferreyra.callnumber": "0.0.2",
      "cordova-plugin-actionsheet": "2.3.3",
      "cordova-plugin-calendar": "5.1.6",
      "cordova-plugin-dialogs": "2.0.2",
      "cordova-plugin-ionic": "5.5.3",
      "uk.co.workingedge.phonegap.plugin.launchnavigator": "5.0.6"
    };
    // BOTTOM OF METADATA
    });
    