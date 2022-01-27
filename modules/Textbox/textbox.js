import { Node } from '@tiptap/core'

export const Textbox = Node.create({

  name: 'textbox',

  content: 'block+',

  group: 'block',

  defining: true,

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: element => element.getAttribute('data-color') || element.style.backgroundColor,
        renderHTML: attributes => {
          if (!attributes.color) {
            return {}
          }

          return {
            'data-color': attributes.color,
            style: `background-color: ${attributes.color}`,
            id: 'textbox',
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      { tag: 'div' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', HTMLAttributes, 0]
  },

  addCommands() {
    return {
      setTextbox: attributes => ({ commands }) => {
        return commands.wrapIn(this.name, attributes)
      },
      toggleTextbox: attributes => ({ commands }) => {
        return commands.toggleWrap(this.name, attributes)
      },
      unsetTextbox: () => ({ commands }) => {
        return commands.lift(this.name)
      },
    }
  },
})