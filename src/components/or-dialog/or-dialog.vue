<template>
	<or-overlay
		v-model:show="show"
		@visibility-change="closeModal"
	>
		<div class="or-dialog-wrapper">
			<slot name="header">
				<h3 v-if="showHeader && headerText" class="or-dialog-header">
					<span>{{ headerText }}</span>
					<span class="close-icon" @click="closeModal">
						<i class="ri-close-line"></i>
					</span>
				</h3>
			</slot>

			<div class="or-dialog-content">
				<slot></slot>
			</div>
			<slot name="footer">
				<div v-if="showFooter" class="or-dialog-footer">
					<or-button class="text ml-auto" @click="closeModal">
						Cancel
					</or-button>
					<or-button>
						Continue
					</or-button>
				</div>
			</slot>
		</div>
	</or-overlay>
</template>

<script lang="ts" setup>
import { useTheme } from '@/components/theme-provider';

const props = withDefaults(defineProps<{
	show: boolean;
	showHeader?: boolean;
	showFooter?: boolean;
	headerText?: string;
}>(), {
	show: false,
	showHeader: true,
	showFooter: true,
});

const emit = defineEmits<{
	(event: 'confirm'): void,
	(event: 'cancel'): void,
	(event: 'update:show', value: boolean): void
}>();

const theme = useTheme('Dialog');

const closeModal = () => {
	emit('update:show', false);
	emit('cancel');
}

</script>

<style lang="scss" scoped>

@mixin shared {
	padding: 15px;
}

.or-dialog {
	&-wrapper {
		background-color: v-bind('theme.backgroundSecondary');
		border-radius: var(--radius-1);
		overflow: hidden;
		width: 700px;
	}

	&-header {
		@include shared;
		margin: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.close-icon {
			width: 25px;
			height: 25px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: var(--radius-2);
			cursor: pointer;

			&:hover {
				background-color: #f5f5f5;
			}
		}
	}

	&-content {
		@include shared;
	}

	&-footer {
		@include shared;
		display: flex;
		border-top: 1px solid v-bind('theme.borderSecondary');
	}
}

@media (max-width: 760px) {
	.or-dialog {
		&-wrapper {
			width: 450px;
		}
	}
}
</style>