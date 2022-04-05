import { shallowMount } from "@vue/test-utils";
import OrSwitch from './index';

const factory = (data: {}) => {
	return shallowMount(OrSwitch, {
		data() {
			return data 
		}
	})
}

// should have array support
// should support true or false values too
// should support unchecked value emission
// should also use checked state of input element to add active button 
// should support checkedValue prop

describe('OrSwitch', () => {
	it('should not have active classes and attributes when false', () => {
		const component = factory({
			modelValue: false,
		});

		const switchEl = component.find('label[data-testid="or-switch"]');
		const inputEl = component.find('label[data-testid="or-switch-input"]');

		expect(switchEl.classes).not.toContain('active');
		expect(inputEl.attributes('checked')).toBeFalsy();
	})

	it('should have active classes when true', () => {
		const component = factory({
			modelValue: true 
		});

		const switchEl = component.find('label[data-testid="or-switch"]');
		const inputEl = component.find('label[data-testid="or-switch-input"]');

		expect(switchEl.classes).toContain('active');
		expect(inputEl.attributes('checked')).toBeTruthy();
	})

	it('should support array update when modelValue is an array (no unchecked value provided)', async () => {
		const component = factory({
			modelValue: [],
			checkedValue: 'orange' 
		});

		const switchEl = component.find('label[data-testid="or-switch"]');

		await switchEl.trigger('click');

		expect(component.emitted('update:modelValue')![0]).toContain([['orange']]);

		await switchEl.trigger('click');

		// should simply remove the value of checkedValue prop from the emitted array
		expect(component.emitted('update:modelValue')![1]).toContain([[]]);
	
		await component.setData({ uncheckedValue: 'mango' })

		await switchEl.trigger('click');
		await switchEl.trigger('click');

		expect(component.emitted('update:modelValue')![4]).toContain([['mango']]);
	})

	it('should support emission of non array unchecked value', async () => {
		const component = factory({
			modelValue: 'orange',
			checkedValue: 'orange',
			uncheckedValue: 'mango'
		});

		const switchEl = component.find('label[data-testid="or-switch"]');

		await switchEl.trigger('click');

		expect(component.emitted('update:modelValue')![0]).toContain(['mango']);

		await switchEl.trigger('click');

		expect(component.emitted('update:modelValue')![1]).toContain(['orange']);
	})

	it('should not have active classes if modelValue is unchecked value', async () => {
		const component = factory({
			modelValue: 'mango',
			checkedValue: 'orange',
			uncheckedValue: 'mango'
		});

		const switchEl = component.find('label[data-testid="or-switch"]');
		const inputEl = component.find('label[data-testid="or-switch-input"]');

		expect(switchEl.classes).not.toContain('active');
		expect(inputEl.attributes('checked')).toBeFalsy();

		await component.setData({
			modelValue: [],
		})

		await component.trigger('click')

		// should be checked at this point
		expect(switchEl.classes).toContain('active');
		expect(inputEl.attributes('checked')).toBeTruthy();
		
		await component.trigger('click')

		expect(switchEl.classes).not.toContain('active');
		expect(inputEl.attributes('checked')).toBeFalsy();
	})
})