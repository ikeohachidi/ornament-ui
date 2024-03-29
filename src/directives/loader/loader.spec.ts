import { VNode, h, withDirectives } from 'vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import loadingDirective, { elementId }  from '.';

const component = shallowMount({
	data() {
		return {
			isLoading: true
		}
	},
	render(): VNode {
		return withDirectives(h('div'), [
			// @ts-ignore
			[loadingDirective, this.isLoading, 'circular']
		])
	}
});

describe('LoaderDirective', () => {
	it ('renders overlay component', () => {
		expect(component.html()).toContain(elementId)
	})

	it('doesn\'t render overlay', async() => {
		await component.setData({ isLoading: false });
		expect(component.html()).not.toContain(elementId);
	});
})