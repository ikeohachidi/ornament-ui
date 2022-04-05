<template>
	<input 
		type="checkbox"
		data-testid="or-switch-input"
		:id="inputElementId"
		v-bind="$attrs"
	>
	<label 
		class="or-switch center jc-center" 
		:for="inputElementId">
	</label>

</template>

<script lang="ts" setup>
import { computed } from "vue";

type ModelValueType = boolean | string | number;

const props = withDefaults(defineProps<{
	modelValue: ModelValueType;
	checkedValue?: boolean,
	uncheckedValue?: boolean,
}>(), {
	modelValue: false,
	checkedValue: false,
	uncheckedValue: undefined 
})

const inputElementId = computed(() => {
	return `or-switch-${Date.now()}`;
})

</script>

<style lang="scss" scoped>
$size: 20px;

.or-switch-input {
	display: none;
}

.or-switch {
	cursor: pointer;
	height: $size;
	width: $size * 2;
	border-radius: 999px;
	box-shadow: 0px 0px 0px 1px var(--color-gray-2);
	display: inline-block;
	position: relative;
	background: var(--color-gray-3);
	transition: .2s;

	&:before {
		content: "";
		height: $size - 6px;
		width: $size - 6px;
		border-radius: 999px;
		background-color: #fff;
		display: inline-block;
		position: absolute;
		top: 3px;
		left: 3px;
		transition: left .2s linear;
	}
}
</style>