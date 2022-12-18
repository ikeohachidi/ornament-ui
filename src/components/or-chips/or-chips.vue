<template>
	<span v-for="(value, index) in modelValue" class="or-chip" :key="index">
		<slot name="item" :value="value">
			{{ value }}
		</slot>
		<i class="close ri-close-line ml-1" v-if="removeable" @click="removeItem(index)"></i>
	</span>
</template>

<script setup lang="ts">
import { useTheme } from '@/components/theme-provider';

const props = withDefaults(defineProps<{
	modelValue: unknown[],
	removeable?: boolean
}>(), {
	removeable: false 
});

const emit = defineEmits<{
	(event: "update:modelValue", value: unknown): void;
	(event: "item-removed", value: number): void;
}>();

const theme = useTheme('Chips');

const removeItem = (index: number) => {
	const model = [...props.modelValue];

	model.splice(index, 1);

	emit("item-removed", index);
	emit("update:modelValue", model);
}
</script>

<style scoped lang="scss">
.or-chip {
	list-style: none;
	display: inline-flex;
	background-color: v-bind('theme.backgroundSecondary');
	border: 1px solid v-bind('theme.borderSecondary');
	border-radius: 999px;
	font-size: 14px;
	color: v-bind('theme.textPrimary');
	margin-left: .5rem;
	padding: 5px 10px;

	.close {
		cursor: pointer;
		color: v-bind('theme.textPrimary');
	}

	&:first-of-type {
		margin-left: 0;
	}
}
</style>