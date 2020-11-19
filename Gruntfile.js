module.exports = grunt => {
    grunt.initConfig({
        autoprefixer: {
            dist: {
                files: {
                    'build/css/critical.css': 'src/css/critical.css',
                    'build/css/style.css': 'src/css/style.css',
                    'build/css/biws.stickyparallax.css': 'src/plugins/biws/stickyparallax/biws.stickyparallax-0.0.1.css',
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'public/assets/css/critical.min.css': 'build/css/critical.css',
                    'public/assets/css/style.min.css': ['build/css/style.css', 'build/css/biws.stickyparallax.css'],
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
                    'build/js/biws.stickyparallax.js': 'src/plugins/biws/stickyparallax/biws.stickyparallax-0.0.1.js',
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: true
                },
                files: {
                    'public/assets/js/index.min.js': 'build/js/index.js',
                    'public/assets/js/biws.stickyparallax.min.js': 'build/js/biws.stickyparallax.js'
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'public/index.html': 'src/html/index.html'
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
                    'src/plugins/biws/stickyparallax/biws.stickyparallax-0.0.1.css'
                ],
                tasks: ['autoprefixer', 'cssmin'],
                options: {
                    debounceDelay: 250,
                }
            },
            scripts: {
                files: [
                    'src/js/index.js',
                    'src/plugins/biws/stickyparallax/biws.stickyparallax-0.0.1.js',
                ],
                tasks: ['babel', 'uglify'],
                options: {
                    debounceDelay: 250,
                }
            },
            html: {
                files: ['src/html/index.html'],
                tasks: ['htmlmin'],
                options: {
                    debounceDelay: 250,
                }
            },
            livereload: {
                options: {
                    livereload: true,
                },
                files: ['public/index.html']
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0',
                base: 'public/',
                livereload: true,
            },
            livereload: {
                options: {
                    open: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['babel', 'uglify', 'autoprefixer', 'cssmin', 'htmlmin']);
    grunt.registerTask('serve', ['connect:livereload', 'watch']);
}