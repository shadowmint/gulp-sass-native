'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var stringifyObject = require('stringify-object');
var StringDecoder = require('string_decoder').StringDecoder;
var cp = require('child_process');
var sutils = require('./lib/stream_utils.js');

var PLUGIN_NAME = 'gulp-sass-native';

function common_process_raw_value(file, value, cb) {

  // TODO: Check sass command exists

  var sass_process = cp.spawn('sass', ['-s', '--scss']);
  var failed = false;
  sutils.read_from_stream(sass_process.stderr, function(value) {
    if (value) {
      failed = true;
      cb(new gutil.PluginError(PLUGIN_NAME, value, {fileName: file.path}));
    }
  });
  sutils.read_from_stream(sass_process.stdout, function(value) {
    if (value && (!failed)) {
      file.path = gutil.replaceExtension(file.path, '.css');
      file.contents = new Buffer(value);
      cb(null, file);
    }
  });

  sass_process.stdin.write(value);
  sass_process.stdin.end();
}

function handle_buffer_target(file, enc, cb) {
	var content = sutils.convert_to_string(file.contents, enc);
	common_process_raw_value(file, content, cb);
}

function handle_stream_target(file, enc, cb) {
  var buffer = [];
  file.contents.on('err', function(err) { cb(new gutil.PluginError(PLUGIN_NAME, "Invalid value", {fileName: file.path})); });
  file.contents.on('readable', function() {
		var read = file.contents.read();
		if (read != null) {
			buffer.push(read);
		}
		else {
    	common_process_raw_value(file, buffer.join(), cb);
		}
	});
}

module.exports = function (opts) {
  return through.obj(function (file, enc, cb) {

    // Pass through null objects without touching them
    if (file.isNull()) {
      cb(null, file);
    }

    // For streams (ie. files, etc) stream bytes and process them async on the fly
    if (file.isStream()) {
      handle_stream_target(file, enc, cb);
    }

    // For buffers, convert buffer into a string and process it
    if (file.isBuffer()) {
      handle_buffer_target(file, enc, cb);
    }
  }, function (cb) {
    cb();
  });
};
