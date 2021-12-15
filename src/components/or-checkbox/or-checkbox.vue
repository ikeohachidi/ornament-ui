<template>
	<input 
		class="or-checkbox-input"
		type="checkbox" 
		:id="inputElementId"
		ref="checkboxElement"
		v-bind="$attrs"
		@change="onCheckboxValueChange"
	>
	<label v-if="isSwitch" class="or-switch" :for="inputElementId"></label>

	<label class="or-checkbox-label" v-else :for="inputElementId">
		<span class="or-checkbox"></span>
		<slot></slot>
	</label>
</template>

<script setup lang="ts">
import { computed, onMounted,ref } from 'vue';

const props = defineProps<{
	modelValue: unknown;
	value: unknown;
	uncheckedValue?: unknown;
	isSwitch?: boolean;
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

const onCheckboxValueChange = (event: InputEvent) => {
	const element = event.target as HTMLInputElement; 
	
	updatePrimitiveModel(element);
	updateArrayModel(element);
}

onMounted(() => {
	if (modelType.value === 'primitive') {
		if (checkboxElement.value && props.modelValue === (props.value)) {
			checkboxElement.value.checked = true;
		}

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
	@apply hidden;

	&:checked + {
		.or-checkbox-label .or-checkbox {
			@apply or-bg-primary;
		}

		.or-checkbox-label .or-checkbox:before {
			content: '';
		}

		.or-switch {
			@apply or-bg-primary;
		}

		.or-switch:before {
			@apply bg-white;
			left: calc(96% - ($size - 6px));
		}
	} 
}

.or-checkbox-label {
	@apply flex items-center;
}

.or-switch {
	height: $size;
	width: $size * 2;
	@apply border rounded-full border-gray-200 inline-block relative bg-gray-100;
	@apply flex content-center items-center;
	@apply transition-all;

	&:before {
		content: "";
		height: $size - 6px;
		width: $size - 6px;
		@apply rounded-full bg-white inline-block absolute;
		left: 3px;
		transition: left .2s linear;
	}
}

.or-checkbox {
	height: $size;
	width: $size;
	@apply bg-white border border-gray-200 inline-block mr-1 relative;
	@apply flex items-center justify-center;

	&:before {
		display: inline-block;
		height: 6px;
		width: 10px;
		top: 4px;
		border: 2px solid #fff;
		transform: rotateZ(-52deg);
		@apply border-r-0 border-t-0 absolute;
	}
}
</style>