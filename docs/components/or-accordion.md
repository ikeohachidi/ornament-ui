# OrAccordion

**Basic**
<or-accordion>
	<or-accordion-body title="Accordion 1">
		<p>1: Lorem ipsum dolor imat</p>
	</or-accordion-body>
	<or-accordion-body title="Accordion 2">
		<p>2: Lorem ipsum dolor imat</p>
	</or-accordion-body>
</or-accordion>

```html
<or-accordion>
	<or-accordion-body title="Accordion 1">
		<p>1: Lorem ipsum dolor imat</p>
	</or-accordion-body>
	<or-accordion-body title="Accordion 2">
		<p>2: Lorem ipsum dolor imat</p>
	</or-accordion-body>
</or-accordion>
```

**Custom**
<or-accordion>
	<or-accordion-body>
		<template #title>
			<p class="flex items-center">
				<i class="ri-mail-fill"></i> Accordion 1
			</p>
		</template>
		<template #collapse="{isCollapsed}">
			<i class="ri-arrow-down-s-line" v-if="isCollapsed"></i>
			<i class="ri-arrow-up-s-line" v-else="isCollapsed"></i>
		</template>
		<p>1: Lorem ipsum dolor imat</p>
	</or-accordion-body>
	<or-accordion-body title="Accordion 2">
		<p>2: Lorem ipsum dolor imat</p>
	</or-accordion-body>
</or-accordion>

```html
<or-accordion>
	<or-accordion-body>
		<template #title>
			<p class="flex items-center">
				<i class="ri-mail-fill"></i> Accordion 1
			</p>
		</template>
		<template #collapse="{isCollapsed}">
			<i class="ri-arrow-down-s-line" v-if="isCollapsed"></i>
			<i class="ri-arrow-up-s-line" v-else="isCollapsed"></i>
		</template>
		<p>1: Lorem ipsum dolor imat</p>
	</or-accordion-body>
	<or-accordion-body title="Accordion 2">
		<p>2: Lorem ipsum dolor imat</p>
	</or-accordion-body>
</or-accordion>
```

## Props(or-accordion-body)
| Prop | Default | Type | Description
|--|--|--|--|
| title | "" | string | Title of accordion section 
| multiple | false | boolean | Allow multiple sections to be visible