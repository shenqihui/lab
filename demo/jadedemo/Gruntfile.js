/*!
 * Gruntfile
 *
 * Copyright
 * Licensed
 */

module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-jade');



  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    filename: 'jadedemo',
    filenamecustom: '<%= filename %>-custom',
    hashmapFile: '_build/hashmap.json',
    customStyleFile: '_build/less/app.less',z
  });

  jade: {
    dist: {
      dest: 'dist/tpls/',
      cwd: 'src/scripts/tpls/',
      src: ['*/*.jade'],
      ext: '.html',
      expand: true
    },

    docs: {
      options: {
        data: function() {
          var mapFilePath = grunt.config('hashmapFile'),
            map;
          if (grunt.file.exists(mapFilePath)) map = grunt.file.readJSON(mapFilePath);
          else map = {};

          return {
            pkg: grunt.config('pkg'),
            makeVersion: function(file) {
              var token, hash, reg, ext, dir, name, path;
              for (token in map) {
                reg = new RegExp(token + '$');

                // 匹配文件名称，将 hash 值作为版本号添加入路径中
                if (reg.test(file)) {
                  dir = file.replace(reg, '');
                  ext = /[.]/.exec(file) ? /[^.]+$/.exec(file) : undefined;
                  name = token.replace(new RegExp('.' + ext + '$'), '');
                  hash = map[token];
                  path = dir + name + '.' + hash + '.' + ext;
                  break;
                }
              }

              return path || file;
            }
          };
        }
      },
      dest: 'demo/',
      cwd: 'docs/jade/pages/',
      src: ['*.jade'],
      ext: '.html',
      expand: true
    },
    'docs-template': {
      options: '<%= jade.docs.options %>',
      dest: 'demo/assets/templates/',
      cwd: 'docs/jade/templates/',
      src: ['*/*.jade'],
      ext: '.html',
      expand: true
    }
  }
  grunt.registerTask('default', ['jade:docs']);
};