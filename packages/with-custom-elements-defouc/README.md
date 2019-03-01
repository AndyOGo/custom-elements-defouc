# with-custom-elements-defouc

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Mitigate intrinsic [Flash of Unstyled Content (FOUC)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) of Custom Elements V1, by delaying their visibility upon connection.

## Install

Add [Custom Elements de-FOUC](#usage) higher-order-class to your Custom Elements:

> npm i with-custom-elements-defouc

**IMPORTANT:** don't forget to use [`posthtml-custom-elements-defouc` plugin](https://github.com/AndyOGo/custom-elements-defouc/tree/master/packages/posthtml-custom-elements-defouc) at your server.

**Note:** Depending at your targeted audience the [CSS `:defined` pseudo-class](https://html.spec.whatwg.org/multipage/semantics-other.html#selector-defined) may is a better solution.
Of course if you need to support any user with [non-capable browsers](https://developer.mozilla.org/en-US/docs/Web/CSS/:defined#Browser_compatibility) `:defined` won't help you there.

You could handle all undefined custom elements FOUC just by these lines defined within your `<head>` section:

```css
:not(:defined) {
    display: none;
    // or
    visibility: hidden;
    // or whatever you came up with
}
```

## Usage

This higher-order-class comes with sane defaults, just compose your Custom Elements with this:

```js
import withCustomElementsDeFouc from 'with-custom-elements-defouc'

class CustomElement extends HTMLElement {
  // you code here
}

export default withCustomElementsDeFouc(CustomElement/*, { options } */)
```

## Options

### Custom `style`

Remove inline `style` either by type **string** or a **style hash** - truthy hash values will be used as replacement.

**String:**

```js
import withCustomElementsDeFouc from 'with-custom-elements-defouc'

class CustomElement extends HTMLElement {
  // you code here
}

export default withCustomElementsDeFouc(CustomElement, {
  style: 'visibility'
})
```

**Style Hash:**

```js
import withCustomElementsDeFouc from 'with-custom-elements-defouc'

class CustomElement extends HTMLElement {
  // you code here
}

export default withCustomElementsDeFouc(CustomElement, {
  style: {
    visibility: null, // falsy will be removed
    display: 'block' // truthy will be replaced/added
  }
})
```

### Custom `className`

Any CSS `className` to be removed.

```js
import withCustomElementsDeFouc from 'with-custom-elements-defouc'

class CustomElement extends HTMLElement {
  // you code here
}

export default withCustomElementsDeFouc(CustomElement, {
  className: 'foo'
})
```

### License [MIT](LICENSE)

Proudly brought to you by [`<scale-unlimited>`](http://www.scale-unlimited.com)

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
