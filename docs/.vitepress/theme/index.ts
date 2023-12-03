import DefaultTheme from 'vitepress/theme'

import 'remixicon/fonts/remixicon.css';
import 'kwik-css/kwik.css';
import '@/main.scss';

// TODO: not sure why MenuNode is imported here
import { MenuNode } from '../../../src/components/or-vertical-menu';
import ComponentsList from '../components/components-list.vue';
import OrPlugin from '../../../src/plugin';

export default {
    extends: DefaultTheme,
        enhanceApp(ctx) {

        ctx.app.use(OrPlugin);
        ctx.app.component('menu-node', MenuNode);
        ctx.app.component('components-list', ComponentsList);
    }
}