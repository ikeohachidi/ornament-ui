import { mount } from '@vue/test-utils';
import { OrPulsingLoader, OrButton } from '@/plugin';

const slotContent = 'Primary Button';
const wrapper = mount(OrButton, {
	global: {
		components: {
			'or-pulsing-loader': OrPulsingLoader
		}
	},
	slots: {
		default: slotContent 
	}
});

describe('OrButton', () => {
	it('renders default slot content', () => {
		expect(wrapper.html()).toContain(slotContent)
	})

	it('emits events', async() => {
		await wrapper.trigger('click');
		expect(wrapper.emitted('click')).toBeTruthy();
	})

	it('disables button and shows loading indicator', async() => {
		await wrapper.setProps({ isLoading: true });
		expect(Object.keys(wrapper.attributes()).includes('disabled')).toBeTruthy();
	})
})