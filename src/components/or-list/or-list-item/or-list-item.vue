<template>
	<li class="or-list-item">
		<or-checkbox
			v-if="checkable"
			v-model="checkedValue"
			:value="1"
			:unchecked-value="0"
			data-testid="checkbox"
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

const emit = defineEmits<{
	(event: Events.ITEM_CHECK, value: unknown):  void,
	(event: Events.ITEM_UNCHECK, value: unknown):  void,
}>()

const checkedValue = ref(0);

watch(checkedValue, (v: number) => {
	if (v) emit(Events.ITEM_CHECK, props.value) 
	else emit(Events.ITEM_UNCHECK, props.value) 
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