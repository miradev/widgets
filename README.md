# Mira Widgets

This repository contains a collection of widgets made by Mira, for Mira. The structure of this repository is a copy
of https://github.com/miradev/mira-ui-widget-template-vue

## Building your widget

Build your .css, .js, and manifest.json bundle using

```
yarn build src/Widget.vue
```

Package it as a zip using

```
yarn package
```

This will create a `.zip` file in the `dist` directory using the id name specified in the manifest.json file.

```
yarn copy
```

This will copy all the `.zip` files from the `dist` directory to the `$HOME/.mira/widgets` folder for running on a
local instance of the Mira UI system.

## Development Server to test your widget

A local vue server instance can be run to locally test the widget:

```
yarn serve --src=@
```

where @ is the location of your widget's `.vue` file, within the `src` folder.

For the Widget.vue example, this command would be:
```
yarn serve --src=Widget.vue
````

since `Widget.vue` is located as `src/Widget.vue` relative to the root folder.
