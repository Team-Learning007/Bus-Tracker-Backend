# 🌐 Global Error Handler Middleware – Express

This is a custom global error handling middleware for an Express.js application. It formats all API errors into a consistent structure using `BusTrackerApiResponse`.

---

## 📦 Features

- Returns consistent error responses
- Logs error details in `development` mode
- Uses `http-errors` for better error management
- Detects if running in development using `checkDevelopmentNodeEnvironment()`

---

## ✅ Response Format

All errors return this format:

```json
{
  "success": false,
  "message": "Something went wrong",
  "data": {},
  "errorcode": 500
}
```

## 🧠 How it works

### 🔧 Imports

- BusTrackerApiResponse – response formatting class

- http-errors – to generate standard HTTP errors

- logger – custom Winston logger

- checkDevelopmentNodeEnvironment – checks if running in dev

- util.inspect() – for clean logging

## 🧪 Development Logging

### In development mode, this logs:

- Error message

- Headers

- Params

- Query

- Body

_To help debug issues during development._

## 📁 File Location Suggestions

```css

src/
├── middlewares/
│   └── globalErrorHandler.middleware.ts
├── utils/
│   └── envsChecker.ts
│   └── logger/
│       └── winston-logger.ts
├── libraries/
│   └── BusTrackerApiResponse.ts

```
