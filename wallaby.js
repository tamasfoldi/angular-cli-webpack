var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({
  entryPatterns: [
    'config/spec-bundle.js',
    'src/**/*spec.js'
  ],

  module: {
    loaders: [
      {test: /\.css$/, loader: 'raw-loader'},
      {test: /\.html$/, loader: 'raw-loader'},
      {test: /karma-require/, loader: 'null'}
    ]
  }
});

var compilerOptions = require('./src/tsconfig.json').compilerOptions;

module.exports = function (wallaby) {

  return {
    files: [
      {pattern: 'config/spec-bundle.js', load: false},
      {pattern: 'config/karma-require.js', load: false},
      {pattern: 'src/**/*.ts', load: false},
      {pattern: 'src/**/*.css', load: false},
      {pattern: 'src/**/*.html', load: false},
      {pattern: 'src/**/*spec.ts', ignore: true}
    ],

    tests: [
      {pattern: 'src/**/*spec.ts', load: false}
    ],

    testFramework: 'jasmine',

    env: {
      runner: require('phantomjs-prebuilt').path,
      params: { runner: '--web-security=false' }
    },

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },

    lowCoverageThreshold: 70, // 70%
    slowTestThreshold: 200, //200ms
    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    }
  };
};