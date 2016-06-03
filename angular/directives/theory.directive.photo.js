'use strict';

angular.module('theory.directives').

/*
    <tn-photo type="icon" source="hybrid" photo="subscription.icon" width="57" dictionary="dictionary"></tn-photo>

    <tn-photo source="library" photo="subscription.photo" width="145" height="360" dictionary="dictionary"></tn-photo>
*/

directive('tnPhoto', function(tnDirective, $ionicActionSheet, $ionicLoading, TNController, TNCordovaCamera, TNCanvas)
{
    var
    tnPhoto = function(options)
    {
        var
        self = this,
        defaults = {},
        defaultValues =
        {
            type         : 'photo',
            dictionary   :
            {
                tnPhotoAdd            : 'add',
                tnPhotoPhoto          : 'photo',
                tnPhotoIcon           : 'icon',
                tnPhotoTakePhoto      : 'Take Photo',
                tnPhotoChooseExisting : 'Choose Existing',
                tnPhotoCancel         : 'Cancel',
                tnPhotoLoading        : 'Loading ...'
            },
            source       : 'library',
            removeOption : ''
        },
        scope =
        {
            type         : '@',
            photo        : '=',
            width        : '@',
            dictionary   : '=',
            source       : '@',
            removeOption : '@'
        };

        tnPhoto.parent.call(this);

        this.templateUrl = function(element, attributes)
        {
            return self.getTemplateUrl(attributes, 'tn-photo');
        };

        this.link = function(scope, element, attributes, controller)
        {
            self.initialize(scope);

            var
            width        = scope.width,
            height       = scope.height,
            type         = scope.type,
            dictionary   = scope.dictionary,
            source       = scope.source,
            removeOption = scope.removeOption,
            device       = window.cordova,
            options      = {},
            icon         = false,
            retinaWidth,
            retinaHeight,
            capture;

            scope.classes     = 'tn-photo';
            scope.placeholder = dictionary.tnPhotoPhoto;

            if (type === 'icon')
            {
                icon   = true;
                height = width;

                retinaWidth = width * 2;

                scope.placeholder = dictionary.tnPhotoIcon;

                scope.classes = 'tn-icon';
            }
            else if (width)
            {
                retinaWidth = width * 2;
            }
            else if (!height)
            {
                width       = 145;
                retinaWidth = 290;
            }

            if (height)
            {
                retinaHeight = height * 2;
            }

            if (device)
            {
                options.destinationType = Camera.DestinationType.DATA_URL;

                if (source === 'library')
                {
                    options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
                }
                else if (source === 'camera')
                {
                    options.sourceType = Camera.PictureSourceType.CAMERA;
                }
            }

            if (removeOption === 'true')
            {
                scope.removeOption = true;
            }
            else
            {
                scope.removeOption = false;
            }

            capture = function()
            {
                if (device)
                {
                    $ionicLoading.show({template: dictionary.tnPhotoLoading});

                    TNCordovaCamera.getPicture(options).then(function(imageURI)
                    {
                        //$scope.photo = imageURI;
                        imageURI = 'data:image/png;base64,' + imageURI;

                        TNCanvas.resizeImage({url : imageURI, width : retinaWidth, height : retinaHeight}).then(function(uri)
                        {
                            scope.photo = uri;

                            $ionicLoading.hide();
                        });
                    },
                    function(error)
                    {
                        console.err(error);
                    });
                }
                else
                {
                    if (!height)
                    {
                        retinaHeight = 360;
                    }

                    scope.photo = 'http://lorempixel.com/' + retinaWidth + '/' + retinaHeight + '/nature';
                }
            };

            scope.getPhoto = function()
            {
                var
                buttons =
                [
                    {text : dictionary.tnPhotoTakePhoto},
                    {text : dictionary.tnPhotoChooseExisting}
                ];

                if (removeOption)
                {
                    if (type === 'icon')
                    {
                        buttons.push({text : dictionary.tnPhotoRemoveIcon});
                    }
                    else
                    {
                        buttons.push({text : dictionary.tnPhotoRemovePhoto});
                    }
                }

                if (source === 'library' || source === 'camera')
                {
                    capture();
                }
                else
                {
                    $ionicActionSheet.show(
                    {
                        buttons      : buttons,
                        cancelText   : dictionary.tnPhotoCancel,
                        buttonClicked: function(index)
                        {
                            if (removeOption)
                            {
                                if (index === 2)
                                {
                                    scope.photo = '';

                                    return true;
                                }
                                else if (index === 3)
                                {
                                    return false;
                                }
                            }
                            else if (index === 2)
                            {
                                return false;
                            }

                            if (device)
                            {
                                if (index === 0)
                                {
                                    options.sourceType = Camera.PictureSourceType.CAMERA;
                                }
                                else if (index === 1)
                                {
                                    options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
                                }
                            }

                            capture();

                            return true;
                        }
                    });
                }
            };
        };

        this.options(defaults);
        this.options(options);
        this.extendDirective(defaultValues, scope);
    };

    TNInheritance.extend(tnPhoto, tnDirective);

    /*
        tnPhoto.prototype.initialize = function(scope)
        {
            tnPhoto.parent.prototype.initialize.call(this, scope);
        }
*/

    return new tnPhoto();
});