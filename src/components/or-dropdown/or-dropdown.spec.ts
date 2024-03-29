import { mount } from "@vue/test-utils";
import { describe, it, expect } from 'vitest';
import OrDropdown from ".";
import OrCheckbox from "../or-checkbox";
import OrChips from "../or-chips";
import { OrInput } from "../or-input";

const options = [
	{ label: 'Excellent', value: 'A+' },
	{ label: 'Good', value: 'B+' },
	{ label: 'Okay', value: 'C+' },
	{ label: 'Poor', value: 'D+' },
	{ label: 'Damn Son!', value: 'F+' },
];

const factory = (props = {}, slots = {}) => {
	return mount(OrDropdown, {
		components: {
			'or-input': OrInput,
			'or-chips': OrChips,
			'or-checkbox': OrCheckbox,
		},
		props: {
			options,
			modelValue: '',
			hasFilter: true,
			placeholder: 'Food',
			...props
		},
		data: function() {
			return {
				filterTerm: ''
			}
		},
		slots,
	})
}

describe('OrDropdown Single Select', () => {
	const wrapper = factory();
	const filterInputEl =  wrapper.findComponent({ ref: 'filterInput' });
	const optionsTriggerEl = wrapper.find('[data-testid="options-trigger"]');
	const optionsListEl = wrapper.find('.or-dropdown-list');

	it('has options in dom', () => {
		options.forEach(option => {
			expect(wrapper.html()).toContain(option.label);
			expect(wrapper.html()).toContain(option.value);
		})
	})

	it('uses optionLabel prop for text display', () => {
		const optionWrapper = factory({ optionLabel: "label" });
		options.forEach(option => {
			expect(optionWrapper.html()).toContain(option.label)
			expect(optionWrapper.html()).not.toContain(option.value)
		})
	})

	it('has options hidden', () => {
		expect(wrapper.find('.or-dropdown-list').classes()).not.toContain('show');
	})

	it('displays options list', async () => {
		await optionsTriggerEl.trigger('click');
		expect(optionsListEl.classes()).toContain('show');
	})

	it('sets selected value', async() => {
		await wrapper.find('.or-dropdown-item').trigger('click');

		const { label, value } = options[0];
		expect(wrapper.find('.or-dropdown-value').html()).toContain(label)
		expect(wrapper.find('.or-dropdown-value').html()).toContain(value)
	})

	it('filters options', async () => {
		await filterInputEl.setValue(options[1].label);
		expect(optionsListEl.html()).not.toContain(options[0].label);
	})

	it('hides options when list root nodes are not clicked', async () => {
		await optionsTriggerEl.trigger('click');
		expect(optionsListEl.classes()).not.toContain('show');
	})

	it('emits correct correct update value', async () => {
		await wrapper.find('.or-dropdown-item').trigger('click');
		expect(wrapper.emitted('update:modelValue')![0]).toEqual([options[0]]);
	})

	it('displays options with optionLabel prop when its provided', () => {
		const options = [{ firstname: 'chidi', lastname: 'ikeoha' }, { firstname: 'kish', lastname: 'ikeoha' }]
		const wrapper = factory({ options, optionLabel: 'firstname' })

		options.forEach(option => {
			expect(wrapper.html()).toContain(option.firstname);
			expect(wrapper.html()).not.toContain(option.lastname);
		})
	})

	it('sets value to optionValue prop when its provided', async () => {
		const options = [{ firstname: 'chidi', lastname: 'ikeoha' }, { firstname: 'kish', lastname: 'ikeoha' }]
		const wrapper = factory({ options, optionValue: 'firstname' })

		await wrapper.find('.or-dropdown-item').trigger('click');
		expect(wrapper.emitted('update:modelValue')![0]).toEqual([options[0].firstname])
	})

	it('formats items to slot specs', () => {
		const slotWrapper = factory({ modelValue: options[0] }, {
			value: `
				<template #value="{ selected }">
					{{ selected.label }}
				</template>
			`,
			option: `
				<template #option="{ option }">
					{{ option.label }}
				</template>
			`
		})

		options.forEach(option => {
			expect(slotWrapper.html()).toContain(option.label);
			expect(slotWrapper.html()).not.toContain(option.value);
		})
	})
})

describe('OrDropdown Multi Selection', () => {
	const wrapper = factory({
		options,
		multi: true,
		modelValue: [options[0]]
	});

	it('sets default value on mounted', async () => {
		expect(wrapper.find('.or-dropdown-value').html()).toContain(options[0].label);
		expect(wrapper.find('.or-dropdown-value').html()).toContain(options[0].value);
	})

	it('emits all multiple selected items', async () => {
		const items = wrapper.findAll('.or-dropdown-item').slice(1);

		for (const item of items) {
			await item.trigger('click');
		}

		expect(wrapper.emitted('update:modelValue')![items.length - 1]).toEqual([options])
	})

	it('displays texts with optionLabel prop', async () => {
		await wrapper.setProps({ optionLabel: 'label' });
		options.forEach(option => {
			expect(wrapper.html()).toContain(option.label);
			expect(wrapper.html()).not.toContain(option.value);
		})
	})
})