var exports = require('@ionic/app-scripts/config/copy.config.js');

/*
exports.copyIndexContent =
{
    src  : '{{WWW}}/assets/i18n/en-US.json',
    dest : '{{WWW}}/assets/i18n/en.json'
};
*/

exports.copyFirebaseCloudMessaging =
{
    src :
    [
        '{{ROOT}}/config/' + process.env.IONIC_ENV + '/google-services.json',
        '{{ROOT}}/config/' + process.env.IONIC_ENV + '/GoogleService-Info.plist',
    ],

    dest: '{{ROOT}}'
};

module.exports = exports;
