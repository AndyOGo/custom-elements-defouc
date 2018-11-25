[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# Custom Elements de-FOUC

Mitigate intrinsic [Flash of Unstyled Content (FOUC)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) of Custom Elements V1, by delaying their visibility upon connection.

Unfortunately one rather intriguing problem with Custom Elements is [performance](https://www.stevesouders.com/blog/2013/11/26/performance-and-custom-elements/) and it's intrinsic problem of [Flash of Unstyled Content (FOUC)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content).

This monorepo is here to help you mitigate this annoying FOUC-issue, by providing you with:
 - a PostHTML [`posthtml-custom-elements-defouc` plugin](https://github.com/AndyOGo/custom-elements-defouc/tree/master/packages/posthtml-custom-elements-defouc) for your servers
 - and a higher-order-class [`with-custom-elements-defouc`](https://github.com/AndyOGo/custom-elements-defouc/tree/master/packages/with-custom-elements-defouc) to compose your custom elements with
 
 ### License [MIT](LICENSE)
 
 Proudly brought to you by [`<scale-unlimited>`](http://www.scale-unlimited.com)