import { Node, mergeAttributes } from '@tiptap/core'

export const CustomButton = Node.create({
    name: 'CustomButton',

    content: 'block+',

    group: 'block',

    defining: true,

    addAttributes() {
        return {
            href: {
                default: null
            },
            title: {
                default: null
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        HTMLAttributes.class = 'custom-button'
        return ['div', mergeAttributes(HTMLAttributes), 0]
    },

    addCommands() {
        return {
            setButton: attributes => ({ commands }) => {
                return commands.wrapIn(this.name, attributes)
            },
            unsetButton: () => ({ commands }) => {
                return commands.lift(this.name)
            }
        }
    }
})