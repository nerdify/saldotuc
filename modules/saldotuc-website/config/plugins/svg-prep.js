const fs = require('fs');
const path = require('path');
const SvgPrep = require('svg-prep');

function SvgPrepPlugin(options) {
  this.options = {};

  Object.assign(this.options, { output: 'sprites.svg' }, options || {});
}

SvgPrepPlugin.prototype.apply = function (compiler) { // eslint-disable-line func-names
  compiler.plugin('emit', (compilation, callback) => { // eslint-disable-line consistent-return
    if (!this.options.source) {
      return callback();
    }

    // TODO: Keep track of file hashes, so we can avoid recompiling when none have changed
    const files = fs.readdirSync(this.options.source)
      .filter((name) => !!name.match(/\.svg$/))
      .map((name) => path.join(this.options.source, name));

    SvgPrep(files) // eslint-disable-line new-cap
      .filter({ removeIds: true, noFill: true })
      .output()
      .then((sprited) => {
        compilation.assets[this.options.output] = { // eslint-disable-line no-param-reassign
          source: () => sprited,
          size: () => sprited.length,
        };

        callback();
      });
  });
};

module.exports = SvgPrepPlugin;