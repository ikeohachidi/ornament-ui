<template>
	<p data-testid="title" class="or-accordion-title m-0 p-2 flex center jc-between" @click="toggleAccordion">
		<span>
			<slot name="title" :title="title">
				{{ title }}
			</slot>
		</span>
		<span>
			<slot name="collapse" :isCollapsed="isComponentActive">
				<i class="ri-subtract-line" v-if="isComponentActive"></i>
				<i class="ri-add-line" v-else></i>
			</slot>
		</span>
	</p>
	<div class="or-accordion-body" :class="[isComponentActive ? 'active' : 'inactive']">
		<div class="p-3">
			<slot>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAttrs, computed } from "vue";
import { useTheme } from "@/components/theme-provider";

defineProps<{
	title?: string;
}>();

const attrs = useAttrs();

const theme = useTheme('Accordion');

const isComponentActive = computed(() => attrs._isActive);

const emit = defineEmits<{
	(event: 'selectionChange', value: number): void
}>()

const toggleAccordion = () => {
	emit('selectionChange', attrs._index as number)
}

</script>

<style lang="scss" scoped>
.or-accordion-title {
	cursor: pointer;
	border-bottom: 1px solid v-bind('theme.backgroundSecondary');
	background: v-bind('theme.backgroundPrimary');
}

.or-accordion-body {
	overflow-y: auto;
	background: v-bind('theme.backgroundSecondary');

	&.inactive {
		max-height: 0;
		transition: .2s;
	}

	&.active {
		max-height: 200px;
		transition: .5s;
	}
}
</style>