<template>
	<div class="or-dropdown-wrapper" ref="orDropdown">
		<div data-testid="options-trigger" class="or-dropdown-value p-1 center" @click="toggleDropdownList">
			<template v-if="multi">
				<or-chips v-if="chips" v-model="selectedOptions" class="or-chips-wrapper">
					<template #item="{ value }">
						{{ value }}
					</template>
				</or-chips>
				<span v-else v-for="(option, optionIndex) in displayLabels.selectedOptions" :key="optionIndex">
					{{ option }}{{ optionIndex < selectedOptions.length - 1 ? ', ' : '' }}
				</span>
			</template>
			<span v-else>
				<slot name="value" :selected="selectedOption">
					{{ displayLabels.selectedOption }}
				</slot>
			</span>
			<i class="ri-arrow-down-s-line ml-auto"></i>
		</div>
		<ul class="or-dropdown-list" ref="dropdownList" :style="dropdownPosition">
			<li class="or-dropdown-filter">
				<or-input placeholder="Filter items" ref="filterInput" v-model="filterTerm" v-if="hasFilter" beforeIcon="search-2-line" clear />
			</li>
			<li v-if="hasNoFilterResults" class="or-dropdown-item">
				{{ noResults }}
			</li>
			<li 
				class="or-dropdown-item"
				:class="{'active': multi ? isItemSelected(filteredOptions[optionIndex]) : JSON.stringify(findOption(selectedOption)) == JSON.stringify(option) }"
				v-for="(option, optionIndex) in displayLabels.filteredOptions"
				v-else
				:key="optionIndex"
				@click="toggleOption(optionIndex)"
			>
				<slot name="option" class="option" :option="option" :index="optionIndex">
					<span class="or-dropdown-item-multi-icon" v-if="multi">
						<i class="ri-check-line"></i>
					</span>
					<span class="ml-1">{{ option }}</span>
				</slot>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, unref } from 'vue';

import useDropPosition from "@/utilities/use-drop-position";
import useClickAway from "@/utilities/use-clickaway";
import { Option, ListOption, useListOption } from '@/utilities/use-list-option';

interface Props extends ListOption {
	options: Option[],
	modelValue: object[] | object | string,
	multi?: boolean,
	chips?: boolean;
	hasFilter?: boolean;
	noResults?: string;
	optionValue?: keyof Option;
	optionLabel?: keyof Option;
}

const props = withDefaults(defineProps<Props>(), {
	options: () => ([]),
	hasFilter: true,
	noResults: 'No results.',
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: object[] | object): void,
	(e: 'change', value: object[] | object): void
}>()

const { getOptionValue, getOptionLabel, findOption } = useListOption(props);

/**
 * return values transformed with getOptionLabel 
 */
const displayLabels = computed(() => {
	return {
		selectedOptions: selectedOptions.value.map(option => getOptionLabel(option)),
		selectedOption: getOptionLabel(selectedOption.value),
		filteredOptions: filteredOptions.value.map(option => getOptionLabel(option))
	}
})

const orDropdown = ref<HTMLElement>();
/**
 * contains values when multi selection is enabled 
 */
const selectedOptions = ref<object[]>([]);
/**
 * values for single selection 
 */
const selectedOption = ref<object>();

const hasNoFilterResults = computed(() => filterTerm.value !== '' && filteredOptions.value.length === 0) 
const filterTerm = ref<string>('');
const filteredOptions = computed(() => {
	return props.options.filter(option => JSON.stringify(option).toLowerCase().includes(filterTerm.value.toLowerCase()))
})

const isItemSelected = (item: object): boolean => getItemIndex(item) > -1;

const getItemIndex = (item: object): number => selectedOptions.value.findIndex(option => JSON.stringify(option) === JSON.stringify(item));

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

const toggleOption = (optionIndex: number): void => {
	const option = filteredOptions.value[optionIndex];

	if (props.multi) {

		if (isItemSelected(option)) {
			const index = getItemIndex(option);

			selectedOptions.value.splice(index, 1)
		} else {
			selectedOptions.value.push(option)
		}
		const values = selectedOptions.value.map(option => getOptionValue(option))

		emit('change', values);
		emit('update:modelValue', values);
		return
	}

	const value = getOptionValue(filteredOptions.value[optionIndex]);
	selectedOption.value = option;
	emit('change', value);
	emit('update:modelValue', value);
}

onMounted(() => {
	if (orDropdown.value) useClickAway(orDropdown.value, hideDropdownList);

	if (props.multi) {
		if (!props.modelValue) return

		if (props.modelValue.constructor === Array) {
			(selectedOptions.value as object[]) = unref(props.modelValue) as object[]
		} else {
			(selectedOptions.value as object[]) = [(unref(props.modelValue) as object)];
		}
		
		return
	}

	selectedOption.value = findOption(unref(props.modelValue));
})
</script>

<style lang="scss" scoped>
.or-dropdown-wrapper {
	position: relative;
	display: inline-flex;
	width: var(--input-min-width)
}

.or-dropdown-value {
	border: 1px solid var(--color-gray-2);
	border-radius: var(--radius-1);
	background: var(--color-gray-3);
	box-shadow: none;
	cursor: pointer;
	transition: .2s;
	width: 100%;

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
	z-index: 10;
	margin: 5px 0;
	list-style: none;
	background-color: #fff;
	border: 1px solid var(--color-gray-2);
	border-radius: var(--radius-2);
	box-shadow: var(--shadow-sm);
	visibility: hidden;
	opacity: 0;
	transform: translateY(5px);
	transition: 0s visibility, .1s opacity, .1s transform;

	&.show {
		visibility: visible;
		opacity: 1;
		transform: translateY(0px);
	}
}

.or-dropdown-filter {
	padding: 10px;

	& > div {
		width: 100%;
	}

	&::v-deep(input) {
		background-color: transparent;
	}
}


.or-dropdown-item {
	cursor: pointer;
	padding: 0.7em;
	background-color: transparent;
	color: var(--text-color-1);
	border-radius: var(--radius-1);
	transition: .2s;
	color: var(--text-color-2);

	.or-dropdown-item-multi-icon {
		color: var(--color-gray-2)
	}

	&.active {
		background-color: var(--color-gray-2);

		.or-dropdown-item-multi-icon {
			color: var(--color-primary)
		}
	}

	&:hover {
		background-color: var(--color-gray-3);
	}
}

.or-dropdown-item input[type="radio"] {
	display: none;
}
</style>