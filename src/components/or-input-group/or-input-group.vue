<template>
	<div class="or-input-group-wrapper">
		<slot></slot>
	</div>
</template>

<script lang="ts">
export default {
	name: 'or-input-group'
}
</script>

<style lang="scss" scoped>

@mixin border-radius($position, $radius) {
	border-top-#{$position}-radius: $radius;
	border-bottom-#{$position}-radius: $radius;
}

.or-input-group-wrapper {
	display: flex;
	align-items: center;

	> ::v-deep(*) {
		border-radius: 0px;
		height: 0;

		&:not(:first-child) {
			margin-left: -1px;
		}

		&:first-child {
			@include border-radius("left", var(--radius-1));
		}

		&:last-child {
			@include border-radius("right", var(--radius-1));
		}
	}

}
</style>