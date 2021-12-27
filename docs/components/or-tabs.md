# OrTabs
Tabs make switching between numerous views a breeze

### Import
This is if you didn't import the entire library through the Plugin
```javascript 
import { OrTab, OrTabs } from 'ornament-ui';
```

**Basic**
<or-tabs>
    <or-tab title="West">
        <p>Text for the west</p>
    </or-tab>
    <or-tab title="East">
        <p>Text for the east</p>
    </or-tab>
</or-tabs>

```html
<or-tabs>
    <or-tab title="West">
        <p>Text for the west</p>
    </or-tab>
    <or-tab title="East">
        <p>Text for the east</p>
    </or-tab>
</or-tabs>
```

**Customize Headers**
<or-tabs>
    <or-tab title="West">
        <template #title>
            <i class="ri ri-home-line"></i> Header with Icon
        </template>
    </or-tab>
    <or-tab title="East">
        <p>Text for the east</p>
    </or-tab>
</or-tabs>

```html
<or-tabs>
    <or-tab title="West">
        <template #title>
            <i class="ri ri-home-line"></i> Header with Icon
        </template>
    </or-tab>
    <or-tab title="East">
        <p>Text for the east</p>
    </or-tab>
</or-tabs>
```

## Props
| Prop | Default | Type | Values | Description
|--|--|--|--|--|
| position | left | string | left, right | Position of the  