import { mount } from "@vue/test-utils";
import OrVerticalMenu, { MenuNode } from '.';

const menu = [
	{
		text: 'Primary',
		children: [
			{ icon: 'user-fill', text: 'User', onClick: () => {} },
			{ icon: 'shield-line', text: 'Security', children: [
				{ text: 'Keys' },
				{ text: 'Environment' },
			]}
		]
	},
	{
		text: '',
		icon: 'user-2-fill',
		children: [
			{ icon: 'user-fill', text: 'User', onClick: () => {} },
			{ icon: 'shield-line', text: 'Security' }
		]
	}
]

const factory = (props = {}, slots = {}) => {
	return mount(OrVerticalMenu, {
		global: {
			components: {
				'menu-node': MenuNode
			},
		},
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
		menu.forEach(node => {
			expect(wrapper.html()).toContain(node.text);
			if (node.icon) expect(wrapper.html()).toContain(node.text);
		})
	})

	it('doesn\'t render slot content wrapper element when slots aren\'t given', () => {
		const wrapper = factory();
		expect(wrapper.find('.or-vertical-menu-header').exists()).toBeFalsy();
		expect(wrapper.find('.or-vertical-menu-footer').exists()).toBeFalsy();
	})

	it('sets menu dimensions', async () => {
		const wrapper = factory();
		const menuEl = wrapper.find('.or-vertical-menu');

		expect(menuEl.attributes()['style']).toContain('height: 100%');

		await wrapper.setProps({ width: 'full', height: 400 });
		expect(wrapper.attributes()['style']).toContain('height: 400px');
		expect(wrapper.attributes()['style']).toContain('width: 100%');
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