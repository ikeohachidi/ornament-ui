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
import { computed, ref } from 'vue';
import { useTheme, useStyles } from '@/components/theme-provider';
import { Size, Sizes } from '@/types';
import type { ButtonOptions } from '.';
import { OrPulsingLoader, OrCircularLoader } from '../or-loaders';

const { defaultTheme, componentTheme } = useTheme<ButtonOptions>('Button');

const styles = useStyles(componentTheme, defaultTheme);

const props = withDefaults(defineProps<{
	isLoading?: boolean
	size?: Size
	loader?: 'pulse' | 'circular'
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
@use "sass:list";
@use "sass:map";

@import "@/scss/theme.scss";
@import "@/scss/color.scss";
@import "@/scss/utilities.scss";

@include min-height-size("button");


$primaryBg: v-bind('styles.primaryBg');
$primaryTextColor: v-bind('styles.primaryTextColor');

button {
	background: v-bind('styles.primaryBg');
	border: 1px solid v-bind('styles.primaryBg');
	font-size: 1rem;
	border-radius: var(--radius-1);
	color: v-bind('styles.primaryTextColor');
	cursor: pointer;
	transition: .2s;
	display: inline-flex;
	justify-content: center;
	align-items: center;

	@each $profile in $theme-profile-map {
		$kind: map.get($profile, "kind");
		$bg: map.get($profile, "bg");
		$textColor: map.get($profile, "textColor");

		&.#{$kind} {
			border: none;
			background-color: $bg;
			color: $textColor;
		}

		&.outline.#{$kind}, &.text.#{$kind} {
			color: $bg;
		}

		&.outline.#{$kind} {
			color: $bg;
			border: 1px solid $bg;
		}
	}

	&.outline {
		color: $primaryBg;
		background: transparent;
	}

	&.text {
		color: var(--text-color-1);
		border: none;
		background: transparent;

		&.danger:hover {
			background: #e74d3c18;
		}
		&.success:hover {
			background: #2ecc7118;
		}
		&.info:hover {
			background: #3498db18;
		}
	}

	&:disabled {
		background: var(--color-gray-2);
		border: 1px solid var(--color-gray-1);
		&:disabled:hover {
			background: var(--color-gray-2) !important;
		}
	}
}
</style>