import { Directive, DirectiveBinding, VNode, createApp } from 'vue';
import { OrPulsingLoader, OrCircularLoader } from '@/components/or-loaders';

const quickStyle = (element: HTMLElement, style: Partial<CSSStyleDeclaration>) => {
	Object.keys(style).forEach(prop => {
		// @ts-ignore
		element.style[prop] = style[prop];
	})
}

const loadingDirective: Directive = {
	mounted(el: HTMLElement, { arg }: DirectiveBinding) {
		quickStyle(el, {
			position: 'relative'
		});

		const overlay = document.createElement('div');

		quickStyle(overlay, {
			position: 'absolute',
			top: '0',
			bottom: '0',
			left: '0',
			right: '0',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			background: 'rgba(0, 0, 0, 0.274)'
		})

		const app = createApp(arg === 'circular' ? OrCircularLoader : OrPulsingLoader)

		app.mount(overlay)
		el.appendChild(overlay)
	}
}

export default loadingDirective;