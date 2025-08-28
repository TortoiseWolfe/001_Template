# Frontend PRP Template

## Feature: [FEATURE_NAME]
**Type**: [Component | Page | Hook | Context | Utility]  
**Framework**: [React | Vue | Angular | Vanilla]  
**Priority**: [High | Medium | Low]

## Goal
[One sentence describing what this will achieve]

## Success Criteria
- [ ] Component renders correctly
- [ ] All interactions work
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Mobile responsive
- [ ] Tests pass (>80% coverage)
- [ ] Performance targets met

## Component Structure
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
├── ComponentName.test.tsx
└── index.ts
```

## Props/Interface
```typescript
interface ComponentProps {
  // Define props here
}
```

## Tasks
1. [ ] Create component structure
2. [ ] Implement base functionality
3. [ ] Add styling
4. [ ] Add accessibility (ARIA, keyboard nav)
5. [ ] Write unit tests
6. [ ] Test on mobile
7. [ ] Test colorblind accessibility
8. [ ] Performance optimization

## Validation
- `npm run lint`
- `npm run type-check`
- `npm run test`
- `npm run test:a11y`

## Examples
See: `examples/component-patterns/`

## Notes
[Additional context or requirements]