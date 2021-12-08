import { SidebarItem } from "@vuepress/theme-default";

const sidebar: SidebarItem = {
	text: 'Components',
	children: [
		{
			text: 'Accordion',
			link: '/components/or-accordion'
		},
		{
			text: 'Button',
			link: '/components/or-button'
		},
		{
			text: 'Input',
			link: '/components/or-input'
		},
	]
}

export default sidebar;