<template>
	<select class="or-select" v-model="value" v-bind="$attrs" :class="[getSize]">
		<option v-for="(option, index) in options" :key="index" :value="getOptionValue(option)">
			<slot name="option" :option="option">
				{{ getOptionLabel(option) }}
			</slot>
		</option>
	</select>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { Size, Sizes } from '@/types/Size';
import { ListOption, useListOption } from '@/utilities/use-list-option';

interface PropType extends ListOption {
	modelValue: unknown;
	options: unknown[];
	size?: Size;
	optionLabel: string;
	optionValue: string;
}

const prop = withDefaults(defineProps<PropType>(), {
	size: Size.SM,
})

const emit = defineEmits<{
	(event: 'update:modelValue', value: unknown): void;
}>()

const value = ref();
watch(value, (v) => { emit('update:modelValue', v) });

const { getOptionValue, getOptionLabel } = useListOption(prop);

const getSize = computed(() => {
	if (prop.size === Size.MD) { return Sizes.md }
	if (prop.size === Size.LG) { return Sizes.lg }

	return Sizes.sm;
})

onMounted(() => {
	value.value = prop.modelValue;
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