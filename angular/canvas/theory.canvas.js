'use strict';

angular.module('theory.canvas', []).

factory('TNCanvas', function($q)
{
    var
    canvas = {};

    canvas.resizeImage = function(options)
    {
        var
        q      = $q.defer(),
        image  = new Image(),
        canvas,
        context,
        aspect,
        imageAspect,
        width  = options.width,
        height = options.height,
        url    = options.url,
        imageWidth,
        imageHeight,
        sWidth,
        sHeight,
        sx = 0,
        sy = 0;

        image.onload = function()
        {
            sWidth  = imageWidth  = this.width;
            sHeight = imageHeight = this.height;

            imageAspect = imageWidth / imageHeight;

            canvas  = document.createElement('canvas');
            context = canvas.getContext('2d');

            if (width && height)
            {
                aspect = width / height;

                if (aspect === 1)
                {
                    if (imageAspect > 1)
                    {
                        sWidth = sHeight;
                        sx = Math.floor((imageWidth - imageHeight) / 2);
                    }
                    else if (imageAspect < 1)
                    {
                        sHeight = sWidth;
                        sy = Math.floor((imageHeight - imageWidth) / 2);
                    }
                }
                else if (((aspect > 1) && (aspect > imageAspect)) || ((aspect < 1) && (aspect < imageAspect)))
                {
                    sHeight = height * (imageWidth / width);
                    sy      = Math.floor((imageHeight - sHeight) / 2);
                }
                else if (((aspect > 1) && (aspect < imageAspect)) || ((aspect < 1) && (aspect > imageAspect)))
                {
                    sWidth = width * (imageHeight / height);
                    sx     = Math.floor((imageWidth - sWidth) / 2);
                }
            }
            else if (width)
            {
                height  = imageHeight * (width / imageWidth);
            }
            else if (height)
            {
                width  = imageWidth * (height / imageHeight);
            }

            canvas.height = height;
            canvas.width  = width;

            context.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, width, height);

            q.resolve(canvas.toDataURL());
        };

        image.src = url;

        return q.promise;
    };

    return canvas;
});