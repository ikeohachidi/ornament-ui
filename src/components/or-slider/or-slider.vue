<template>
	<div class="or-slider__wrapper">
		<div class="or-slider" ref="thumbWrapperEl">
			<div class="or-slider__rail" ref="thumbRangeEl"></div>
			<div class="or-slider__thumbs">
				<div
					class="or-slider__thumb"
					@mousedown="onMouseDown"
					ref="thumbEl"
				></div>
			</div>
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
const thumbRangeEl = ref<HTMLDivElement>();

const unit = 'px';

const thumbWrapperElWidth = computed(() => {
	if (thumbWrapperEl.value) {
		return parseInt(getComputedStyle(thumbWrapperEl.value).width.replace('px', ''));
	}
	return 0;
});

const singleStepPx = computed(() => {
	return thumbWrapperElWidth.value / (props.steps - 1);
});
const allStepsPx = computed(() => {
	const steps: number[] = [];

	for (let i = 0; i < props.steps; i++) {
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
// ghostThumbPosition used only on snapping slider tracks the users mouse movement
// but doesn't actually cause the position change of the thumb until it reaches a
// certain threshold 
const ghostThumbPosition = ref(0);

const setSnapSlider = (positionDiff: number, mouseMovementX: number) => {
	const leftPosition = thumbEl!.value!.style.left;
	// expecting that it'll have % at the end of it
	const currentThumbPosition = Number(leftPosition.replace(unit, ''))

	if (ghostThumbPosition.value === 0 && currentThumbPosition === 0) {
		ghostThumbPosition.value += 2;
	}
	else if (ghostThumbPosition.value === 0) {
		ghostThumbPosition.value = currentThumbPosition;
	}
	else {
		ghostThumbPosition.value += positionDiff;
	}

	const threshold = 10;

	for (let i = 0; i < allStepsPx.value.length; i++) {
		const step = allStepsPx.value[i];
		const from = step - threshold;
		const to = step + threshold;

		if (ghostThumbPosition.value >= from && ghostThumbPosition.value <= to) {
			const actualStep = i + 1;
			if (props.modelValue !== actualStep) {
				thumbEl!.value!.style.left! = step + unit;
				thumbRangeEl!.value!.style.width = step + unit;

				updateModelValueStep(actualStep)
			}
		}
	}

	document.addEventListener('mouseup', () => {
		ghostThumbPosition.value = 0;
	});

	mousePosition = mouseMovementX;
}

const setSmoothSlider = (positionDiff: number, mouseMovementX: number) => {
	const leftPosition = thumbEl!.value!.style.left;
	// expecting that it'll have % at the end of it
	let currentThumbPosition = Number(leftPosition.replace(unit, ''))

	const newThumbPosition = currentThumbPosition + positionDiff;

	if (newThumbPosition > 0 && newThumbPosition < thumbWrapperElWidth.value) {
		if (currentThumbPosition === 0) {
			currentThumbPosition++;
		} 
		// assume we are beginning from a mouseup
		// in order to avoid large space jank
		else if (positionDiff > mousePosition) {
			currentThumbPosition++;
		}
		else {
			currentThumbPosition += positionDiff;
		}
	} 

	if (newThumbPosition < 0) {
		currentThumbPosition = 0;
	}

	thumbEl!.value!.style.left = currentThumbPosition + unit;
	thumbRangeEl!.value!.style.width = currentThumbPosition + unit;
	thumbPosition.value = currentThumbPosition;

	mousePosition = mouseMovementX;
	updateModelValue();
}

const setThumbPosition = (mouseMovementX: number): void => {
	window.requestAnimationFrame(() => {
		if (thumbEl.value) {
			// the difference between the last registered mouse position
			// and the present position. This is better than just adding
			// and subtracting 1 to the margin because depending on the
			// mouse move speed it may be greater than 1.
			const possitionDiff = mouseMovementX - mousePosition;

			if (props.steps > 0) {
				setSnapSlider(possitionDiff, mouseMovementX);
				return;
			}

			setSmoothSlider(possitionDiff, mouseMovementX);
		}
	})
}

const onMouseMove = (event: MouseEvent): void => {
	if (event.x > mousePosition) {
		setThumbPosition(event.clientX);
	} 
	else if (event.x < mousePosition) {
		setThumbPosition(event.clientX);
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

onMounted(() => {
	const { steps, modelValue } = props;

	if (thumbEl.value) {
		if (steps > 0 && (modelValue > 0 && modelValue <= steps)) {
			const position = allStepsPx.value[modelValue];
			thumbEl.value.style.left = position + unit; 
		} 
	}
})
</script>

<style lang="scss" scoped>
@import "@/scss/utilities.scss";

$size: 5px;
$thumb-size: $size * 3;

.or-slider {
	height: $size;
	border-radius: 999px;
	width: 100%;
	background-color: hsl(0, 0, 96%);
	box-sizing: border-box;
	position: relative;

	&__wrapper {
		display: flex;
		place-items: center;
		height: $thumb-size;
		border: 1px solid red;
	}

	&__rail {
		background-color: var(--color-primary);
		height: $size;
		width: 0%;
		position: absolute;
		@include border-radius("left", 999px);
	}

	&__thumbs {
		box-sizing: border-box;
		position: absolute;
		left: calc($thumb-size);
		right: calc($thumb-size);
		height: $size;
	}

	&__thumb {
		box-sizing: border-box;
		height: $thumb-size;
		width: $thumb-size;
		cursor: pointer;
		border-radius: 9999px;
		background-color: #fff;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05);
		position: absolute;
		left: 0;
		top: -100%;
		transform: translate(-$thumb-size);
	}
}
</style>