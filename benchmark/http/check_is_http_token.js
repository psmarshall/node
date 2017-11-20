'use strict';

const common = require('../common.js');
const _checkIsHttpToken = require('_http_common')._checkIsHttpToken;

const bench = common.createBenchmark(main, {
  key: [
    'TCN',
    'alt-svc',
    'Keep-Alive',
    'content-length',
    ':', // invalid input
    '@@',
    '中文呢', // unicode
    '((((())))', // invalid
    ':alternate-protocol', // fast bailout
    'alternate-protocol:' // slow bailout
  ],
  n: [1e6],
});

function main(conf) {
  const n = +conf.n;
  const key = conf.key;

  bench.start();
  for (var i = 0; i < n; i++) {
    _checkIsHttpToken(key);
  }
  bench.end(n);
}
