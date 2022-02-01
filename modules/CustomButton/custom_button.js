import { Node, getAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

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
                default: '_blank',
            },
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
                    }
                },
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

    addProseMirrorPlugins() {
        const props = {
            handleClick: (view, pos, event) => {
                var _a;
                var attrs = getAttributes(view.state, this.name)
                var link = (_a = event.target) === null || _a === void 0 ? void 0 : _a.closest('button')
                
                if (link && attrs.href) {
                    window.open(attrs.href, attrs.target);
                    return true;
                }

                return false;
            },               
        }

        return [ 
            new Plugin({
               props 
            })
        ]
    }
})