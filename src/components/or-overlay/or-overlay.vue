<template>
	<teleport :to="attach">
		<div class="or-overlay" :class="positioning">

			<div class="or-overlay-backdrop" data-testid="backdrop" v-if="hasBackdrop">
			</div>	
			
			<div class="or-overlay-content">
				<slot></slot>
			</div>
		</div>
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
</script>

<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(defineProps<{
	attach?: string,
	hasBackdrop?: boolean;
	canClickOutside?: boolean;
	escapeKeyClose?: boolean;
	contentPosition?: Position;
}>(), {
	attach: 'body',
	hasBackdrop: true,
	canClickOutside: true,
	escapeKeyClose: true,
	contentPosition: Position.CENTER
})

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
	@include fullscreen();

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
	@include fullscreen();
}
</style>