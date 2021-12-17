<template>
	<div class="or-input-wrapper flex center" :class="[getSize]">
		<slot name="before">
			<i v-if="beforeIcon" :class="`ri-${beforeIcon}`"></i>
		</slot>
		<input type="text" class="or-input grow" v-bind="$attrs" ref="input" @input="onTextInput">
		<slot name="after">
			<i v-if="afterIcon" :class="`ri-${afterIcon}`"></i>
		</slot>
	</div>
</template>

<script lang="ts">
export default {
	inheritAttrs: false
} 
</script>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { Size, Sizes } from '@/types/Size';

const props = withDefaults(defineProps<{
	modelValue?: string
	size?: Size
	afterIcon?: string
	beforeIcon?: string
}>(), {
	modelValue: '',
	size: Size.SM
})

const watch_modelValue = watch(
	() => props.modelValue,
	(value) => {
		if (value !== input.value!.value) {
			input.value!.value = value;
		}
}) 

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()

const input = ref<HTMLInputElement>();

const getSize = computed(() => {
	if (props.size === Size.MD) { return Sizes.md }
	if (props.size === Size.LG) { return Sizes.lg }

	return Sizes.sm;
})

const onTextInput = (event: Event): void => {
	const { value } = (event.target as HTMLInputElement);

	emit('update:modelValue', value)
}

onMounted(() => {
	if (input.value) {
		input.value.value = props.modelValue;
	}

	emit('update:modelValue', props.modelValue);
})
</script>

<style lang="scss" scoped>
.or-input-wrapper {
	border: 1px solid var(--border-color-1);
	border-radius: var(--radius-1);
	box-shadow: none;
	transition: .2s;

	&:focus-within {
		box-shadow: inset 0px 0px 0px 1px var(--color-primary);
	}

	&:hover {
		box-shadow: inset 0px 0px 0px 1px var(--hover-ring-color);
	}

	.or-input {
		font-size: 1rem;
		border: none;

		&::placeholder {
			font-size: 1rem;
		}

		&:focus {
			outline: none;
		}
	}
}
</style>