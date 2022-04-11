import { shallowMount } from "@vue/test-utils";
import OrSwitch from './index';

const factory = (props: {}) => {
	return shallowMount(OrSwitch, {
		attachTo: document.body,
		props,
	})
}

describe('OrSwitch', () => {
	it('should not have active classes and attributes when false', () => {
		const component = factory({
			modelValue: false,
		});

		const inputEl = component.find('[data-testid="or-switch-input"]');

		expect((inputEl.element as HTMLInputElement).checked).toBeFalsy();
	})

	it('should have active classes when true', () => {
		const component = factory({
			modelValue: true,
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

	it('should not have active classes if modelValue is unchecked value', async () => {
		const component = factory({
			modelValue: 'mango',
			checkedValue: 'orange',
			uncheckedValue: 'mango'
		});

		const inputEl = component.find('[data-testid="or-switch-input"]').element as HTMLInputElement;
		const switchEl = component.find('[data-testid="or-switch"]');

		expect(inputEl.checked).toBeFalsy();

		await component.setProps({
			modelValue: [],
			checkedValue: 'orange',
			uncheckedValue: 'mango'
		})

		await switchEl.trigger('click')

		// should be checked at this point
		expect(inputEl.checked).toBeTruthy();
		
		await switchEl.trigger('click')

		expect(inputEl.checked).toBeFalsy();
	})
})