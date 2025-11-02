# Git Worktree Workflow Skill

## 📚 Overview

This skill provides a complete Git Worktree workflow for managing multiple branches simultaneously. It's designed for collaborative development with proper isolation and safety practices.

---

## 🎯 When to Use This Skill

Use this skill when:
- Working on multiple features/branches simultaneously
- Need to keep main branch clean and safe
- Want to avoid merge conflicts from uncommitted changes
- Switching between branches frequently
- Need isolated development environments

**Don't use** if:
- Only working on one branch at a time
- Simple changes that don't need isolation
- Learning basic Git (start with branches first)

---

## 📋 Prerequisites

```bash
# Check Git version (worktree requires Git 2.5+)
git --version

# Check if worktree is available
git worktree list
```

---

## 🚀 Workflow - 7 Phases

### **Phase 1: Setup (สร้างงาน)**

#### Step 1: Update Main Branch
```bash
# Go to main project directory
cd /path/to/project

# Switch to main
git checkout main

# Update to latest
git pull origin main
```

#### Step 2: Create Branch
```bash
# Create new branch with proper naming
git branch feat/issue-number-description
# or
git branch fix/issue-number-bug-name
```

**Branch Naming Convention:**
```
feat/5-add-dark-mode       (new feature)
fix/12-button-click-bug    (bug fix)
docs/3-readme-update       (documentation)
refactor/8-optimize-form   (refactoring)
```

#### Step 3: Create Worktree
```bash
# Create worktree with proper path
git worktree add ../project-feature feat/issue-number
#               ↑ parent directory   ↑ branch name

# OR in current directory (less common)
git worktree add ./project-feature feat/issue-number
#               ↑ current directory
```

**Path Guidelines:**
```
❌ WRONG: ./feature-branch (inside project)
✅ RIGHT: ../feature-branch (outside project, sibling)

Directory structure:
Desktop/
├── project/              (main worktree)
│   ├── src/
│   └── package.json
└── project-feature/      (worktree - sibling)
    ├── src/
    └── package.json
```

#### Step 4: Enter Worktree
```bash
cd ../project-feature
# or
cd ./project-feature

# Verify
git branch
# Should show: * feat/issue-number
```

---

### **Phase 2: Development (เขียนโค้ด)**

#### ⚠️ CRITICAL: Code Editing Rules

**❌ NEVER use Edit tool in worktree directories**
- Causes cache conflicts
- Creates file locking issues
- Loses data reliability

**✅ ALWAYS use Bash `cat` command**

#### Option A: Create New Files
```bash
# Create single file
cat > src/components/Feature.jsx << 'EOF'
export default function Feature() {
  return <h1>New Feature</h1>;
}
EOF

# Create multiple files
cat > src/styles.css << 'EOF'
.feature { color: blue; }
EOF

cat > src/utils.js << 'EOF'
export function helper() { }
EOF
```

#### Option B: Append to Existing Files
```bash
# Add code to end of file
cat >> src/App.jsx << 'EOF'
import Feature from './Feature';
EOF

# Add CSS to existing stylesheet
cat >> src/index.css << 'EOF'
.new-class { margin: 10px; }
EOF
```

#### Option C: Replace Entire File
```bash
# Overwrite completely
cat > src/App.jsx << 'EOF'
import Feature from './Feature';

function App() {
  return <Feature />;
}

export default App;
EOF
```

#### Testing
```bash
# Run development server
npm run dev

# Run tests
npm run test

# Run build
npm run build

# Check linting
npm run lint
```

---

### **Phase 3: Commit (บันทึก)**

```bash
# Check what changed
git status
git diff

# Stage changes
git add .
# or specific files
git add src/Feature.jsx src/styles.css

# Commit with good message
git commit -m "feat: Add Feature component

- Created Feature.jsx component
- Added styling for feature
- Updated App.jsx imports

Closes #5"
```

**Commit Message Format:**
```
type: short description (50 chars max)

- What: Specific changes made
- Why: Motivation for changes
- Impact: What this affects

Closes #issue-number
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

### **Phase 4: Publish (Push + PR)**

#### Step 1: Push to Remote
```bash
# First push (set upstream)
git push -u origin feat/issue-number
#         ↑
#      Important: -u flag

