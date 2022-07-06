<template>
	<or-input 
		v-bind="props"
		type="number"
		v-model="currentValue"
		@keypress="onNumberInput"
	/>
</template>

<script lang="ts" setup>
import { Size, InputState } from "@/types";
import { onMounted, ref } from "vue";

const props = withDefaults(defineProps<{
	modelValue?: number;
	size?: Size;
	afterIcon?: string;
	beforeIcon?: string;
	prefix?: string;
	suffix?: string;
	clear?: boolean;
	state?: InputState;
}>(), {
	modelValue: 0,
	size: Size.SM,
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: number): void
}>()

const currentValue = ref<string | number>(0);

const onNumberInput = (e: KeyboardEvent): void => {
	const value = parseInt(e.key);

	if (isNaN(value)) {
		e.preventDefault();
		return;
	}

	emit('update:modelValue', value);
}

onMounted(() => {
	if (props.modelValue) {
		currentValue.value = props.modelValue;
	}
})
</script>