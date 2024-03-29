<template>
	<div data-testid="wrapper" class="or-input-tags-wrapper" @click="focusInput" :class="[size]">
		<or-chips ref="chips" v-model="tags" removeable @item-removed="removeTag">
			<template #item="{value}">
				<slot name="option" :option="value">
					{{ getOptionLabel(value) }}
				</slot>
			</template>
		</or-chips>
		<input 
			v-if="canMakeInput"
			type="text" 
			data-testid="filter-input"
			class="or-input-tags-input"
			@keydown.enter="addTag"
			@keydown.tab="addTag"
			@keydown="onInputKeydown"
			v-model="input"
			ref="inputElement"
			:placeholder="placeholder"
			:style="{width: `${input ? input.length : placeholder.length}ch`}"
		>
		<ul class="or-input-tags-options" :style="optionsElementPosition" v-if="input.length > 0">
			<li v-for="(option, optionIndex) in optionsFilter" :key="optionIndex" @click="addOption(option)">
				<slot name="option" :option="option" :index="optionIndex">
					{{ getOptionLabel(option) }}
				</slot>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
// TODO: allow addition of non options
import { computed, onMounted, ref, unref } from 'vue';

import useDropPosition from "@/utilities/use-drop-position";
import { useListOption } from '@/utilities/use-list-option';
import { Size } from '@/types/Size';

interface Props {
	modelValue: unknown[],
	placeholder?: string,
	size?: Size,
	max?: number;

	optionLabel?: string,
	optionValue?: string,
	options: Record<string, unknown>[];
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: () => ([]),
	placeholder: 'Enter text',
	size: Size.SM,
	max: undefined,
	options: () => ([])
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: unknown[]): void;
}>()

const tags = ref<unknown[]>([]);
const tagsOptionValue = computed(() => tags.value.map(tag => getOptionValue(tag)))
const input = ref('');
const inputElement = ref<HTMLInputElement>();

const canMakeInput = computed(() => {
	if (props.max === null || props.max === undefined) return true;

	if (props.max === tags.value.length) return false;

	return true;
})

const { getOptionValue, getOptionLabel} = useListOption(props);

const optionsElementPosition = computed(() => {
	if (inputElement.value) {
		return useDropPosition(inputElement.value!, 30 + (props.options.length * 16));
	}
})

const focusInput = () => {
	inputElement.value?.focus();
}

const optionsFilter = computed(() => {
	return props.options.filter(option => {
		return JSON.stringify(option).toLowerCase().includes(input.value.toLowerCase());
	})
})

const addOption = (option: unknown) => {
	if (!canMakeInput.value) return;

	tags.value.push(option);
	input.value = '';

    emit('update:modelValue', tagsOptionValue.value);
}

const addTag = (): void => {
	if (props.options.length === 0) {
		addOption(input.value)
    }

	if (optionsFilter.value.length > 0) {
		// add first option
		addOption(getOptionValue(optionsFilter.value[0]));
	}

}

const removeTag = (tagIndex: number): void => {
	tags.value.splice(tagIndex, 1);

    emit('update:modelValue', tagsOptionValue.value);
}

const removePreviousTag = (): void => {
	if (input.value.length === 0 && tags.value.length > 0) {
		const length = tags.value.length - 1;
		removeTag(length);
	}
}

const onInputKeydown = (event: Event): void => {
	if ((event as KeyboardEvent).key === "Backspace") {
		removePreviousTag();
	}
}

onMounted(() => {
	tags.value = unref(props.modelValue);
})

</script>

<style lang="scss" scoped>
@import "@/scss/utilities.scss";

@include min-height-size(".or-input-tags-wrapper");

.or-input-tags-wrapper {
	position: relative;
	display: inline-flex;
	flex-wrap: wrap;
	flex-flow: wrap;
	align-items: center;
	padding-left: 5px;
	width: var(--input-min-width);
	border: 1px solid var(--color-gray-2);
	border-radius: var(--radius-1);
	background: var(--color-gray-3);
	transition: .5s;
	min-width: var(--input-min-width);

	&:hover {
		box-shadow: var(--outline-border);
	}
}

.or-input-tags-input {
	background-color: transparent;
	display: flex;
	align-items: center;
	min-width: 10ch;
	border: none;
	font-size: 16px;
	&:focus {
		outline: none;
	}
}

.or-input-tags-options {
	z-index: 10;
	position: absolute;
	left: 0;
	right: 0;
	margin: 5px 0;
	border-radius: var(--radius-1);
	overflow: hidden;
	box-shadow: var(--shadow-sm);

	&.show-top {
		bottom: 100%;
	}
	&.show-bottom {
		top: 100%;
	}

	li {
		padding: 1em;
		cursor: pointer;
		background-color: #fff;
		transition: .2s;
		&:hover {
			background-color: var(--color-gray-3);
		}
	}
}
</style>