# JavaScript SDK's for Moonbase

Contains SDKs. Current offered SDK's:

1. [Core](./packages/core) (default)

## Usage

### Default usage

```ts
import { Moonbase } from '@moonbasehq/js';

const moon = new Moonbase({
  apiKey: 'moonbase_...',
  projectId: 'clvmvinlr0003zs0sh6z675hk'
});

// returns a promise
moon.ingest([{
  body: 'this is a log'
}])
```

### Pino transport

```ts
import build from 'pino-abstract-transport';
import { Moonbase } from '@moonbasehq/js';

export default async function moonbaseTransport(options: { apiKey: string, projectId: string }) {
  const moon = new Moonbase(options);

  return build(
    async function (source: any) {
      for await (const obj of source) {
        const { time, level, ...rest } = obj;

        const event = {
          level: mapLogLevel(level),
          ...rest,
        };

        moon.ingest(event);
      }
    },
    // { close: async () => await moon.flush() },
  );
}

export const mapLogLevel = (level: string | number) => {
  if (typeof level === 'string') {
    return level;
  }

  if (level <= 10) {
    return 'trace';
  }
  if (level <= 20) {
    return 'debug';
  }
  if (level <= 30) {
    return 'info';
  }
  if (level <= 40) {
    return 'warn';
  }
  if (level <= 50) {
    return 'error';
  }
  if (level <= 60) {
    return 'fatal';
  }

  return null;
};
```