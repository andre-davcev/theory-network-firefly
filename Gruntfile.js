'use strict';

module.exports = function(grunt)
{
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig(
    {
        package : grunt.file.readJSON('package.json'),
        
        dirs :
        {
            base      : './apps/firefly/design',
            icons     : '<%= dirs.base %>/icons',
            images    : '<%= dirs.base %>/images',
            sketch    : '<%= dirs.base %>/sketch',
            resources : '<%= dirs.base %>/resources'
        },

        clean :
        {
            options : {force : true},

            exports :
            {
                src :
                [
                    '<%= dirs.icons %>/Icon*'
                ]
            }
        },

        sketch_export :
        {
            icon :
            {
                options :
                {
                    type    : 'artboards',
                    items   : ['icon'],
                    formats : ['png'],
                    scales  : [6.0]
                },

                src : '<%= dirs.sketch %>/design.sketch',
                dest : '<%= dirs.resources %>'
            },
            
            splash :
            {
                options :
                {
                    type    : 'artboards',
                    items   : ['splash'],
                    formats : ['png']
                },

                src  : '<%= dirs.sketch %>/design.sketch',
                dest : '<%= dirs.resources %>'
            },

            logo :
            {
                options :
                {
                    type    : 'slices',
                    items   : ['logo', 'font'],
                    formats : ['png', 'svg'],
                    scales  : [2.0]
                },

                src  : '<%= dirs.sketch %>/design.sketch',
                dest : '<%= dirs.images %>'
            },

            text :
            {
                options :
                {
                    type    : 'slices',
                    items   : ['app.title'],
                    formats : ['png', 'svg'],
                    scales  : [2.0]
                },

                src  : '<%= dirs.sketch %>/design.sketch',
                dest : '<%= dirs.images %>'  
            },

            exports :
            {
                options :
                {
                    type    : 'artboards',
                    formats : ['png', 'svg'],
                    scales  : [4.0],

                    items :
                    [
                        'Icon / Star / Large / Empty',
                        'Icon / Star / Large / Filled',
                        'Icon / Star / Large / Half',
                        'Icon / Avatar / Empty'
                    ],
                },

                src : '<%= dirs.sketch %>/design.sketch',
                dest : '<%= dirs.icons %>'
            }
        },

        rename :
        {
            exports :
            {
                files:
                [
                    {src : ['<%= dirs.icons %>/Icon / Star / Large / Empty@4x.png'],  dest : '<%= dirs.icons %>/star.large.empty.4x.png'},
                    {src : ['<%= dirs.icons %>/Icon / Star / Large / Empty@4x.svg'],  dest : '<%= dirs.icons %>/star.large.empty.4x.svg'},
                    {src : ['<%= dirs.icons %>/Icon / Star / Large / Filled@4x.png'], dest : '<%= dirs.icons %>/star.large.filled.4x.png'},
                    {src : ['<%= dirs.icons %>/Icon / Star / Large / Filled@4x.svg'], dest : '<%= dirs.icons %>/star.large.filled.4x.svg'},
                    {src : ['<%= dirs.icons %>/Icon / Star / Large / Half@4x.png'],   dest : '<%= dirs.icons %>/star.large.half.4x.png'},
                    {src : ['<%= dirs.icons %>/Icon / Star / Large / Half@4x.svg'],   dest : '<%= dirs.icons %>/star.large.half.4x.svg'},
                    {src : ['<%= dirs.icons %>/Icon / Avatar / Empty@4x.svg'],        dest : '<%= dirs.icons %>/avatar.4x.svg'}
                ]
            }
        }
    });

    //////////////////////////////////////////////////////////////
    //  Shared tasks between projects
    //////////////////////////////////////////////////////////////

    // Export sketch doc 
    grunt.registerTask('exports',
    [
        'sketch_export:exports',
        'rename:exports',
        'clean:exports'
    ]);
};
