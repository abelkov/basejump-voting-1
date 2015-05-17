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
        files: '**/*'
      }
    }

  });

  grunt.registerTask('default', ['watch']);

};