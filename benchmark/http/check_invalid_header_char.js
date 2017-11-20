'use strict';

const common = require('../common.js');
const _checkInvalidHeaderChar = require('_http_common')._checkInvalidHeaderChar;

const bench = common.createBenchmark(main, {
  key: [
    // Valid
    '',
    '\t\t\t\tFoo bar baz',
    'text/html; charset=utf-8',
    'Sat, 07 May 2016 16:54:48 GMT',
    'en-US',

    // Invalid
    'Folded header\r\n  should be \
     supported.',
    '中文呢', // unicode
    '\x7F'
  ],
  n: [1e6],
});

function main(conf) {
  const n = +conf.n;
  const key = conf.key;

  bench.start();
  for (var i = 0; i < n; i++) {
    _checkInvalidHeaderChar(key);
  }
  bench.end(n);
}
