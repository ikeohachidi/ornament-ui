<template>
    <div class="or-sidebar">
        <template v-for="(menuItem, index) in menuItems" :key="index">
            <p 
                class="or-sidebar-header" 
                @click="toggleChildrenView($event, { data: menuItem, item: menuItem.header, index: index, itemType: 'header' })"
            >
                <slot 
                    name="header" 
                    :data="menuItem" 
                    :item="menuItem.header" 
                    :index="index" 
                    :type="'header'"
                >
                    <span class="or-sidebar-header-content">
                        <i :class="`ri-${menuItem.icon}`" v-if="menuItem.icon"></i>
                        <span :class="{'ml-6': oneItemHasIcon && !menuItem.icon}">
                            {{ menuItem.header }}
                        </span>
                    </span>
                </slot>
                <span class="or-sidebar-caret" v-if="menuItem.children">
                    <i class="ri-arrow-up-s-line"></i>
                </span>
            </p>

            <ul 
                class="or-sidebar-children" 
                :class="{'ml-6': oneItemHasIcon}"
                v-if="menuItem.children"
            >
                <li 
                    v-for="(child, childIndex) in menuItem.children" 
                    :key="`child-${index}-${childIndex}`" 
                    class="or-sidebar-item"
                    @click="onItemClick({ data: menuItem, item: child, index: childIndex, itemType: 'child' })"
                >
                    <slot name="child" :data="menuItem" :item="child" :type="'child'">
                        {{ child }}
                    </slot>
                </li>
            </ul>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MenuItem } from '.';

type ItemClickEvent = {
    data: MenuItem;
    itemType: 'header' | 'child'
    item: string;
    index: number;
}

const props = withDefaults(defineProps<{
    menuItems: MenuItem[];
}>(), {})

const emit = defineEmits<{
    (e: 'item-clicked', value: ItemClickEvent): void;
}>()

const oneItemHasIcon = computed<boolean>(() => {
    return props.menuItems?.some(menuItem => menuItem.icon) as boolean;
})

const toggleChildrenView = (event: MouseEvent, item: ItemClickEvent) => {
    const target = event.target as HTMLElement;

    target.classList.toggle('collapse-children');
    emit('item-clicked', item);
}

const onItemClick = (item: ItemClickEvent) => {
    emit('item-clicked', item)
}

</script>

<style lang="scss" scoped>
.or-sidebar {
    @apply bg-gray-100 rounded-lg p-5;

}

.or-sidebar-header {
    @apply font-bold text-gray-800 mb-2 cursor-pointer;
    @apply flex justify-between;

    * {
        @apply pointer-events-none;
    }

    .or-sidebar-header-content {
        @apply flex items-center;

        > i {
            @apply text-gray-500 mr-2;
        }
    }

    .or-sidebar-caret {
        @apply text-gray-500;
        @apply transition;
    }

    &.collapse-children {
        .or-sidebar-caret {
            @apply transform -rotate-180 transition-all;
        }

        + .or-sidebar-children {
            @apply max-h-0;
            @apply transition-all;
        }
    }
}

.or-sidebar-children {
    @apply mb-5 max-h-16 overflow-y-hidden;
    @apply transition-all;
}

.or-sidebar-item {
    @apply mb-2 text-gray-600;
}
</style>