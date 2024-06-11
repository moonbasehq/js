## Quickstart

Install the `@moonbasehq/js` package.

```bash
pnpm i --save @moonbasehq/js
```

Load the required parameters and ingest events

```typescript
import { Moonbase } from '@moonbasehq/js';

const moon = new Moonbase({
  apiKey: 'moonbase_...',
  projectId: 'clvmvinlr0003zs0sh6z675hk'
});

// returns a promise
moon.ingest([{ body: 'this is a log' }]).then((res) => {
  console.log('nice!!', res)
})
```