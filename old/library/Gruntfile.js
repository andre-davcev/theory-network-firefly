'use strict';

module.exports = function(grunt)
{
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig(
    {
        package : grunt.file.readJSON('package.json'),

        module :
        {
            name   : 'theory-network',
            path   : '.',
            source : '<%= module.path %>/ts',
            build  : '../app/modules/<%= module.name %>'
        },

        clean :
        {
            options : {force : true},

            build :
            {
                src :
                [
                    '<%= module.build %>'
                ]
            },

            typescript :
            {
                src :
                [
                    '<%= module.path %>/.tscache',
                    '<%= module.path %>/tscommand-*',
                    '<%= module.path %>/.baseDir.*'
                ]
            }
        },

        copy :
        {
            package :
            {
                files :
                [
                    {expand : true, cwd : '<%= module.source %>', src : 'package.json', dest : '<%= module.build %>'}
                ]
            }
        },                 

        watch :
        {
            module :
            {
                files :
                [
                    '<%= module.source %>/*.ts',
                    '<%= module.source %>/**/*.ts'
                ],

                tasks :
                [
                    'build'
                ]
            }
        },

        ts :
        {
            library :
            {
                tsconfig : {},

                src :
                [
                    '<%= module.source %>/*.ts'
                ],

                dest : '<%= module.build %>'
            }
        },

        replace :
        {
            module :
            {
                src  : ['<%= module.build %>/index.d.ts'],
                dest : '<%= module.build %>/index.d.ts',

                replacements :
                [
                    {
                        from : '/// <reference path="../../../library/node_modules/typescript/lib/lib.es6.d.ts" />',
                        to   : ''
                    }
                ]
            }
        }
    });

    //////////////////////////////////////////////////////////////
    //  Shared tasks between projects
    //////////////////////////////////////////////////////////////
    grunt.registerTask('build',
    [
        'clean:build',
        'ts:library',
        'clean:typescript',
        'copy:package',
        'replace:module'
    ]);

    grunt.registerTask('build-watch',
    [
        'build',
        'watch:module'
    ]);

    //////////////////////////////////////////////////////////////

};
