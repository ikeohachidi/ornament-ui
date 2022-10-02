import { shallowMount } from '@vue/test-utils';
import OrSlider from '.';

const factory = (props = {}, slots = {}) => {
	return shallowMount(OrSlider, {
		props: {
			modelValue: 0,
			...props
		},
		slots: {...slots}
	});
}

describe('OrSlider', () => {
	it('renders properly on smooth sliding', async () => {
		const wrapper = factory();

		const thumb = wrapper.find("[data-testid='or-slider-thumb']");
		const marker = wrapper.find("[data-testid='or-slider-marker']");

		expect(thumb.exists()).toBeTruthy();
		expect(marker.exists()).toBeFalsy();
	});

	it('renders when using steps sliding behaviour', async () => {
		const steps = 4;
		const wrapper = factory({
			steps,
			showMarkers: true
		});

		const thumb = wrapper.find("[data-testid='or-slider-thumb']");
		const markers = wrapper.findAll("[data-testid='or-slider-marker']");

		expect(thumb.exists()).toBeTruthy();
		expect(markers.length).toEqual(steps);
	});

	// TODO: can't figure out how to test mousemove and in turn update:modelValue
});