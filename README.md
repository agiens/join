# Agiens Coding Challenges

Welcome to Agiens! We believe in practical coding challenges that test real-world skills.

## Available Challenges

### 🔍 File Path Parser Challenge
**Location:** [challenges/file-parser/](./challenges/file-parser/)  
**Standalone repo:** [agiens/join-file-parser](https://github.com/agiens/join-file-parser)  
**Time:** 30-45 minutes  
**Difficulty:** Medium  
**Skills:** TypeScript, Regex, Edge Case Handling

Fix a parser that extracts file paths from AI assistant output. Handle quoted filenames, escaped quotes, and special characters.

**Why it matters:**
- Real bug affecting production AI workflows
- Filenames with spaces, Unicode, special characters break current implementation
- Thousands of operations processed daily - every failure means lost work

**What you'll learn:**
- Regex pattern matching with complex edge cases
- String parsing and quote handling
- Test-driven development with Vitest

---

## How to Participate

### Option 1: Work in this repo (recommended)
```bash
git clone https://github.com/agiens/join.git
cd join/challenges/file-parser
npm install
npm test
```

### Option 2: Use standalone repo
```bash
git clone https://github.com/agiens/join-file-parser.git
cd join-file-parser
npm install
npm test
```

### Submit your solution
1. Fork this repository or the standalone challenge repo
2. Fix the code until all tests pass
3. Commit your changes
4. Create a pull request or share your repository link

---

## Questions?

Open an issue in this repository or contact us.

**Good luck!** 🚀
