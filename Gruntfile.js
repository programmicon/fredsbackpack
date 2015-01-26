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
          'assets/css/main.css': 'assets/sass/main.scss'
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
      jekyllBuild: {
        command: 'jekyll build'
      },
      jekyllServe: {
        command: 'jekyll serve'
      }
    },
    watch: {
      scripts: {
        files: ['assets/js/libs/*.js', 'assets/js/main.js'],
        tasks: ['uglify'],
        options: {
          livereload: true,
        },
      },
      images: {
        files: 'assets/images/*.{png,jpg,gif}',
        tasks: ['imagemin'],
        options: {
          livereload: true,
        },
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'autoprefixer'],
        options: {
          livereload: true,
        },
      },
      svgs: {
        files: 'assets/svgs/*.svg',
        tasks: ['svgmin', 'svgstore'],
        options: {
          livereload: true,
        },
      }
    },
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};