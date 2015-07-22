import * as sutils from 'gulp-tools/lib/utils';
import plugin from './index';
import fs from 'fs';
import File from 'vinyl';

export function test_with_buffer(test) {
  test.expect(1);

  var file = new File({ path: 'source.scss', cwd: 'tests/', base: 'tests/', contents: new Buffer("html { body { .foo { width: 10px; }}}") });

  var stream = plugin();
  stream.on('error', function(value) {
    console.log("Error invoking sass executable.");
    console.log(value);
    test.ok(false);
  });
  sutils.read_from_stream(stream, 'utf8', function(value) {
    test.ok(value.indexOf('width') != -1);
    test.done();
  });

  stream.write(file);
  stream.end();
}

export function test_with_stream(test) {
  test.expect(1);

  var file = new File({
    path: 'valid.scss',
    cwd: './',
    base: './tests/',
    contents: fs.createReadStream(__dirname + '/../tests/valid.scss')
  });

  var stream = plugin();
  stream.on('error', function(value) {
    console.log("Error invoking sass executable.");
    console.log(value);
    test.ok(false);
  });
  sutils.read_from_stream(stream, 'utf8', function(value) {
    test.ok(value != '');
    test.done();
  });

  stream.write(file);
  stream.end();
}

export function test_with_invalid_stream(test) {
  test.expect(1);

  var file1 = new File({
    path: 'source3.js',
    cwd: './',
    base: './tests/',
    contents: fs.createReadStream('./tests/source3.js')
  });

  var stream = plugin();
  stream.on('error', function(err) {
    test.ok(true);
    test.done();
  });
  sutils.read_from_stream(stream, 'utf8', function(value) {
    test.ok(false); // Unreachable
  });

  stream.write(file1);
  stream.end();
}
