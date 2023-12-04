import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from 'vitest';
import OrSwitch from '.';

const factory = (props: {}) => {
	return shallowMount(OrSwitch, {
		attachTo: document.body,
		props: {
			modelValue: true,
			checkedValue: false,
			...props
		}
	});
}

describe('OrSwitch', () => {
	it('should not have active classes and attributes when false', () => {
		const component = factory({
			modelValue: false,
			checkedValue: true
		});

		const inputEl = component.find('[data-testid="or-switch-input"]');

		expect((inputEl.element as HTMLInputElement).checked).toBeFalsy();
	})

	it('should have active classes when true', () => {
		const component = factory({
			modelValue: true,
			checkedValue: true
		});

		const inputEl = component.find('[data-testid="or-switch-input"]');

		expect((inputEl.element as HTMLInputElement).checked).toBeTruthy();
	})

	it('should support array update when modelValue is an array (no unchecked value provided)', async () => {
		const component = factory({
			modelValue: [],
			checkedValue: 'orange' 
		});

		const switchEl = component.find('label[data-testid="or-switch"]');

		await switchEl.trigger('click');

		expect(component.emitted('update:modelValue')![0]).toEqual([['orange']]);

		await switchEl.trigger('click');

		// should simply remove the value of checkedValue prop from the emitted array
		expect(component.emitted('update:modelValue')![1]).toEqual([[]]);
	
		await component.setProps({ uncheckedValue: 'mango' })

		await switchEl.trigger('click');
		await switchEl.trigger('click');

		expect(component.emitted('update:modelValue')![3]).toEqual([['mango']]);
	})

	it('should support emission of non array unchecked value', async () => {
		const component = factory({
			modelValue: 'orange',
			checkedValue: 'orange',
			uncheckedValue: 'mango'
		});

		const switchEl = component.find('label[data-testid="or-switch"]');

		await switchEl.trigger('click');

		expect(component.emitted('update:modelValue')![0]).toEqual(['mango']);

		await switchEl.trigger('click');

		expect(component.emitted('update:modelValue')![1]).toEqual(['orange']);
	})

	it('should handle emitting correct values in when modelValue is an array', async() => {
		const component = factory({
			modelValue: [],
			checkedValue: 'orange',
			uncheckedValue: 'mango'
		})

		const inputEl = component.find('[data-testid="or-switch-input"]').element as HTMLInputElement;
		const switchEl = component.find('[data-testid="or-switch"]');
	
		await switchEl.trigger('click');
		expect(component.emitted('update:modelValue')![0]).toEqual([['orange']])

		await switchEl.trigger('click');
		expect(component.emitted('update:modelValue')![1]).toEqual([['mango']])

		// -- prop set
		await component.setProps({
			modelValue: ['apple']
		})

		await switchEl.trigger('click');
		expect(component.emitted('update:modelValue')![2]).toEqual([['apple', 'orange']])

		await switchEl.trigger('click');
		expect(component.emitted('update:modelValue')![3]).toEqual([['apple', 'mango']])

		// -- prop set
		await component.setProps({
			modelValue: ['apple'],
			uncheckedValue: undefined
		})

		await switchEl.trigger('click');
		expect(component.emitted('update:modelValue')![4]).toEqual([['apple', 'orange']])

		await switchEl.trigger('click');
		expect(component.emitted('update:modelValue')![5]).toEqual([['apple']])
	})
})