import { mount } from "@vue/test-utils";
import { OrCheckbox } from "@/plugin";

const wrapper = mount(OrCheckbox, {
	attachTo: document.body,
	props: {
		modelValue: ["orange", "pepper"],
		value: "orange"
	},
	slots: {
		default: "fruits"
	}
})

describe("OrCheckbox", () => {
	it('renders slot content', () => {
		expect(wrapper.html()).toContain('fruits');
	})

	it("doesn't display switch in default mode", () => {
		expect(wrapper.find('.or-switch').exists()).toBeFalsy();
	})

	it('emits update event', async () => {
		await wrapper.find('.or-checkbox-label').trigger('click');
		const emitted = wrapper.emitted()

		expect(emitted).toHaveProperty('update:modelValue');
	})
})