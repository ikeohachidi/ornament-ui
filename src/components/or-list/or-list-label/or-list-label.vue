<template>
	<p class="or-list-label">
		<or-checkbox 
			v-if="isCheckable"
			v-model="value"
			:value="1"
			:unchecked-value="0"
		>
		</or-checkbox>
		<slot></slot>
	</p>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs, watch } from "vue";
import { emitter } from '@/utilities/use-shared-event';
import { Events } from '../index';

const attrs = useAttrs();

const value = ref(0);
watch(value, (v: number) => {
	if (v) emitter.emit(Events.ITEM_CHECK, checkedValue)
	else emitter.emit(Events.ITEM_UNCHECK, checkedValue);
})

const checkedValue = computed(() => {
	return attrs.value;
})

const isCheckable = computed(() => {
	return attrs.checkable;
})
</script>

<style lang="scss" scoped>
@import '@/scss/color.scss';

.or-list-label {
	color: $text-color-1;
	font-weight: bold;
	display: flex;
	align-items: center;
}
</style>