'use strict';

// TODO: use mock-fs @awinogradov 23.07.2016

const tests = {
  'PLUGIN_NAME': {
    'basic': {
      message: 'supports basic usage',
      options: {
        from: './test/fixtures/before.html'
      }
    }
  }
};

const debug = true;
const dir = './test/';

const fs = require('fs');
const path = require('path');
const plugin = require('./lib');

Object.keys(tests).forEach(function (name) {
  const parts = tests[name];

  test(name, function (t) {
    const fixtures = Object.keys(parts);

    t.plan(fixtures.length);

    fixtures.forEach(function (fixture) {
      const message = parts[fixture].message;
      const options = parts[fixture].options;

      const baseName = fixture.split(':')[0];
      const testName = fixture.split(':').join('.');

      const inputPath = path.resolve(dir + baseName + '.html');
      const expectPath = path.resolve(dir + testName + '.expect.html');
      const actualPath = path.resolve(dir + testName + '.actual.html');

      const inputHTML = '';
      const expectHTML = '';

      try {
        inputHTML = fs.readFileSync(inputPath,  'utf8');
      } catch (error) {
        fs.writeFileSync(inputPath, inputHTML);
      }

      try {
        expectHTML = fs.readFileSync(expectPath,  'utf8');
      } catch (error) {
        fs.writeFileSync(expectPath, expectHTML);
      }

      plugin.process(inputHTML, options).then(function (result) {
        const actualHTML = result.html;

        if (debug) {
          fs.writeFileSync(actualPath, actualHTML);
        }

        t.equal(actualHTML, expectHTML, message);
      });
    });
  });
});
