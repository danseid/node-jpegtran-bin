'use strict';
var path = require('path');
var url = require('url');

var target = {
	name: 'jpegtran',
	url: 'https://raw.github.com/yeoman/node-jpegtran-bin/master/',
	pathPrefix: '../vendor',
	urlPrefix: 'vendor',
	platforms: {
		darwin: {
			path: 'osx'
		},
		linux: {
			path: 'linux',
			arch: true
		},
		win32: {
			path: 'win',
			arch: true,
			suffix: 'exe',
			dll: 'libjpeg-62.dll'
		},
		freebsd: {
			path: 'freebsd',
			arch: true
		},
		sunos: {
			path: 'sunos',
			arch: true
		}
	}
};

function getPathToPackagedBinary(target, options) {
	var platform = target.platforms[process.platform];

	if (platform === undefined) {
		return console.error('Unsupported platform:', process.platform, process.arch);
	}

	options = options || {};
	options.dll = options.dll || false;

	var targetPath = [];
	var exec = target.name;

	if (options.dll) {
		exec = platform.dll;
	}

	targetPath.push(target.pathPrefix);
	targetPath.unshift(__dirname);

	if (!options.dll && platform.suffix !== undefined) {
		exec += '.' + platform.suffix;
	}

	targetPath.push(exec);

	return path.join.apply(__dirname, targetPath);
}

function getUrlToPackagedBinary(target, options) {
	var platform = target.platforms[process.platform];

	if (platform === undefined) {
		return console.error('Unsupported platform:', process.platform, process.arch);
	}

	options = options || {};
	options.dll = options.dll || false;

	var targetPath = [];
	var arch = process.arch === 'x64' ? 'x64' : 'x86';
	var exec = target.name;

	if (options.dll) {
		exec = platform.dll;
	}

	targetPath.push(target.urlPrefix);
	targetPath.push(platform.path);

	if (platform.arch === true) {
		targetPath.push(arch);
	}

	if (!options.dll && platform.suffix !== undefined) {
		exec += '.' + platform.suffix;
	}

	targetPath.push(exec);

	return url.resolve(target.url, targetPath.join('/'));
}

exports.path = getPathToPackagedBinary(target);
exports.url = getUrlToPackagedBinary(target);

if (process.platform === 'win32') {
	exports.pathDll = getPathToPackagedBinary(target, { dll: true });
	exports.urlDll = getUrlToPackagedBinary(target, { dll: true });
}
