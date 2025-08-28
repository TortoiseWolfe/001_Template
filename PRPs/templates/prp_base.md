# Product Requirements Prompt (PRP) Template

## Metadata
- **Feature Name**: [FEATURE_NAME]
- **Type**: [Feature | Bug Fix | Enhancement | Refactor]
- **Priority**: [Critical | High | Medium | Low]
- **Estimated Complexity**: [1-10]
- **Dependencies**: [List any dependent features or PRPs]
- **Created**: [DATE]
- **Last Updated**: [DATE]

## Goal & Success Criteria

### Primary Goal
[One sentence describing what this PRP will achieve]

### Success Criteria
- [ ] [Specific, measurable outcome 1]
- [ ] [Specific, measurable outcome 2]
- [ ] [Specific, measurable outcome 3]
- [ ] All validation loops pass
- [ ] Test coverage > 80%
- [ ] Accessibility tests pass (WCAG 2.1 AA)
- [ ] Performance budgets maintained

## Context & Background

### Problem Statement
[Describe the problem this PRP solves, why it's important]

### User Story
As a [type of user], I want [goal] so that [benefit].

### Technical Context
[Relevant technical background, constraints, or considerations]

### Business Context
[Business value, impact on users, ROI considerations]

## Current State vs Desired State

### Current State
```
[Describe or diagram current architecture/flow/UI]
```

### Desired State
```
[Describe or diagram target architecture/flow/UI]
```

### Gap Analysis
- [Gap 1: What needs to change]
- [Gap 2: What needs to be added]
- [Gap 3: What needs to be removed]

## Required Documentation & Examples

### Documentation to Reference
- [ ] [Link to relevant docs/specs]
- [ ] [Link to API documentation]
- [ ] [Link to design system]
- [ ] [Link to similar implementations]

### Example Code Patterns
```javascript
// Example from: examples/[pattern-name].js
// Shows: [What this example demonstrates]
[Include relevant code example]
```

### UI/UX Examples
- [Link to mockups/wireframes]
- [Screenshots of similar features]
- [User flow diagrams]

## Task Breakdown

### Phase 1: Data & Models
- [ ] Task 1.1: Define data schemas/types
  - Create TypeScript interfaces/Zod schemas
  - Add validation rules
  - Create test fixtures
- [ ] Task 1.2: Set up database models (if applicable)
  - Create migrations
  - Add indexes
  - Document relationships

### Phase 2: Business Logic
- [ ] Task 2.1: Implement core functions
  - Write pure functions
  - Add error handling
  - Include logging
- [ ] Task 2.2: Write unit tests
  - Test happy path
  - Test edge cases
  - Test error conditions

### Phase 3: API Layer (if applicable)
- [ ] Task 3.1: Create endpoints
  - Define routes
  - Add authentication/authorization
  - Implement rate limiting
- [ ] Task 3.2: Write integration tests
  - Test API contracts
  - Test error responses
  - Test performance

### Phase 4: UI Components
- [ ] Task 4.1: Build components
  - Create with ARIA labels
  - Add keyboard navigation
  - Implement responsive design
- [ ] Task 4.2: Add interactivity
  - Handle user events
  - Manage state
  - Add loading/error states
- [ ] Task 4.3: Style components
  - Follow design system
  - Support theme switching
  - Test with colorblind simulators

### Phase 5: Integration
- [ ] Task 5.1: Connect frontend to backend
  - Set up API client
  - Handle async operations
  - Implement caching
- [ ] Task 5.2: E2E testing
  - Test critical user flows
  - Test across browsers
  - Test on mobile devices

### Phase 6: Documentation & Deployment
- [ ] Task 6.1: Update documentation
  - API documentation
  - Component documentation
  - Update README
- [ ] Task 6.2: Prepare for deployment
  - Update environment variables
  - Run performance tests
  - Update CI/CD if needed

## Validation Loops

### Level 1: Syntax & Style ✓
```bash
npm run lint:fix
npm run format
npm run type-check
```

### Level 2: Unit Tests ✓
```bash
npm run test:unit
# Coverage should be > 80%
```

### Level 3: Integration Tests ✓
```bash
npm run test:integration
npm run test:api  # if applicable
```

### Level 4: Accessibility Tests ✓
```bash
npm run test:a11y
npm run test:colorblind
# Manual: Test with screen reader (NVDA/JAWS)
```

### Level 5: Performance Tests ✓
```bash
npm run lighthouse
npm run bundle-analyze
# Ensure bundle size < 500KB
# Lighthouse score > 90
```

### Level 6: Security Checks ✓
```bash
npm audit
npm run security-scan
# Check for exposed secrets
# Verify CSP headers
```

## Anti-Patterns to Avoid

### Code Anti-Patterns
- ❌ Don't use `any` type in TypeScript
- ❌ Don't catch generic exceptions without logging
- ❌ Don't hardcode configuration values
- ❌ Don't create files > 500 lines
- ❌ Don't skip tests for "simple" changes
- ❌ Don't use synchronous operations in async context

### UI/UX Anti-Patterns
- ❌ Don't rely on color alone for information
- ❌ Don't skip focus indicators
- ❌ Don't ignore mobile users
- ❌ Don't auto-play media
- ❌ Don't hide important actions in menus

### Architecture Anti-Patterns
- ❌ Don't create tight coupling between components
- ❌ Don't duplicate business logic
- ❌ Don't ignore error boundaries
- ❌ Don't skip validation on both client and server
- ❌ Don't expose sensitive data in responses

## Known Gotchas & Edge Cases

### Framework/Library Specific
- [Gotcha 1: Known issue with library X]
- [Gotcha 2: Browser compatibility issue]
- [Gotcha 3: Performance bottleneck to avoid]

### Data/State Management
- [Edge case 1: Handling null/undefined]
- [Edge case 2: Race conditions]
- [Edge case 3: Stale data scenarios]

### User Experience
- [UX gotcha 1: Accessibility consideration]
- [UX gotcha 2: Mobile interaction pattern]
- [UX gotcha 3: International users]

## Dependencies & Risks

### Technical Dependencies
- [ ] [Dependency 1: Must be completed first]
- [ ] [Dependency 2: External API availability]
- [ ] [Dependency 3: Library compatibility]

### Risks & Mitigations
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | Low/Med/High | Low/Med/High | [Mitigation strategy] |
| [Risk 2] | Low/Med/High | Low/Med/High | [Mitigation strategy] |

## Monitoring & Success Metrics

### Technical Metrics
- [ ] Page load time < 1s
- [ ] API response time < 200ms
- [ ] Error rate < 0.1%
- [ ] Test coverage > 80%

### Business Metrics
- [ ] [Metric 1: User engagement]
- [ ] [Metric 2: Conversion rate]
- [ ] [Metric 3: User satisfaction]

### Monitoring Setup
- [ ] Add logging for key operations
- [ ] Set up error tracking
- [ ] Create dashboard for metrics
- [ ] Configure alerts for failures

## Privacy & Security Considerations

### Privacy
- [ ] No PII logged
- [ ] Analytics respects Do Not Track
- [ ] GDPR/CCPA compliant
- [ ] Data minimization principles followed

### Security
- [ ] Input validation implemented
- [ ] Authentication/authorization checked
- [ ] Rate limiting configured
- [ ] CSP headers set appropriately
- [ ] Secrets stored securely

## Review Checklist

### Before Starting
- [ ] Requirements clear and complete
- [ ] Examples and patterns identified
- [ ] Dependencies available
- [ ] Test data prepared

### During Development
- [ ] Following coding standards
- [ ] Writing tests alongside code
- [ ] Documenting as you go
- [ ] Regular validation loops

### Before Completion
- [ ] All success criteria met
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Accessibility verified
- [ ] Performance validated

## Confidence Score

**Overall Confidence**: [1-10]

### Confidence Breakdown
- Requirements Understanding: [1-10]
- Technical Approach: [1-10]
- Timeline Estimate: [1-10]
- Risk Assessment: [1-10]

## Notes & Additional Context

[Any additional notes, links, or context that doesn't fit above categories]

---

## AI Assistant Instructions

When implementing this PRP:
1. Read all context and examples first
2. Follow the task breakdown sequentially
3. Run validation loops after each phase
4. Never skip tests or documentation
5. Ask for clarification if requirements are unclear
6. Report confidence score honestly
7. Flag any deviations from the plan

Remember: Context is King, Examples Over Instructions, Validation Loops are Critical