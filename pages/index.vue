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
		  </v-form>
	  </v-card>
  </v-container>
</template>

<script>
export default {
  	name: 'IndexPage',
	data() {
		return {
			field1: "",
			field2: "",
		}
	}
}
</script>
