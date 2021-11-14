import { SidebarItem } from "@vuepress/theme-default";

const sidebar: SidebarItem = {
    text: 'Components',
    children: [
        {
            text: 'Input',
            link: '/components/or-input/'
        },
        {
            text: 'Button',
            link: '/components/or-button/'
        }
    ]
}

export default sidebar;