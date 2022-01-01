import OrVerticalMenu from './or-vertical-menu.vue';
import MenuNode from './menu-node.vue';

interface Group {
	name?: string;
	icon?: string;
	children?: Node[];
}

interface Node {
	text?: string;
	icon?: string;
	collapsed?: boolean;
	action: (node: Node) => unknown;
	children: Node[];
}

enum Events {
	NODE_CLICK = 'node-click'
}

export {
	Group,
	Node,
	Events,
	MenuNode
}

export default OrVerticalMenu