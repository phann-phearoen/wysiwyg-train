import Image from '@tiptap/extension-image'
import { mergeAttributes } from '@tiptap/core'

export default Image.extend({
    name: 'custom-image',
    addAttributes() {
        return {
            ...Image.config.addAttributes(),
            width: {
                default: null,
                rendered: false
            }
        }
    },
    addCommands() {
        return {
            setImage: (options) => ({ tr, dispatch }) => {
                const { selection } = tr
                const node = this.type.create(options)

                if (dispatch) {
                    tr.replaceRangeWith(selection.from, selection.to, node)
                }

                return true
            },
            setAttributes: (attributes) => ({ tr, dispatch }) => {
                const { selection } = tr
                const options = {
                    ...selection.node.attrs,
                    ...attributes
                }
                const node = this.type.create(options)

                if (dispatch) {
                    tr.replaceRangeWith(selection.from, selection.to, node)
                }
            }
        }
    },
    renderHTML({ node, HTMLAttributes }) {
        const width = node.attrs.width
        //HTMLAttributes.class = ' custom-image-' + size
        HTMLAttributes.style = `width: ${width}px`
        return [
            'img',
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
        ]
    }
})