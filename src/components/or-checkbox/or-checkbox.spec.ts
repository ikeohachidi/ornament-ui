import { mount } from "@vue/test-utils";
import { OrCheckbox } from "@/plugin";

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

	it('displays swtich on switch mode and hides checkbox', async () => {
		const wrapper = factory({ modelValue: 'orange', switch: true });
		await wrapper.setProps({ switch: true });

		expect(wrapper.find('.or-switch').exists()).toBeTruthy();
		expect(wrapper.find('.or-checkbox-label').exists()).toBeFalsy();
	})

	it('uses unchecked value', async () => {
		const wrapper = factory({ uncheckedValue: 'lemon' });

		await wrapper.find('.or-checkbox-label').trigger('click');
		expect(wrapper.emitted('update:modelValue')![0]).toEqual([['pepper', 'lemon']])
	})
})