<template>
	<div class="or-slider__wrapper">
		<div class="or-slider" ref="thumbWrapperEl">
			<div 
				class="or-slider__marker" 
				v-for="(stepDistance, index) in allStepsDistances" 
				v-if="showMarkers && steps > 0"
				:key="stepDistance"
				:class="{ active: thumbPosition >= stepDistance }"
				:style="{ left: `${stepDistance}px` }"
				@click="onMarkerClick(index)"
			></div>
			<div class="or-slider__rail" ref="thumbRangeEl"></div>
			<div class="or-slider__thumbs">
				<div
					class="or-slider__thumb"
					@mousedown="onMouseDown"
					ref="thumbEl"
				>
					<div class="or-slider__tooltip">
						<span>
							<slot name="tooltip" :value="modelValue">{{ modelValue }}</slot>
						</span>
					</div>	
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';

const props = withDefaults(defineProps<{
	modelValue: number,
	min?: number,
	max?: number,
	steps?: number,
	showMarkers?: boolean
}>(), {
	modelValue: 0,
	min: 0,
	max: 20,
	steps: 0,
	showMarkers: true 
});

const emit = defineEmits<{
	(event: 'update:modelValue', value: number): void;
}>();

// last registered position of cursor 
let mousePosition = 0;
let thumbPosition = ref(0);
const unit = 'px';

const thumbWrapperEl = ref<HTMLDivElement>();
const thumbRangeEl = ref<HTMLDivElement>();

const getElementWidth = (element: HTMLElement): number => {
	return parseInt(getComputedStyle(element).width.replace('px', ''));
}

const setPositions = (position: number, type: 'smooth' | 'step'): void => {
	thumbEl!.value!.style.translate = position + unit;
	thumbRangeEl!.value!.style.width = position + unit;

	thumbPosition.value = position;
}

// would be be farthest possible distance the thumb can move
// calculated in px
const maxValue = computed(() => {
	let value = 0;
	if (thumbWrapperEl.value && thumbEl.value) {
		// minus the width of thumb else thumb goes beyond container
		// can't properly figure out a way to fix this using only css
		value = getElementWidth(thumbWrapperEl.value) - (getElementWidth(thumbEl.value) - 3);
	}

	return value;
});

const minValue = computed(() => {
	const perc = (props.min / props.max) * 100;
	return (perc / 100) * maxValue.value;
});

const singleStepDistance = computed(() => {
	return maxValue.value / (props.steps - 1);
});

const allStepsDistances = computed(() => {
	const steps: number[] = [];

	for (let i = 0; i < props.steps; i++) {
		steps.push(singleStepDistance.value * i);
	}

	return steps;
});

const updateModelValue = () => {
	const thumbPositionPerc = (thumbPosition.value / maxValue.value) * 100;
	// percentage position of the thumb on the wrapper
	const thumbPosPercOfWrapper = Math.round(thumbPositionPerc * (props.max / 100));
	emit('update:modelValue', thumbPosPercOfWrapper);
}

const updateModelValueStep = (step: number) => {
	emit('update:modelValue', step);
}

const thumbEl = ref<HTMLDivElement>();
// ghostThumbPosition used only on snapping slider and it tracks the users mouse movement
// but doesn't actually cause the position change of the thumb until it reaches a
// certain threshold 
const ghostThumbPosition = ref(0);

