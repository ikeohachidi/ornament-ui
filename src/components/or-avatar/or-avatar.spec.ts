import { shallowMount } from "@vue/test-utils";
import { OrAvatar } from "@/plugin";
import { Size, RadiusSize } from "@/types/Size";

const wrapper = shallowMount(OrAvatar, {
	props: {
		text: 'Naru Designs',
		cornerRadius: Size.LG
	}
});

describe('OrAvatar', () => {
	it ('renders proper initials when image prop is empty', () => {
		expect(wrapper.html()).toContain('N D');
	})

	it ('should have a border rounding with specified radius', () => {
		expect(wrapper.find('.or-avatar-img')
			.attributes('style'))
			.toContain(`border-radius: ${RadiusSize.lg}`);
	})
})