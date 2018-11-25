import expect from 'expect'

import withCustomElementsDeFouc from 'src/index'

class CustomElementFixture {}

function createFakeCustomElement() {
  const div = document.createElement('div')

  div.style.visibility = 'hidden'

  return div
}

describe('withCustomElementsDeFouc', () => {
  it('removes default visibility inline style upon connection', () => {
    const CustomElementFixtureHoced = withCustomElementsDeFouc(CustomElementFixture)
    const ce = new CustomElementFixtureHoced()
    const fakeCeContext = createFakeCustomElement()

    expect(fakeCeContext.style.visibility).toEqual('hidden')

    ce.connectedCallback.call(fakeCeContext)

    expect(fakeCeContext.style.visibility).toBeFalsy()
  })
})
