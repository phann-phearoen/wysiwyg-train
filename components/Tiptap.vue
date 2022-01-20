<template>
    <editor-content :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

export default {
    components: {
        EditorContent,
    },

    data() {
        return {
        editor: null,
        }
    },

    mounted() {
        this.editor = new Editor({
            content: '',
            extensions: [
                StarterKit,
                Placeholder.configure({
                    placeholder: 'write something...',
                }),
                
            ],
        })
    },

    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>

<style scoped>
/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
}
</style>>