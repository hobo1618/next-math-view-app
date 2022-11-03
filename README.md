# Example of shared, customized keyboard using react-math-view in NextJS v12

## Handling Fonts & Other CSS imports

Next JS v12 doesn't allow global css imports from anywhere other than the \_app.ts file. If you simply try running a <MathView> component, therefore, you'll get an error stating that global css cannot be imported from inside node_modules. The solution (hack?) is to

 1.  move the fonts directory from the `mathlive` package to the `styles/` directory
 2.  move the `mathlive-fonts.css` and `mathlive-static.css` files from the `mathlive` package to the `styles/` directory.
 3.  comment out / delete first line (css import) in `node_modules/react-math-view/dist/index.modern.js`

```javascript
node_modules/react-math-view/dist/index.modern.js

// import 'mathlive/dist/mathlive-fonts.css'  // comment out line 1
import 'mathlive/dist/mathlive.min'; // keep this
...

```
 4.  comment out / delete the third line (css import) in `node_modules/react-math-view/dist/index.js`

```javascript
node_modules/react-math-view/dist/index.modern.js

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; } // keep this

// require('mathlive/dist/mathlive-fonts.css');  // comment out this line
require('mathlive/dist/mathlive.min'); // keep this
...

```

 5.  in the \_app.ts file, import `mathlive-fonts.css` and `mathlive-static.css`.
 6.  if successful, you should get this error: `ReferenceError: HTMLElement is not defined`. This is a good thing. We are making progress.

## Fixing the `ReferenceError: HTMLElement is not defined`

The `<MathView>` component is a wrapper for the `<math-field>` tag, a web component, which by definition extends `HTMLElement`. In other words the component needs a DOM node to be instantiated, making it difficult to render on the server. With NextJS and SSR, `HTMLElement` is therefore undefined when NextJS tries to render the component. To fix the issue, you can either create a react app that renders on the client, or you can follow these steps to render just the component on the client:

1. create a component that uses the `<MathView>` component to render some math.

```javascript
components > MathViewNoSSR.tsx;

import MathView from "react-math-view";

const MathViewNoSSR = () => {
  // do fancy things
  return <MathView value="some latex" />;
};

export default MathViewNoSSR;
```

2. use a dynamic import in your index.ts (or wherever you want) to only fetch the component on the client after the page has loaded. We're basically just lazy loading the `<MathView>` component so that the DOM exists and there actually is an HTMLElement to extend.

```javascript
pages > index.tsx;

import dynamic from "next/dynamic";

// this only loads the component after the page has loaded on the client
const App = dynamic(() => import("../components/MathViewNoSSR"), {
  // this disables Server Side Rendering
  ssr: false,
});

export default App;
```
