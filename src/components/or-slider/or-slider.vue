<template>
	<div class="or-slider" ref="thumbWrapperEl">
		<div class="or-slider__thumbs">
			<div
				class="or-slider__thumb"
				@mousedown="onMouseDown"
				ref="thumbEl"
			></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, unref, watch } from 'vue';

const props = withDefaults(defineProps<{
	modelValue: number,
	min?: number,
	max?: number,
	steps?: number
}>(), {
	modelValue: 0,
	min: 0,
	max: 20,
	steps: 5 
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

const singleStepPx = computed(() => {
	return thumbWrapperElWidth.value / props.steps;
});
const allStepsPx = computed(() => {
	const steps: number[] = [0];

	for (let i = 1; i <= props.steps; i++) {
		steps.push(singleStepPx.value * i);
	}

	return steps;
});

const updateModelValue = () => {
	const thumbPositionPerc = (thumbPosition.value / thumbWrapperElWidth.value) * 100;
	// percentage position of the thumb on the wrapper
	const thumbPosPercOfWrapper = Math.round(thumbPositionPerc * (props.max / 100));
	emit('update:modelValue', thumbPosPercOfWrapper);
}

const updateModelValueStep = (step: number) => {
	emit('update:modelValue', step);
}

const thumbEl = ref<HTMLDivElement>();
const currentThumbPosition = ref(0);
const globalTracker = ref(0);
const setThumbPosition = (position: number, x: number): void => {
	window.requestAnimationFrame(() => {
		if (thumbEl.value) {
			const leftPosition = thumbEl.value.style.left;
			const unit = 'px';
			// expecting that it'll have % at the end of it
			currentThumbPosition.value = Number(leftPosition.replace(unit, ''))

			// the difference between the last registered mouse position
			// and the present position. This is better than just adding
			// and subtracting 1 to the margin because depending on the
			// mouse move speed it may be greater than 1.
			const mouseDiff = x - mousePosition;
			const newThumbPosition = currentThumbPosition.value + mouseDiff;

			if (props.steps > 0) {
				if (globalTracker.value === 0 && currentThumbPosition.value === 0) {
					globalTracker.value += 2;
				}
				else if (globalTracker.value === 0) {
					globalTracker.value = currentThumbPosition.value;
				}
				else {
					globalTracker.value += mouseDiff;
				}

				const threshold = 5;

				for (let i = 0; i < allStepsPx.value.length; i++) {
					const step = allStepsPx.value[i];
					const from = step - threshold;
					const to = step + threshold;

					if (globalTracker.value >= from && globalTracker.value <= to) {
						if (props.modelValue !== i) {
							thumbEl.value.style.left = step + unit;
							// thumbPosition.value = step;
							updateModelValueStep(i)
						}
					}
				}

				document.addEventListener('mouseup', () => {
					console.log('global tracker resetting:', globalTracker.value)
					globalTracker.value = 0;
				});

				mousePosition = x;
				return;
			}

			// smooth slider
			if (newThumbPosition > 0 && newThumbPosition < thumbWrapperElWidth.value) {
				if (currentThumbPosition.value === 0) {
					currentThumbPosition.value++;
				} 
				// assume we are beginning from a mouseup
				// in order to avoid large space jank
				else if (mouseDiff > mousePosition) {
					currentThumbPosition.value++;
				}
				else {
					currentThumbPosition.value += mouseDiff;
				}
			}

			thumbEl.value.style.left = unref(currentThumbPosition) + unit;
			thumbPosition.value = unref(currentThumbPosition);
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
	removeListeners(document.body);
}

const removeListeners = (element: HTMLElement): void => {
	document.addEventListener('mouseup', () => {
		element.removeEventListener('mousemove', onMouseMove);
		mousePosition = 0;
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
	position: relative;

	&__thumb {
		box-sizing: border-box;
		height: $size;
		width: $size;
		background-color: blue;
		position: absolute;
		left: 0;
	}
}
</style>