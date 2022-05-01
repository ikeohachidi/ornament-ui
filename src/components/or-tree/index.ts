import OrTree from './or-tree.vue';

interface Node {
	label: string;
	collapsed?: boolean;
	action?: (node: Node) => unknown;
	children?: Node[]
}

enum Events {
	NODE_CLICK = 'node-click'
}

export {
	Node,
	Events,
}

export default OrTree;