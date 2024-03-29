<template>
	<div class="or-input-wrapper" v-bind="$attrs" :class="[size, state]">
		<slot name="prefix">
			<span class="or-input-position" :class="[getSize, prefix && 'prefix']" v-if="beforeIcon || prefix">
				<i :class="`ri-${beforeIcon}`" v-if="beforeIcon"></i>
				{{ prefix }}
			</span>
		</slot>
		<input
			type="text"
			class="or-input"
			v-bind="$attrs"
			ref="input"
			v-model="inputValue"
			:class="[getSize]"
		>
		<slot name="suffix">
			<span
				data-testid="after-icon"
				class="or-input-position"
				:class="[getSize]"
				v-if="clear"
				@click="clearInput"
			>
				<i :class="`ri-close-line ri-${size}`"></i>
			</span>
			<span
				class="or-input-position"
				:class="[getSize, suffix && 'suffix']"
				v-else-if="afterIcon || suffix"
			>
				<i :class="`ri-${afterIcon} ri-${size}`"></i>
				{{ suffix }}
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
import { ref, computed, watch } from "vue";
import { Size, Sizes, InputState } from '@/types';

const props = withDefaults(defineProps<{
	modelValue?: string;
	size?: Size;
	afterIcon?: string;
	beforeIcon?: string;
	prefix?: string;
	suffix?: string;
	clear?: boolean;
	state?: InputState;
}>(), {
	modelValue: '',
	size: Size.SM,
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()

const input = ref<HTMLInputElement>();

const inputValue = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
	}
})

watch(input, (el) => {
	if (el) {
		el.value = props.modelValue
	}
})

const getSize = computed(() => {
	if (props.size === Size.MD) { return Sizes.md }
	if (props.size === Size.LG) { return Sizes.lg }

	return Sizes.sm;
})

const clearInput = (): void => {
	if (input.value) input.value.value = '';
	if (props.clear) emit('update:modelValue', '');
}
</script>

<style lang="scss" scoped>
@import "@/scss/utilities.scss";

.or-input-position {
	display: inline-flex;
	align-self: stretch;
	align-items: center;
	color: var(--text-color-2);

	&.prefix, &.suffix {
		background-color: var(--color-gray-2);
	}
}

.or-input {
	display: inline-flex;
	width: 100%;
	flex-grow: 1;
}

@include min-height-size(".or-input-wrapper");

.or-input-wrapper {
	display: inline-flex;
	border: 1px solid var(--border-color-1);
	border-radius: var(--radius-1);
	box-sizing: border-box;
	box-shadow: none;
	transition: .05s;

	&:focus-within {
		box-shadow: inset 0px 0px 0px 1px var(--color-primary);

		&.error {
			box-shadow: inset 0px 0px 0px 1px var(--color-danger);
		}

		&.success {
			box-shadow: inset 0px 0px 0px 1px var(--color-success);
		}
	}

	&:not([disabled]):hover {
		box-shadow: inset 0px 0px 0px 1px var(--hover-ring-color);
	}

	&[disabled] {
		background-color: var(--color-gray-3);
	}

	&.error {
		border: 1px solid var(--color-danger);
	}

	&.success {
		border: 1px solid var(--color-success);
	}

	.or-input {
		font-size: 1rem;
		border: none;
		background-color: transparent;

		&::placeholder {
			font-size: 1rem;
		}

		&[disabled] {
			color: var(--color-gray-1);
		}

		&:focus {
			outline: none;
		}
	}
}
</style>