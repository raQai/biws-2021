module.exports = grunt => {
    grunt.initConfig({
        sync: {
            main: {
                files: [
                    { cwd: 'root/', src: '**/*', dest: 'dist/', dot: true },
                    { cwd: 'resources/', src: '**/*', dest: 'dist/resources/' }
                ],
                failOnError: true,
                compareUsing: "md5",
            },
        },
        autoprefixer: {
            dist: {
                files: {
                    'build/css/critical.css': 'src/css/critical.css',
                    'build/css/style.css': 'src/css/style.css',
                    'build/css/biws.stickyparallax.css': 'src/plugins/biws/stickyparallax/biws.stickyparallax-0.0.2.css',
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'build/css/critical.min.css': 'build/css/critical.css',
                    'dist/resources/css/style.min.css': [
                        'build/css/critical.css',
                        'build/css/style.css',
                        'build/css/biws.stickyparallax.css'
                    ],
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'build/js/index.js': 'src/js/index.js',
                    'build/js/biws.stickyparallax.js': 'src/plugins/biws/stickyparallax/biws.stickyparallax-0.0.2.js',
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: true
                },
                files: {
                    'dist/resources/js/index.min.js': 'build/js/index.js',
                    'dist/resources/js/biws.stickyparallax.min.js': 'build/js/biws.stickyparallax.js'
                }
            }
        },
        // get critical css file
        // <link[\.\/\s\w\d='"]*href=['"]([\/\.\s\d\w]*critical[\/\.\s\d\w]*)['"][\.\/\s\w\d='"]*>
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/html/index.html': 'src/html/index.html',
                    'dist/404.html': 'src/html/404.html'
                }
            },
            404: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/404.html': 'src/html/404.html'
                }
            }
        },
        'string-replace': {
            inline: {
                options: {
                    replacements: [
                        {
                            // not working therefore not adding critical to the html and adding before end of head
                            // pattern: /<link[\.\/\s\w\d='"]*href=['"]([\/\.\s\d\w]*critical[\/\.\s\d\w]*)['"][\.\/\s\w\d='"]*>/ig,
                            // cannot get capture group $1. check how to do this.
                            // replacement: '<style><%= grunt.file.read("$1") %></style>'
                            pattern: '</head>',
                            replacement: '<style><%= grunt.file.read("build/css/critical.min.css") %></style></head>'
                        }
                    ]
                },
                files: {
                    'dist/index.html': 'build/html/index.html'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            styles: {
                files: [
                    'src/css/critical.css',
                    'src/css/style.css',
                    'src/plugins/biws/stickyparallax/biws.stickyparallax-0.0.2.css'
                ],
                tasks: ['autoprefixer', 'cssmin'],
                options: {
                    debounceDelay: 250,
                }
            },
            scripts: {
                files: [
                    'src/js/index.js',
                    'src/plugins/biws/stickyparallax/biws.stickyparallax-0.0.2.js',
                ],
                tasks: ['babel', 'uglify'],
                options: {
                    debounceDelay: 250,
                }
            },
            html: {
                files: [
                    'src/html/index.html',
                    'src/css/critical.css'
                ],
                tasks: ['htmlmin', 'string-replace'],
                options: {
                    debounceDelay: 250,
                }
            },
            404: {
                files: ['src/html/404.html'],
                tasks: ['htmlmin'],
                options: {
                    debounceDelay: 250,
                }
            },
            syncfiles: {
                files: ['resources/**', 'root/**'],
                tasks: ['sync']
            },
            livereload: {
                options: {
                    livereload: true,
                },
                files: ['dist/index.html'],
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0',
                base: 'dist/',
                livereload: true,
            },
            livereload: {
                options: {
                    open: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['sync', 'babel', 'uglify', 'autoprefixer', 'cssmin', 'htmlmin', 'string-replace']);
    grunt.registerTask('serve', ['connect:livereload', 'watch']);
}