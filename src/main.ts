import { createApp } from 'vue'
import App from './App.vue'
import './main.css';

import OrPlugin from './plugin';

const app = createApp(App)
    .use(OrPlugin)
    .mount('#app')
