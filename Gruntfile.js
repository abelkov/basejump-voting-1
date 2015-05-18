module.exports = function(grunt) {

  [
    'grunt-contrib-watch'
  ].forEach(function(task) {
    grunt.loadNpmTasks(task);
  });

  grunt.initConfig({

    watch: {
      livereload: {
        options: { livereload: true },
        files: ['./*.js', 'views/**/*.jade', 'public/stylesheets/*.styl']
      }
    }

  });

  grunt.registerTask('default', ['watch']);

};