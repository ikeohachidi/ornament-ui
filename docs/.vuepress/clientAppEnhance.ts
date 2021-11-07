import { defineClientAppEnhance } from '@vuepress/client';

import OrPlugin from '../../src/plugin';

export default defineClientAppEnhance(({ app }) => {
    app.use(OrPlugin);
})