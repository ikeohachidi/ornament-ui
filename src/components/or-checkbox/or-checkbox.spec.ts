import { mount } from "@vue/test-utils";
import { OrCheckbox } from "@/plugin";

const wrapper = mount(OrCheckbox, {
	attachTo: document.body,
	props: {
		modelValue: ["orange", "pepper"],
		value: "orange"
	},
})

describe("OrCheckbox", () => {
	it("doesn't display switch in default mode", () => {
		expect(wrapper.find('.or-switch').exists()).toBeFalsy();
	})

	it('emits update:modelvalue event on change and takes action', async () => {
		await wrapper.find('.or-checkbox-label').trigger('click');

		expect(wrapper.emitted()).toHaveProperty('update:modelValue');
	})
})