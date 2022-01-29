import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import ImageComponent from '../../components/ImageComponent'

export default Node.create({
    name: 'ImgComponent',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            img_src: {
                default: 0,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'vue-component',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['vue-component', mergeAttributes(HTMLAttributes)]
    },

    addCommands() {
        return {
            setImage: attributes => ({ commands }) => {
                return commands.wrapIn(this.name, attributes)
            },
            unsetTextbox: () => ({ commands }) => {
                return commands.lift(this.name)
            },
        }
    },

    addNodeView() {
        return VueNodeViewRenderer(ImageComponent)
    },
})
