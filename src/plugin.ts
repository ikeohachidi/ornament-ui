import { App } from 'vue';

import OrButton from '@/components/or-button';

export {
    OrButton
}

export default {
    install: (app: App) => {
        app.component('or-button', OrButton);
    }
}