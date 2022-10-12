<template>
	<button 
		v-bind="$attrs" 
		:class="[size, getSize]" 
		ref="buttonEl"
		:style="{ minWidth: btnSize }"
	>
		<template v-if="isLoading">
			<or-pulsing-loader ref="loader" v-if="loader === 'pulse'" box-color="#b0b0b0" :dimension="9" :rounded="true"/>
			<or-circular-loader ref="loader" v-if="loader === 'circular'" :dimension="9" :rounded="true"/>
		</template>
		<slot v-else></slot>
	</button>
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue';
import { useTheme } from '@/utilities';
import { Size, Sizes, injectionKey } from '@/types';
import { OrPulsingLoader, OrCircularLoader } from '../or-loaders';

const { defaultTheme } = useTheme();

const props = withDefaults(defineProps<{
	isLoading?: boolean;
	size?: Size;
	loader?: 'pulse' | 'circular',
}>(), {
	isLoading: false,
	size: Size.SM,
	loader: 'pulse'
})

const buttonEl = ref<HTMLButtonElement>();

const btnSize = computed(() => {
	if (buttonEl.value) {
		const width = getComputedStyle(buttonEl.value).width;
		return width;
	}
	return 0;
})

const getSize = computed(() => {
	if (props.size === Size.MD) { return Sizes.md }
	if (props.size === Size.LG) { return Sizes.lg }

	return Sizes.sm;
})
</script>

<style lang="scss" scoped>
@import "@/scss/color.scss";
@import "@/scss/utilities.scss";

$profiles: danger, success, info;

$primary: v-bind('defaultTheme.primary');

@include min-height-size("button");

button {
	background: $primary;
	border: 1px solid var(--color-primary);
	font-size: 1rem;
	border-radius: var(--radius-1);
	color: #fff;
	cursor: pointer;
	transition: .2s;
	display: inline-flex;
	justify-content: center;
	align-items: center;


	@each $profile in $profiles {
		&.#{$profile} {
			border: none;
			background-color: var(--color-#{$profile});
			color: #fff;
		}

		&.outline.#{$profile}, &.text.#{$profile} {
			color: var(--color-#{$profile});
		}

		&.outline.#{$profile} {
			color: var(--color-#{$profile});
			border: 1px solid var(--color-#{$profile});
		}
	}

	&.outline {
		color: var(--text-color-1);
		background: transparent;
	}

	&.text {
		color: var(--text-color-1);
		border: none;
		background-color: transparent;

		&.danger:hover {
			background-color: #e74d3c18;
		}
		&.success:hover {
			background-color: #2ecc7118;
		}
		&.info:hover {
			background-color: #3498db18;
		}
	}

	&:disabled {
		background-color: var(--color-gray-2);
		border: 1px solid var(--color-gray-1);
		&:disabled:hover {
			background-color: var(--color-gray-2) !important;
		}
	}
}
</style>