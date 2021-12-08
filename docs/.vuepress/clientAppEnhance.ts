import { defineClientAppEnhance } from '@vuepress/client';

import '@/main.css';
import 'remixicon/fonts/remixicon.css';

import OrPlugin from '../../src/plugin';

export default defineClientAppEnhance(({ app }) => {
    app.use(OrPlugin);
})