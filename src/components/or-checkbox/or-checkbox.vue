<template>
    <input 
        class="or-checkbox"
        type="checkbox" 
        :id="inputElementId"
        ref="checkboxElement"
        v-bind="$attrs"
        @change="onCheckboxValueChange"
    >
    <label class="or-checkbox-label" :for="inputElementId">
        <slot></slot>
    </label>
</template>

<script setup lang="ts">
import { computed, onMounted,ref } from 'vue';

const props = defineProps<{
    modelValue: unknown | unknown[];
    checkedValue: unknown;
    uncheckedValue: unknown;
    value?: unknown;
}>()

const modelType = computed(() => {
    return typeof props.modelValue === "object" ? "array" : "primitive";
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: unknown): void;
}>()

const inputElementId = computed(() => {
    return `or-checkbox-${Date.now()}`;
})

const checkboxElement = ref<HTMLInputElement>();

const updateArrayModel = (element: HTMLInputElement) => {
    if (modelType.value !== "array") return;

    const arr = [...props.modelValue as unknown[]];

    if (element.checked) {
        if (props.uncheckedValue !== undefined) {
            const index = arr.findIndex(item => JSON.stringify(item) === JSON.stringify(props.uncheckedValue));

            if (index >= 0) {
                arr.splice(index, 1);
            }
        }

        arr.push(props.checkedValue ?? props.value);
    } else {
        const index = arr.findIndex(item => JSON.stringify(item) === JSON.stringify(props.checkedValue ?? props.value));

        if (index >= 0) {
            arr.splice(index, 1);
        }

        if (props.uncheckedValue !== undefined) {
            arr.push(props.uncheckedValue);
        }
    }

    emit('update:modelValue', arr);
}

const updatePrimitiveModel = (element: HTMLInputElement) => {
    if (modelType.value !== 'primitive') return;

    let value;

    if (element.checked) {
        value = props.checkedValue ?? props.uncheckedValue;
    } else {
        value = props.uncheckedValue ?? '';
    }
    emit('update:modelValue', value);
}

const onCheckboxValueChange = (event: InputEvent) => {
    const element = event.target as HTMLInputElement; 
    
    updatePrimitiveModel(element);
    updateArrayModel(element);
}

onMounted(() => {
    if (modelType.value === 'primitive' && props.modelValue === (props.checkedValue ?? props.value)) {
        if (checkboxElement.value) {
            checkboxElement.value.checked = true;
        }

        return;
    }

    // modelType is an array
    const index = (props.modelValue as unknown[])
        .findIndex(item => JSON.stringify(item) === JSON.stringify(props.checkedValue ?? props.value));

    if (index >= 0 && checkboxElement.value) {
        checkboxElement.value.checked = true;
    }
})
</script>

<style lang="scss" scoped>

$size: 18px;

.or-checkbox {
    @apply hidden;

    &:checked + .or-checkbox-label:before {
        content: "✔";
        @apply bg-indigo-700 text-white;
    }
}

.or-checkbox-label {
    @apply flex justify-center items-center;
}

.or-checkbox-label:before {
    content: "";
    height: $size;
    width: $size;
    @apply bg-white border border-gray-200 inline-block mr-1;
    @apply flex items-center content-center;
    @apply transition-all;
}
</style>