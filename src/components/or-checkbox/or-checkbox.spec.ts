import { mount } from "@vue/test-utils";
import { describe, it, expect } from 'vitest';
import OrCheckbox from ".";

const factory = (props = {}, slots = {}) => {
	return mount(OrCheckbox, {
		attachTo: document.body,
		props: {
			modelValue: ["orange", "pepper"],
			value: "orange",
			...props,
		},
		slots: {
			default: "fruits",
			...slots
		}
	});
}

describe("OrCheckbox", () => {
	it('sets proper elment checked state on mounted', () => {
		const wrapper = factory();
		expect((wrapper.find('[data-testid="or-checkbox"]').element as HTMLInputElement).checked).toBeTruthy();
	})

	it('renders slot content', () => {
		const wrapper = factory();
		expect(wrapper.html()).toContain('fruits');
	})

	it("doesn't display switch in default mode", () => {
		const wrapper = factory();
		expect(wrapper.find('.or-switch').exists()).toBeFalsy();
	})

	it('emits update event', async () => {
		const wrapper = factory();

		await wrapper.find('.or-checkbox-label').trigger('click');
		expect(wrapper.emitted('update:modelValue')![0]).toEqual([['pepper']])
	})

	it('can work properly with primitive modelValue', async () => {
		const wrapper = factory({ modelValue: 'orange' });
		await wrapper.find('.or-checkbox-label').trigger('click');
		expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])

		await wrapper.find('.or-checkbox-label').trigger('click');
		expect(wrapper.emitted('update:modelValue')![1]).toEqual(['orange'])
	})

	it('uses unchecked value', async () => {
		const wrapper = factory({ uncheckedValue: 'lemon' });

		await wrapper.find('.or-checkbox-label').trigger('click');
		expect(wrapper.emitted('update:modelValue')![0]).toEqual([['pepper', 'lemon']])
	})
})