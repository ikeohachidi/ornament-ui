import { App } from 'vue';

import OrButton from '@/components/or-button';
import OrDropdown from '@/components/or-dropdown';
import OrInput from '@/components/or-input';

export {
    OrButton,
    OrDropdown,
    OrInput
}

export default {
    install: (app: App) => {
        app.component('or-button', OrButton);
        app.component('or-dropdown', OrDropdown);
        app.component('or-input', OrInput);
    }
}