<template>
	<div>
		<div style="width: 100%">
			<or-checkbox v-model="users" value="Francis">Francis</or-checkbox>
			<or-checkbox v-model="users" value="Jerry">Jerry</or-checkbox>
		</div>
		users: {{ users }}
	</div> 
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const users = ref([]);

const val = ref({ label: 'Excellent', value: 'A+' })
const vals = ref([
	{ label: 'Excellent', value: 'A+' },
	{ label: 'Good', value: 'B+' },
	{ label: 'Okay', value: 'C+' },
	{ label: 'Poor', value: 'D+' },
	{ label: 'Damn Son!', value: 'F+' },
])

const logIt = (s: object) => {
	console.log('s', s)
}

</script>