<template>
	<div class="or-dropdown-wrapper" ref="orDropdown">
		<div class="or-dropdown-value" @click="toggleDropdownList">
			<span class="text-gray-400 text-sm pointer-events-none" v-if="selectedOptions.length === 0 && !isSelectedOptionValid">
				{{ placeholder }}
			</span>
			<div class="text-gray-600 w-full" v-else>
				<template v-if="multi">
					<span :class="{'chip': chips}" v-for="(option, optionIndex) in selectedOptions" :key="optionIndex">
						<slot name="value" :selected="option">
							{{ getOptionLabel(option) }}
						</slot>
						<span v-if="!chips">
							{{ optionIndex < selectedOptions.length - 1 ? ', ' : '' }}
						</span>
					</span>
				</template>
				<span v-else>
					<slot name="value" :selected="selectedOption">
						{{ getOptionLabel(selectedOption) }}
					</slot>
				</span>
			</div>
			<span class="ml-auto text-gray-400">
				<i class="ri-arrow-down-s-line"></i>
			</span>
		</div>
		<ul class="or-dropdown-list" ref="dropdownList" :style="dropdownPosition">
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
					{{ getOptionLabel(option) }}
				</slot>
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
import ListOptions from '@/mixins/list-option';

export default {
	mixins: [ ListOptions ],
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref, unref } from 'vue';

import useDropPosition from "@/utilities/use-drop-position";
import useClickAway from "@/utilities/use-clickaway";

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
	(e: 'update:modelValue', value: object[] | object): void,
	(e: 'change', value: object[] | object): void
}>()

const orDropdown = ref<HTMLElement>();
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
	return props.options.filter(option => JSON.stringify(option).toLowerCase().includes(filterTerm.value.toLowerCase()))
})

const isItemSelected = (item: object): boolean => {
	return getItemIndex(item) > -1;
}

const getItemIndex = (item: object): number => {
	const index = selectedOptions.value.findIndex(option => JSON.stringify(option) === JSON.stringify(item))

	return index;
}

const dropdownList = ref<HTMLDivElement>();
const dropdownPosition = computed(() => {
	if (dropdownList.value) {
		return useDropPosition(dropdownList.value, 30 + (props.options.length * 16))
	}
});

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

		emit('change', selectedOptions.value);
		emit('update:modelValue', selectedOptions.value);
		return
	}

	selectedOption.value = option;
	emit('change', selectedOptions.value);
	emit('update:modelValue', selectedOption.value);
}

onMounted(() => {
	if (orDropdown.value) useClickAway(orDropdown.value, hideDropdownList);

	if (props.multi) {
		(selectedOptions.value as object[]) = (unref(props.modelValue) as object[]);
		return
	}

	selectedOption.value = unref(props.modelValue);
})
</script>

<style lang="scss" scoped>
.or-dropdown-wrapper {
	@apply relative;
}

.or-dropdown-value {
	@apply border border-gray-100 bg-gray-50 rounded-md px-3 py-1 flex items-center cursor-pointer;
	@apply transition duration-300 hover:border-gray-200;

	.chip {
		@apply ml-2 py-1 px-2 bg-gray-200 rounded-full text-sm text-gray-600;

		&:first-of-type {
			@apply ml-0;
		}
	}
}

.or-dropdown-list {
	visibility: hidden;
	opacity: 0;
	transform: translateY(30px);
	transition: 0s visibility, .2s opacity, .2s transform;
	max-height: 200px;

	@apply absolute w-full z-10 overflow-y-auto;
	@apply shadow-sm rounded-md p-4 my-2 border border-gray-50 bg-white;
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