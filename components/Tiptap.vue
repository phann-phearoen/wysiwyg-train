<template>
    <div>
        <v-card
        outlined
        id="toolbar"
        >
            <v-btn 
            type="button" 
            @click="editor.chain().focus().toggleBold().run()"
            plain
            fab
            small
            >
                <v-icon>mdi-format-bold</v-icon>
            </v-btn>
            <v-btn 
            type="button" 
            @click="editor.chain().focus().toggleItalic().run()"
            plain
            fab
            small
            >
                <v-icon>mdi-format-italic</v-icon>
            </v-btn>
            <v-btn 
            type="button" 
            @click="underline"
            plain
            fab
            small
            >
                <v-icon>mdi-format-underline</v-icon>
            </v-btn>
            
        </v-card>

        <editor-content :editor="editor" />
    </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Placehoder from '@tiptap/extension-placeholder'

export default {
    components: {
        EditorContent,
    },

    data() {
        return {
            editor: null,
        }
    },
    methods: {
        underline() {
            this.editor.chain.focus.toggleUnderline.run()
        }
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit.configure({
                    history: true,
                    heading: {
                        levels: [1, 2, 3, 4, 5, 6],
                    },
                }),
                Placehoder.configure({
                    placeholder: "say something, I'm giving up on you..."
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