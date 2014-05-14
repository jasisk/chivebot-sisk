'use strict';

var pkg = require('./package');
var http = require('http');

var options = {
  host: 'temp.sisk.io',
  port: 80,
  path: '/'
};

var commands = {
  temp: function (cb) {

    http.get(options, function(res){
      var _chunks = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk){
        _chunks += chunk;
      });
      res.on('end', function () {
        var json = JSON.parse(_chunks);
        cb(null, 'it is ' + json.temperature + '\xB0 ' + json.unit + ' in :jeancharles:\'s apartment.');
      });
    }).on("error", function(e){
      cb(null, 'something went wrong.');
    });
  }
};

module.exports = {

  name: pkg.name,

  version: pkg.version,

  register: function (plugin, options, next) {
    plugin.dependency('chivebot', function (plugin, next) {

      plugin.plugins.chivebot.registerCommand('sisk', function (raw, args, cb) {
        var command = args[2] || 'temp';
        if (commands[command]) {
          commands[command](cb);
        } else {
          cb(null, 'I don\'t know how to do that.');
        }
      });

      next();
    });

    next();
  }
};
