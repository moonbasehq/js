## Quickstart

Install the `@moonbasehq/winston` package

```bash
pnpm i --save @moonbasehq/winston
```

Create your winston logger

```typescript
import { MoonbaseTransport } from '@moonbasehq/winston';

const logger = winston.createLogger({
  // Setup log level, change to 'trace' or 'debug' depending on your use case.
  level: 'info',
  // Setup logs format
  format: winston.format.json(),
  transports: [
    new MoonbaseTransport({
      projectId: 'clxaua3q10004zg0q5p7qvjyj',
        apiKey: 'moonbase_...',
    }),
  ],
});

logger.info({
  level: 'info',
  message: 'shipping to Moonbase...',
});
```

## Usage with Fastify

```typescript
import winston from 'winston';
import fastify from 'fastify';
import { MoonbaseTransport } from '@moonbasehq/winston';

const logger = winston.createLogger({
  // Setup log level, change to 'trace' or 'debug' depending on your use case.
  level: 'info',
  // Setup logs format
  format: winston.format.json(),
  transports: [
    new MoonbaseTransport({
      projectId: 'clxaua3q10004zg0q5p7qvjyj',
        apiKey: 'moonbase_...',
    }),
    // log to stdout as well...
    new winston.transports.Console()
  ],
});

const server = fastify();

server.get('/', async (request, reply) => {
  logger.info('Hello this is from the local app');

  return { hello: 'world' };
});

const start = async () => {
  try {
    await server.listen(3000, '0.0.0.0');
    logger.info(`Server listening at http://0.0.0.0:3000`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

logger.error('this is an example error log');

start();
```
