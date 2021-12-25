<template>
	<button v-bind="$attrs" :class="[getSize]" :disabled="isLoading">
		<or-pulsing-loader v-if="isLoading" box-color="#b0b0b0" :dimension="9" :rounded="true"/>
		<slot v-else></slot>
	</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Size, Sizes } from '@/types/Size';

const props = withDefaults(defineProps<{
	isLoading?: boolean;
	size?: Size;
}>(), {
	isLoading: false,
	size: Size.SM 
})

const getSize = computed(() => {
	if (props.size === Size.MD) { return Sizes.md }
	if (props.size === Size.LG) { return Sizes.lg }

	return Sizes.sm;
})
</script>

<style lang="scss" scoped>
@import "@/scss/color.scss";
$profiles: danger, success, info;

button {
	background: var(--color-primary);
	border: 1px solid var(--color-primary);
	font-size: 1rem;
	border-radius: var(--radius-1);
	color: #fff;
	cursor: pointer;
	transition: .2s;
	display: inline-flex;
	justify-content: center;

	&:disabled {
		background-color: var(--color-gray-2);
		border: 1px solid var(--color-gray-1);
		padding: 0.8em;
	}

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

}
</style>