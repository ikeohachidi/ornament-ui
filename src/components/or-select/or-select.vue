<template>
	<select class="or-select" v-model="currentValue" @change="onSelectChange" :class="[getSize]">
		<option v-for="(option, index) in options" :key="index" :value="getOptionValue(option)">
			<slot name="option" :option="option">
				{{ getOptionLabel(option) }}
			</slot>
		</option>
	</select>
</template>

<script lang="ts">
import ListOptions from '@/mixins/list-option';
export default {
	mixins: [ ListOptions ]
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref, unref } from 'vue';
import { Size, Sizes } from '@/types/Size';

const prop = withDefaults(defineProps<{
	modelValue: unknown;
	options: unknown[];
	size?: Size
}>(), {
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
	display: flex;
	border: 1px solid var(--border-color-1);
	border-radius: var(--radius-1);
	background: var(--color-gray-3);
	transition: .2s;
	font-size: 1em;

	&:hover {
		box-shadow: inset 0px 0px 0px 1px var(--color-primary);
	}
	&:focus {
		outline: none;
	}

	option {
		border-radius: var(--radius-1);
	}
}
</style>