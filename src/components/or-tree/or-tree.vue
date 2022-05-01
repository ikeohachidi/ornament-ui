<template>
	<ul class="or-tree">
		<li
			class="or-tree-node"
			v-for="(node, nodeIndex) in nodes" 
			:key="`${ nodeIndex }-${ uniqueKey() }`"
		>
			<p 
				class="or-tree-metadata"
				:class="{'_has_child': node.children && node.children.length > 0}"
			>
				<span class="collapse-activator">
					<i 
						class="ri-arrow-down-s-fill" 
						v-if="node.children && node.children.length > 0"
					></i>
				</span>
				<span>{{ node.label }}</span>
			</p>

			<or-tree
				v-if="node.children"
				:_isChild="true"
				:nodes="node.children"
			/>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { onMounted, useSlots } from 'vue';
import { Events, Node } from '.';
import { emitter } from '@/utilities/use-shared-event';

interface Props {
	nodes: Node[];
	_isChild: boolean;
	nodeClick?: (node: Node) => void;
}

const props = withDefaults(defineProps<Props>(), {
	nodeClick: (node: Node) => {},
	_isChild: false
})

const getTrackerHeight = (index: number): string => {
	if (index === 0) {
		return '15%'
	}

	return `${ 100 / (index + 1.1)}%`
}

const emits = defineEmits<{
	(e: Events.NODE_CLICK, value: Node): void
}>()

const slots = useSlots();

const uniqueKey = () => {
	return `key-${Date.now()}`
}

onMounted(() => {
	emitter.on(Events.NODE_CLICK, (node: Node) => { emits(Events.NODE_CLICK, node) })
})
</script>

<style lang="scss" scoped>
@import "@/scss/color.scss";

.or-tree:deep(.or-tree) {
	margin-left: 8px;

	.or-tree {
		margin-left: 18px;
	}
	
	.or-tree-node {
		&:after {
			position: absolute;
			content: "";
			left: 0;
			top: 0%;
			bottom: 0;
			border-left: 1px solid $color-gray-1;
			width: 16px;
		}

		&:last-child:after {
			border-left: none !important;
		}
	}

	.or-tree-metadata {

		position: relative;
		padding-left: 10px;
	
		&:before {
			position: absolute;
			content: "";
			left: 0;
			top: 50%;
			border-top: 1px solid $color-gray-1;
			width: 10px;
		}
	
		&:after {
			position: absolute;
			content: "";
			left: 0px;
			top: -30%;
			bottom: 0;
			border-left: 1px solid $color-gray-1;
			width: 13px;
		}
	
		&._has_child:before {
			width: 10px;
		}
	}
}

.or-tree {
	position: relative;

	& ul, & li {
		list-style: none;
	}

	> .or-tree-node:last-child {
		> .or-tree-metadata:after {
			bottom: 50%;
		}
	}

	&-node {
		position: relative;
	}

	&-metadata {
		display: flex;
		margin: 0;
		padding: 5px 0;
		align-items: center;

		.collapse-activator {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 17px;
			cursor: pointer;
		}
	}
}
</style>