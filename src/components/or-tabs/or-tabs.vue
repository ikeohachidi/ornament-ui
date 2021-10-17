<template>
    <div class="or-tab-headers" :class="[position]">
        <span 
            :class="{'active': activeSlotIndex === titleIndex}"
            v-for="(title, titleIndex) in tabTitles" 
            :key="titleIndex"
            @click="setActiveSlot(titleIndex)"
        >
            {{ title }}
        </span>
    </div>
    <div class="or-tab-body">
        <template v-if="activeSlot">
            <component :is="activeSlot" :key="Date.now()"/>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, useSlots, VNode } from "@vue/runtime-core";
import { Position } from '@/types/Position';
import { onMounted } from "vue";

const slots = useSlots();

const props = withDefaults(defineProps<{
    position?: Position
}>(), {
    position: Position.LEFT
})

const emit = defineEmits<{
    (e: 'tabChanged', tabTitle: string): void;
}>()


const activeSlot = ref<VNode>();
const activeSlotIndex = ref<number>(0);

const defaultSlots = computed<VNode[]>(() => {
    if (slots.default) {
        return slots.default() as VNode[];
    }

    return []
})

const setActiveSlot = (titleIndex: number): void => {
    activeSlotIndex.value = titleIndex;
    activeSlot.value = defaultSlots.value[titleIndex]

    if (activeSlot.value.props) {
        emit('tabChanged', activeSlot.value.props.title);
    }
}

const tabTitles = computed<string[]>(() => {
    return defaultSlots.value.map(slot => {
        return slot.props!.title
    })

    return [];
})

onMounted(() => {
    if (defaultSlots.value.length > 0) {
        setActiveSlot(0)
    }
})
</script>

<style lang="scss" scoped>
.or-tab-headers {
    @apply flex border-b border-gray-200 text-gray-800;

    &.right {
        @apply justify-end;
    }

    &.center {
        @apply justify-center;
    }

    span {
        @apply inline-block px-3 py-2 border-0 border-b-2 border-transparent cursor-pointer; 
        @apply hover:bg-gray-100 hover:border-indigo-200;
        @apply transition duration-200;

        &.active {
            @apply border-indigo-700;
        }
    }
}
</style>