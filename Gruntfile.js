/**
 * Created by RadNowacki on 20.12.15.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        serve: {
            options: {
                port: 9000
            }
        }
    });

    grunt.loadNpmTasks('grunt-serve');
    grunt.registerTask('default', ['serve']);
};