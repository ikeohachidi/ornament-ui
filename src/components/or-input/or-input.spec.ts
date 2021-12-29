import { mount } from "@vue/test-utils";
import { OrInput } from "@/plugin";

const props = {
	beforeIcon: 'home-fill',
	afterIcon: 'home-line'
};

const factoryWrapper = (props = {}, slots = {}) => {
	return mount(OrInput, {
		props,
		slots,
	});
}

describe("OrInput", () => {
	let wrapper = factoryWrapper(props)

	it('emits update event', async () => {
		await wrapper.find('.or-input').setValue('sm');
		expect(wrapper.emitted()).toHaveProperty('update:modelValue');
	})

	it('displays side icons', () => {
		Object.values(props).forEach(icon => {
			expect(wrapper.html()).toContain(`class="ri-${icon}"`);
		})
	})

	it('hides icons and position slots', () => {
		const slots = {
			before: '<p>orange</p>',
			after: '<p>pepper</p>',
		};

		wrapper = factoryWrapper(props, slots)

		Object.values(slots).forEach(slot => {
			expect(wrapper.html()).toContain(slot);
		})
	})
})