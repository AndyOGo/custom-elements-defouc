import expect from 'expect'

import withCustomElementsDeFouc from 'src/index'

class CustomElementFixture {}

describe('withCustomElementsDeFouc', () => {
  it('removes default visibility inline style upon connection', () => {
    const CustomElementFixtureHoced = withCustomElementsDeFouc(CustomElementFixture)
    const ce = new CustomElementFixtureHoced()
    const div = document.createElement('div')
    div.style.visibility = 'hidden'

    expect(div.style.visibility).toEqual('hidden')

    ce.connectedCallback.call(div)

    expect(div.style.visibility).toBeFalsy()
  })

  it('removes custom inline style upon connection', () => {
    const CustomElementFixtureHoced = withCustomElementsDeFouc(CustomElementFixture, {
      style: 'display'
    })
    const ce = new CustomElementFixtureHoced()
    const div = document.createElement('div')
    div.style.display = 'none'

    expect(div.style.display).toEqual('none')

    ce.connectedCallback.call(div)

    expect(div.style.display).toBeFalsy()
  })

  it('removes class name upon connection', () => {
    const CustomElementFixtureHoced = withCustomElementsDeFouc(CustomElementFixture, {
      className: 'foo'
    })
    const ce = new CustomElementFixtureHoced()
    const div = document.createElement('div')

    div.className = 'foo'
    expect(div.className).toEqual('foo')
    ce.connectedCallback.call(div)
    expect(div.className).toEqual(' ')

    div.className = 'bar foo baz'
    expect(div.className).toEqual('bar foo baz')
    ce.connectedCallback.call(div)
    expect(div.className).toEqual('bar baz')

    div.className = 'bar foo'
    expect(div.className).toEqual('bar foo')
    ce.connectedCallback.call(div)
    expect(div.className).toEqual('bar ')
  })
})
