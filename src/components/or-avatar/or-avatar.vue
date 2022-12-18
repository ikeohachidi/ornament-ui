<template>
	<div class="or-avatar-wrapper flex center" :style="[wrapperStyle]">
		<div class="or-avatar-img flex center jc-center" :style="[imgBoxStyle]">
			<img :src="img" :alt="text + ' avatar'" v-if="img">
			<p v-else>{{ initials }}</p>
		</div>
		<p class="or-avatar-text p-1 m-0" v-if="showText && text">
			<slot name="text">{{ text }}</slot>
		</p>
	</div>	
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'
import { Size, RadiusSize } from '@/types/Size'
import { Position } from '@/types/Position'
import { useTheme } from '@/components/theme-provider';

const props = withDefaults(defineProps<{
	dimension?: number;
	rounded?: boolean;
	img?: string;
	cornerRadius?: Size;
	textPosition?: Position;
	text?: string;
	showText?: boolean;
}>(), {
	dimension: 40,
	rounded: false,
	img: '',
	cornerRadius: Size.SM,
	textPosition: Position.BOTTOM,
	text: '',
	showText: true
});

const theme = useTheme('Avatar');

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
	} as CSSProperties
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

	return `${firstName[0] || ''}${lastName[0] || ''}`;
})
</script>

<style scoped lang="scss">
.or-avatar-img {
	background-color: v-bind('theme.backgroundSecondary');
	color: v-bind('theme.textSecondary');
	overflow: hidden;
	text-transform: uppercase;

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
	}
}
</style>