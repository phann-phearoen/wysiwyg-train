import { Node } from '@tiptap/core'

export const CustomButton = Node.create({
    name: 'CustomButton',

    content: 'inline*',

    group: 'block',

    defining: true,

    addAttributes() {
        return {
            href: {
                default: null
            },
            target: {
                default: null,
            },
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
        return [ 'button', HTMLAttributes, [ 'div', 0]]
    },

    addCommands() {
        return {
            setButton: attributes => ({ commands }) => {
                return commands.setNode(this.name, attributes)
            },
        }
    },
})