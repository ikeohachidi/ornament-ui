export interface Node {
	text?: string;
	icon?: string;
	collapsed?: boolean;
	action?: (node: Node) => unknown;
	children?: Node[];
}

export enum Events {
	NODE_CLICK = 'node-click'
}