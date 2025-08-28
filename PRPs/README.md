# Product Requirements Prompts (PRPs)

PRPs are detailed prompts that provide AI assistants with comprehensive context for implementing features. They follow the Context Engineering principle: "Context is King."

## What is a PRP?

A PRP is a structured document that includes:
- Clear goals and success criteria
- All necessary context and examples
- Step-by-step task breakdowns
- Validation loops at each stage
- Anti-patterns to avoid
- Known gotchas and edge cases

## Why Use PRPs?

1. **Consistency**: Every feature follows the same high standards
2. **Completeness**: Nothing gets forgotten or skipped
3. **Quality**: Built-in validation ensures production-ready code
4. **Speed**: AI assistants work faster with complete context
5. **Documentation**: PRPs serve as living documentation

## Available Templates

### Base Template (`prp_base.md`)
Comprehensive template for any feature. Includes all sections and extensive checklists.

### Frontend Template (`prp_frontend.md`)
Focused on UI components, accessibility, and user interactions.

### Backend Template (`prp_backend.md`)
Focused on APIs, data models, and server-side logic.

### Full-Stack Template (`prp_fullstack.md`)
For features that span frontend and backend.

## How to Use PRPs

### 1. Choose a Template
Select the template that best matches your feature type.

### 2. Fill Out Required Sections
- **Goal**: What are you trying to achieve?
- **Success Criteria**: How will you know it's done?
- **Tasks**: Break down the work into steps
- **Validation**: How will you test it?

### 3. Add Context
- Link to relevant documentation
- Include code examples
- Reference similar implementations
- Note any special requirements

### 4. Share with AI Assistant
Provide the completed PRP to your AI assistant. The more context you provide, the better the implementation.

### 5. Follow Validation Loops
After each phase, run the validation commands to ensure quality.

## Best Practices

### DO:
- ✅ Include specific examples from your codebase
- ✅ Define clear success criteria
- ✅ Break large features into smaller PRPs
- ✅ Run validation loops after each phase
- ✅ Update PRPs as requirements change

### DON'T:
- ❌ Skip sections because they seem unnecessary
- ❌ Assume the AI knows your conventions
- ❌ Ignore validation failures
- ❌ Create PRPs larger than 5 tasks phases
- ❌ Forget accessibility and security

## Example PRP Workflow

```bash
# 1. Create a new PRP from template
cp templates/prp_frontend.md features/new-feature.md

# 2. Fill out the PRP
# Edit features/new-feature.md with your requirements

# 3. Implement with AI assistance
# Share the PRP with your AI assistant

# 4. Validate implementation
npm run lint
npm run test
npm run test:a11y
npm run build

# 5. Document completion
# Update the PRP with any changes or learnings
```

## PRP Sections Explained

### Metadata
Track basic information about the feature.

### Goal & Success Criteria
Define what success looks like before starting.

### Context & Background
Provide all necessary information upfront.

### Task Breakdown
Sequential steps to implement the feature.

### Validation Loops
Tests and checks to run after each phase.

### Anti-Patterns
Common mistakes to avoid.

### Known Gotchas
Framework quirks and edge cases to watch for.

### Examples & Patterns
Reference implementations to follow.

### Confidence Score
AI's assessment of requirements clarity.

## Tips for Writing Good PRPs

1. **Be Specific**: "Create a button" vs "Create a primary CTA button with loading state"
2. **Include Examples**: Show actual code from your project
3. **Define Edge Cases**: What happens when things go wrong?
4. **Set Performance Targets**: Define acceptable metrics
5. **Consider Accessibility**: Include WCAG requirements
6. **Think Security**: Note authentication and validation needs

## Validation Levels

PRPs include multiple validation levels:

1. **Syntax & Style**: Linting and formatting
2. **Unit Tests**: Component/function testing
3. **Integration Tests**: Feature testing
4. **Accessibility Tests**: WCAG compliance
5. **Performance Tests**: Speed and bundle size
6. **Security Checks**: Vulnerability scanning

## Managing PRPs

### Organization
```
PRPs/
├── templates/          # Reusable templates
├── features/          # Feature-specific PRPs
├── bugs/             # Bug fix PRPs
├── refactors/        # Refactoring PRPs
└── completed/        # Archived PRPs
```

### Lifecycle
1. **Draft**: Initial creation from template
2. **Review**: Team feedback and refinement
3. **Active**: Currently being implemented
4. **Testing**: In validation phase
5. **Complete**: Feature shipped
6. **Archived**: Moved to completed/

## Integration with AI Assistants

PRPs are designed to work with AI coding assistants like:
- GitHub Copilot
- Claude
- ChatGPT
- Cursor
- Codeium

The structured format helps AI understand exactly what you need and how to validate it.

## Common Patterns

### Feature Flag Integration
```markdown
## Feature Flag
- Flag Name: `FEATURE_NEW_COMPONENT`
- Default: `false`
- Rollout: 10% → 50% → 100%
```

### A/B Testing
```markdown
## A/B Test Configuration
- Test Name: `button-color-test`
- Variants: `control` | `treatment`
- Metrics: Click-through rate
```

### Progressive Enhancement
```markdown
## Enhancement Levels
1. Basic: Works without JavaScript
2. Enhanced: JavaScript interactions
3. Premium: Advanced animations
```

## Remember

> "Context is King, Examples Over Instructions, Validation Loops are Critical"

The more context you provide in your PRP, the better the implementation will be. Never skip validation loops - they ensure production-ready quality.