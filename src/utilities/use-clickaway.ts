const useClickAway = (parentEl: HTMLElement, callback: Function) => {
	window.addEventListener('click', (event: Event) => {
		const target = event.target as HTMLElement;
		if (!target) return;

		isElementChild(target as Element, parentEl) ? () => {} : callback();
	})
}

const isElementChild = (target: Element, element: Element): boolean => {
	if (target.isSameNode(element)) return true;

	if (element.hasChildNodes()) {
		for (const child of Array.from(element.children)) {
			if (isElementChild(target, child)) return true;
		}
	}

	return false;
}

export default useClickAway;