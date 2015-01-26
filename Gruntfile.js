module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        options: {
          beautify: true,
          mangle: false
        },
        files: {
          'assets/js/build/main.min.js': ['assets/js/jquery-1.11.1.js','assets/js/libs/*.js', 'assets/js/main.js']
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'assets/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'assets/images/'
        }]
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          sourcemap: true,
        },
        files: {
          'assets/css/main.css': 'assets/_sass/main.scss'
        }
      }
    },
    autoprefixer: {
      dist: {
        files: {
          'assets/css/main.css': 'assets/css/main.css'
        }
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/svgs/',
          src: ['assets/svgs/*.svg'],
          dest: 'assets/svgs/'
        }]
      }
    },
    svgstore: {
      options: {
        prefix: 'icon-'
      },
      default : {
        files: {
          'assets/svgs/build/svg-defs.svg': ['assets/svgs/*.svg']
        },
      },
    },
    shell: {
      jekyllServe: {
        command: 'jekyll serve --no-watch',
        options: {
          async: true
        }
      },
      jekyllBuild: {
        command: 'jekyll build'
      }
    },
    watch: {
      jekyll: {
        files: [
          '_layouts/*.html',
          '_includes/*.html',
          '_posts/*.markdown',
          '_config.yml',
          'index.html',
          '404.html',
          ],
        tasks: 'shell:jekyllBuild',
        options: {
          spawn: false,
          atBegin: true,
          livereload: true
        }
      },
      scripts: {
        files: ['assets/js/libs/*.js', 'assets/js/main.js'],
        tasks: ['uglify', 'shell:jekyllBuild'],
        options: {
          span: false,
          livereload: true,
        },
      },
      images: {
        files: 'assets/images/*.{png,jpg,gif}',
        tasks: ['imagemin', 'shell:jekyllBuild'],
        options: {
          span: false,
          livereload: true,
        },
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'autoprefixer', 'shell:jekyllBuild'],
        options: {
          span: false,
          livereload: true,
        },
      },
      svgs: {
        files: 'assets/svgs/*.svg',
        tasks: ['svgmin', 'svgstore', 'shell:jekyllBuild'],
        options: {
          span: false,
          livereload: true,
        },
      },
    },
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['shell:jekyllServe','watch']);

};