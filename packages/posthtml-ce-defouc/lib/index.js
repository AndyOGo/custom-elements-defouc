'use strict'

var parseAttrs = require('posthtml-attrs-parser')

module.exports = function (options) {
  var namespace = options && options.namespace || '[^-]+'
  var autonomous = options && options.autonomous || true
  var builtin = options && options.builtin || true
  var className = options && options['class'] || null
  var style = options && options.style || { visibility: 'hidden' }
  var typeOfStyle = typeof style
  var isStyleString = typeOfStyle === 'string'
  var isStyleObject = typeOfStyle === 'object'

  var reCustomElementName = new RegExp('^' + namespace + '-.+$')
  var matcher = []

  // match autonomous custom elements
  if (autonomous) {
    matcher.push({ tag: reCustomElementName })
  }

  // match extended built-in elements
  if (builtin) {
    matcher.push({ attrs: { is: reCustomElementName } })
  }

  // return custom elements de-FOUC plugin
  return function CustomElementsDeFouc (tree) {
    tree.match(matcher, walkCustomElements)

    return tree
  }

  // walk through all nodes and mitigate FOUC
  function walkCustomElements (node) {
    var attrs = parseAttrs(node.attrs)

    // mitigate by class name
    if (className) {
      if (attrs.class) {
        attrs.class.push(className)
      } else {
        attrs.class = [className]
      }
    }

    // mitigate by inline style of object source
    if (isStyleObject) {
      if (attrs.style) {
        for (var key in style) {
          if (style.hasOwnProperty(key)) {
            attrs.style[key] = style[key]
          }
        }
      } else {
        attrs.style = style
      }
    }

    node.attrs = attrs.compose()

    // mitigate by inline style of string source
    if (isStyleString) {
      node.attrs
        ? (node.attrs.style
          ? (node.attrs.style += style)
          : node.attrs.style = style
        )
        : node.attrs = { style: style }
    }

    return node
  }
}