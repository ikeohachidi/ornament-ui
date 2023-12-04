import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import OrSelect from '.';

const options = [
	{ firstname: 'chidi', lastname: 'ikeoha' },
	{ firstname: 'kish', lastname: 'ikeoha' }
];

const factory = (props = {}, slots = {}) => {
	return shallowMount(OrSelect, {
		attachTo: document.body,
		props: {
			modelValue: options[0],
			options,
			...props
		},
		slots: {...slots}
	})
}

describe('OrSelect', () => {
	it('has options props in dom', () => {
		const wrapper = factory();
		options.forEach(option => {
			expect(wrapper.html()).toContain(option.firstname);
			expect(wrapper.html()).toContain(option.lastname);
		})
	})

	it('emits update event with correct value when options is clicked', async () => {
		const wrapper = factory();
		const optionsEl = wrapper.find('option:first-of-type');

		await optionsEl.trigger('click');
		expect(wrapper.emitted('update:modelValue')![0]).toEqual([options[0]])
	})

	it('it renders options on optionLabel props', () => {
		const wrapper = factory({ optionLabel: 'firstname' });
		options.forEach(option => {
			expect(wrapper.html()).toContain(option.firstname);
			expect(wrapper.html()).not.toContain(option.lastname);
		})
	})

	it('uses optionValue when emitting updates', async () => {
		const wrapper = factory({ optionValue: 'lastname', modelValue: options[0].lastname });

		await wrapper.find('option:last-of-type').trigger('click');
		expect(wrapper.emitted('update:modelValue')![0]).toEqual([options[1].lastname])
	})
})