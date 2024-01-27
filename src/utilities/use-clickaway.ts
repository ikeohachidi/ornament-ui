import type { Ref } from 'vue';
import { watch } from 'vue';

const useClickAway = (parentEl: Ref<HTMLElement | undefined>, callback: () => void) => {
	watch(parentEl, (el) => {
		if (el) {
			window.addEventListener('click', (event: Event) => {
				const target = event.target as HTMLElement;
				if (!target) return;

				isElementChild(target as Element, el) ? () => {} : callback();
			}, true);
		}
	});
}

const isElementChild = (target: Element, element: Element): boolean => {
	if (target.isSameNode(element)) return true;

	if (element.hasChildNodes()) {
		for (const child of Array.from(element.children)) {
			return isElementChild(target, child);
		}
	}

	return false;
}

export default useClickAway;