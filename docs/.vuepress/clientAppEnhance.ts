import { defineClientAppEnhance } from '@vuepress/client';

import 'kwik-css';
import 'remixicon/fonts/remixicon.css';
import '@/main.scss';

import OrPlugin from '../../src/plugin';

export default defineClientAppEnhance(({ app }) => {
    app.use(OrPlugin);
})