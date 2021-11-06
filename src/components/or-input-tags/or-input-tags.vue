<template>
    <div class="or-input-tags-wrapper" @click="focusInput">
        <span v-for="(tag, tagIndex) in tags" :key="tagIndex" class="or-input-tag">
            <slot name="option" :option="tag" :index="tagIndex">
                {{ option }}
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
        <ul class="or-input-tags-options" :class="optionsElementPosition" v-if="input.length > 0">
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
    if (inputElement.value === null) return 0;

    const threshold = window.innerHeight - (30 + (props.options.length * 16)); 
    const inputElementPos = inputElement.value?.getBoundingClientRect().top as number + window.scrollY;

    return inputElementPos > threshold ? "show-top" : "show-bottom";
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
    @apply relative flex flex-row flex-wrap border border-gray-100 rounded-md text-sm bg-gray-50 p-1;
    @apply transition duration-300 hover:border-gray-200;
}

.or-input-tag {
    @apply flex items-center ml-2 py-0 pl-3 pr-1 bg-gray-200 rounded-full text-sm text-gray-600;
}

.or-input-tag:first-of-type {
    @apply ml-0;
}

.or-input-tags-input {
    @apply ml-2 bg-gray-50 flex items-center;
    @apply focus:outline-none;
}

.or-input-tags-options {
    @apply absolute left-0;

    &.show-top {
        @apply bottom-full; 
    }
    &.show-bottom {
        @apply top-full; 
    }

    @apply w-full rounded-md overflow-hidden shadow-sm;

    li {
        @apply p-2 cursor-pointer;
        @apply transition duration-500;
        @apply hover:bg-gray-50;
    }
}
</style>