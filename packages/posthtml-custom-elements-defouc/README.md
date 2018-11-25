<img align="left" width="220" height="200" title="PostHTML logo" src="http://posthtml.github.io/posthtml/logo.svg">

# PostHTML Custom Elements de-FOUC Plugin

[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Build][build]][build-badge]
[![Coverage][cover]][cover-badge]
[![Standard Code Style][style]][style-url]
[![Chat][chat]][chat-badge]

Mitigate intrinsic [Flash of Unstyled Content (FOUC)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) of Custom Elements V1, by delaying their visibility upon connection.

Before:
``` html
<html>
  <body>
    <custom-element>FOUC autonomous custom element</custom-element>
    
    <div is="my-div">FOUC extended built-in element</div>
  </body>
</html>
```

After:
``` html
<html>
  <body>
    <custom-element style="visibility: hidden;">FOUC autonomous custom element</custom-element>
    
    <div is="my-div" style="visibility: hidden;">FOUC extended built-in element</div>
  </body>
</html>
```

## Install

Add [Custom Elements de-FOUC]() to your build tool:

> npm i posthtml posthtml-custom-elements-defouc

**IMPORTANT:** don't forget to use [`with-custom-elements-defouc`](https://github.com/AndyOGo/custom-elements-defouc/tree/master/packages/with-custom-elements-defouc) higher-order-class for your Custom Element definitions.

## Usage

This plugin comes with sane defaults, just add it to your PostHTML pipeline:

``` js
const fs = require('fs');
const posthtml = require('posthtml');
const posthtmlCustomElementsDeFouc = require('posthtml-custom-elements-defouc');

posthtml()
    .use(posthtmlCustomElementsDeFouc({ /* options */ }))
    .process(html/*, options */)
    .then(result => fs.writeFileSync('./after.html', result.html));
```

## Options

Optionally you can:
- limit this plugin to a specific `namespace`
- disable processing `autonomous` Custom Elements or extended `builtin` Elements
- apply you own custom `style` to mitigate FOUC
- or use a CSS `className` to mitigate FOUC

### Limit `namespace`

Before:
``` html
<html>
  <body>
    <custom-element>content</custom-element>
    <span is="builtin-element">content</span>
    
    <namespace-element>content</namespace-element>
    <span is="namespace-element">content</span>
  </body>
</html>
```

Add option:
``` js
const fs = require('fs');
const posthtml = require('posthtml');
const posthtmlCustomElementsDeFouc = require('posthtml-custom-elements-defouc');

posthtml()
    .use(posthtmlCustomElementsDeFouc({ namespace: 'namespace' }))
    .process(html/*, options */)
    .then(result => fs.writeFileSync('./after.html', result.html));
```

After:
``` html
<html>
  <body>
    <custom-element>content</custom-element>
    <span is="builtin-element">content</span>
    
    <namespace-element style="visibility: hidden">content</namespace-element>
    <span is="namespace-element" style="visibility: hidden">content</span>
  </body>
</html>
```

### Disable `autonomous`

Before:
``` html
<html>
  <body>
    <custom-element>content</custom-element>
    <span is="builtin-element">content</span>
  </body>
</html>
```

Add option:
``` js
const fs = require('fs');
const posthtml = require('posthtml');
const posthtmlCustomElementsDeFouc = require('posthtml-custom-elements-defouc');

posthtml()
    .use(posthtmlCustomElementsDeFouc({ autonomous: false }))
    .process(html/*, options */)
    .then(result => fs.writeFileSync('./after.html', result.html));
```

After:
``` html
<html>
  <body>
    <custom-element>content</custom-element>
    <span is="builtin-element" style="visibility: hidden">content</span>
  </body>
</html>
```

### Disable `builtin`

Before:
``` html
<html>
  <body>
    <custom-element>content</custom-element>
    <span is="builtin-element">content</span>
  </body>
</html>
```

Add option:
``` js
const fs = require('fs');
const posthtml = require('posthtml');
const posthtmlCustomElementsDeFouc = require('posthtml-custom-elements-defouc');

posthtml()
    .use(posthtmlCustomElementsDeFouc({ builtin: false }))
    .process(html/*, options */)
    .then(result => fs.writeFileSync('./after.html', result.html));
```

After:
``` html
<html>
  <body>
    <custom-element style="visibility: hidden">content</custom-element>
    <span is="builtin-element">content</span>
  </body>
</html>
```

### Custom `style`

`style` can be either of type **string** or a **style hash**.

Before:
``` html
<html>
  <body>
    <custom-element>content</custom-element>
  </body>
</html>
```

Add option:
``` js
const fs = require('fs');
const posthtml = require('posthtml');
const posthtmlCustomElementsDeFouc = require('posthtml-custom-elements-defouc');

posthtml()
    .use(posthtmlCustomElementsDeFouc({ style: { display: 'none' } }))
    .process(html/*, options */)
    .then(result => fs.writeFileSync('./after.html', result.html));
```

After:
``` html
<html>
  <body>
    <custom-element style="display: none">content</custom-element>
  </body>
</html>
```

### Custom `className`

Before:
``` html
<html>
  <body>
    <custom-element>content</custom-element>
  </body>
</html>
```

Add option:
``` js
const fs = require('fs');
const posthtml = require('posthtml');
const posthtmlCustomElementsDeFouc = require('posthtml-custom-elements-defouc');

posthtml()
    .use(posthtmlCustomElementsDeFouc({ className: 'foo' }))
    .process(html/*, options */)
    .then(result => fs.writeFileSync('./after.html', result.html));
```

After:
``` html
<html>
  <body>
    <custom-element class="foo">content</custom-element>
  </body>
</html>
```

### Contributing

See [PostHTML Guidelines](https://github.com/posthtml/posthtml/tree/master/docs) and [contribution guide](CONTRIBUTING.md).

Proudly brought to you by [`<scale-unlimited>`](http://www.scale-unlimited.com)

### License [MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/posthtml.svg
[npm-url]: https://npmjs.com/package/posthtml

[deps]: https://david-dm.org/posthtml/posthtml.svg
[deps-url]: https://david-dm.org/posthtml/posthtml

[style]: https://img.shields.io/badge/code%20style-standard-yellow.svg
[style-url]: http://standardjs.com/

[build]: https://travis-ci.org/posthtml/posthtml.svg?branch=master
[build-badge]: https://travis-ci.org/posthtml/posthtml?branch=master

[cover]: https://coveralls.io/repos/posthtml/posthtml/badge.svg?branch=master
[cover-badge]: https://coveralls.io/r/posthtml/posthtml?branch=master


[chat]: https://badges.gitter.im/posthtml/posthtml.svg
[chat-badge]: https://gitter.im/posthtml/posthtml?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"
