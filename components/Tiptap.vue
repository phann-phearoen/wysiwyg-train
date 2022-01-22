<template>
    <v-card outlined>
        <v-row
        class="pb-2 ma-0"
        justify="space-between"
        >
            <v-card
            elevation="0"
            outlined
            color="#F5F5F5"
            width="100%"
            >
                <v-btn-toggle
                    v-model="formatting"
                    multiple
                >
                    <v-btn>
                        <v-icon>mdi-format-italic</v-icon>
                    </v-btn>

                    <v-btn>
                        <v-icon>mdi-format-bold</v-icon>
                    </v-btn>

                    <v-btn>
                        <v-icon>mdi-format-underline</v-icon>
                    </v-btn>

                    <v-btn>
                        <v-row
                            align="center"
                            class="flex-column"
                            justify="center"
                        >
                            <v-icon class="cols 12">
                            mdi-format-color-text
                            </v-icon>

                            <v-sheet
                            tile
                            style="margin-top: -4px;"
                            height="4"
                            width="26"
                            color="purple"
                            ></v-sheet>
                        </v-row>
                    </v-btn>
                </v-btn-toggle>

                <v-btn-toggle v-model="alignment">
                    <v-btn>
                        <v-icon>mdi-format-align-center</v-icon>
                    </v-btn>

                    <v-btn>
                        <v-icon>mdi-format-align-left</v-icon>
                    </v-btn>

                    <v-btn>
                        <v-icon>mdi-format-align-right</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </v-card>
        </v-row>
        <v-card-text>
            <editor-content :editor="editor" />
        </v-card-text>
    </v-card>
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