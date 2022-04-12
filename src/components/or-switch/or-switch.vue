<template>
	<input 
		type="checkbox"
		class="or-switch-input"
		data-testid="or-switch-input"
		:id="inputElementId"
		v-bind="$attrs"
		ref="checkbox"
		@change="onInputValueChange"
	>
	<label 
		class="or-switch center jc-center"
		data-testid="or-switch"
		:for="inputElementId"
	>
	</label>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

type ModelValueType = boolean | string | number | unknown[];

const props = withDefaults(defineProps<{
	modelValue: ModelValueType;
	checkedValue?: boolean,
	uncheckedValue?: boolean,
}>(), {
	checkedValue: true,
	uncheckedValue: undefined 
})

const emit = defineEmits<{
	(event: 'update:modelValue', value: ModelValueType): void;
}>()

const checkbox = ref<HTMLInputElement>();

const inputElementId = computed(() => {
	return `or-switch-${Date.now()}`;
})

const modelType = computed<'array' | 'primitive'>(() => {
	if (props.modelValue.constructor === Array) {
		return 'array'
	}

	return 'primitive';
})

const isSelected = computed(() => {
	return JSON.stringify(props.modelValue).includes(JSON.stringify(props.checkedValue));
})

const onInputValueChange = (e: InputEvent) => {
	const target = e.target as HTMLInputElement;

	if (target.checked) {
		emit('update:modelValue', additionValue());
	} else {
		emit('update:modelValue', removedValue());
	}
}

const additionValue = () => {
	if (modelType.value === 'array') {
		const newVal = [...props.modelValue as unknown[]];

		if (props.uncheckedValue) {
			const uncheckedValueIndex = newVal.findIndex(value => JSON.stringify(value) === JSON.stringify(props.uncheckedValue));

			if (uncheckedValueIndex !== -1) {
				newVal.splice(uncheckedValueIndex, 1)
			}
		}

		newVal.push(props.checkedValue)

		return newVal;
	}

	return props.checkedValue;
}

const removedValue = () => {
	if (modelType.value === 'array') {
		const filteredModel = [
			...(props.modelValue as unknown[]).filter(value => {
				return JSON.stringify(value) !== JSON.stringify(props.checkedValue);
			})
		]

		if (props.uncheckedValue) {
			filteredModel.push(props.uncheckedValue)
		}

		return filteredModel;
	}

	return props.uncheckedValue ?? false;
}

onMounted(() => {
	if (isSelected.value && checkbox.value) {
		checkbox.value.checked = true;
	}
})
</script>

<style lang="scss" scoped>
$size: 20px;

.or-switch-input {
	display: none;

	&:checked + {
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
</style>