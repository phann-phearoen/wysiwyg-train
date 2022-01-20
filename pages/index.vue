<template>
  <v-container>
	  <v-card>
		  <v-card-title>Try quill by cdn</v-card-title>
		  <v-divider></v-divider>
		  <v-form>
			  <v-text-field
			  label="Field 1"
			  v-model="field1"
			  ></v-text-field>
			  <v-text-field
			  label="Field 2"
			  v-model="field2"
			  ></v-text-field>

			  <div id="editor"></div>
		  </v-form>
	  </v-card>
  </v-container>
</template>

<script>
import { Quill } from 'quill'

export default {
  	name: 'IndexPage',
	data() {
		return {
			field1: "",
			field2: "",
		}
	},
	mounted() {
		var quill = new Quill('#editor', {
			modules: {
				// Equivalent to { toolbar: { container: '#toolbar' }}
				toolbar: '#toolbar'
			}
		});
	}
}
</script>
