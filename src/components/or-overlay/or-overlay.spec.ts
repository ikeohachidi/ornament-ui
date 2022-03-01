import { mount } from '@vue/test-utils';
import OrOverlay from '.';

const factory = (props = {}, slots = {}) => {
	return mount(OrOverlay, { 
		attachTo: document.body,
		props,
		slots,
		global: {
			stubs: {
				teleport: true
			}
		}
	});
}

describe('OrOverlay', () => {
	it('renders backdrop', () => {
		const component = factory()
		const backdropEl = component.find('[data-testid="backdrop"]');
		expect(backdropEl).toBeTruthy();
	})

	it('doesn\'t render backdrop', () => {
		const component = factory({
			hasBackdrop: false 
		})
		const backdropEl = component.find('[data-testid="backdrop"]');
		expect(backdropEl.exists()).toBeFalsy();
	})

	it('renders content in the right position', () => {
		const positionClasses: {[position: string]: string[]} = {
			'top-left': [],
			'top-center': ['h-middle'],
			'top-right': ['h-right'],
			'middle-left': ['v-middle'],
			'center': ['v-middle', 'h-middle'],
			'middle-right': ['v-middle', 'h-right'],
			'bottom-left': ['v-bottom'],
			'bottom-center': ['v-bottom', 'h-middle'],
			'bottom-right': ['v-bottom', 'h-right'],
		}

		for (const position in positionClasses) {
			const component = factory({
				contentPosition: position,
				show: true
			})

			const wrapper = component.find('[data-testid="wrapper"]');

			for (const cssClass of positionClasses[position]) {
				expect(wrapper.classes()).toContain(cssClass);
			}
		}
	})

	it('emits event to update show prop', async () => {
		const component = factory({
			escapeKeyClose: true,
			hasBackdrop: true,
			show: true
		})

		await component.trigger('keyup', {
			key: 'Escape',
		})

		expect(component.emitted('update:show')![0]).toEqual([false]);
	})
})