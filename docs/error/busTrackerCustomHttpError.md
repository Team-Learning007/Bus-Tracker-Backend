# 🚨 Custom HTTP Error Classes with Enum-based Status Codes

This module provides **custom error classes** tied to an `enum` called `ERROR_STATUS_CODE`. It helps you throw meaningful, consistent HTTP errors in an Express + TypeScript backend.

---

## 📦 Features

- ✅ Clear, readable error class names
- 🧠 Type-safe status codes with `enum`
- 📤 Works great with a global error handler
- 🛠️ Easy to extend

---

## 🧾 ERROR_STATUS_CODE Enum

```ts
export enum ERROR_STATUS_CODE {
  BADREQUEST = 400,
  INTERNALSERVER = 500,
  LENGTHREQUIRED = 411,
  NOTFOUND = 404,
  UNAUTHORIZE = 401,
}
```

## 🛠️ Custom Error Classes

Each class extends the native `Error` class and sets a `status` using `ERROR_STATUS_CODE`.

```ts
class BadRequest extends Error {
  message: string;
  status: number;
  constructor(message: string) {
    super(message);
    this.status = ERROR_STATUS_CODE.BADREQUEST;
    this.message = message;
  }
}
```

Repeat structure is used for:

- InternalServer

- LengthRequired

- NotFound

- UnAuthorize

## 📋 Error Class Overview

| Class Name       | Status Code | Enum Key         | Purpose                         |
| ---------------- | ----------- | ---------------- | ------------------------------- |
| `BadRequest`     | 400         | `BADREQUEST`     | Invalid input or request        |
| `InternalServer` | 500         | `INTERNALSERVER` | Unexpected server error         |
| `LengthRequired` | 411         | `LENGTHREQUIRED` | Missing `Content-Length` header |
| `NotFound`       | 404         | `NOTFOUND`       | Resource not found              |
| `UnAuthorize`    | 401         | `UNAUTHORIZE`    | Unauthorized access             |

## 🧪 Usage Example

```ts
import { NotFound, BadRequest } from './busTrackerCustomHttpError.error.js';

app.get('/user/:id', (req, res, next) => {
  const user = null;

  if (!user) {
    throw new NotFound('User not found');
  }

  if (invalidData) {
    throw new BadRequest('Invalid input provided');
  }
});
```

These will be caught by your global error handler and returned like:

```json
{
  "success": false,
  "message": "User not found",
  "data": {},
  "errorcode": 404
}
```

📁 File Suggestions

```go
src/
├── errors/
│   └── busTrackerCustomHttpError.error.ts
├── types/
│   └── responseStatusCode.type.ts
```
