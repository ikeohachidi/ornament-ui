<template>
	<teleport :to="attach">
		<Transition name="fade">
			<div 
				class="or-overlay" 
				v-if="show" 
				:class="positioning" 
				@click="canClickOutside && closeOverlay()"
			>
				<div class="or-overlay-backdrop" data-testid="backdrop" v-if="hasBackdrop"></div>	
				
				<div 
					class="or-overlay-content"
					:class="[`slide-${contentAnimation}`]"
					@click.stop
				>
					<slot></slot>
				</div>
			</div>
		</Transition>
	</teleport>
</template>

<script lang="ts">
enum Position {
	TOP_LEFT = "top-left",
	TOP_CENTER = "top-center",
	TOP_RIGHT = "top-right",

	CENTER = "center",
	MIDDLE_LEFT = "middle-left",
	MIDDLE_RIGHT = "middle-right",

	BOTTOM_LEFT = "bottom-left",
	BOTTOM_CENTER = "bottom-center",
	BOTTOM_RIGHT = "bottom-right"
}

enum ContentAnimation {
	LEFT_TO_RIGHT = "left-to-right",
	RIGHT_TO_LEFT = "right-to-left",
	TOP_TO_BOTTOM = "top-to-bottom",
	BOTTOM_TO_TOP = "bottom-to-top",
} 
</script>

<script lang="ts" setup>
import { computed, onMounted } from "vue";

const props = withDefaults(defineProps<{
	show?: boolean;
	attach?: string,
	hasBackdrop?: boolean;
	canClickOutside?: boolean;
	escapeKeyClose?: boolean;
	contentPosition?: Position;
	contentAnimation?: ContentAnimation;
}>(), {
	show: false,
	attach: 'body',
	hasBackdrop: true,
	canClickOutside: true,
	escapeKeyClose: false,
	contentPosition: Position.CENTER,
	contentAnimation: ContentAnimation.TOP_TO_BOTTOM
})

const emit = defineEmits<{
	(event: 'update:show', value: boolean): void
	(event: 'visibility-change', value: boolean): void
}>()

const positioning = computed(() => {
	let classes: string[] = [];

	if (props.contentPosition === Position.CENTER) {
		return ['h-middle', 'v-middle'];
	}

	if (props.contentPosition.includes('bottom')) {
		classes.push('v-bottom')
	}

	if (props.contentPosition.includes('middle')) {
		classes.push('v-middle')
	}

	if (props.contentPosition.includes('right')) {
		classes.push('h-right')
	}

	if (props.contentPosition.includes('center')) {
		classes.push('h-middle')
	}

	return classes;
})

const closeOverlay = () => {
	emit('update:show', false);
	emit('visibility-change', props.show);
}

onMounted(() => {
	if (props.escapeKeyClose) {
		document.addEventListener('keyup', (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeOverlay();
			}
		})
	}
})
</script>

<style lang="scss" scoped>
@mixin fullscreen {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}

.or-overlay {
	padding: 20px;
	display: flex;
	@include fullscreen;

	&-content {
		position: relative;
		height: max-content;
		z-index: 11;
	}

	&.v-middle {
		align-items: center;
	}

	&.v-bottom {
		align-items: flex-end;
	}

	&.h-middle {
		justify-content: center;
	}

	&.h-right {
		justify-content: flex-end;
	}
}

.or-overlay-backdrop {
	z-index: 10;
	background-color: rgba(0, 0, 0, 0.274);
	@include fullscreen;
}
</style>