import { shallowMount } from '@vue/test-utils';
import { OrAccordionBody } from '@/plugin';

const title = "accordion title";
const body = 'accordion body';
const wrapper = shallowMount(OrAccordionBody, {
	props: { title },
	slots: {
		default: ''
	}
})

describe('OrAccordionBody', () => {
	it('displays accordion title', () => {
		expect(wrapper.html()).toContain(title);
	})

	it('displays accordion body', () => {
		expect(wrapper.html()).toContain('body')
	})

	it('emits selection change event', async () => {
		await wrapper.find('[data-testid="title"]').trigger('click');

		expect(wrapper.emitted('selectionChange')).toBeTruthy();
	})
})