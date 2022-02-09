import { mount } from '@vue/test-utils';
import OrButton from '.';
import { OrPulsingLoader } from '@/components/or-loaders';

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
		expect(wrapper.findComponent({ ref: 'loader' }).exists()).toBeTruthy();
	})
})