<template>
    <p class="or-accordion-title" @click="toggleAccordion">
        <span>
            <slot name="title" :title="title">
                {{ title }}
            </slot>
        </span>
        <span>
            <slot name="collapse" :isCollapsed="isComponentActive">
                <i class="ri-subtract-line" v-if="isComponentActive"></i>
                <i class="ri-add-line" v-else></i>
            </slot>
        </span>
    </p>
    <div class="or-accordion-body" :class="{'active': isComponentActive ? true : false}">
        <div>
            <slot>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAttrs, computed } from "@vue/runtime-core";

const props = defineProps<{
    title: string;
}>();

const attrs = useAttrs();

const isComponentActive = computed(() => attrs._isActive)

const emit = defineEmits<{
    (event: 'selectionChange', value: number): void
}>()

const toggleAccordion = () => {
    emit('selectionChange', attrs._index as number)
}

</script>

<style lang="scss" scoped>
.or-accordion-title {
    @apply border-b border-gray-200 p-3 cursor-pointer;
    @apply flex items-center justify-between; 
}

.or-accordion-body {
    @apply overflow-y-hidden transition-all  bg-gray-50;
    @apply max-h-0;

    &.active {
        @apply max-h-96;
    }

    > div {
        @apply p-3;
    }
}
</style>