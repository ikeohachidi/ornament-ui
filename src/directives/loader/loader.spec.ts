import { h, withDirectives } from 'vue';
import { shallowMount } from '@vue/test-utils';
import loadingDirective, { elementId }  from '.';


const component = shallowMount({
	data() {
		return {
			isLoading: true 
		}
	},
	render() {
		return withDirectives(h('div'), [
			[loadingDirective, this.isLoading, 'circular']
		])
	}
})

describe('LoaderDirective', () => {
	it ('renders overlay component', () => {
		expect(component.html()).toContain(elementId)
	})

	it('doesn\'t render overlay', async() => {
		await component.setData({ isLoading: false });
		expect(component.html()).not.toContain(elementId)
	})
})