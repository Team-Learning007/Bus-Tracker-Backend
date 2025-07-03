# 📝 Logger Usage Guide

This project uses a custom-configured [Winston](https://github.com/winstonjs/winston) logger for all logging needs. The logger is set up in [`src/utils/logger/winston-logger.ts`](../src/utils/logger/winston-logger.ts) and supports custom log levels and colors.

---

## 🚦 Log Levels

| Level | Color  | Description            | Production Output          |
| ----- | ------ | ---------------------- | -------------------------- |
| error | red    | Error conditions       | ✅                         |
| warn  | yellow | Warning conditions     | ✅                         |
| info  | green  | Informational messages | ✅                         |
| debug | blue   | Debug-level messages   | ❌ (unless not production) |

- In **production** (`NODE_ENV=production`), only `info`, `warn`, and `error` are shown.
- In **development** or other environments, all levels including `debug` are shown.

---

## 🛠️ Usage Examples

### Importing the Logger

```typescript
import logger from '#utils/logger/winston-logger.js';
```

### Logging Messages

```typescript
logger.error('This is an error message');
logger.warn('This is a warning');
logger.info('This is some info');
logger.debug('This is a debug message');
```

### Logging with Variables

```typescript
const userId = 42;
logger.info(`User ${userId} logged in`);
```

### Logging with Metadata

```typescript
logger.error('Failed to process request', { requestId: 'abc123', error });
```

---

## 🏷️ Customization

- **Log Level:**  
  The logger's level is set automatically based on `process.env.NODE_ENV`:
  - `'production'` → `info`
  - otherwise → `debug`

- **Colors:**  
  Custom colors are set for each log level for better readability in the console.

- **Format:**  
  Each log message includes a timestamp, the log level, and the message:
  ```
  [2025-07-03 14:00:00] info: Server started
  ```

---

## 📂 Source

See the logger implementation in [`src/utils/logger/winston-logger.ts`](../src/utils/logger/winston-logger.ts).

---

## 🧪 Testing the Logger

You can test the logger's behavior by changing the `NODE_ENV` variable and observing which log levels are output:

```sh
NODE_ENV=production node your-app.js
NODE_ENV=development node your-app.js
```

Or see the [logger tests](../src/__test__/logger/winston-logger.test.ts) for automated examples.

---

## 🔗 Further Reading

- [Winston Documentation](https://github.com/winstonjs/winston)
- [Logger Tests](../src/__test__/logger/winston-logger.test.ts)
