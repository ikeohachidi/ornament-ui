<template>
	<div class="or-avatar-wrapper" :style="[wrapperStyle]">
		<div class="or-avatar-img" :style="[imgBoxStyle]">
			<img :src="img" :alt="text + ' avatar'" v-if="img">
			<p v-else>{{ initials }}</p>
		</div>
		<p class="or-avatar-text">
			<slot name="text">{{ text }}</slot>
		</p>
	</div>	
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Size, RadiusSize } from '@/types/Size'
import { Position } from '@/types/Position'

const props = withDefaults(defineProps<{
	dimension: number;
	rounded: boolean;
	img: string;
	cornerRadius: Size;
	textPosition: Position;
	text: string;
}>(), {
	dimension: 40,
	rounded: false,
	img: '',
	cornerRadius: Size.SM,
	textPosition: Position.BOTTOM,
	text: ''
})

const wrapperStyle = computed(() => {
	let direction = "row";

	switch (props.textPosition) {
		case Position.LEFT:
			direction = 'row-reverse';
			break;
		case Position.TOP:
			direction = 'column-reverse';
			break;
		case Position.BOTTOM:
			direction = 'column';
	}	

	return {
		'flexDirection': direction,
	}
})

const imgBoxStyle = computed(() => {
	return {
		'height': `${props.dimension}px`,
		'width': `${props.dimension}px`,
		'borderRadius': props.rounded ? '999999px' : RadiusSize[props.cornerRadius],
		'fontSize': `${props.dimension / 2}px`
	}
})

const initials = computed(() => {
	const [firstName, lastName] = props.text.split(' ');

	return `${firstName[0] || ''} ${lastName[0] || ''}`;
})
</script>

<style scoped lang="scss">
.or-avatar-wrapper {
	@apply flex items-center;
}

.or-avatar-img {
	@apply flex items-center justify-center overflow-hidden uppercase;
	@apply bg-gray-300 text-white;

	img {
		@apply h-full w-full;
		@apply object-cover object-center;
	}
}

.or-avatar-text {
	@apply p-3;
}
</style>