# Subsequent pushes
git push
# or
git push origin feat/issue-number
```

#### Step 2: Create Pull Request
```bash
# Using GitHub CLI (recommended)
gh pr create --title "feat: Add Feature component" --body "$(cat <<'EOF'
## Summary
Brief description of changes

## Changes
- Change 1
- Change 2

## Testing
- [x] Tested in browser
- [x] Build passes
- [x] Lint passes

Closes #5
EOF
)"
```

**or via GitHub Web UI:**
1. Go to repository
2. Click "Compare & pull request"
3. Fill in details
4. Create PR

---

### **Phase 5: Review (ตรวจสอบ)**

#### If There's Feedback
```bash
# Make updates
cat >> src/Feature.jsx << 'EOF'
// Added per review feedback
EOF

# Commit again
git add .
git commit -m "fix: Update per review feedback"

# Push (no -u needed)
git push

# PR updates automatically!
```

#### Continue Until Approved
```bash
# Repeat review → fix → commit → push until approved
```

---

### **Phase 6: Merge (รวมโค้ด)**

⚠️ **IMPORTANT: Merging Strategy**

```bash
# ❌ NEVER merge your own PR unless:
# - You have explicit permission
# - You're the project owner
# - Code review is complete

# ✅ Let reviewer/maintainer merge:
# - Request review from team
# - Wait for approval
# - Maintainer clicks "Merge" on GitHub

# If you have permission:
gh pr merge 5 --squash
#             ↑
#          squash commits
```

---

### **Phase 7: Cleanup (ล้างขยะ)**

#### Step 1: Return to Main Worktree
```bash
cd /path/to/project
# or
cd ../project
```

#### Step 2: Update Main Branch
```bash
git checkout main
git pull origin main
```

#### Step 3: Remove Worktree
```bash
git worktree remove ../project-feature
# or
git worktree remove ./project-feature
```

#### Step 4: Delete Local Branch (Optional)
```bash
# Delete merged branches
git branch -d feat/issue-number

# Force delete unmerged (only if needed)
git branch -D feat/issue-number
```

#### Step 5: Delete Remote Branch (Optional)
```bash
# Delete from GitHub
git push origin --delete feat/issue-number
```

#### Verification
```bash
# List remaining worktrees
git worktree list

# List remaining branches
git branch -a
```

---

## 📚 Complete Example

```bash
# ════════════════════════════════════════════════════════════
# FULL WORKFLOW - FROM START TO FINISH
# ════════════════════════════════════════════════════════════

# ① SETUP
cd /c/Users/User/Desktop/React-Basic-2025
git checkout main
git pull origin main

gh issue create --title "feat: Add Dark Mode" --body "Add theme toggle"
# Issue #10 created

git branch feat/10-dark-mode
git worktree add ../React-dark-mode feat/10-dark-mode
cd ../React-dark-mode

# ② DEVELOPMENT
cat > src/components/ThemeToggle.jsx << 'EOF'
export default function ThemeToggle() {
  return <button>Toggle Theme</button>;
}
EOF

cat >> src/App.jsx << 'EOF'
import ThemeToggle from './components/ThemeToggle';
EOF

npm run dev  # Test
npm run build
npm run lint

# ③ COMMIT
git add .
git commit -m "feat: add ThemeToggle component

- Created ThemeToggle.jsx
- Integrated to App.jsx

Closes #10"

# ④ PUBLISH
git push -u origin feat/10-dark-mode
gh pr create --title "feat: Add ThemeToggle" --body "Closes #10"

# ⑤ REVIEW (if feedback)
cat >> src/components/ThemeToggle.jsx << 'EOF'
// Added icon per review
EOF
git add .
git commit -m "fix: add icon per review"
git push

# ⑥ MERGE
# (Wait for maintainer to merge)
# OR: gh pr merge 11

# ⑦ CLEANUP
cd /c/Users/User/Desktop/React-Basic-2025
git checkout main
git pull origin main
git worktree remove ../React-dark-mode
git branch -d feat/10-dark-mode
git push origin --delete feat/10-dark-mode
```

---

## ⚡ Quick Commands Reference

```bash
# Worktree operations
git worktree list                          # List all worktrees
git worktree add <path> <branch>          # Create new
git worktree remove <path>                # Delete worktree
git worktree lock <path>                  # Lock worktree
git worktree unlock <path>                # Unlock worktree

