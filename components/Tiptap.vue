<template>
    <editor-content :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

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
            ],
        })
    },

    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>

<style>
.ProseMirror {
    min-height: 200px;
    border: 1.5px solid grey;
    border-radius: 5px;
}
</style>