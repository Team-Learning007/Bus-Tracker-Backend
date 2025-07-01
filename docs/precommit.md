# 🚦 Pre-commit Checks & Workflow

This project enforces strict quality standards before allowing any commit. Our automated pre-commit hook ensures that every code change is well-tested, covered, and formatted. **Read this guide to avoid failed commits!**

---

## 🔍 What Happens on Commit?

When you run `git commit`, the following checks are performed automatically:

1. **Test File Check**
   - For every staged JS/TS file in `src/` (except test files), there must be a corresponding test file in `src/__test__`.
   - If a test file is missing, the commit will be rejected.

2. **Run All Tests**
   - All tests must pass (`npm test`). If any test fails, the commit is blocked.

3. **Coverage Enforcement**
   - Each staged file must have at least **80% line coverage** (checked with Vitest).
   - If coverage is below threshold, the commit is rejected.

4. **Linting & Formatting**
   - Linting is run on staged files via `lint-staged`.
   - Prettier checks formatting. If issues are found, you’ll be prompted to run `npm run format`.

---

## 🧪 How to Pass the Checks

- **Write tests** for every new or changed file in `src/` (except test files themselves).
- Ensure your tests cover at least 80% of the lines in each file.
- Run `npm test` locally before committing.
- Fix lint and formatting issues with:
  ```
  npm run lint:fix
  npm run format
  ```

---

## ❌ Common Reasons for Commit Rejection

- Missing test files for new/changed source files.
- Test coverage below 80% for any staged file.
- Failing tests.
- Lint or Prettier errors.

---

## 💡 Example Workflow

1. Make your code changes in `src/`.
2. Add or update tests in `src/__test__/`.
3. Stage your changes: `git add .`
4. Run tests and check coverage: `npm test`
5. Fix any lint/format issues: `npm run lint:fix && npm run format`
6. Commit: `git commit -m "feat: add new bus route endpoint"`

---

If your commit is rejected, carefully read the error messages and follow the instructions above. This process keeps our codebase robust and
