import { mount } from "@vue/test-utils";
import { OrInput } from ".";

const props = {
	beforeIcon: 'home-fill',
	afterIcon: 'home-line'
};

const factory = (props = {}, slots = {}) => {
	return mount(OrInput, {
		props,
		slots,
	});
}

describe("OrInput", () => {
	let wrapper = factory(props)

	it('emits update event', async () => {
		await wrapper.find('.or-input').setValue('sm');
		expect(wrapper.emitted()).toHaveProperty('update:modelValue');
	})

	it('displays side icons', () => {
		Object.values(props).forEach(icon => {
			expect(wrapper.html()).toContain(`ri-${icon}`);
		})
	})

	it('hides icons and position slots', () => {
		const slots = {
			prefix: '<p>orange</p>',
			suffix: '<p>pepper</p>',
		};

		wrapper = factory(props, slots)

		Object.values(slots).forEach(slot => {
			expect(wrapper.html()).toContain(slot);
		})
	})

	it('should clear values when clear icon is clicked', async () => {
		const wrapper = factory({ clear: true })
		await wrapper.find('[data-testid="after-icon"]').trigger('click')

		expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
	})

	it('should have appropriate state class', async () => {
		await wrapper.setProps({ state: 'success' });

		const inputWrapperEl = wrapper.find('.or-input-wrapper');
		expect(inputWrapperEl.classes()).toContainEqual('success')

		await wrapper.setProps({ state: 'error' });
		expect(inputWrapperEl.classes()).toContainEqual('error')
	})
})