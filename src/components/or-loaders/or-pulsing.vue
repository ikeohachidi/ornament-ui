<template>
	<div class="or-loader-wrapper">
		<span v-for="index in count" :key="index" class="or-pulsing" :style="[loaderStyle, {animationDelay: `${index * 0.2}s`}]">
		</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(defineProps<{
	dimension?: number;
	topText?: string;
	bottomText?: string;
	boxColor?: string;
	count?: number;
	rounded?: boolean;
}>(), {
	dimension: 15,
	boxColor: '#1F2937',
	topText: 'hello dark',
	bottomText: '',
	count: 4,
	rounded: false 
})

const loaderStyle = computed(() => {
	return {
		height: `${props.dimension}px`,
		width: `${props.dimension}px`,
		backgroundColor: `${props.boxColor}`,
		borderRadius: props.rounded ? '9999px' : '0'
	}
}) 
</script>

<style lang="scss" scoped>
.or-loader-wrapper {
	@apply flex;
}

.or-pulsing {
	@apply or-bg-primary mr-2;
	animation: pulse;
	animation-duration: .7s;
	animation-iteration-count: infinite;
	animation-fill-mode: both;
	animation-direction: alternate-reverse;

	&:last-of-type {
		@apply mr-0;
	}
}

@keyframes pulse {
	from {
		transform: scale(0);
	}
	to {
		transform: scale(1);
	}
}
</style>