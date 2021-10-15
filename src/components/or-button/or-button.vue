<template>
    <button v-bind="$attrs" :class="[getSize]">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Size, Sizes } from '@/types/size.ts';

const props = withDefaults(defineProps<{
    size?: Size 
}>(), {
    size: 'sm'
})

const getSize = computed(() => {
    if (props.size === Size.MD) { return Sizes.md }
    if (props.size === Size.LG) { return Sizes.lg }

    return Sizes.sm;
})
</script>

<style scoped>
button {
    @apply bg-blue-600 text-white text-base border-0 rounded-sm cursor-pointer hover:bg-blue-800 transition-all duration-100;
}
</style>