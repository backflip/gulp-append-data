'use strict';

var gulp = require('gulp'),
	util = require('gulp-util'),
	es = require('event-stream'),
	expect = require('chai').expect,
	appendData = require('../');

// Based on gulp-front-matter
function test (check, options) {
	return function (done) {
		gulp.src(__dirname + '/fixtures/test.html')
			.pipe(appendData(options))
			.pipe(es.map(check).on('end', done));
	};
}

describe('gulp-front-matter', function() {
	it('should add data to file object', test(function (file, cb) {
		expect(file.data).to.be.an('object').and.have.property('foo');
		cb();
	}));

	it('should add data to custom property of file object', test(function (file, cb) {
		expect(file.data).to.be.undefined;
		expect(file.foo).to.be.an('object').and.have.property('foo');
		cb();
	}, {
		property: 'foo'
	}));

	it('should add data from custom source file to file object', test(function (file, cb) {
		expect(file.data).to.be.an('object').and.have.property('foo');
		cb();
	}, {
		getRelativePath: function(file) {
			return 'data/bla.js';
		}
	}));
});
