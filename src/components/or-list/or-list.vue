<template>
	<ul class="or-list">
		<li class="or-list-header">
			<slot name="header"></slot>
		</li>
		<component
			v-for="(slot, index) in featuredSlots"
			:key="index"
			:is="slot"
			@item-check="addModelValue"
			@item-uncheck="removeModelValue"
		></component>
		<li class="or-list-footer">
			<slot name="footer"></slot>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useDefaultSlots from "@/utilities/use-default-slots";
import { OrListItem } from '.';

const props = defineProps<{
	modelValue?: unknown[];
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', value: unknown): void
}>()

const slots = useDefaultSlots();

const featuredSlots = computed(() => {
	if (slots.length === 0) return [];

	return slots.filter(slot => slot.type === OrListItem);
}) 

const addModelValue = (value: unknown) => {
	if (!props.modelValue) return;

	const mvClone: unknown[] = JSON.parse(JSON.stringify(props.modelValue));

	if (value) mvClone.push(value)

	emit('update:modelValue', mvClone);
}

const removeModelValue = (value: unknown) => {
	const mvClone: unknown[] = JSON.parse(JSON.stringify(props.modelValue));
	const valueString = JSON.stringify(value);

	if (JSON.stringify(mvClone).includes(valueString)) {
		const index = mvClone.findIndex(v => JSON.stringify(v) === valueString)
	
		if (index > -1) {
			mvClone.splice(index, 1)
		}
	}

	emit('update:modelValue', mvClone);
}
</script>

<style lang="scss" scoped>
.or-list {
	border: 1px solid var(--color-gray-2);
	overflow: hidden;
	border-radius: var(--radius-1);

	&-header, &-footer {
		padding: 10px;
	}
}
</style>