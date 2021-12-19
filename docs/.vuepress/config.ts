const path = require('path');

import type { ViteBundlerOptions } from '@vuepress/bundler-vite';
import { defineUserConfig } from '@vuepress/cli';
import type { DefaultThemeOptions } from '@vuepress/theme-default';

import GuideSidebar from '../guide/sidebar';
import ComponentSidebar from '../components/sidebar';

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  // when using vuepress-vite package, you can omit this field
  // because vite is the default bundler
  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {
    vuePluginOptions: {},
    viteOptions: {
      resolve: {
        alias: [
          {
            find: '@',
            replacement: path.resolve('src')
          }
        ]
      }
    },
  },
  
  // options for vite bundler
  themeConfig: {
    repo: 'https://github.com/ikeohachidi/ornament-ui',
    navbar: [
      // NavbarItem
      {
        text: 'Guide',
        link: '/guide/',
        activeMatch: '^/guide/'
      },
      // NavbarGroup
      {
        text: 'Components',
        link: '/components/',
        activeMatch: '^/components'
      },
    ],
    sidebar: [
      GuideSidebar,
      ComponentSidebar
    ]
  },
})