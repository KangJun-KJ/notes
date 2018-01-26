'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = escape;

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function escape(template) {
    var result = '';

    for (var _len = arguments.length, subs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        subs[_key - 1] = arguments[_key];
    }

    for (var i = 0; i < subs.length; i++) {
        result += template[i];
        result += _mysql2.default.escape(subs[i]);
    }
    result += template[template.length - 1];
    return result;
}