import OrVerticalMenu from './or-vertical-menu.vue';
import MenuNode from './menu-node.vue';
interface Node {
	text?: string;
	icon?: string;
	collapsed?: boolean;
	action?: (node: Node) => unknown;
	children?: Node[];
}

enum Events {
	NODE_CLICK = 'node-click'
}

export {
	Node,
	Events,
	MenuNode
}

export default OrVerticalMenu