# Branch operations
git branch                                 # List local branches
git branch -a                             # List all branches
git branch <name>                         # Create branch
git branch -d <name>                      # Delete merged branch
git branch -D <name>                      # Force delete branch
git push origin --delete <branch>         # Delete remote branch

# File operations (USE THESE!)
cat > file.txt << 'EOF'
content here
EOF

cat >> file.txt << 'EOF'
append content
EOF

# Push & PR
git push -u origin <branch>               # First push
git push                                  # Next pushes
gh pr create --title "..." --body "..."   # Create PR
gh pr list                                # List PRs
gh pr view <number>                       # View PR
gh pr merge <number>                      # Merge PR
```

---

## ✅ Best Practices

### DO ✅

- ✅ Create worktree in parent directory (sibling)
- ✅ Use proper branch naming convention
- ✅ Use `cat` command for file editing
- ✅ Write descriptive commit messages
- ✅ Push with `-u` flag on first push
- ✅ Create PR and request review
- ✅ Clean up worktree after merge
- ✅ Test before committing
- ✅ One feature per branch
- ✅ Keep commits atomic and small

### DON'T ❌

- ❌ Create worktree inside project directory
- ❌ Use Edit tool in worktree directories
- ❌ Commit without testing
- ❌ Use `git push --force`
- ❌ Merge your own PR without review
- ❌ Forget to cleanup worktree
- ❌ Mix multiple features in one branch
- ❌ Commit unnecessary files (node_modules, .env)
- ❌ Create worktree from wrong branch
- ❌ Work directly in main branch

---

## 🐛 Troubleshooting

### Problem: "invalid reference: branch-name"
```bash
# Branch doesn't exist yet
# Solution: Create branch first
git branch branch-name
git worktree add <path> branch-name
```

### Problem: "working tree is already locked"
```bash
# Worktree is locked (crashed process?)
# Solution: Unlock it
git worktree unlock <path>
```

### Problem: "can't cd to worktree - folder doesn't exist"
```bash
# Worktree folder wasn't created properly
# Solution: Check git worktree list and create manually
mkdir -p ../project-feature
git worktree add ../project-feature feat/branch
```

### Problem: "can't delete branch - not fully merged"
```bash
# Branch has commits not in main
# Solutions:
git branch -D branch-name      # Force delete if sure
# OR: Merge PR first, then delete
```

### Problem: "can't push - remote rejected"
```bash
# Branch or PR already exists
# Solution: Check GitHub and cleanup
git branch -a
git push origin --delete branch-name
git worktree remove ../path
```

---

## 📊 Worktree vs Branch

| Feature | Branch | Worktree |
|---------|--------|----------|
| **Isolation** | ❌ Shared filesystem | ✅ Separate filesystem |
| **Switching** | ⚠️ Stash needed | ✅ No stash needed |
| **Performance** | ✅ Lightweight | ⚠️ Heavier |
| **Parallel Work** | ❌ No | ✅ Yes |
| **Cleanup** | ✅ Easy | ✅ Need `worktree remove` |
| **Best For** | Single feature | Multiple features |

---

## 🎓 Learning Path

1. **Day 1**: Learn branches
   - `git branch`, `git checkout`, `git merge`

2. **Day 2**: Learn worktree
   - Setup, development, cleanup

3. **Day 3**: Learn PR workflow
   - Commit, push, create PR, review, merge

4. **Day 4**: Practice
   - Create 3-5 worktrees for different features

5. **Ongoing**: Automate
   - Create scripts for setup/cleanup

---

## 🚀 Next Steps

1. **For This Project**: Use worktree for Props Drilling and PR Workflow features
2. **For Other Projects**: Copy this skill and adapt to your workflow
3. **For Teams**: Share this skill with team members
4. **For Automation**: Create shell script wrapper around worktree commands

---

## 📝 Notes

- **Git Version**: Requires Git 2.5+ (released in 2015)
- **Windows Users**: Works fine, use forward slashes for paths
- **macOS/Linux**: Works perfectly
- **Performance**: Worktrees are faster than switching branches
- **Shared Git**: All worktrees share same `.git` directory (efficient)

---

**Last Updated:** 2025-11-02
**Skill Version:** 1.0.0
**Status:** Production Ready ✅
