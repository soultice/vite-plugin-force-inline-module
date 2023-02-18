# Example 

compare the build output in `dist` with `plugins` used/deactivated in `vite.config.ts` 

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
