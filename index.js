'use strict';

var Wreck = require('wreck');
var Package = require('./package');
var http = require('http');


var commands = {
    temp: function (cb) {

        Wreck.get('http://temp.sisk.io/', { json: true }, function (err, res, payload) {
            if (err) {
                cb(err);
                return;
            }

            cb(null, 'it is ' + payload.temperature + '\xB0 ' + payload.unit + ' in :jeancharles:\'s apartment.');
        });
    }
};

exports.register = function (plugin, options, next) {

    plugin.dependency('chivebot', function (plugin, next) {

        plugin.plugins.chivebot.registerCommand('sisk', function (raw, args, cb) {
            var command = args._[2] || 'temp';
            if (typeof commands[command] === 'function') {
                commands[command](cb);
            } else {
                cb(null, 'I don\'t know how to do that.');
            }
        });

        next();
    });

    next();
};


exports.register.attributes = {
    pkg: Package
};

