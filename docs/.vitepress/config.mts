import { defineConfig } from 'vitepress';
import path from 'path';
import { sidebar as componentSidebar } from '../components/sidebar';
import { sidebar as directiveSidebar } from '../directives/sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ornament UI",
  description: "A Vue component library",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting started', link: '/getting-started' },
      { text: 'Components', link: '/components/' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting started', link: '/getting-started' },
        ]
      },
      componentSidebar,
      directiveSidebar
    ],

    footer: {
      copyright: `${new Date().getFullYear()} til infinity`,
      message: 'D2B ___ Chidi Ikeoha'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ikeohachidi/ornament-ui' }
    ]
  },
  
  vite: {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve('src')
        }
      ]
    }
  }
})
