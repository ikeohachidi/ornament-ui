import { ref } from "vue";

<template>
	<select class="or-select" v-model="currentValue" @change="onSelectChange" :class="[getSize]">
		<option v-for="(option, index) in options" :key="index" :value="option.value">
			<slot name="option" :option="option">
				{{ option.label }}
			</slot>
		</option>
	</select>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, unref } from 'vue';
import { List } from '@/types/List';
import { Size, Sizes } from '@/types/Size';

const prop = withDefaults(defineProps<{
	modelValue: unknown;
	options: List[];
	size?: Size
}>(), {
	modelValue: null,
	options: [],
	size: Size.SM
})

const emit = defineEmits<{
	(event: 'update:modelValue', value: unknown): void;
}>()

const currentValue = ref<unknown>(null);

const onSelectChange = (): void => {
	emit('update:modelValue', currentValue.value);
}

const getSize = computed(() => {
    if (prop.size === Size.MD) { return Sizes.md }
    if (prop.size === Size.LG) { return Sizes.lg }

    return Sizes.sm;
})

onMounted(() => {
	if (prop.modelValue) {
		currentValue.value = unref(prop.modelValue);
	}
})
</script>

<style scoped lang="scss">
.or-select {
	@apply flex border border-gray-100 rounded-md bg-gray-50 transition-all duration-500;
	@apply transition duration-300 hover:border-gray-200;
}
</style>