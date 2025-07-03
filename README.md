# 🚌 BusTrackerBackend

This is the backend for the Bus Tracker application, built with Node.js, Express, and TypeScript. It is designed for robust code quality, automated testing, and a clean commit history.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: See `.nvmrc` for the recommended version (e.g., `v22.11.0`)
- **npm**: Comes with Node.js

### Installation

```sh
npm install
```

### Running the Server

- **Development**:
  ```sh
  npm run dev
  ```
- **Production**:
  ```sh
  npm run build
  npm start
  ```

The server will start on the port defined in `.env` (`PORT=5000` by default).

---

## 🧪 Testing

- **Run all tests:**
  ```sh
  npm test
  ```
- **Run tests with coverage:**
  ```sh
  npm run coverage
  ```
- **Test UI:**
  ```sh
  npm run test:ui
  ```

Test files should be placed in `src/__test__/`.

---

## 🧹 Code Quality

### Linting

- **Check lint:**
  ```sh
  npm run lint
  ```
- **Auto-fix lint:**
  ```sh
  npm run lint:fix
  ```

### Formatting

- **Format code:**
  ```sh
  npm run format
  ```
- **Check formatting:**
  ```sh
  npm run format:check
  ```

---

## 📚 Documentation

- [Logger Usage Guide](docs/logger.md)

---

## 🛡️ Pre-commit & Commit Message Hooks

This project uses [Husky](https://typicode.github.io/husky/) to enforce:

- **Commit message style:**  
  See [`docs/commitmsg.md`](docs/commitmsg.md) for allowed types and examples.
- **Pre-commit checks:**
  - All staged source files must have corresponding test files.
  - All tests must pass.
  - Each staged file must have at least 80% test coverage.
  - Lint and Prettier checks must pass.

See [`docs/precommit.md`](docs/precommit.md) for details.

---

## 📝 Project Structure

```
src/
  index.ts           # Main entry point
  __test__/          # All test files
  controllers/       # Controller logic
  database/          # Database logic
  middlewares/       # Express middlewares
  routes/            # Route definitions
  types/             # TypeScript types
  utils/             # Utility functions
dist/                # Compiled output
docs/                # Documentation
coverage/            # Test coverage reports
```

---

## ⚙️ VS Code Recommended Extensions

See [`.vscode/extention.json`](.vscode/extention.json) and [`.vscode/setting.json`](.vscode/setting.json):

- `dbaeumer.vscode-eslint`
- `esbenp.prettier-vscode`
- `ms-vscode.vscode-typescript-next`

---

## 🏗️ CI/CD

GitHub Actions workflow is defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

- Runs tests, lint, type-check, and formatting on pull requests to `main` and `develop`.

---

## 📄 License

ISC © Bhargav Sourik Vivek

---

## 🙏 Contributing

Please follow the commit message and pre-commit guidelines. PRs are
