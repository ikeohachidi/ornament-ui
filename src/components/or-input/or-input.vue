<template>
	<div class="or-input-wrapper" v-bind="$attrs" :class="[size, state]">
		<slot name="prefix">
			<span class="or-input-position" :class="[getSize, prefix && 'prefix']" v-if="beforeIcon || prefix">
				<i :class="`ri-${beforeIcon}`" v-if="beforeIcon"></i>
				{{ prefix }}
			</span>
		</slot>
		<input type="text" class="or-input" v-bind="$attrs" ref="input" @input="onTextInput" :class="[getSize]">
		<slot name="suffix">
			<span data-testid="after-icon" class="or-input-position" :class="[getSize]" v-if="clear" @click="clearInput">
				<i :class="`ri-close-line ri-${size}`"></i>
			</span>
			<span class="or-input-position" :class="[getSize, suffix && 'suffix']" v-else-if="afterIcon || suffix">
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
import { onMounted, ref, computed } from "vue";
import { useTheme } from "../theme-provider";
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
});

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>();

const theme = useTheme('Input');

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

const clearInput = (): void => {
	if (input.value) input.value.value = '';
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

.or-input-position {
	display: inline-flex;
	align-self: stretch;
	align-items: center;
	color: v-bind('theme.textSecondary');

	&.prefix, &.suffix {
		background-color: v-bind('theme.backgroundSecondary');
		position: relative;
		z-index: -1;
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
	border: 1px solid v-bind('theme.borderPrimary');
	border-radius: var(--radius-1);
	box-sizing: border-box;
	box-shadow: none;
	transition: .05s;

	&:focus-within {
		box-shadow: inset 0px 0px 0px 1px v-bind('theme.primaryBg');

		&.error {
			box-shadow: inset 0px 0px 0px 1px v-bind('theme.dangerBg');
		}

		&.success {
			box-shadow: inset 0px 0px 0px 1px v-bind('theme.successBg');
		}
	}

	&.success:hover {
		box-shadow: inset 0px 0px 0px 1px v-bind('theme.successBg');
	}

	&.error:hover {
		box-shadow: inset 0px 0px 0px 1px v-bind('theme.dangerBg');
	}

	&:not(.error, .success, [disabled]):hover {
		box-shadow: inset 0px 0px 0px 1px v-bind('theme.primaryBg');
	}

	&[disabled] {
		background-color: v-bind('theme.disabledBg');
	}

	&.error {
		border: 1px solid v-bind('theme.dangerBg');
	}

	&.success {
		border: 1px solid v-bind('theme.successBg');
	}

	.or-input {
		font-size: 1rem;
		border: none;
		background-color: transparent;

		&::placeholder {
			font-size: 1rem;
		}

		&[disabled] {
			color: v-bind('theme.disabledTextColor');
		}

		&:focus {
			outline: none;
		}
	}
}
</style>