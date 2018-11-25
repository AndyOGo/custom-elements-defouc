'use strict'

const test = require('ava')
const plugin = require('..')
const {readFileSync} = require('fs')
const path = require('path')
const posthtml = require('posthtml')
const fixtures = path.join(__dirname, 'fixtures')

test('Autonomous Custom Element default inline style', (t) => {
  return compare(t, 'autonomous-default-inline-style')
})

test('Autonomous Custom Element custom inline style', (t) => {
  return compare(t, 'autonomous-custom-inline-style', {
    style: 'display: none'
  })
})

test('Autonomous Custom Element custom hash inline style', (t) => {
  return compare(t, 'autonomous-custom-hash-inline-style', {
    style: {
      display: 'none'
    }
  })
})

test('Autonomous Custom Element custom hash multi inline style', (t) => {
  return compare(t, 'autonomous-custom-hash-multi-inline-style', {
    style: {
      display: 'none',
      visibility: 'hidden'
    }
  })
})

test('Autonomous Custom Element custom class', (t) => {
  return compare(t, 'autonomous-custom-class', {
    class: 'custom-elements-defouc'
  })
})

function compare (t, name, options) {
  const html = readFileSync(path.join(fixtures, `${name}.html`), 'utf8')
  const expected = readFileSync(path.join(fixtures, `${name}.expected.html`), 'utf8')

  return posthtml([plugin(options)])
    .process(html)
    .then((res) => t.truthy(res.html === expected))
}
