'use strict';

var StringDecoder = require('string_decoder').StringDecoder;

/** Safe handler; log exceptions */
function safe(x) {
  return function() {
    try { x.apply(null, arguments); } catch(ex) {
      console.log(ex.stack);
    }
  };
};

/**
 * Invoke the callback after reading from the stream and converting the result to a string
 * @param stream A stream to read from.
 * @param callback The callback to run when done.
 */
exports.read_from_stream = function(stream, callback) {
  var bufs = [];
  stream.on('readable', safe(function() {
    var read = stream.read();
    if (read) {
      if (read.contents) {
        bufs.push(read.contents);
      }
      else {
        bufs.push(read);
      }
    }
  }));
  stream.on('end', safe(function() {
    var all = Buffer.concat(bufs);
    var decoder = new StringDecoder('utf8');
    var content = decoder.write(all);
    callback(content);
  }));
}

/**
 * Decode a buffer of utf8 data into a string
 * @param buffer A node Buffer to process.
 * @param enc The encoding to use for the buffer.
 */
exports.convert_to_string = function(buffer, enc) {
  var decoder = new StringDecoder(enc);
  var content = decoder.write(buffer);
	return content;
}
