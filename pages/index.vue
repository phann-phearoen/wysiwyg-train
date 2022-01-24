<template>
	<v-container>
		<v-card>
			<v-card-title>Try quill by cdn</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-form @submit.prevent="submit">
					<v-text-field
					label="Field 1"
					v-model="field1"
					outlined
					></v-text-field>
					<v-text-field
					label="Field 2"
					v-model="field2"
					outlined
					></v-text-field>

					<client-only>
						<tiptap />
					</client-only>

				</v-form>
			</v-card-text>
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
	},
	methods: {
		submit() {
			//kvjzhs
		}
	}
}
</script>
