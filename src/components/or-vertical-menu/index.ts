import OrVerticalMenu from './or-vertical-menu.vue';
import MenuNode from './menu-node.vue';

interface Group {
	name?: string;
	icon?: string;
	children?: Child[];
}

interface Child {
	text?: string;
	icon?: string;
	children: Child[];
}

interface Node {
	text?: string;
	icon?: string;
	action: () => unknown;
	children: Child[];
}

enum Events {
	NODE_CLICK = 'node-click'
}

export {
	Group,
	Child,
	Node,
	Events,
	MenuNode
}

export default OrVerticalMenu