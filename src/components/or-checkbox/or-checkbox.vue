<template>
	<input 
		class="or-checkbox-input"
		type="checkbox" 
		:id="inputElementId"
		ref="checkboxElement"
		v-bind="$attrs"
		@change="onCheckboxValueChange"
	>
	<label v-if="switch" class="or-switch center jc-center" :for="inputElementId"></label>

	<label class="or-checkbox-label center" v-else :for="inputElementId">
		<span class="or-checkbox center jc-center"></span>
		<slot></slot>
	</label>
</template>

<script setup lang="ts">
import { computed, onMounted,ref } from 'vue';

const props = defineProps<{
	modelValue: unknown;
	value: unknown;
	uncheckedValue?: unknown;
	switch?: boolean;
}>()

const modelType = computed(() => {
	return typeof props.modelValue === "object" ? "array" : "primitive";
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: unknown): void;
}>()

const inputElementId = computed(() => {
	return `or-checkbox-${Date.now()}`;
})

const checkboxElement = ref<HTMLInputElement>();

const updateArrayModel = (element: HTMLInputElement) => {
	if (modelType.value !== "array") return;

	const arr = [...props.modelValue as unknown[]];

	if (element.checked) {
		if (props.uncheckedValue !== undefined) {
			const index = arr.findIndex(item => JSON.stringify(item) === JSON.stringify(props.uncheckedValue));

			if (index >= 0) {
				arr.splice(index, 1);
			}
		}

		arr.push(props.value);
	} else {
		const index = arr.findIndex(item => JSON.stringify(item) === JSON.stringify(props.value));

		if (index >= 0) {
			arr.splice(index, 1);
		}

		if (props.uncheckedValue !== undefined) {
			arr.push(props.uncheckedValue);
		}
	}

	emit('update:modelValue', arr);
}

const updatePrimitiveModel = (element: HTMLInputElement) => {
	if (modelType.value !== 'primitive') return;

	let value;

	if (element.checked) {
		value = props.value;
	} else {
		value = props.uncheckedValue ?? '';
	}
	emit('update:modelValue', value);
}

const onCheckboxValueChange = (event: Event) => {
	const element = event.target as HTMLInputElement; 
	
	updatePrimitiveModel(element);
	updateArrayModel(element);
}

onMounted(() => {
	if (checkboxElement.value && props.modelValue === (props.value)) {
		checkboxElement.value.checked = true;
		return;
	}

	// modelType is an array
	const index = (props.modelValue as unknown[])
		.findIndex(item => JSON.stringify(item) === JSON.stringify(props.value));

	if (index >= 0 && checkboxElement.value) {
		checkboxElement.value.checked = true;
	}
})
</script>

<style lang="scss" scoped>

$size: 20px;

.or-checkbox-input {
	display: none;

	&:checked + {
		.or-checkbox-label .or-checkbox {
			background-color: var(--color-primary);
			box-shadow: none;
		}

		.or-checkbox-label .or-checkbox:before {
			content: '';
		}

		.or-switch {
			background-color: var(--color-primary);
		}

		.or-switch:before {
			background-color: #fff;
			left: calc(96% - ($size - 5px));
		}
	} 
}

.or-switch {
	cursor: pointer;
	height: $size;
	width: $size * 2;
	border-radius: 999px;
	box-shadow: 0px 0px 0px 1px var(--color-gray-2);
	display: inline-block;
	position: relative;
	background: var(--color-gray-3);
	transition: .2s;

	&:before {
		content: "";
		height: $size - 6px;
		width: $size - 6px;
		border-radius: 999px;
		background-color: #fff;
		display: inline-block;
		position: absolute;
		top: 3px;
		left: 3px;
		transition: left .2s linear;
	}
}

.or-checkbox {
	cursor: pointer;
	height: $size;
	width: $size;
	background: var(--color-gray-3);
	position: relative;
	margin: 3px 4px 3px 0;
	border-radius: var(--radius-1);
	box-shadow: 0px 0px 0px 1px var(--color-gray-2);
	transition: .2s;

	&:before {
		display: inline-block;
		height: 4px;
		width: 8px;
		position: absolute;
		top: 5px;
		border: 2px solid #fff;
		border-right: none;
		border-top: none;
		transform: rotateZ(-45deg);
	}
}
</style>