const setSnapSlider = (positionDiff: number, mouseMovementX: number) => {
	const leftPosition = thumbEl!.value!.style.translate;
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

	for (let i = 0; i < allStepsDistances.value.length; i++) {
		const step = allStepsDistances.value[i];
		const from = step - threshold;
		const to = step + threshold;

		if (ghostThumbPosition.value >= from && ghostThumbPosition.value <= to) {
			const actualStep = i + 1;
			if (props.modelValue !== actualStep) {
				setPositions(step, 'step');
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
	const leftPosition = thumbEl!.value!.style.translate;
	// expecting that it'll have % at the end of it
	let currentThumbPosition = Number(leftPosition.replace(unit, ''))

	const newThumbPosition = currentThumbPosition + positionDiff;

	// assume we are beginning from a mouseup
	// in order to avoid large space jank
	if (positionDiff > mousePosition) {
		currentThumbPosition++;
	} else {
		currentThumbPosition += positionDiff;
	}

	if (newThumbPosition < minValue.value) {
		currentThumbPosition = minValue.value;
	} else if (currentThumbPosition > maxValue.value) {
		currentThumbPosition = maxValue.value
	}

	setPositions(currentThumbPosition, 'smooth');

	mousePosition = mouseMovementX;
	updateModelValue();
}

const setThumbPosition = (mouseMovementX: number): void => {
	if (thumbEl.value) {
		// the difference between the last registered mouse position
		// and the present position. This is better than just adding
		// and subtracting 1 to the margin because depending on the
		// mouse move speed it may be greater than 1.
		const positionDiff = mouseMovementX - mousePosition;

		if (props.steps > 0) {
			setSnapSlider(positionDiff, mouseMovementX);
			return;
		}

		setSmoothSlider(positionDiff, mouseMovementX);
	}
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

const onMarkerClick = (markerPositionIndex: number): void => {
	const distance = allStepsDistances.value[markerPositionIndex];
	setPositions(distance, 'step');
	updateModelValueStep(markerPositionIndex + 1);
}

const removeListeners = (element: HTMLElement): void => {
	document.addEventListener('mouseup', () => {
		element.removeEventListener('mousemove', onMouseMove);
		mousePosition = 0;
	});
}

onMounted(() => {
	const { steps, modelValue, max } = props;

	if (thumbEl.value && thumbWrapperEl.value) {
		// step slider
		if (steps > 0 && (modelValue > 0 && modelValue <= steps)) {
			const position = allStepsDistances.value[modelValue - 1];
			setPositions(position, 'step');
		} else if (modelValue > steps) {
			const allStepsLength = allStepsDistances.value.length;
			const position = allStepsDistances.value[allStepsLength - 1];
			setPositions(position, 'step');
		}
		else {
			// since the modelValue in a smooth slider 
			// is basically a percentage of the full slider
			if (modelValue > max) {
				setPositions(maxValue.value, 'smooth');
				return;
			}

			const percOfMax = (modelValue / max) * 100;
			const position = (percOfMax / 100) * maxValue.value;

			if (position < minValue.value) {
				setPositions(minValue.value, 'smooth');
			} else {
				setPositions(position, 'smooth');
			}
		}
	}
})
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "@/scss/utilities.scss";

$size: 5px;
$thumb-size: $size * 3;
$tooltip-size: $size * 6;
$marker-size: $size * 1.3;
$slider-color: hsl(0%, 0%, 96%);

.or-slider {
	height: $size;
	border-radius: 999px;
	width: 100%;
	background-color: $slider-color;
	box-sizing: border-box;
	position: relative;

	&__wrapper {
		display: flex;
		place-items: center;
		height: $thumb-size;
	}

	&__marker {
		@include set-sq-size($marker-size);
		border-radius: 999px;
		position: absolute;
		top: math.div(-$marker-size, 2);
		border: 3px solid $slider-color;
		background-color: #fff;
		z-index: 2;
		cursor: pointer;

		&.active {
			border-color: var(--color-primary);
		}
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
		z-index: 3;

		&:hover {
			 .or-slider__tooltip {
			 	opacity: 1;
			 	transform: scale(1);
			 }
		}
	}

	&__tooltip {
		opacity: 0;
		min-height: $tooltip-size; 
		min-width: $tooltip-size; 
		background-color: rgba(0, 0, 0, 80%);
		border-radius: var(--radius-2);
		display: flex;
		place-content: center;
		place-items: center;
		transform: scale(0);
		transform-origin: bottom center;
		transition: .5s;
		position: absolute;
		bottom: 190%;
		left: -50%;
		pointer-events: none;

		span {
			color: #fff;
		}
	}
}
</style>