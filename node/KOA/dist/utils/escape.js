'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = escape;

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function escape(template, ...subs) {
    let result = '';
    for (let i = 0; i < subs.length; i++) {
        result += template[i];
        result += _mysql2.default.escape(subs[i]);
    }
    result += template[template.length - 1];
    return result;
}