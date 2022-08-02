<template>
	{{ m }}
	<div class="or-slider" ref="thumbWrapperEl">
		<div class="or-slider__thumb" @mousedown="onMouseDown" ref="thumbEl"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, unref, watch } from 'vue';

const props = withDefaults(defineProps<{
	modelValue: number,
	min: number,
	max: number,
}>(), {
	modelValue: 0,
	min: 0,
	max: 20
});

const emit = defineEmits<{
	(event: 'update:modelValue', value: number): void;
}>();

// last registered position of cursor 
let mousePosition = 0;
let thumbPosition = ref(0);

const thumbWrapperEl = ref<HTMLDivElement>();
const thumbWrapperElWidth = computed(() => {
	if (thumbWrapperEl.value) {
		return parseInt(getComputedStyle(thumbWrapperEl.value).width.replace('px', ''));
	}
	return 0;
});

const updateModelValue = () => {
	const thumbPositionPerc = (thumbPosition.value / thumbWrapperElWidth.value) * 100;
	// percentage position of the thumb on the wrapper
	const thumbPosPercOfWrapper = Math.round(thumbPositionPerc * (props.max / 100));
	emit('update:modelValue', thumbPosPercOfWrapper);
}

const thumbEl = ref<HTMLDivElement>();
const setThumbPosition = (position: number, x: number): void => {
	window.requestAnimationFrame(() => {
		if (thumbEl.value) {
			const marginLeft = thumbEl.value.style.marginLeft;
			const unit = 'px';
			// expecting that it'll have % at the end of it
			let marginLeftValue = Number(marginLeft.replace(unit, ''));

			// the difference between the last registered mouse position
			// and the present position. This is better than just adding
			// and subtracting 1 to the margin because depending on the
			// mouse move speed it may be greater than 1.
			const mouseDiff = x - mousePosition;
			const newThumbPosition = marginLeftValue + mouseDiff;


			if (newThumbPosition > 0 && newThumbPosition < thumbWrapperElWidth.value) {
				if (marginLeftValue === 0) {
					marginLeftValue++;
				} 
				// assume we are beginning from a mouseup
				// in order to avoid large space jank
				else if (mouseDiff > mousePosition) {
					marginLeftValue++;
				}
				else {
					marginLeftValue += mouseDiff;
				}
			}

			thumbEl.value.style.marginLeft = marginLeftValue + unit;
			thumbPosition.value = marginLeftValue;
			mousePosition = x;

			updateModelValue();
		}
	})
}

const onMouseMove = (event: MouseEvent): void => {
	if (event.x > mousePosition) {
		setThumbPosition(1, event.clientX);
	} 
	else if (event.x < mousePosition) {
		setThumbPosition(-1, event.clientX);
	}
}

const onMouseDown = (event: MouseEvent): void => {
	if (!thumbEl.value) return;

	document.body.addEventListener('mousemove', onMouseMove);
	document.body.addEventListener('mouseup', () => {
		mousePosition = 0;
	})
	removeListeners(document.body);
}

const removeListeners = (element: HTMLElement): void => {
	document.addEventListener('mouseup', () => {
		element.removeEventListener('mousemove', onMouseMove);
	});
}
</script>

<style lang="scss" scoped>
$size: 40px;

.or-slider {
	height: $size * 1.5;
	width: 100%;
	background-color: red;
	box-sizing: border-box;
	
	&__thumb {
		box-sizing: border-box;
		height: $size;
		width: $size;
		background-color: blue;
		transition: 0.01s;
	}
}
</style>