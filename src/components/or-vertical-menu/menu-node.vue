<template>
	<ul class="or-vertical-menu-children">
		<li data-testid="single-node" class="or-vertical-menu-child" v-for="(node, nodeIndex) in nodes" :key="`${nodeIndex}-uniqueKey()`">
			<div class="flex center p-1" :class="{ 'active': isNodeActive(node) }" @click.exact="onNodeClick(node, $event)">
				<slot name="node-content" :node="node">
					<i :class="`ri-${node.icon} ri-1x inline-block mr-1`" v-if="node.icon"></i>
					<span v-if="node.text">{{ node.text }}</span>
				</slot>

				<i class="ri-arrow-drop-up-line ri-lg dropdown-icon ml-auto" v-if="node.children"></i>
			</div>
			<menu-node :nodes="node.children" v-if="node.children" class="ml-3" :class="{'hidden': !node.collapsed}" v-bind="$attrs">
				<template #node-content="props: Props">
					<slot name="node-content" v-bind="props"></slot>
				</template>
			</menu-node>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import { emitter } from '@/utilities/use-shared-event';
import { uid } from 'uid';

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

type Attrs = {
	activeNodeFunc: (node: Node) => boolean;
}

type Props = {
	nodes: Node[]
}

defineProps<Props>();

const attrs = useAttrs() as Attrs;

const isNodeActive = (node: Node): boolean => attrs.activeNodeFunc ? attrs.activeNodeFunc(node) : false;

const onNodeClick = (node: Node, event: MouseEvent) => {
	emitter.emit(Events.NODE_CLICK, node).catch(err => err)

	if (node.action) node.action(node);

	const element = event.target as HTMLElement;
	if (!element) return;

	const nextSibling = element.nextElementSibling
	if (!nextSibling) return;

	nextSibling.classList.toggle('hidden');
	element.classList.toggle('collapse');
}

const uniqueKey = () => {
	return `key-${uid()}`
}
</script>

<style lang="scss" scoped>
i {
	color: #cbd0dbd5;
}

.or-vertical-menu-children {
	padding: 0;
	list-style: none;
	transition: .2s;
}

.or-vertical-menu-child {
	& > div {
		cursor: pointer;
		border-radius: 4px;

		&.active {
			background-color: var(--color-secondary);
		}
	
		* {
			pointer-events: none;
		}
	
		.dropdown-icon {
			transform: rotateZ(180deg);
			transition: .2s;
		}
	
		&.collapse .dropdown-icon {
			transform: rotateZ(0deg);
		}
	}
}

.hidden {
	max-height: 0;
	overflow-y: hidden;
}
</style>