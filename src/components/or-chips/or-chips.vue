<template>
	<ul class="or-chips flex">
		<li v-for="(value, index) in modelValue" class="or-chip center py-1 px-2 ml-2 mb-2" :key="index">
			<slot name="item" :value="value">
				{{ value }}
			</slot>
			<i class="close ri-close-line ml-1" v-if="removeable" @click="removeItem(index)"></i>
		</li>
	</ul>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
	modelValue: unknown[],
	removeable?: boolean
}>(), {
	removeable: false 
})

const emits = defineEmits<{
	(event: "update:modelValue", value: unknown): void;
}>()

const removeItem = (index: number) => {
	const model = [...props.modelValue];

	model.splice(index, 1);

	emits("update:modelValue", model);
}
</script>

<style scoped lang="scss">
.or-chip {
	background-color: var(--color-gray-2);
	border: 1px solid var(--color-gray-3);
	border-radius: 999px;
	color: var(--text-color-1);

	.close {
		cursor: pointer;
		color: var(--color-gray-1);
	}

	&:first-of-type {
		margin-left: 0;
	}
}
</style>