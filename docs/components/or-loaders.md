
# OrLoaders
Custom loader components

### OrCircularLoader
<or-circular-loader 
    :dimension="40"
    :border-width="2"
    bottom-text="Fetching stuff"
/>

### OrPulsingLoader
<or-pulsing-loader 
    :dimension="40"
    bottom-text="Fetching stuff"
/>

```html
<or-pulsing-loader 
    :dimension="40"
    :bottom-text="Fetching stuff"
/>
```

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