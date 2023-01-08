# TollUI-Angular

>This ia an angular UI library built with on the popular [TailwindCSS](https://tailwindcss.com/) library with ❤️.

> This project is still in its early stages.

### Website
Go to the website for documentation [http://ui.sidestores.com](http://ui.sidestores.com/#/)


## Get Started
### Install
```
npm install toll-ui
```

### Dependencies
Install the following dependencies for toll-UI to work properly
```
npm install primeicons --save
npm install date-fns --save
```


Note: Don't forget to add the code below to your `angular.json` file.

```json
{
  "styles": [
    "src/styles.css",
    "node_modules/toll-ui/core/style.scss",
    "node_modules/primeicons/primeicons.css"
  ]
}
```
## Import
The components are configured as modules and each component is imported from `toll-ui` .
Below is how an import would look like

```ts
import { PiButtonModule } from "toll-ui"
```
