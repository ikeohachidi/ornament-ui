<template>
	<span v-for="(value, index) in modelValue" class="or-chip" :key="index">
		<slot name="item" :value="value">
			{{ value }}
		</slot>
		<i class="close ri-close-line ml-1" v-if="removeable" @click="removeItem(index)"></i>
	</span>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
	modelValue: unknown[],
	removeable?: boolean
}>(), {
	removeable: false 
})

const emit = defineEmits<{
	(event: "update:modelValue", value: unknown): void;
	(event: "item-removed", value: number): void;
}>()

const removeItem = (index: number) => {
	const model = [...props.modelValue];

	model.splice(index, 1);

	emit("item-removed", index);
	emit("update:modelValue", model);
}
</script>

<style scoped lang="scss">
.or-chip {
	list-style: none;
	display: inline-flex;
	background-color: var(--color-gray-2);
	border: 1px solid var(--color-gray-3);
	border-radius: 999px;
	font-size: 14px;
	color: var(--text-color-1);
	margin-left: .5rem;
	padding: 5px 10px;

	.close {
		cursor: pointer;
		color: var(--color-gray-1);
	}

	&:first-of-type {
		margin-left: 0;
	}
}
</style>