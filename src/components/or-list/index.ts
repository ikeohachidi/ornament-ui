import OrList from './or-list.vue';
import OrListItem from './or-list-item/or-list-item.vue';
import OrListLabel from './or-list-label/or-list-label.vue';
import OrListBody from './or-list-body/or-list-body.vue';

export enum Events {
	ITEM_CHECK = 'item-check',
	ITEM_UNCHECK = 'item-uncheck'
}

export {
	OrList,
	OrListItem,
	OrListLabel,
	OrListBody
}