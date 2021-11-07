import { SidebarItem } from "@vuepress/theme-default"

const sidebar: SidebarItem = {
    text: 'Guide',
    children: [
        {
            text: 'Getting started',
            link: '/guide/getting-started/',
            activeMatch: '/guide/'
        }
    ]
}

export default sidebar;