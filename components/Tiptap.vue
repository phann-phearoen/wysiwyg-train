<template>
    <div>
        <v-card
        outlined
        id="toolbar"
        >
            <v-btn-toggle id="history">
                <v-btn
                @click="editor.chain().focus().undo().run()"
                :disabled="!editor"
                >
                    <v-icon>mdi-arrow-u-left-top</v-icon>
                </v-btn>
                <v-btn
                @click="editor.chain().focus().redo().run()"
                :disabled="!editor"
                >
                    <v-icon>mdi-arrow-u-right-top</v-icon>
                </v-btn>
            </v-btn-toggle>

            <v-btn-toggle id="text-style"
            multiple>
                <v-btn
                @click="editor.chain().focus().toggleBold().run()"
                >
                    <v-icon>mdi-format-bold</v-icon>
                </v-btn>
                <v-btn
                @click="editor.chain().focus().toggleItalic().run()"
                >
                    <v-icon>mdi-format-italic</v-icon>
                </v-btn>
                <v-btn
                @click="editor.chain().focus().toggleUnderline().run()"
                >
                    <v-icon>mdi-format-underline</v-icon>
                </v-btn>
                <v-btn
                @click="editor.chain().focus().toggleStrike().run()"
                >
                    <v-icon>mdi-format-strikethrough</v-icon>
                </v-btn>                
            </v-btn-toggle>

            <v-btn-toggle id="color">
                <v-dialog
                    v-model="dialog"
                    width="500"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        v-bind="attrs"
                        v-on="on">
                            <v-row
                            align="center"
                            class="flex-column"
                            justify="center"
                            >
                                <v-icon class="cols 12">mdi-format-color-text</v-icon>
                                <v-sheet
                                tile
                                style="margin-top: -4px;"
                                height="4"
                                width="26"
                                :color="color"
                                ></v-sheet>
                            </v-row>
                        </v-btn>
                    </template>

                    <v-card width="500">
                        <v-card-title>Color Picker</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-color-picker
                            width="490"
                            dot-size="25"
                            show-swatches
                            swatches-max-height="100"
                            mode="hexa"
                            hide-inputs
                            v-model="color"
                            ></v-color-picker>
                            <v-btn
                            class="mt-4 ml-auto"
                            @click="closeDialog(color)"
                            plain
                            color="blue"
                            >Done</v-btn>
                        </v-card-text>
                    </v-card>                       
                </v-dialog>
                <v-dialog
                    v-model="highlightDialog"
                    width="500"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        v-bind="attrs"
                        v-on="on"
                        >        
                             <v-row
                            align="center"
                            class="flex-column"
                            justify="center"
                            :style="{ backgroundColor: textHighlight }"
                            >          
                                <v-icon class="cols 12">mdi-format-color-text</v-icon>
                            </v-row>
                        </v-btn>
                    </template>

                    <v-card width="500">
                        <v-card-title>Color Picker</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-color-picker
                            width="490"
                            dot-size="25"
                            show-swatches
                            swatches-max-height="100"
                            mode="hexa"
                            hide-inputs
                            v-model="textHighlight"
                            ></v-color-picker>
                            <v-btn
                            class="mt-4 ml-auto"
                            @click="closeHighlight(textHighlight)"
                            plain
                            color="blue"
                            >Done</v-btn>
                        </v-card-text>
                    </v-card>                       
                </v-dialog>
            </v-btn-toggle>

            <v-btn-toggle id="align"
            v-model="align_toggler"
            >
                <v-btn 
                @click="editor.chain().focus().setTextAlign('left').run()"
                class="v-item--active"
                >
                    <v-icon>mdi-format-align-left</v-icon>
                </v-btn>
                <v-btn @click="editor.chain().focus().setTextAlign('center').run()">
                    <v-icon>mdi-format-align-center</v-icon>
                </v-btn>
                <v-btn @click="editor.chain().focus().setTextAlign('right').run()">
                    <v-icon>mdi-format-align-right</v-icon>
                </v-btn>
                <v-btn @click="editor.chain().focus().setTextAlign('justify').run()">
                    <v-icon>mdi-format-align-justify</v-icon>
                </v-btn>
            </v-btn-toggle>

            <v-btn-toggle id="list">
                <v-btn @click="editor.chain().focus().toggleBulletList().run()">
                    <v-icon>mdi-format-list-bulleted</v-icon>
                </v-btn>
                <v-btn @click="editor.chain().focus().toggleOrderedList().run()">
                    <v-icon>mdi-format-list-numbered</v-icon>
                </v-btn>
            </v-btn-toggle>
            
            <v-btn-toggle id="heading"
            v-model="text_type_toggler"
            >
                <v-btn @click="editor.commands.setParagraph()">
                    <v-icon>mdi-format-paragraph</v-icon>
                </v-btn>
                 <v-btn @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
                    <v-icon>mdi-format-header-1</v-icon>
                </v-btn>
                <v-btn @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
                    <v-icon>mdi-format-header-2</v-icon>
                </v-btn>
                <v-btn @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
                    <v-icon>mdi-format-header-3</v-icon>
                </v-btn>
                 <v-btn @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
                    <v-icon>mdi-format-header-4</v-icon>
                </v-btn>
            </v-btn-toggle>
            
            <v-btn-toggle>
                <v-btn @click="editor.chain().focus().toggleBlockquote().run()">
                    <v-icon>mdi-format-quote-open</v-icon>
                </v-btn>
                <v-btn @click="editor.chain().focus().setHorizontalRule().run()">
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-btn @click="setLink">
                    <v-icon>mdi-link</v-icon>
                </v-btn>
            </v-btn-toggle>

        </v-card>
        <editor-content :editor="editor" />
    </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Placehoder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Hightlight from '@tiptap/extension-highlight'

