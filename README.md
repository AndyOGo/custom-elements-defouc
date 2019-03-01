[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# Custom Elements de-FOUC

Mitigate intrinsic [Flash of Unstyled Content (FOUC)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) of Custom Elements V1, by delaying their visibility upon connection.

Unfortunately one rather intriguing problem with Custom Elements is [performance](https://www.stevesouders.com/blog/2013/11/26/performance-and-custom-elements/) and it's intrinsic problem of [Flash of Unstyled Content (FOUC)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content).

This monorepo is here to help you mitigate this annoying FOUC-issue, by providing you with:

- a PostHTML [`posthtml-custom-elements-defouc` plugin](https://github.com/AndyOGo/custom-elements-defouc/tree/master/packages/posthtml-custom-elements-defouc) for your servers
- and a higher-order-class [`with-custom-elements-defouc`](https://github.com/AndyOGo/custom-elements-defouc/tree/master/packages/with-custom-elements-defouc) to compose your custom elements with

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

## License [MIT](LICENSE)

Proudly brought to you by [`<scale-unlimited>`](http://www.scale-unlimited.com)