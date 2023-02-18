# vite-plugin-force-inline-module

This plugin is tricking Vite into inlining contents of files/imports that match the `inlineModules` argument.
Somehow Vite is not making use of the `shouldTransformCachedModules` hook of rollup.
We trick Vite into busting its own cache, therefore inlining the modules code.

## Usage (also see example package)

in `vite.config.ts`
```typescript
import { forceInlineModule } from 'vite-plugin-force-inline-module'

export default defineConfig{
  ...
  plugins: [forceInlineModule({ inlineModules: [MODULES_TO_INLINE]})
  ...
}
```


## Example 

compare the build output of the example package in `dist` with `plugins` used/deactivated in `vite.config.ts` 

## Without Plugin:

build1.js / build2.js
```javascript
import { foobar } from './import_from.js';

console.log("entry_point1", foobar);
```

## With Plugin:

build1.js:
```javascript
const foobar = "Foobar";

console.log("entry_point1", foobar);
```

build2.js:
```javascript
const foobar = "Foobar";

console.log("entry_point2", foobar);
```



