import cp from 'child_process';
import gutil from 'gulp-util';
import * as sutils from 'gulp-tools/lib/utils';
import {Plugin} from 'gulp-tools';

class Sass extends Plugin {

  constructor() {
    super('gulp-sass-native');
  }

  handle_string(file, value, callback) {
    console.log("Handler");
    var isWin = /^win/.test(process.platform);
    if (isWin) {
      var sass_process = cp.spawn('ruby', ['C:\\Ruby22-x64\\bin\\sass', '-s', '--scss'], { cwd: file.base });
    }
    else {
      var sass_process = cp.spawn('sass', ['-s', '--scss'], { cwd: file.base });
    }
    var failed = false;
    var self = this;
    sutils.read_from_stream(sass_process.stderr, function(value) {
      if (value) {
        failed = true;
        callback(new gutil.PluginError(self.name, value, {fileName: file.path}));
      }
    });
    sutils.read_from_stream(sass_process.stdout, function(value) {
      if (value && (!failed)) {
        file.path = gutil.replaceExtension(file.path, '.css');
        file.contents = new Buffer(value);
        callback(null, file);
      }
    });
    console.log("Writing value to it: " + value);
    sass_process.stdin.write(value);
    sass_process.stdin.end();
  }
}

export default new Sass().handler();
