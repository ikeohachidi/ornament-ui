import { App } from 'vue';

import OrButton from './components/or-button';
import OrDropdown from './components/or-dropdown';
import OrInput from './components/or-input';
import OrInputTags from './components/or-input-tags';

export {
    OrButton,
    OrDropdown,
    OrInput,
    OrInputTags
}

export default {
    install: (app: App) => {
        app.component('or-button', OrButton);
        app.component('or-dropdown', OrDropdown);
        app.component('or-input', OrInput);
        app.component('or-input-tags', OrInputTags);
    }
}