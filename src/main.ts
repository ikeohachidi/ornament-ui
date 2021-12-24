import { createApp } from 'vue'
import App from './App.vue'

import 'kwik-css';
import './main.scss';
import 'remixicon/fonts/remixicon.css'

import OrPlugin from './plugin';

const app = createApp(App)
    .use(OrPlugin)
    .mount('#app')
