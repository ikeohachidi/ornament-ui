import { shallowMount } from '@vue/test-utils';
import { OrChips } from '@/plugin';

const wrapper = shallowMount(OrChips, {
	props: {
		modelValue: ['orange', 'pepper'],
		removeable: true
	}
})

describe('OrChips', () => {
	it('displays content', () => {
		expect(wrapper.html()).toContain("orange")
		expect(wrapper.html()).toContain("pepper")
	})

	it('removes item on close element click', async () => {
		await wrapper.find('.close:first-of-type').trigger('click');

		expect(wrapper.emitted()).toHaveProperty('update:modelValue')
		expect(wrapper.emitted('update:modelValue')![0]).toMatchObject([['pepper']])
	})

	it('hides the element that triggers closing', async() => {
		await wrapper.setProps({ removeable: false });

		expect(wrapper.find('.close').exists()).toBeFalsy();
	})
})