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
button {
	@apply or-bg-primary or-border-radius; 
	@apply inline-flex justify-center;
	@apply text-white text-base border-0 cursor-pointer hover:bg-blue-800 transition-all duration-100;

	&:disabled {
		background-color: var(--color-gray);
		@apply py-3;
	}
}
</style>