'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var config = {
        output: {
            dev: 'dev',
            build: 'build',
            dist: 'dist'
        },
        root: '.',
        path: {
            src: '/src',
            lib: '/lib',
            test: '/test'
        }
    };

    grunt.initConfig({
        cfg: config,

        bower: {
            install: {
                options: {
                    targetDir: '<%= cfg.root %><%= cfg.path.lib %>',
                    layout: 'byComponent',
                    verbose: true
                }
            }
        },

        clean: {
            dev: '<%= cfg.output.dev %>',
            build: ['<%= cfg.output.build %>', '<%= cfg.output.dist %>']
        },

        copy: {
            dev: {
                files: [{
                    src: '<%= cfg.root %><%= cfg.path.test %>/index.html',
                    dest: '<%= cfg.output.dev %>/index.html'
                }, {
                    expand: true,
                    cwd: '<%= cfg.root %><%= cfg.path.test %>',
                    src: '{,*/}*.js',
                    dest: '<%= cfg.output.dev %>'
                }]
            },
            build: {
                files: [{
                    src: '<%= cfg.root %><%= cfg.path.test %>/index.html',
                    dest: '<%= cfg.output.build %>/index.html'
                }, {
                    expand: true,
                    cwd: '<%= cfg.root %><%= cfg.path.test %>',
                    src: '{,*/}*.js',
                    dest: '<%= cfg.output.build %>'
                }]
            }
        },

        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, config.output.dev)
                        ];
                    }
                }
            },
            build: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, config.output.build),
                            mountFolder(connect, config.output.dist)
                        ];
                    }
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= cfg.root %><%= cfg.path.src %>/{,*/}*.js'
            ]
        },

        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },

        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl: '<%= cfg.root %><%= cfg.path.src %>/',
                    generateSourceMaps: false,
                    name: 'studioServices',
                    optimize: 'none',
                    out: '<%= cfg.output.dist %><%= cfg.path.src %>/studioServices.js',
                    paths: {
                        request_agent: '../lib/request-agent/js/request-agent'
                    },
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: false
                }
            }
        },

        symlink: {
            dev: {
                files: [{
                    src: '<%= cfg.root %><%= cfg.path.src %>',
                    dest: '<%= cfg.output.dev %><%= cfg.path.src %>'
                }, {
                    src: '<%= cfg.root %><%= cfg.path.lib %>',
                    dest: '<%= cfg.output.dev %><%= cfg.path.lib %>'
                }]
            },
            build: {
                files: [{
                    src: '<%= cfg.root %><%= cfg.path.lib %>',
                    dest: '<%= cfg.output.build %><%= cfg.path.lib %>'
                }]
            }
        },

        uglify: {
            options: {
                preserveComments: false,
                report: 'min',
                sourceMap: true
            },
            dist: {
                files: {
                    '<%= cfg.output.dist %><%= cfg.path.src %>/studioServices.min.js':
                    ['<%= cfg.output.dist %><%= cfg.path.src %>/studioServices.js']
                }
            }
        },

        watch: {
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= cfg.output.dev %>/index.html',
                    '<%= cfg.output.dev %>/{,*/}*.js',
                    '<%= cfg.root %><%= cfg.path.src %>/{,*/}*.js',
                ]
            },
            copy: {
                files: [
                    '<%= cfg.root %><%= cfg.path.test %>/index.html',
                    '<%= cfg.root %><%= cfg.path.test %>/{,*/}*.js'
                ],
                tasks: ['copy:dev']
            }
        }

    });

    grunt.registerTask('dev',
        'Start a live-reloading dev webserver on localhost for development',
        ['clean:dev', 'symlink:dev', 'copy:dev', 'connect:livereload', 'open', 'watch']);

    grunt.registerTask('build',
        'Build the services library for production and test it against a server on localhost',
        ['clean:build', 'lint', 'copy:build', 'symlink:build',
         'requirejs:dist', 'uglify:dist', 'open', 'connect:build:keepalive']);

    grunt.registerTask('lint',
        'Run jshint on code',
        ['jshint:all']);

    grunt.registerTask('default', ['dev']);
};
