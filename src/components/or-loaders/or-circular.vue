<template>
	<div class="or-loader-wrapper">
		<slot name="top" v-if="topText"><p class="or-loader-text top">{{ topText }}</p></slot>
		<div 
			class="or-loader or-loader-circular" 
			:style="loaderStyle"
			:class="[ticking ? 'tick' : 'smooth' ]"
		>
		</div>
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
	ticking?: boolean;
}>(), {
	dimension: 30,
	borderWidth: 3,
	topText: '',
	bottomText: '',
	ticking: false
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
	position: relative;
	display: inline-flex;
	flex-direction: column;
	align-items: center;
}

.or-loader {
	border: 2px solid var(--color-gray-3);
	border-radius: 999px;
	border-top-color: var(--color-primary);

	&.smooth {
		animation: spin 1s linear infinite;
	}

	&.tick {
		animation: spin 1s infinite steps(4);
	}
}

@keyframes spin {
	to {
		transform: rotateZ(360deg);
	}
}

.or-loader-text {
	text-align: center;

	&.top {
		margin-bottom: 0.5em;
	}

	&.bottom {
		margin-top: 0.5em;
	}
}
</style>