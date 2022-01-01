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
	showContent?: boolean;
	action: (node: Node) => unknown;
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