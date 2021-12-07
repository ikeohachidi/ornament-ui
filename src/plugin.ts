import { App } from 'vue';

import OrButton from './components/or-button';
import OrDropdown from './components/or-dropdown';
import OrCheckbox from './components/or-checkbox';
import OrInput from './components/or-input';
import OrInputTags from './components/or-input-tags';
import { OrTab, OrTabs } from './components/or-tabs';
import { OrAccordion, OrAccordionBody } from './components/or-accordion';
import OrSidebar from './components/or-sidebar';
import OrRadio from './components/or-radio';
import OrAvatar from './components/or-avatar';
import OrChips from './components/or-chips';
import OrSelect from './components/or-select/or-select';
import { OrList, OrListItem } from './components/or-list/index';
import { OrCircularLoader } from './components/or-loaders';

export {
	OrButton,
	OrDropdown,
	OrInput,
	OrInputTags,
	OrTab, OrTabs,
	OrAccordion,
	OrSidebar,
	OrRadio,
	OrAvatar,
	OrChips,
	OrSelect,
	OrList, OrListItem,
	OrCircularLoader
}

export default {
	install: (app: App) => {
		app.component('or-button', OrButton);
		app.component('or-dropdown', OrDropdown);
		app.component('or-input', OrInput);
		app.component('or-input-tags', OrInputTags);
		app.component('or-tab', OrTab);
		app.component('or-tabs', OrTabs);
		app.component('or-accordion', OrAccordion);
		app.component('or-accordion-body', OrAccordionBody);
		app.component('or-sidebar', OrSidebar);
		app.component('or-radio', OrRadio);
		app.component('or-checkbox', OrCheckbox);
		app.component('or-avatar', OrAvatar);
		app.component('or-chips', OrChips);
		app.component('or-select', OrSelect);
		app.component('or-list', OrList);
		app.component('or-list-item', OrListItem);
		app.component('or-circular-loader', OrCircularLoader);
	}
}