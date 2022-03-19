# VLoader 
A directive to add loading overlays on a component.

The v-loader directive can take both loader types provided by ornament, `circular` and `pulsing-loader`.

<div style="height: 400px; width: 100%; border-radius: 10px" v-loader:circular="isLoading">
</div>

```html
<div style="height: 400px; width: 1090px; border-radius: 10px" v-loader:circular="isLoading">
</div>
```

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const isLoading = ref(true);

        return { isLoading }
    }
})
</script>

# Props (Circular)
| Prop | Required | Default | Type | Description |
|--|--|--|--|--|
| dimension | false | 30 | number | Radius of circle
| borderWidth | false | 3 | number | Width of cicle's border
| topText | false | '' | string | Text displayed at top of screen 
| bottomText | false | '' | string | Text displayed at bottom of screen 


# Props (Pulsing)
| Prop | Required | Default | Type | Description |
|--|--|--|--|--|
| count | false | 4 | number | Number of boxes to display 
| dimension | false | 30 | number | Radius of circle
| topText | false | '' | string | Text displayed at top of screen 
| bottomText | false | '' | string | Text displayed at bottom of screen 
| boxColor | false | #1F2937 | string | Color of box displayed 
| rounded | false | false | boolean | change box to a circle 