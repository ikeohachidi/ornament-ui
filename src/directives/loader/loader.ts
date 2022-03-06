import { Directive, DirectiveBinding, VNode, createApp } from 'vue';
import { OrPulsingLoader, OrCircularLoader } from '@/components/or-loaders';

const quickStyle = (element: HTMLElement, style: Partial<CSSStyleDeclaration>) => {
	Object.keys(style).forEach(prop => {
		// @ts-ignore
		element.style[prop] = style[prop];
	})
}

const mountOverlay = (el: HTMLElement, { value, arg }: DirectiveBinding) => {
	const elementId = 'or-element-loader-overlay';
	const overlay = document.createElement('div');
	overlay.id = elementId;

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

	const loader = createApp(arg === 'circular' ? OrCircularLoader : OrPulsingLoader);
	loader.mount(overlay);

	if (value) {
		el.appendChild(overlay);
	} else {
		const f = el.querySelector(`#${elementId}`);
		if (f) el.removeChild(f);
	}
}

const loadingDirective: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		quickStyle(el, {
			position: 'relative'
		});

		mountOverlay(el, binding)
	},
	updated(el: HTMLElement, binding: DirectiveBinding) {
		mountOverlay(el, binding);
	}
}

export default loadingDirective;