module.exports = function (grunt) {

    //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                files: {
                    'css/index.css': ['js/vendor/normalize.css/normalize.css',
                                  'css/menu.css',
                                  'css/clf.css',
                                  'css/doeclfresponsive.css',
                                  'js/vendor/vwidgets/slideoutmenu.css',
                                  'js/vendor/vwidgets/pageloader.css',
                    ]
                }
            }
        },
        csswring: {
            options: {
                map: true,
                preserveHacks: true,
                removeAllComments: true
            },
            main: {
                cwd: 'css/',
                dest: 'css/',
                expand: true,
                ext: '.min.css',
                src: [
                  '**/index.css'
                ]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css/',
                    src: ['index.css', '!*.min.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "app.js",
                    name: "app",
                    out: "app.min.js",
                    removeCombined: true,
                    findNestedDependencies: true,
                    baseUrl: './',
                    paths: {
                        'text': 'js/vendor/text',
                        'jquery': 'js/vendor/jquery/jquery.min',
                        'respond': 'js/vendor/respond/dest/respond.min',
                        'html5shiv': 'js/vendor/html5shiv/html5shiv.min',
                        'bootstrap': 'js/vendor/bootstrap/js/bootstrap.min',
                        'jqueryuiwidget': 'js/vendor/jqueryui/ui/widget',
                        'fastclick': 'js/vendor/fastclick/fastclick',
                        'hammerjs': 'js/vendor/hammerjs/hammer.min',
                        'hammerjquery': 'js/vendor/jqueryhammer/jquery.hammer',
                        'slideoutmenu': 'js/vendor/vwidgets/slideoutmenu',
                        'pageloader': 'js/vendor/vwidgets/pageloader',
                        'jquery-cookie': 'js/vendor/jquery-cookie/src/jquery.cookie',
                        'jquery-validate': 'js/vendor/jquery-validate/jquery.validate.min',
                        'jquery-validate.additionalmethods': 'js/vendor/jquery-validate/additional-methods.min',
                        'jquery-serializeJSON': 'js/vendor/jqueryserializeJSON/jquery.serializejson.min',
                        'underscore': 'js/vendor/underscore-min',
                        'mustache': 'js/vendor/mustache/mustache.min',
                        'handlebars': 'js/vendor/handlebars/handlebars-v3.0.3',
                        'router': 'js/router',
                        'animator': 'js/animator'
                    },
                    shim: {
                        'jquery': {
                            exports: ['$']
                        },
                        'bootstrap': {
                            deps: ['jquery']
                        },
                        'hammerjquery': {
                            deps: ['jquery', 'hammerjs']
                        },
                        'jqueryuiwidget': {
                            deps: ['jquery']
                        },
                        'slideoutmenu': {
                            deps: ['jquery', 'jqueryuiwidget', 'hammerjquery']
                        },
                        'pageloader': {
                            deps: ['jquery', 'jqueryuiwidget', 'hammerjquery']
                        },
                        'jquery-cookie': {
                            deps: ['jquery']
                        },
                        'jquery-validate': {
                            deps: ['jquery']
                        },
                        'jquery-validate.additionalmethods': {
                            deps: ['jquery', 'jquery-validate']
                        },
                        'jquery-serializeJSON': {
                            deps: ['jquery']
                        },
                        'animator': {
                            deps: ['jquery']
                        }
                    }
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["less"]
                },
                files: {
                    "css/clf.css": "less/clf.less",
                    "css/doeclfresponsive.css": "less/doeclfresponsive.less",
                    "css/framework.css": "less/framework.less",
                    "css/menu.css": "less/menu.less",
                    "css/print.css": "less/print.less",
                    "js/vendor/vwidgets/pageLoader.css": "js/vendor/vwidgets/pageLoader.less",
                    "js/vendor/vwidgets/slideoutmenu.css": "js/vendor/vwidgets/slideoutmenu.less"
                }
            }
        },
        watch: {
            options: {
                livereload: false
            },
            less: {
                files: '**/*.less',
                tasks: ['less']
            }
        },
        connect: {
            uses_defaults: {}
        },
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:8000/index.html',
                app: 'Chrome'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('csswring');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-browser-sync');
    
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('buildless', ['less']);

    grunt.registerTask('mincss', ['cssmin']);

    grunt.registerTask('concatcss', ['concat:css']);

    //grunt.registerTask('server', ['requirejs:compile','connect', 'open', 'watch', 'compass']);
    //grunt.registerTask('server', ['connect', 'open', 'watch', 'less']);
    grunt.registerTask('server', ['watch', 'less']);

}