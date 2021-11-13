<template>
    <div class="or-input-wrapper" :class="[getSize]">
        <slot name="before">
        </slot>
        <input type="text" class="or-input w-full" v-bind="$attrs" ref="input" @input="onTextInput">
        <slot name="after">
        </slot>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { Size, Sizes } from '@/types/Size';

const props = withDefaults(defineProps<{
    modelValue?: string
    size?: Size
}>(), {
    modelValue: '',
    size: Size.SM 
})

const watch_modelValue = watch(
    () => props.modelValue,
    (value) => {
        if (value !== input.value!.value) {
            input.value!.value = value;
        }
}) 

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const input = ref<HTMLInputElement>();

const getSize = computed(() => {
    if (props.size === Size.MD) { return Sizes.md }
    if (props.size === Size.LG) { return Sizes.lg }

    return Sizes.sm;
})

const onTextInput = (event: InputEvent): void => {
    const { value } = (event.target as HTMLInputElement);

    emit('update:modelValue', value)
}

onMounted(() => {
    if (input.value) {
        input.value.value = props.modelValue;
    }

    emit('update:modelValue', props.modelValue);
})
</script>

<style scoped>
.or-input-wrapper {
    @apply flex border border-gray-100 rounded-md bg-gray-50 transition-all duration-500;
    @apply transition duration-300 hover:border-gray-200;
}

.or-input-wrapper:focus-within {
    @apply ring-1;
}

.or-input-wrapper * {
    @apply flex-1;
}

.or-input {
    @apply bg-gray-50 border-0;
}

.or-input:focus {
    @apply outline-none border-0;
}
</style>