import { App } from 'vue';
import './main.scss';

import OrButton from './components/or-button';
import OrDropdown from './components/or-dropdown';
import OrCheckbox from './components/or-checkbox';
import OrInput from './components/or-input';
import OrInputGroup from './components/or-input-group';
import OrInputTags from './components/or-input-tags';
import { OrTab, OrTabs } from './components/or-tabs';
import { OrAccordion, OrAccordionBody } from './components/or-accordion';
import OrVerticalMenu from './components/or-vertical-menu';
import OrRadio from './components/or-radio';
import OrSwitch from './components/or-switch';
import OrAvatar from './components/or-avatar';
import OrChips from './components/or-chips';
import OrSelect from './components/or-select';
import { OrList, OrListItem, OrListBody, OrListLabel } from './components/or-list/index';
import { OrCircularLoader, OrPulsingLoader } from './components/or-loaders';
import OrToast from './components/or-toast';
import OrDialog from './components/or-dialog';
import OrOverlay from './components/or-overlay';
import OrTree from './components/or-tree';

// directives import
import VLoader from './directives/loader';
import VFormDisable from './directives/form-disable';

export {
	OrButton,
	OrCheckbox,
	OrRadio,
	OrSwitch,
	OrDropdown,
	OrInput,
	OrInputGroup,
	OrInputTags,
	OrTab, OrTabs,
	OrAccordion,
	OrAccordionBody,
	OrVerticalMenu,
	OrAvatar,
	OrChips,
	OrSelect,
	OrList, OrListItem, OrListBody, OrListLabel,
	OrCircularLoader,
	OrPulsingLoader,
	OrToast,
	OrDialog,
	OrOverlay,
	OrTree,

	VLoader,
	VFormDisable
}

export default {
	install: (app: App) => {
		app.component('or-button', OrButton);
		app.component('or-dropdown', OrDropdown);
		app.component('or-input', OrInput);
		app.component('or-input-group', OrInputGroup);
		app.component('or-input-tags', OrInputTags);
		app.component('or-tab', OrTab);
		app.component('or-tabs', OrTabs);
		app.component('or-accordion', OrAccordion);
		app.component('or-accordion-body', OrAccordionBody);
		app.component('or-vertical-menu', OrVerticalMenu);
		app.component('or-radio', OrRadio);
		app.component('or-switch', OrSwitch);
		app.component('or-checkbox', OrCheckbox);
		app.component('or-avatar', OrAvatar);
		app.component('or-chips', OrChips);
		app.component('or-select', OrSelect);
		app.component('or-list', OrList);
		app.component('or-list-item', OrListItem);
		app.component('or-list-label', OrListLabel);
		app.component('or-list-body', OrListBody);
		app.component('or-circular-loader', OrCircularLoader);
		app.component('or-pulsing-loader', OrPulsingLoader);
		app.component('or-toast', OrToast);
		app.component('or-dialog', OrDialog);
		app.component('or-overlay', OrOverlay);
		app.component('or-tree', OrTree);

		app.directive('loader', VLoader);
		app.directive('form-disable', VFormDisable);
	}
}