<template>
	<ul class="or-chips">
		<li v-for="(value, index) in modelValue" class="or-chip" :key="index">
			<slot name="item" :value="value">
				{{ value }}
			</slot>
			<span class="close" v-if="hasRemove" @click="removeItem(index)">
				<i class="ri-close-line"></i>
			</span>
		</li>
	</ul>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
	modelValue: unknown[],
	hasRemove?: boolean
}>(), {
	modelValue: [],
	hasRemove: false 
})

const emits = defineEmits<{
	(event: "update:modelValue", value: unknown): void;
}>()

const removeItem = (index: number) => {
	const model = [...props.modelValue];

	model.splice(index, 1);

	emits("update:modelValue", model);
}
</script>

<style scoped lang="scss">
.or-chip {
	.close {
		@apply cursor-pointer;
	}
}

.or-chip {
	@apply text-sm;
	@apply bg-gray-100 border border-gray-300 rounded-full py-1 px-3 ml-2 mb-2;
	@apply inline-flex items-center justify-between;

	&:first-of-type {
		@apply ml-0;
	}

	.close {
		@apply text-gray-500;
	}
}
</style>