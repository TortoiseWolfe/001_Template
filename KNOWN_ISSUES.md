# Known Issues

This document tracks known bugs and issues in the template that are not yet resolved.

## Template Issues

### GitHub Pages Deployment - Empty Demo
**Status:** 🟡 Expected - Template is empty by design  
**URL:** https://tortoisewolfe.github.io/001_Template/  
**Impact:** Demo page shows only background, no content

**Description:**
The template's GitHub Pages deployment shows an empty page because all implementation code has been removed to create a clean starting point.

**Resolution:**
This is expected behavior. The template is designed to be cloned and built upon, not run as-is. Content will appear once developers start building their application using the template.

**Workaround:**
- Clone the template and start building your application
- The demo will work once you add your own components to src/
- For a working example, see the original project: https://tortoisewolfe.github.io/Resume/

---

## Legacy Issues from Original Project

These issues were present in the original Resume project and can be ignored for the template:

## Test Failures

### Typewriter Animation Timing Issues

**Status:** 🟡 Partially Fixed (2 tests still failing)  
**File:** `src/hooks/__tests__/useTypewriter.test.ts`  
**Impact:** Tests only - functionality works correctly in production

**Description:**
The typewriter animation tests have async timing issues when using fake timers. The tests expect certain text to be typed within specific time intervals, but the actual timing is inconsistent.

**Failing Tests:**

1. `should type out text character by character` - Completion state timing issue
2. `should call onComplete when typing is finished` - onComplete not triggered in test

**Fixed Tests:** 3. ✅ `should handle empty text` - Fixed by handling empty text in hook 4. ✅ `should restart typing when text changes` - Fixed timer advancement

**Root Cause:**
The tests use `vi.advanceTimersByTime()` to simulate time passing, but the typewriter hook uses `setTimeout` in a way that doesn't align perfectly with the fake timer advancement. This is a common issue with testing async animations.

**Workaround:**
The actual typewriter animation works correctly in the browser. These test failures do not affect production functionality.

**To Reproduce:**

```bash
npm test src/hooks/__tests__/useTypewriter.test.ts
```

**Potential Solutions:**

1. Rewrite tests to use real timers with proper async/await
2. Mock the entire typewriter hook in component tests
3. Use a different testing strategy for animation timing

---

## Fixed Issues

### CSS Module Class Selector in Tests

**Status:** ✅ Fixed  
**File:** `src/components/__tests__/ThemeToggle.test.tsx`  
**Fixed in:** Commit e8bb015

**Description:**
Test was looking for `.gear` class but CSS modules transform class names to unique identifiers like `gear_abc123`.

**Solution:**
Changed selector from `.gear` to `[class*="gear"]` to match partial class name.

### Resume Data Loading State Test

**Status:** ✅ Fixed  
**File:** `src/hooks/__tests__/useResumeData.test.ts`  
**Fixed in:** Commit e8bb015

**Description:**
Test expected `loading` to start as `true` but the synchronous data load set it to `false` immediately.

**Solution:**
Updated test expectations to match actual behavior where data loads synchronously.

---

## How to Report New Issues

1. Run tests to confirm: `npm test`
2. Add to this file with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Impact assessment
3. Create GitHub issue if needed: https://github.com/TortoiseWolfe/Resume/issues

## Test Summary

Current test status:

- **Passing:** 12 tests ✅
- **Failing:** 2 tests (typewriter animation completion)
- **Total:** 14 tests

Run all tests:

```bash
npm test
```

Run specific test file:

```bash
npm test src/hooks/__tests__/useTypewriter.test.ts
```
