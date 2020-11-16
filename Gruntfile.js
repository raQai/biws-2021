module.exports = grunt => {
    grunt.initConfig({
        autoprefixer: {
            dist: {
                files: {
                    'build/css/style.css': 'src/css/style.css',
                    'build/css/deferred.css': 'src/css/deferred.css',
                    'build/css/biws.stickyparallax.css': 'src/plugins/biws/stickyparallax/biws.stickyparallax-0.0.1.css',
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'public/assets/css/style.min.css': 'build/css/style.css',
                    'public/assets/css/deferred.min.css': ['build/css/deferred.css', 'build/css/biws.stickyparallax.css'],
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
            target: {
                options: {
                    sourceMap: true
                },
                files: {
                    'public/assets/js/index.min.js': 'build/js/index.js',
                    'public/assets/js/biws.stickyparallax.min.js': 'build/js/biws.stickyparallax.js'
                }
            }
        },
        watch: {
            styles: {
                files: [
                    'src/css/style.css',
                    'src/css/deferred.css',
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
            }
        }
    });
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['babel', 'uglify', 'autoprefixer', 'cssmin']);
}