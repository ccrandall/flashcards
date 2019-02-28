module.exports = function(grunt) {
  //var history = require('connect-history-api-fallback');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'app.js',
        '!public/javascripts/*.min.js',
        'public/javascripts/main.js'
      ]
    },
    sass: {
      dist: {
        options: {
        },
        files: {
          'public/stylesheets/main.css': 'public/stylesheets/main.scss'
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        livereload: true
      },
      target: {
        files: {
          'public/stylesheets/main.min.css': ['public/stylesheets/normalize.css','public/stylesheets/bootstrap.min.css','public/stylesheets/main.css']
        }
      }     
    },
    uglify: {
      js: {
        files: {
          'public/javascripts/main.min.js': ['public/javascripts/plugins.js','public/javascripts/bootstrap.min.js','public/javascripts/angular.min.js','public/javascripts/main.js']
        }
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: true
        //reload: true
      },
      js: {
        options: {
          livereload: true
        },
        files: 'public/javascripts/main.js',
        tasks: ['jshint','uglify:js']
      },
      sass: {
        options: {
          livereload: false
        },
        files: 'public/stylesheets/*.scss',
        tasks: ['sass','cssmin']
      },
      css: {
        files: 'public/assets/css/*.css'
      },
      html: {
        files: ['views/*.pug']
      },
      livereload: {
        options: {livereload: true},
        files: ['public/**/*', 'app.js']
      }
    },
    /*connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9000,
          middleware: function(connect, options, middleware) {
            middleware.unshift(history());
            return middleware;
          },
          //keepalive: true,
          livereload: true,
          open: true,
          base: 'public/',
          files: ['*.html','*.js','*.css']
        }
        //files: ['public/*.html','public/js/*.js','public/css/*.css']
      }
    }*/
  });
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify'); 
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
//grunt.loadNpmTasks('grunt-contrib-connect');

grunt.registerTask('default', ['jshint','sass','cssmin','uglify','watch']);
  
};
