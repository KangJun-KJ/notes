'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (dirname) {
    return new Promise((resolve, reject) => {
        const routers = [];
        (0, _glob2.default)(`${dirname}/*`, { ignore: '**/index.js' }, (err, files) => {
            if (err) {
                reject(err);
            }
            files.forEach(file => {
                const router = require(file);
                routers.push(router);
            });
            resolve(routers);
        });
    });
};

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }