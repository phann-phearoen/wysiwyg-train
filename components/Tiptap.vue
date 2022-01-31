<template>
    <div>
        <v-card
        outlined
        id="toolbar"
        >   
            <div class="d-inline mr-4">
                <v-btn
                :disabled="!editor"
                small
                elevation="0"
                icon
                >
                    <v-icon>mdi-arrow-u-left-top</v-icon>
                </v-btn>
                <v-btn
                @click="editor.chain().focus().redo().run()"
                :disabled="!editor"
                small
                elevation="0"
                icon
                >
                    <v-icon>mdi-arrow-u-right-top</v-icon>
                </v-btn>
            </div>           

            <div id="text-style"
            class="d-inline mr-4"
            multiple
            v-if="editor"
            >
                <v-btn
                @click="editor.chain().focus().toggleBold().run()"                
                small
                elevation="0"
                icon
                :color=" editor.isActive('bold') ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-bold</v-icon>
                </v-btn>
                <v-btn
                @click="editor.chain().focus().toggleItalic().run()"
                small
                elevation="0"
                icon
                :color=" editor.isActive('italic') ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-italic</v-icon>
                </v-btn>
                <v-btn
                @click="editor.chain().focus().toggleUnderline().run()"
                small
                elevation="0"
                icon
                :color=" editor.isActive('underline') ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-underline</v-icon>
                </v-btn>
                <v-btn
                @click="editor.chain().focus().toggleStrike().run()"
                small
                elevation="0"
                icon
                :color=" editor.isActive('strike') ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-strikethrough</v-icon>
                </v-btn>                
            </div>

            <div id="color"
            class="d-inline mr-4"
            v-if="editor"
            >
                <v-dialog
                    v-model="dialog"
                    width="500"
                    id="text-color"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        v-bind="attrs"
                        v-on="on"
                        small
                        elevation="0"
                        icon
                        > 
                            <v-icon :color=" editor.isActive('textStyle') ? color : '' ">mdi-format-color-text</v-icon>
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
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                            class="mt-4 ml-auto"
                            elevation="0"
                            @click="dialog = false; editor.chain().focus().unsetColor().run(); "
                            >Default</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                            class="mt-4 ml-auto"
                            @click="closeDialog(color)"
                            elevation="0"
                            color="blue"
                            dark
                            >Done</v-btn>
                        </v-card-actions>
                    </v-card>                       
                </v-dialog>

                <v-dialog
                    v-model="highlightDialog"
                    width="500"
                    id="highlight"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        v-bind="attrs"
                        v-on="on"
                        small
                        elevation="0"
                        icon                       
                        >         
                            <v-icon :color=" editor.isActive('highlight') ? textHighlight : '' ">mdi-format-color-highlight</v-icon>
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
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                            class="mt-4 ml-auto"
                            elevation="0"
                            @click="highlightDialog = false; editor.chain().focus().unsetHighlight().run()"
                            >None</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                            class="mt-4 ml-auto"
                            @click="closeHighlight(textHighlight)"
                            elevation="0"
                            color="blue"
                            dark
                            >Done</v-btn>
                        </v-card-actions>
                    </v-card>                       
                </v-dialog>
            </div>

            <div id="align"
            class="d-inline mr-4"
            v-if="editor"
            >
                <v-btn 
                @click="editor.chain().focus().setTextAlign('left').run()"
                icon
                small
                elevation="0"
                :color=" editor.isActive({ textAlign: 'left' }) ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-align-left</v-icon>
                </v-btn>
                <v-btn 
                @click="editor.chain().focus().setTextAlign('center').run()"
                icon
                small
                elevation="0"
                :color=" editor.isActive({ textAlign: 'center' }) ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-align-center</v-icon>
                </v-btn>
                <v-btn 
                @click="editor.chain().focus().setTextAlign('right').run()"
                icon
                small
                elevation="0"
                :color=" editor.isActive({ textAlign: 'right' }) ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-align-right</v-icon>
                </v-btn>
                <v-btn 
                @click="editor.chain().focus().setTextAlign('justify').run()"
                icon
                small
                elevation="0"
                :color=" editor.isActive({ textAlign: 'justify' }) ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-align-justify</v-icon>
                </v-btn>
            </div>

            <div id="list"
            class="d-inline mr-4"
            v-if="editor"
            >
                <v-btn 
                @click="editor.chain().focus().toggleBulletList().run()"
                icon
                small
                elevation="0"
                :color=" editor.isActive('bulletList') ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-list-bulleted</v-icon>
                </v-btn>
                <v-btn 
                @click="editor.chain().focus().toggleOrderedList().run()"
                icon
                small
                elevation="0"
                :color=" editor.isActive('orderedList') ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-list-numbered</v-icon>
                </v-btn>
            </div>
            
            <div id="heading"
            class="d-inline mr-4"
            v-if="editor"
            >
                <v-btn 
                @click="editor.chain().focus().setParagraph()"
                icon
                small
                elevation="0"
                :color=" editor.isActive('paragraph') ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-paragraph</v-icon>
                </v-btn>
                <v-btn 
                @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                icon
                small
                elevation="0"
                :color=" editor.isActive('heading', { level: 1 }) ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-header-1</v-icon>
                </v-btn>
                <v-btn 
                @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                icon
                small
                elevation="0"
                :color=" editor.isActive('heading', { level: 2 }) ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-header-2</v-icon>
                </v-btn>
                <v-btn 
                @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                icon
                small
                elevation="0"
                :color=" editor.isActive('heading', { level: 3 }) ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-header-3</v-icon>
                </v-btn>
                <v-btn 
                @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                icon
                small
                elevation="0"
                :color=" editor.isActive('heading', { level: 4 }) ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-header-4</v-icon>
                </v-btn>
            </div>
            
            <div id="extras"
            class="d-inline mr-4"
            v-if="editor"
            >
                <v-btn
                @click="editor.chain().focus().toggleBlockquote().run()"
                icon
                small
                elevation="0"
                :color=" editor.isActive('blockquote') ? active_btn_color : '' "
                >
                    <v-icon>mdi-format-quote-open</v-icon>
                </v-btn>

                <v-dialog id="textbox"
                    v-model="tb_dialog"
                    width="500"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon
                        small
                        elevation="0"
                        :color="tb_color"
                        >     
                            <v-icon class="cols 12">mdi-alpha-p-box-outline</v-icon>                        
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
                            v-model="tb_color"
                            ></v-color-picker>
                            <v-btn
                            class="mt-4 ml-auto"
                            elevation="0"
                            @click="tb_dialog = false"
                            >None</v-btn>
                            <v-btn
                            class="mt-4 ml-auto"
                            @click="closeQ(tb_color)"
                            elevation="0"
                            color="blue"
                            >Done</v-btn>
                        </v-card-text>
                    </v-card>                       
                </v-dialog>

                <v-btn 
                @click="editor.chain().focus().setHorizontalRule().run()"
                icon
                small
                elevation="0"
                >
                    <v-icon>mdi-minus</v-icon>
                </v-btn>

                <v-dialog id="link"
                    v-model="link_dialog"
                    width="500"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                        icon
                        small
                        elevation="0"
                        v-bind="attrs"
                        v-on="on"
                        >
                            <v-icon>mdi-link</v-icon>
                        </v-btn>
                    </template>

                    <v-card width="500">
                        <v-card-title>Insert Link</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-text-field
                            v-model="link"
                            label="URL"
                            placeholder="Input URL"
                            autofocus
                            prefix="https://"
                            clearable
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                            class="mt-2"
                            elevation="0"
                            @click="link_dialog = false"
                            >Cancel</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                            class="mt-2"
                            @click="setLink(link)"
                            elevation="0"
                            dark
                            color="blue"
                            >Done</v-btn>
                        </v-card-actions>
                    </v-card>                       
                </v-dialog>


                
                <v-dialog
                v-model="image_dialog"
                max-width="600"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn                        
                        v-bind="attrs"
                        v-on="on"
                        icon
                        small
                        elevation="0"
                        >
                            <v-icon>mdi-image</v-icon>
                        </v-btn>
                    </template>

                    <v-card min-height="200">
                        <v-card-title class="grey lighten-2">
                        Image input
                        </v-card-title>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-file-input
                            v-model="selectedFile"
                            type="file"
                            label="Upload"
                            prepend-icon="mdi-image"
                            show-size
                            accept="image/png, image/gif, image/jpeg"
                            placeholder="PNG, GIF, JPGのみ"
                            @change="onFileChange"
                            class="mr-4"
                            >
                            </v-file-input>
                            
                            <v-text-field
                            v-if="!selectedFile"
                            label="Input Url"
                            style="max-width:50%"
                            clearable
                            v-model="selectedFileLocalUrl"
                            ></v-text-field>
                        </v-card-actions>
                        
                        <v-card-actions>
                            <v-btn 
                            elevation="0"
                            @click="image_dialog = false">Cancel</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn 
                            elevation="0"
                            dark
                            color="blue"
                            @click="addImage(selectedFileLocalUrl)">Done</v-btn>
                        </v-card-actions>                        
                    </v-card>
                </v-dialog>
            </div>
        </v-card>

        <bubble-menu
        class="bubble-menu" 
        :editor="editor"
        v-if="editor"
        v-show="editor.isActive('custom-image')"
        >
            <v-card
            min-width="350"
            >
                <v-subheader>Slide to adjust image width(100-1000px)</v-subheader>
                <v-slider
                max="1000"
                min="100"
                step="10"
                v-model="img_width"
                thumb-label
                color="pink lighten-2"
                :class="{ 'is-active': editor.isActive('custom-image') }"
                @change="editor.commands.setAttributes({ width: img_width })"
                >
                    <template v-slot:append>
                        <v-text-field
                            v-model="img_width"
                            class="mt-0 pt-0"
                            hide-details
                            single-line
                            type="number"
                            style="width: 60px"
                            @change="editor.commands.setAttributes({ width: img_width })"
                        ></v-text-field>
                    </template>
                </v-slider>
            </v-card>
        </bubble-menu>

        <editor-content :editor="editor" />

        <div>{{ link }}</div>

        <div v-if="editor">{{ editor.getHTML() }}</div>
    </div>
</template>

<script>
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Placehoder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Hightlight from '@tiptap/extension-highlight'
import Textbox from '../modules/Textbox'
// import Image from '@tiptap/extension-image'
import CustomImage from '../modules/TipTapImage'

export default {
    components: {
        EditorContent,
        BubbleMenu,
    },

    data() {
        return {
            editor: null,
            color: "",
            dialog: null,
            highlightDialog: null,
            textHighlight: "",
            active_btn_color: '#00000029',
            tb_color: '#f0faff',
            tb_dialog: null,
			selectedFile: null,
			selectedFileLocalUrl: "",
            image_dialog: null,
            link_dialog: null,
            link: '',
            img_width: 550,
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
                this.editor.chain().focus().setHighlight({ color }).run()
            }
        },
        setLink(receivedUrl) {
            const url = 'https://' + receivedUrl
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
            //close dialog
            this.link_dialog = false
            this.link = ''
        },
        closeQ(color) {
            this.tb_dialog = false
            this.editor.chain().focus().setTextbox({ color: color }).run()
        },
        onFileChange(payload) {
			this.selectedFile = payload;
			if (this.selectedFile) {
				this.selectedFileLocalUrl = URL.createObjectURL(this.selectedFile);
			}
		},
        async addImage(url) {
            if (url) {
                await this.editor.chain().focus().setImage({ src: url }).run()
            }
            this.image_dialog = false
            this.selectedFile = null
            this.selectedFileLocalUrl = null
        },
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit.configure({
                    history: true,
                    heading: {
                        levels: [1, 2, 3, 4],
                    },
                    codeBlock: {},
                    horizontalRule: {},
                    blockquote: {
                        HTMLAttributes: { id: 'blockquote' }
                    }
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
                Link.configure({
                    HTMLAttributes: { class: 'link' }
                }),
                Hightlight.configure({
                    multicolor: true,
                }),
                Textbox,
                CustomImage.configure({
                    HTMLAttributes: { class: 'custom-image' },
                    inline: true
                }),
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
#blockquote {
    margin: 0 1rem;
    padding: .5rem 0 .1rem 1rem;
    border-radius: 5px;
    font-size: 1.2em;
    background-color: #DC9CA9;
}
#textbox {
    margin: .5rem;
    padding: .5rem;
    border-radius: 3px;
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
.custom-image {
    border-radius: 5px;
}
.link {
    color: grey !important;
    text-decoration: none;
}
.link:hover {
    color: #EE4A85 !important;
    text-decoration: underline;
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