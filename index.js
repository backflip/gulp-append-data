'use strict';

var util = require('gulp-util'),
	through = require('through2'),
	path = require('path'),
	fs = require('fs'),
	_ = require('lodash');

var PLUGIN_NAME  = 'gulp-append-data';

module.exports = function (options) {
	options = _.extend({
		property: 'data',
		getRelativePath: function(file) {
			return util.replaceExtension(path.basename(file.path), '.json');
		}
	}, options || {});

	return through.obj(function (file, enc, cb) {
		var relPath, absPath;

		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new util.PluginError(PLUGIN_NAME, 'Streaming not supported'));
			return cb();
		}

		relPath = options.getRelativePath(file);
		absPath = path.resolve(path.dirname(file.path), relPath);

		try {
			file[options.property] = JSON.parse(fs.readFileSync(absPath));
		} catch (err) {
			// this.emit('error', new util.PluginError(PLUGIN_NAME, err));
		}

		this.push(file);
		cb();
	});
};
