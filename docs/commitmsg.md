# 📝 Commit Message Guidelines

To keep our git history clean and meaningful, all commit messages must follow this format:

## ✅ Examples

- `feat: add user login functionality`
- `fix: correct typo in home page title`
- `test: add unit tests for auth utils`
- `docs: update API docs for /users`
- `style: reformat code with Prettier`
- `refactor: simplify user auth logic`
- `ci: update GitHub Actions workflow`

## 📌 Allowed Commit Types

| Type       | Use when...                                  |
| ---------- | -------------------------------------------- |
| `feat`     | Adding a **new feature**                     |
| `fix`      | Fixing a **bug**                             |
| `test`     | Adding or updating **tests**                 |
| `docs`     | Changing **documentation** only              |
| `style`    | Code formatting, spacing (no logic changes)  |
| `refactor` | Improving code without changing behavior     |
| `perf`     | Improving **performance**                    |
| `chore`    | Misc changes like config or package updates  |
| `build`    | Build-related changes                        |
| `ci`       | CI/CD related changes (GitHub Actions, etc.) |
| `revert`   | Reverting a previous commit                  |

## 🚫 Invalid Examples (will be rejected)

- `added signup feature`
- `fix login`
- `test cases`
- `bug solved`

## 📏 Rules

- Must start with a valid type (e.g. `feat`, `fix`, etc.)
- Must have a colon `:` and a space after it
- Total length should not exceed **180 characters**

---

If your commit is rejected, check the message and follow this guide to fix it.
