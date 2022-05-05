<template>
	<ul>
		<slot>
		</slot>
	</ul>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useDefaultSlots from "@/utilities/use-default-slots";
import { emitter } from '@/utilities/use-shared-event';
import { Events } from '.';

const props = defineProps<{
	draggable?: boolean; 
	modelValue?: unknown[];
}>()

const emit = defineEmits<{
	(event: 'update:modelValue', value: unknown): void
}>()

const slots = useDefaultSlots();

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

onMounted(() => {
	// expecting emission to come from "or-item-label" checkbox
	emitter.on(
		Events.ITEM_CHECK,
		(value: unknown) => {
			addModelValue(value)
		}
	)

	emitter.on(
		Events.ITEM_UNCHECK,
		(value: unknown) => {
			removeModelValue(value);
		}
	)
})
</script>

<style lang="scss" scoped>
.or-list {
	border: 1px solid var(--color-gray-2);
	overflow: hidden;
	border-radius: var(--radius-1);

	.or-list-item {
		border-bottom: 1px solid var(--color-gray-2);
		padding: 1em;

		&:last-of-type {
			border-bottom: none;
		}

		p:first-of-type {
			margin-top: 0;
			margin-bottom: 0.5em;
		}

		p:last-of-type {
			color: var(--text-color-2);
			font-size: 14px;
			margin-top: 1em;
			margin-bottom: 0;
		}
	}
}
</style>