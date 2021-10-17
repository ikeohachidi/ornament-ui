<template>
    <div class="or-input-tags-wrapper">
        <span v-for="(tag, tagIndex) in tags" :key="tagIndex" class="or-input-tag">
            {{ tag }}
            <span class="cursor-pointer" @click="removeTag(tagIndex)">
                <i class="ri-close-line ml-3"></i>
            </span>
        </span>
        <input 
            type="text" 
            class="or-input-tags-input"
            @keydown.enter="addTag"
            @keydown.tab="addTag"
            v-model="input"
            :placeholder="placeholder"
            :style="{width: `${input ? input.length : placeholder.length}ch`}"
        >
    </div>
</template>

<script lang="ts">

export default {
    inheritAttrs: false
}

</script>

<script setup lang="ts">
import { onMounted, ref, unref, computed, watch } from 'vue';

const props = withDefaults(defineProps<{
    modelValue: unknown[],
    placeholder?: string
}>(), {
    modelValue: () => ([]),
    placeholder: 'Enter text' 
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: unknown[]): void;
}>()

const tags = ref<unknown[]>([]);
const input = ref('');

const addTag = (): void => {
    tags.value.push(input.value);
    input.value = '';

    emit('update:modelValue', tags.value)
}

const removeTag = (tagIndex: number): void => {
    tags.value.splice(tagIndex, 1);

    emit('update:modelValue', tags.value);
}

onMounted(() => {
    tags.value = unref(props.modelValue)
})
</script>

<style scoped>
.or-input-tags-wrapper {
    @apply flex flex-row flex-wrap border border-gray-100 rounded-md text-sm bg-gray-50 transition-all duration-500 p-1;
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
</style>