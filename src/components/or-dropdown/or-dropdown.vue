<template>
    <div class="or-dropdown-wrapper" v-click-away="hideDropdownList">
        <div class="or-dropdown-value" @click="toggleDropdownList">
            <div class="text-gray-600">
                <template v-if="multi">
                    <span v-for="(option, optionIndex) in selectedOptions" :key="optionIndex">
                        <slot name="value" :selected="option">
                            {{ option }}
                        </slot>
                        {{ optionIndex < selectedOptions.length - 1 ? ', ' : '' }}
                    </span>
                </template>
                <span v-else>
                    <slot name="value" :selected="selectedOption">
                        {{ selectedOption }}
                    </slot>
                </span>
            </div>
            <span class="text-gray-400 text-sm pointer-events-none" v-if="selectedOptions.length === 0 && !isSelectedOptionValid">
                {{ placeholder }}
            </span>
            <span class="ml-auto text-gray-400">
                <i class="ri-arrow-down-s-line"></i>
            </span>
        </div>
        <ul class="or-dropdown-list" ref="dropdownList">
            <li class="or-dropdown-filter">
                <or-input v-model="filterTerm" placeholder="Filter items" v-if="hasFilter">
                    <template #before>
                        <spa class="text-base text-gray-400">
                            <i class="ri-search-2-line mr-3"></i>
                        </spa>
                    </template>
                    <template #after>
                        <span class="text-base text-gray-400 cursor-pointer" @click="filterTerm = ''">
                            <i class="ri-close-line ml-3"></i>
                        </span>
                    </template>
                </or-input>
            </li>
            <li 
                class="or-dropdown-item"
                :class="{'active': multi ? isItemSelected(option) : JSON.stringify(selectedOption) == JSON.stringify(option) }"
                v-for="(option, optionIndex) in filteredOptions"
                :key="optionIndex"
                @click="toggleOption(option)"

            >
                <input type="checkbox" class="mr-2" v-model="selectedOptions" :value="option" v-if="multi">
                <input type="radio" class="mr-2" v-model="selectedOption" :value="option" v-else>

                <slot name="option" class="option" :option="option" :index="optionIndex">
                    {{ option }}
                </slot>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { directive } from "vue3-click-away";

export default {
    directives: {
        ClickAway: directive
    }
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref, unref } from 'vue';

const props = withDefaults(defineProps<{
    options?: object[],
    modelValue?: object[] | object,
    multi?: boolean,
    chips: boolean;
    hasFilter?: boolean;
    placeholder: string
}>(), {
    options: () => ([]),
    modelValue: () => ([]),
    multi: false,
    chips: false,
    hasFilter: true
})

const emit = defineEmits<{
    (e: 'update:modelValue', selectedOptions: object[] | object): void
}>()

const selectedOptions = ref<object[]>([]);

const selectedOption = ref<object>({});
const isSelectedOptionValid = computed(() => {
    const constructor = selectedOption.value.constructor;

    if (constructor === Array) return (selectedOption.value as Array<unknown>).length > 0;

    if (constructor === Object) return Object.keys((selectedOption.value as Record<string, unknown>)).length > 0;

    return String(selectedOption.value).length > 0
})

const filterTerm = ref<string>('');
const filteredOptions = computed(() => {
    return props.options.filter(option => JSON.stringify(option).includes(filterTerm.value))
})

const isItemSelected = (item: object): boolean => {
    return getItemIndex(item) > -1;
}

const getItemIndex = (item: object): number => {
    const index = selectedOptions.value.findIndex(option => JSON.stringify(option) === JSON.stringify(item))

    return index;
}

const dropdownList = ref<HTMLDivElement>();
const toggleDropdownList = (): void => {
    if (dropdownList) {
        dropdownList.value?.classList.toggle('show')
    }
}

const hideDropdownList = (): void => {
    dropdownList.value?.classList.remove('show');
}

const toggleOption = (option: object): void => {
    if (props.multi) {

        if (isItemSelected(option)) {
            const index = getItemIndex(option);

            selectedOptions.value.splice(index, 1)
        } else {
            selectedOptions.value.push(option)
        }

        emit('update:modelValue', selectedOptions.value);
        return
    }

    selectedOption.value = option;
    emit('update:modelValue', selectedOption.value);
}

onMounted(() => {
    if (props.multi) {
        (selectedOptions.value as object[]) = (unref(props.modelValue) as object[]);
        return
    }

    selectedOption.value = unref(props.modelValue);
})
</script>

<style scoped>
.or-dropdown-wrapper {
    @apply relative;
}

.or-dropdown-value {
    @apply border border-gray-100 bg-gray-50 rounded-md px-3 py-1 flex items-center cursor-pointer;
    @apply transition duration-300 hover:border-gray-200;
}

.or-dropdown-list {
    visibility: hidden;
    opacity: 0;
    transform: translateY(30px);
    transition: 0s visibility, .2s opacity, .2s transform;
    max-height: 200px;

    @apply absolute w-full z-10 overflow-y-auto;
    @apply shadow-sm rounded-md p-4 mt-2 border border-gray-50 bg-white;
}

.or-dropdown-list.show {
    visibility: visible;
    opacity: 1;
    transform: translateY(0px);
}

.or-dropdown-filter {
    @apply mb-2;
}

.or-dropdown-item {
    @apply p-2 cursor-pointer text-gray-600;
    @apply hover:bg-gray-50  transition-all duration-300;
}

.or-dropdown-item input[type="radio"] {
    @apply hidden; 
}

.or-dropdown-item.active {
    @apply bg-gray-50;
}
</style>