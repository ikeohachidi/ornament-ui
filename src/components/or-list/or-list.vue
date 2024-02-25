<template>
	<ul class="or-list">
		<li class="or-list-header" v-if="slots.header">
			<slot name="header"></slot>
		</li>

		<template v-if="items && items.length">
			<or-list-item
				v-for="(item, itemIndex) in items"
				:key="itemIndex"
				:header="item.header"
				:body="item.body"
			>
				<template #prefix v-if="slots.prefix">
					<slot name="prefix" :data="item"></slot>
				</template>
				<slot name="item" :data="item"></slot>
				<template #suffix v-if="slots.suffix">
					<slot name="suffix" :data="item"></slot>
				</template>
			</or-list-item>
		</template>

		<template v-else>
			<component
				v-for="(slot, index) in featuredSlots"
				:key="index"
				:is="slot"
			></component>
		</template>

		<li class="or-list-footer" v-if="slots.footer">
			<slot name="footer"></slot>
		</li>
	</ul>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import useDefaultSlots from "@/utilities/use-default-slots";
import { OrListItem } from '.';

defineProps<{
	items?: {
		header: string
		body: string
	}[];
}>()

const defaultSlots = useDefaultSlots();
const slots = useSlots();

const featuredSlots = computed(() => {
	if (defaultSlots.length === 0) return [];

	return defaultSlots.filter(slot => slot.type === OrListItem);
}) 
</script>

<style lang="scss" scoped>
.or-list {
	border: 1px solid var(--color-gray-2);
	overflow: hidden;
	border-radius: var(--radius-1);
	margin: 0;

	&-header, &-footer {
		padding: 10px;
	}
}
</style>