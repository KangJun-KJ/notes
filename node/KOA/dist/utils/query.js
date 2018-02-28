'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = query;

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../config/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pool = _mysql2.default.createPool(_config.db);
function query(sql, values) {
	return new Promise((resolve, reject) => {
		pool.query(sql, function (err, rows) {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
}