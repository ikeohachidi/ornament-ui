<template>
	<li class="or-list-item">
		<or-checkbox
			v-if="checkable"
			v-model="value"
			:value="1"
			:unchecked-value="0"
		></or-checkbox>

		<div class="or-list-item-content">
			<slot></slot>
		</div>
	</li>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { emitter } from '@/utilities/use-shared-event';
import { Events } from "..";

const props = defineProps<{
	checkable?: boolean; 
	value?: unknown;
}>()

const value = ref(0);

watch(value, (v: number) => {
	if (v) emitter.emit(Events.ITEM_CHECK, props.value)
	else emitter.emit(Events.ITEM_UNCHECK, props.value)
})
</script>

<style lang="scss" scoped>
@import "@/scss/utilities.scss";

.or-list-item {
	display: flex;
	align-items: flex-start;
	padding: 10px;
	margin-top: -1px;
	@include border-y(1px solid var(--color-gray-2));

	&-content {
		margin-left: 10px;
	}
}
</style>