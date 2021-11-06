<template>
    <input 
        class="or-radio"
        type="radio" 
        :id="inputElementId" 
        v-bind="$attrs"
        @change="onRadioValueChange"
    >
    <label class="or-radio-label" :for="inputElementId">
        <slot></slot>
    </label>
</template>

<script setup lang="ts">

import { computed } from 'vue';

const props = defineProps<{
    modelValue: unknown;
    value: unknown;
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: unknown): void;
}>()

const inputElementId = computed(() => {
    return `or-radio-${Date.now()}`;
})

const onRadioValueChange = () => {
    emit('update:modelValue', props.value);
}
</script>

<style lang="scss" scoped>

$radius: 15px;

.or-radio {
    display: none;

    &:checked {
        + .or-radio-label:before {
            @apply border-4 bg-indigo-700;
        }
    }
}

.or-radio-label:before { 
    content: '';
    height: $radius;
    width: $radius;
    @apply bg-gray-50 rounded-full border-gray-200 border inline-block;
    @apply transition-all;
}
</style>