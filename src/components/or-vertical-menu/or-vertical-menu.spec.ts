import { mount } from "@vue/test-utils";
import { OrVerticalMenu } from '@/plugin';

const menu = [
	{
		name: 'Primary',
		children: [
			{ icon: 'user-fill', text: 'User', onClick: () => {} },
			{ icon: 'shield-line', text: 'Security', children: [
				{ text: 'Keys' },
				{ text: 'Environment' },
			]}
		]
	},
	{
		name: '',
		children: [
			{ icon: 'user-fill', text: 'User', onClick: () => {} },
			{ icon: 'shield-line', text: 'Security' }
		]
	}
]

const factory = (props = {}, slots = {}) => {
	return mount(OrVerticalMenu, {
		props: {
			menu,
			...props
		},
		slots
	})
}

describe('OrVerticalMenu', () => {
	it('DOM has content', () => {
		const wrapper = factory();
		expect(wrapper.html()).toContain('Primary');
		expect(wrapper.html()).toContain('Security');
	})

	it('doesn\'t render slot content wrapper element when slots aren\'t given', () => {
		const wrapper = factory();
		expect(wrapper.find('.or-vertical-menu-header').exists()).toBeFalsy();
		expect(wrapper.find('.or-vertical-menu-footer').exists()).toBeFalsy();
	})

	it('displays slots content', () => {
		const slots = {
			header: '<p>Header Slot</p>',
			footer: '<p>Footer Slot</p>',
		};
		const wrapper = factory({}, slots);
		expect(wrapper.find('.or-vertical-menu-header').html()).toContain(slots.header);
		expect(wrapper.find('.or-vertical-menu-footer').html()).toContain(slots.footer);
	})
})