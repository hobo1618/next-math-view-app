# Example of shared, customized keyboard using react-math-view in NextJS v12
## Handling Fonts & Other CSS imports
Next JS v12 doesn't allow global css imports from anywhere other than the _app.ts file. If you simply try running a <MathView> component, therefore, you'll get an error stating that global css cannot be imported from inside node_modules. The solution (hack?) is to
 1. move the fonts directory from the `mathlive` package to the `styles/` directory
 2. move the `mathlive-fonts.css` and `mathlive-static.css` from the `mathlive` package to the `styles/` directory.
 3. delete all imports of css files from `react-math-view` 
 4. in the _app.ts file, import the `mathlive-fonts.css` and `mathlive-static.css`
 5. if successful, you should get this error: `ReferenceError: HTMLElement is not defined`

 ## Fixing the `ReferenceError: HTMLElement is not defined`