<template>
    <ul class="or-accordion-container" ref="accordionContainer">
        <li v-for="(slot, slotIndex) in defaultSlots" :key="slotIndex" class="or-accordion">
            <p class="or-accordion-title" @click="toggleAccordionSection(slotIndex)">
                <span>{{ slot.props.title }}</span>
                <span>
                    <i class="ri-subtract-line" v-if="activeSlotIndex === slotIndex"></i>
                    <i class="ri-add-line" v-else></i>
                </span>
            </p>
            <div class="or-accordion-body">
                <div>
                    <component :is="slot"/>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref, useSlots, computed, VNode } from "vue";

const slots = useSlots();

const activeSlotIndex = ref(-1);
const accordionContainer = ref<HTMLUListElement>();

const toggleAccordionSection = (slotIndex: number): void => {
    const accordionBodyElements = Array.from(accordionContainer.value!.querySelectorAll(".or-accordion-body"));

    if (slotIndex === activeSlotIndex.value) {
        accordionBodyElements[slotIndex].classList.remove('active');
        activeSlotIndex.value = -1;

        return;
    }

    accordionBodyElements.forEach(element => {
        element.classList.remove('active');
    })

    accordionBodyElements[slotIndex].classList.add('active');

    activeSlotIndex.value = slotIndex;
}

const defaultSlots = computed<VNode[]>(() => {
    if (slots.default) return slots.default() as VNode[];

    return []
});
</script>

<style lang="scss" scoped>
.or-accordion-title {
    @apply border-b border-gray-200 p-3 cursor-pointer;
    @apply flex items-center justify-between; 
}

.or-accordion-body {
    @apply overflow-y-hidden max-h-0 transition-all  bg-gray-50;

    &.active {
        @apply max-h-96;
    }

    > div {
        @apply p-3;
    }
}
</style>