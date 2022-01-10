<template>
	<div class="or-input-wrapper" v-bind="$attrs" :class="[size]">
		<slot name="before">
			<span class="or-input-position-icons before" :class="[getSize]" v-if="beforeIcon">
				<i  :class="`ri-${beforeIcon}`"></i>
			</span>
		</slot>
		<input type="text" class="or-input" v-bind="$attrs" ref="input" @input="onTextInput" :class="[getSize]">
		<slot name="after">
			<span data-testid="after-icon" class="or-input-position-icons after" :class="[getSize]" @click="onAfterSlotClick" v-if="clear || afterIcon">
				<template v-if="clear">
					<i :class="`ri-close-line ri-${size}`"></i>
				</template>
				<template v-else>
					<i v-if="afterIcon" :class="`ri-${afterIcon} ri-${size}`"></i>
				</template>
			</span>
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
	modelValue?: string;
	size?: Size;
	afterIcon?: string;
	beforeIcon?: string;
	clear?: boolean;
}>(), {
	modelValue: '',
	size: Size.SM,
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

const onAfterSlotClick = (): void => {
	if (props.clear) emit('update:modelValue', '');
}

onMounted(() => {
	if (input.value) {
		input.value.value = props.modelValue;
	}

	emit('update:modelValue', props.modelValue);
})
</script>

<style lang="scss" scoped>
@import "@/scss/utilities.scss";

@include min-height-size(".or-input-wrapper");

.or-input-position-icons {
	display: inline-flex;
	margin: auto; 
	color: #b8bac2;
	&.after {
		padding-left: 0;
	}
	&.before {
		padding-right: 0;
	}
}

.or-input {
	display: inline-flex;
	width: 100%;
	flex-grow: 1;
}

.or-input-wrapper {
	display: inline-flex;
	border: 1px solid var(--border-color-1);
	background-color: var(--color-gray-3);
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
		background-color: transparent;

		&::placeholder {
			font-size: 1rem;
		}

		&:focus {
			outline: none;
		}
	}
}
</style>