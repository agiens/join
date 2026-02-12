# File Path Parser Challenge

**Time estimate:** 30-45 minutes

## Context

This parser extracts file operations from AI coding assistant output. When an AI assistant modifies code, it outputs lines like:

```
→ Read src/App.tsx
← Edit src/components/Button.tsx
← Create tests/new-test.ts
```

The parser identifies the operation type (`read_file`, `edit_file`, `create_file`) and extracts the file path.

## Why This Matters

In real-world AI-assisted development:

1. **Filenames often have spaces** - Modern projects use descriptive names like `my component.tsx` or `helper functions.ts`
2. **Special characters are common** - Next.js uses `[id]` for dynamic routes, legacy folders use `(old)` notation
3. **International teams** - Developers use Cyrillic, Chinese, emoji in filenames
4. **Quoted paths are standard** - Shell commands and AI output quote paths with spaces

**This bug causes:**
- ❌ Files not being tracked correctly
- ❌ AI edits failing silently
- ❌ Incorrect file operation logs
- ❌ Broken workflows for international teams

**Real impact:** This parser processes thousands of AI operations daily. Every edge case failure means lost work.

## Your Task

Fix the `parseFileOperation()` function in `src/parser.ts` to handle these edge cases:

### 1. Filenames with spaces (quoted)
```typescript
'← Edit "src/my component.tsx"'     → extract: 'src/my component.tsx'
'→ Read "src/helper functions.ts"'  → extract: 'src/helper functions.ts'
```

### 2. Escaped quotes in filenames
```typescript
'← Edit "src/file\"with\"quotes.tsx"'  → extract: 'src/file"with"quotes.tsx'
'← Edit \'src/user\'s profile.tsx\''   → extract: "src/user's profile.tsx"
```

### 3. Mixed quotes
```typescript
'← Edit "src/\'special\'.tsx"'  → extract: "src/'special'.tsx"
```

### 4. Special characters (parentheses, brackets, Unicode)
```typescript
'← Edit "src/utils (legacy)/helper.ts"'  → extract: 'src/utils (legacy)/helper.ts'
'← Edit "src/[id]/page.tsx"'             → extract: 'src/[id]/page.tsx'
'← Edit "src/файл.tsx"'                  → extract: 'src/файл.tsx'
'← Edit "src/🚀rocket.tsx"'              → extract: 'src/🚀rocket.tsx'
```

## Definition of Done

- [ ] All tests in `tests/parser.test.ts` pass
- [ ] Existing functionality preserved (unquoted filenames still work)
- [ ] Code is clean and well-commented
- [ ] No external dependencies added (use only built-in JavaScript/TypeScript)

## Getting Started

```bash
# Install dependencies
npm install

# Run tests (many will fail initially)
npm test

# Run tests in watch mode
npm run test:watch
```

## Current Implementation

The current regex patterns in `src/parser.ts`:
- Arrow format: `/^[\u2190<]\s*(?:Edit|Write|Create)\s+(.+)$/i`
- Legacy format: `/(?:Writing|Editing)\s+['"]?([^\s'"]+)['"]?/i`

**Problem:** `[^\s'"]+` stops at the first space or quote, so quoted filenames are truncated.

## Constraints

- **Time limit:** 30-45 minutes
- **No external libraries:** Use only built-in JavaScript/TypeScript features
- **Preserve existing behavior:** Unquoted filenames must still work
- **All tests must pass:** Run `npm test` to verify

## Submission

1. Fork this repository (or clone and create your own repo)
2. Fix the `parseFileOperation()` function
3. Ensure all tests pass: `npm test`
4. Commit your changes
5. Share the repository link or create a pull request

## Notes

- You can use AI tools (ChatGPT, Claude, etc.) but please add a comment explaining your approach
- Focus on correctness first, then optimize if time permits
- If you get stuck, implement partial solution and document what's missing

## Tech Stack

- **Language:** TypeScript
- **Test Framework:** Vitest
- **Node.js:** 20+

---

**Good luck!** 🚀

This challenge is part of the [agiens/join](https://github.com/agiens/join) coding challenges.
