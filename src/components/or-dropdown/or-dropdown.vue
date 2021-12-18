<template>
	<div class="or-dropdown-wrapper" ref="orDropdown">
		<div class="or-dropdown-value p-1 center" @click="toggleDropdownList">
			<span v-if="selectedOptions.length === 0 && !isSelectedOptionValid">
				{{ placeholder }}
			</span>
			<div v-else>
				<template v-if="multi">
					<or-chips v-if="chips" v-model="selectedOptions" class="or-chips-wrapper">
						<template #item="{ value }">
							{{ value }}
						</template>
					</or-chips>
					<span v-else v-for="(option, optionIndex) in selectedOptions" :key="optionIndex">
						{{ option }} {{ optionIndex < selectedOptions.length - 1 ? ', ' : '' }}
					</span>
				</template>
				<span v-else>
					<slot name="value" :selected="selectedOption">
						{{ getOptionLabel(selectedOption) }}
					</slot>
				</span>
			</div>
			<span class="ml-auto">
				<i class="ri-arrow-down-s-line"></i>
			</span>
		</div>
		<ul class="or-dropdown-list" ref="dropdownList" :style="dropdownPosition">
			<li class="or-dropdown-filter">
				<or-input v-model="filterTerm" placeholder="Filter items" v-if="hasFilter">
					<template #before>
						<i class="ri-search-2-line mr-1"></i>
					</template>
					<template #after>
						<i class="ri-close-line ml-3" @click="filterTerm = ''"></i>
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
				<or-checkbox v-model="selectedOptions" :value="option" v-if="multi">
					<slot name="option" class="option" :option="option" :index="optionIndex">
						<span class="ml-2">{{ getOptionLabel(option) }}</span>
					</slot>
				</or-checkbox>
				<template v-else>
					<input type="radio" class="mr-2" v-model="selectedOption" :value="option">
					<slot name="option" class="option" :option="option" :index="optionIndex">
						{{ getOptionLabel(option) }}
					</slot>
				</template>
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
	chips?: boolean;
	hasFilter?: boolean;
	placeholder: string
}>(), {
	options: () => ([]),
	modelValue: () => ([]),
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
	position: relative;
	min-width: var(--input-min-width);
	width: 100%;
}

.or-dropdown-value {
	border: 1px solid var(--color-gray-2);
	border-radius: var(--radius-1);
	background: var(--color-gray-3);
	box-shadow: none;
	cursor: pointer;
	transition: .2s;
	&:hover {
		box-shadow: var(--outline-border);
	}

	::v-deep(.or-chips-wrapper) {
		margin: 0;

		.or-chip {
			margin: 0 5px; 
			font-size: 14px;

			&:first-of-type {
				margin-left: 0px;
			}
		}

		&:first-of-type {
			margin-left: 0;
		}
	}
}

.or-dropdown-list {
	position: absolute;
	left: 0;
	right: 0;
	background-color: #fff;
	border: 1px solid var(--color-gray-2);
	border-radius: var(--radius-2);
	padding: 20px;
	box-shadow: var(--shadow-sm);
	visibility: hidden;
	opacity: 0;
	transform: translateY(30px);
	transition: 0s visibility, .2s opacity, .2s transform;
}

.or-dropdown-list.show {
	visibility: visible;
	opacity: 1;
	transform: translateY(0px);
}

.or-dropdown-filter {
	margin-bottom: 1em;
}

.or-dropdown-item {
	cursor: pointer;
	padding: 0.7em;
	margin: 5px 0;
	background-color: transparent;
	color: var(--text-color-1);
	border-radius: var(--radius-1);
	transition: .2s;

	&:hover {
		background-color: var(--color-gray-3);
	}
}

.or-dropdown-item input[type="radio"] {
	display: none;
}

.or-dropdown-item.active {
	background-color: var(--color-gray-3);
}
</style>