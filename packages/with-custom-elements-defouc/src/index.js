const regexTrim = /^\s+|\s{2,}|\s+$/g

export default function withCustomElementsDeFouc(CustomElement, {
  style = 'visibility',
  className,
} = {}) {
  const typeOfStyle = typeof style
  const isStyleString = typeOfStyle === 'string'
  const isStyleObject = typeOfStyle === 'object'
  const reClassName = new RegExp(`^${className}$|^${className}\\s|\\s${className}\\s|\\s${className}$`, 'g')

  return class CustomElementsDeFouc extends CustomElement {
    connectedCallback() {
      if (style) {
        // mitigate by inline style of string source
        if (isStyleString) {
          this.style.removeProperty(style)
        } else if (isStyleObject) {
          // mitigate by inline style of object source
          for (let property in style) {
            if (style.hasOwnProperty(property)) {
              const value = style[property]

              if (!value) {
                this.style.removeProperty(property)
              } else {
                this.style[property] = value
              }
            }
          }
        }
      }

      // mitigate by class name
      if (className) {
        this.className = this.className.replace(reClassName, ' ').replace(regexTrim, ' ')
      }
    }
  }
}
