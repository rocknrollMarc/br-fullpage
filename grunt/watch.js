'use strict';

module.exports = {
    example: {
        files: ['example/*.js', 'example/*.css', 'example/*.html'],
        options: {
            livereload: true
        }
    },
    app: {
        files: ['app/*.js', 'app/*.css'],
        tasks: ['buildExample']
    }
};