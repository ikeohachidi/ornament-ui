import { mount } from "@vue/test-utils";
import OrRadio from ".";

const wrapper = mount(OrRadio, {
	attachTo: document.body,
	props: {
		modelValue: '',
		value: 'orange' 
	},
	slots: {
		default: 'Fruits'
	}
})

describe('OrRadio', () => {
	it('renders slot', () => {
		expect(wrapper.html()).toContain('Fruits')
	})

	it('emits update event', async () => {
		await wrapper.find('.or-radio-label').trigger('click');

		expect(wrapper.emitted('update:modelValue')![0]).toEqual(['orange']);
		expect(wrapper.find('.or-radio').attributes()).not.toHaveProperty('checked')
	})
})