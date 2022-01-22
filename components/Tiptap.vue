<template>
    <div>
        <div v-if="editor">
            <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            bold
            </button>
            <!-- <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
            italic
            </button>
            <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
            strike
            </button>
            <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
            code
            </button>
            <button @click="editor.chain().focus().unsetAllMarks().run()">
            clear marks
            </button>
            <button @click="editor.chain().focus().clearNodes().run()">
            clear nodes
            </button>
            <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
            paragraph
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            h1
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            h2
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
            h3
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
            h4
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
            h5
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
            h6
            </button>
            <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
            bullet list
            </button>
            <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
            ordered list
            </button>
            <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
            code block
            </button>
            <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
            blockquote
            </button>
            <button @click="editor.chain().focus().setHorizontalRule().run()">
            horizontal rule
            </button>
            <button @click="editor.chain().focus().setHardBreak().run()">
            hard break
            </button>
            <button @click="editor.chain().focus().undo().run()">
            undo
            </button>
            <button @click="editor.chain().focus().redo().run()">
            redo
            </button> -->
        </div>
        <editor-content :editor="editor" />
    </div>
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
            extensions: [
                StarterKit,
            ],
            content: ``,
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