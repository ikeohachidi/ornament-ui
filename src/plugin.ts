import { App } from 'vue';

import OrButton from './components/or-button';
import OrDropdown from './components/or-dropdown';
import OrInput from './components/or-input';
import OrInputTags from './components/or-input-tags';
import { OrTab, OrTabs } from './components/or-tabs';
import { OrAccordion, OrAccordionBody } from './components/or-accordion';
import OrSidebar from './components/or-sidebar';

export {
    OrButton,
    OrDropdown,
    OrInput,
    OrInputTags,
    OrTab,
    OrTabs,
    OrAccordion,
    OrSidebar
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
    }
}