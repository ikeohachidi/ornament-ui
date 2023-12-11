<template>
	<div class="or-accordion-wrapper">
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
			<div class="p-2">
				<div class="p-2">
					<slot>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAttrs, computed } from "vue";

const props = defineProps<{
	title?: string;
}>();

const attrs = useAttrs();

const isComponentActive = computed(() => attrs._isActive);

const emit = defineEmits<{
	(event: 'selectionChange', value: number): void
}>()

const toggleAccordion = () => {
	emit('selectionChange', attrs._index as number)
}

</script>

<style lang="scss" scoped>
.or-accordion-wrapper {
	cursor: pointer;
	border: 1px solid var(--color-gray-1);
}

.or-accordion-title {
	margin: 0;
}

.or-accordion-body {
	overflow-y: auto;

	> div {
		> div {
			background: var(--color-gray-2);
			border-radius: var(--radius-2);
		}
	}

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