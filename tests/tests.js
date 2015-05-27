'use strict';

var sutils = require("../lib/stream_utils.js");
var plugin = require("../");
var fs = require('fs');
var File = require('vinyl');

exports.testWithBuffer = function(test) {
  test.expect(1);

  var file = new File({
    path: 'source.txt',
    cwd: 'tests/',
    base: 'tests/',
    contents: new Buffer("html { .foo { width: 10px; } }")
  });

  var stream = plugin();
  sutils.read_from_stream(stream, function(value) {
    test.ok(value == "html .foo {\n  width: 10px; }\n");
    test.done();
  });

  stream.write(file);
  stream.end();
};

exports.testWithStream = function(test) {
  test.expect(1);

  var file = new File({
    path: 'source.txt',
    cwd: 'tests/',
    base: 'tests/',
    contents: fs.createReadStream('./tests/targets/valid.txt')
  });

  var stream = plugin();
  sutils.read_from_stream(stream, function(value) {
    test.ok(value == "html .foo {\n  width: 10px; }\n");
    test.done();
  });

  stream.write(file);
  stream.end();
};

exports.testWithInvalidStream = function(test) {
  test.expect(1);

  var file = new File({
    path: 'source.txt',
    cwd: 'tests/',
    base: 'tests/',
    contents: fs.createReadStream('./tests/targets/invalid.txt')
  });

  var stream = plugin();
  stream.on('error', function(err) {
    test.ok(true);
    test.done();
  });
  sutils.read_from_stream(stream, function(value) {
    test.ok(false);  // unreachable
  });

  stream.write(file);
  stream.end();
};
/*
exports.testWithStream = safe(function(test) {
  test.expect(1);

  var file = new File({
    path: 'source.txt',
    cwd: 'tests/',
    base: 'tests/',
    contents: fs.createReadStream('./tests/targets/valid.txt')
  });

  var stream = plugin();
  var content = null;
  var bufs = [];
  stream.on('readable', safe(function() {
    var read = stream.read();
    if (read) {
      bufs.push(read.contents);
    }
  }));
  stream.on('end', safe(function() {
    safe(function() {
      var all = Buffer.concat(bufs);
      var decoder = new StringDecoder('utf8');
      var content = decoder.write(all).trim();
      test.ok(content == 'HelloWorld\n1', "Invalid plugin output");
      test.done();
    })();
  }));

  stream.write(file);
  stream.end();
});



exports.testWithInvalidStream = safe(function(test) {
  test.expect(1);

  var file = new File({
    path: 'source.txt',
    cwd: 'tests/targets',
    base: 'tests/targets',
    contents: fs.createReadStream('./tests/targets/invalid.txt')
  });

  var stream = plugin();
  stream.on('error', function(value) {
    test.ok(true);
    test.done();
  });

  stream.write(file);
  stream.end();
});

exports.testWithInvalidBuffer = safe(function(test) {
  test.expect(1);

  var file = new File({
    path: 'source.txt',
    cwd: 'tests/targets',
    base: 'tests/targets',
    contents: new Buffer("Nope")
  });

  var stream = plugin();
  stream.on('error', function(value) {
    test.ok(true);
    test.done();
  });

  stream.write(file);
  stream.end();
});*/
