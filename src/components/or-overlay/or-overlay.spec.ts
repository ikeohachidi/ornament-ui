import { mount } from '@vue/test-utils';
import OrOverlay from '.';

const factory = (props = {}, slots = {}) => {
	return mount(OrOverlay, { 
		attachTo: document.body,
		props,
		slots,
	});
}

describe('OrOverlay', () => {
	it ('renders backdrop', () => {
		const component = factory()
		const backdropEl = component.find('[data-testid="backdrop"]');
		expect(backdropEl).toBeTruthy();
	})

	it ('doesn\'t render backdrop', () => {
		const component = factory({
			hasBackdrop: false 
		})
		const backdropEl = component.find('[data-testid="backdrop"]');
		expect(backdropEl.exists()).toBeFalsy();
	})
})