export default {
    components: {
        EditorContent,
    },

    data() {
        return {
            editor: null,
            color: "",
            dialog: null,
            align_toggler: 0,
            text_type_toggler: 0,
            highlightDialog: null,
            textHighlight: "",
        }
    },
    methods: {
        closeDialog(color) {
            this.dialog = false
            if(color) {
                this.editor.chain().focus().setColor(color).run()
            }
        },
        closeHighlight(color) {
            this.highlightDialog = false
            if(color) {
                this.editor.chain().focus().toggleHighlight({ color: color }).run()
            }
        },
        setLink() {
            const previousUrl = this.editor.getAttributes('link').href
            const url = window.prompt('URL', previousUrl)

            // cancelled
            if (url === null) {
                return
            }

            // empty
            if (url === '') {
                this.editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .unsetLink()
                .run()

                return
            }

            // update link
            this.editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run()
        },
        logActive() {
            let state = this.editor.isActive({ textAlign: 'left' })
            console.log(state)
        }
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit.configure({
                    history: true,
                    heading: {
                        levels: [1, 2, 3, 4],
                    },
                    blockquote: {},
                    codeBlock: {},
                    horizontalRule: {},
                }),
                Placehoder.configure({
                    placeholder: "say something, I'm giving up on you..."
                }),
                Underline,
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                TextStyle,
                Color,
                Link,
                Hightlight.configure({
                    multicolor: true,
                })
            ],
            content: '',
        })
    },

    beforeUnmount() {
        this.editor.destroy()
    },
}
</script>

<style>
.ProseMirror {
    min-height: 200px;
    border: 1.5px solid grey;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 5px;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  font-style: italic;
  height: 0;
}
blockquote {
    margin: 0 1rem;
    padding: .5rem 0 .01rem 1rem;
    border-left: 3px solid grey;
    background-color: #fcfeff;
    font-size: 1.2em;
}
.ProseMirror h1 {
    border-left: 12.5px solid #EE4A85;
    padding-top: .75rem;
    min-height: 2.5rem;
    padding-left: .5rem;
    margin: .5rem auto;
}
.ProseMirror h2 {
    color: #EE4A85;
}
</style>

<style scoped>
#toolbar {
    border: 1.5px solid grey !important;
    border-bottom: none !important;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    padding: .4em !important;
}
</style>