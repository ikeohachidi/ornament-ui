<template>
    <button v-bind="$attrs" :class="[getSize]">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Size, Sizes } from '@/types/Size';

const props = withDefaults(defineProps<{
    size?: Size 
}>(), {
    size: Size.SM 
})

const getSize = computed(() => {
    if (props.size === Size.MD) { return Sizes.md }
    if (props.size === Size.LG) { return Sizes.lg }

    return Sizes.sm;
})
</script>

<style scoped>
button {
    @apply or-bg-primary or-border-radius; 
    @apply text-white text-base border-0 cursor-pointer hover:bg-blue-800 transition-all duration-100;
}
</style>