<template>
	<div class="or-loader-wrapper">
		<slot name="top" v-if="topText"><p class="or-loader-text top">{{ topText }}</p></slot>
		<div class="or-loader or-loader-circular" :style="loaderStyle"></div>
		<slot name="bottom" v-if="bottomText"><p class="or-loader-text bottom">{{ bottomText }}</p></slot>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
	dimension?: number;
	borderWidth?: number;
	topText?: string;
	bottomText?: string;
}>(), {
	dimension: 30,
	borderWidth: 3,
	topText: '',
	bottomText: ''
})

const loaderStyle = computed(() => {
	return {
		height: `${props.dimension}px`,
		width: `${props.dimension}px`,
		borderWidth: `${props.borderWidth}px`
	}
}) 
</script>

<style lang="scss" scoped>
.or-loader-wrapper {
	@apply relative inline-flex flex-col items-center;
}

.or-loader {
	@apply border-2 rounded-full border-gray-200;
	@apply animate-spin;
	border-top-color: var(--color-primary);
}

.or-loader-text {
	@apply text-center;

	&.top {
		@apply mb-2;
	}

	&.bottom {
		@apply mt-2;
	}
}
</style>