<template>
    <p class="or-accordion-title m-0 p-2 flex center jc-between" @click="toggleAccordion">
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
        <div class="p-3">
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
    cursor: pointer;
    border-bottom: 1px solid var(--color-gray-1);
}

.or-accordion-body {
    overflow-y: auto;
    max-height: 0;
    background: var(--color-gray-2);
    transition: .9s;

    &.active {
        max-height: 200px;
    }
}
</style>