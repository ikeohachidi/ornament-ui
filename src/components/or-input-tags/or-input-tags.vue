<template>
    <div class="or-input-tags-wrapper" @click="focusInput">
        <span v-for="(tag, tagIndex) in tags" :key="tagIndex" class="or-input-tag">
            <slot name="option" :option="tag" :index="tagIndex">
                {{ tag }}
            </slot>
            <span class="cursor-pointer" @click="removeTag(tagIndex)">
                <i class="ri-close-line ml-3"></i>
            </span>
        </span>
        <input 
            type="text" 
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
                    {{ option }}
                </slot>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

export default {
    inheritAttrs: false
}

</script>

<script setup lang="ts">
import { computed, onMounted, ref, unref } from 'vue';

import useDropPosition from "@/utilities/use-drop-position";

const props = withDefaults(defineProps<{
    modelValue: unknown[],
    placeholder?: string,
    options: unknown[]
}>(), {
    modelValue: () => ([]),
    placeholder: 'Enter text',
    options: () => ([])
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: unknown[]): void;
}>()

const tags = ref<unknown[]>([]);
const input = ref('');
const inputElement = ref<HTMLInputElement>();

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
    tags.value.push(option);
    input.value = '';

    emit('update:modelValue', tags.value)
}

const addTag = (): void => {
    if (props.options.length === 0) {

        tags.value.push(input.value);
        input.value = '';

        emit('update:modelValue', tags.value)
    }

    if (optionsFilter.value.length > 0) {
        addOption(optionsFilter.value[0]);
    }

}

const removeTag = (tagIndex: number): void => {
    tags.value.splice(tagIndex, 1);

    emit('update:modelValue', tags.value);
}

const removePreviousTag = (): void => {
    if (tags.value.length === 0) return;

    if (input.value.length === 0) {
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
.or-input-tags-wrapper {
	position: relative;
	border: 1px solid var(--color-gray-2);
	border-radius: var(--radius-1);
	background: var(--color-gray-3);
	transition: .5s;
	min-width: var(--input-min-width);
	width: 100%;

	&:hover {
		box-shadow: var(--outline-border);
}

	::v-deep(.or-chips-wrapper) {
		margin: 0;

		.or-chip {
			margin: 0 5px;

			&:first-of-type {
				margin-left: 0;
}
		}
	}
}

.or-input-tags-input {
	background-color: var(--color-gray-3);
	display: flex;
	align-items: center;
	margin-left: 10px;
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