# Examples Library

This directory contains abstracted patterns and examples from production codebases. Each example demonstrates best practices and can be used as a reference when implementing features.

## Directory Structure

### 📁 component-patterns/
React component patterns demonstrating:
- TypeScript interfaces and props
- CSS Modules for styling
- Accessibility implementation
- Theme support
- Loading and error states

### 📁 hook-patterns/
Custom React hooks showing:
- Data fetching patterns
- State management
- Side effect handling
- Performance optimization
- TypeScript typing

### 📁 testing-patterns/
Test examples including:
- Unit test structure
- Integration testing
- Accessibility testing
- Mocking strategies
- Test data fixtures

### 📁 docker-patterns/
Docker configurations for:
- Development environments
- Multi-stage builds
- Hot reload setup
- Production optimization
- Docker Compose examples

### 📁 ci-cd-patterns/
GitHub Actions workflows for:
- Build and test pipelines
- Deployment automation
- Security scanning
- Performance monitoring
- Release management

### 📁 styling-patterns/
CSS and styling examples:
- CSS Modules usage
- Theme implementation
- Responsive design
- Animations
- Dark mode support

### 📁 api-patterns/
Backend API patterns:
- RESTful endpoints
- Authentication
- Error handling
- Validation
- Database operations

### 📁 fullstack-patterns/
Full-stack integration examples:
- Frontend-backend communication
- State synchronization
- Real-time updates
- File uploads
- Authentication flow

## How to Use These Examples

1. **Find the Right Pattern**: Browse the directories to find examples similar to what you're building.

2. **Copy and Adapt**: Use examples as starting points, adapting them to your specific needs.

3. **Follow the Patterns**: Maintain consistency by following the patterns demonstrated here.

4. **Reference in PRPs**: When creating PRPs, reference specific examples:
   ```markdown
   See: examples/component-patterns/DataDisplay.tsx
   ```

## Pattern Index

### Common Component Patterns
- **DataDisplay**: Rendering lists with loading states
- **FormInput**: Controlled inputs with validation
- **Modal**: Accessible modal implementation
- **ThemeToggle**: Dark/light mode switcher
- **TypewriterText**: Animated text effect

### Common Hook Patterns
- **useAPI**: Generic data fetching
- **useLocalStorage**: Persistent state
- **useTheme**: Theme management
- **useTypewriter**: Animation hook
- **useMediaQuery**: Responsive helpers

### Common Testing Patterns
- **Component.test**: Testing React components
- **Hook.test**: Testing custom hooks
- **API.test**: Testing API endpoints
- **E2E.test**: End-to-end testing
- **a11y.test**: Accessibility testing

## Best Practices Demonstrated

### ✅ TypeScript
- Proper typing for props and state
- Generic types for reusability
- Type guards and assertions
- Discriminated unions

### ✅ Accessibility
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast

### ✅ Performance
- Memoization strategies
- Lazy loading
- Code splitting
- Bundle optimization
- Caching patterns

### ✅ Security
- Input validation
- XSS prevention
- CSRF protection
- Authentication patterns
- Environment variables

### ✅ Testing
- High coverage
- Edge case handling
- Mocking strategies
- Fixture management
- CI integration

## Adding New Examples

When adding new examples:

1. **Keep it Generic**: Remove project-specific logic
2. **Add Comments**: Explain key concepts
3. **Include Types**: Full TypeScript support
4. **Test It**: Ensure the example works
5. **Document It**: Update this README

## Example Template

```typescript
/**
 * Example: [Pattern Name]
 * 
 * Demonstrates:
 * - [Key concept 1]
 * - [Key concept 2]
 * - [Key concept 3]
 * 
 * Usage:
 * ```
 * <ExampleComponent prop="value" />
 * ```
 * 
 * @see https://link-to-docs
 */

// Implementation with clear comments
```

## Anti-Patterns to Avoid

Examples in this directory should NOT demonstrate:
- ❌ Hard-coded values (use props/config)
- ❌ Missing error handling
- ❌ Inaccessible UI patterns
- ❌ Security vulnerabilities
- ❌ Performance bottlenecks
- ❌ Untested code

## Resources

- [React Patterns](https://reactpatterns.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [MDN Web Docs](https://developer.mozilla.org/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [OWASP Security](https://owasp.org/www-project-top-ten/)