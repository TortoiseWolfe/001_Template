# Claude AI Assistant Context

## Project Overview

[PROJECT_NAME] - [Brief description of what this project does]

## Tech Stack

- **Frontend**: [React | Vue | Angular | Vanilla]
- **Backend**: [Node.js | Python | Go | None]
- **Database**: [PostgreSQL | MongoDB | Redis | None]
- **Styling**: [CSS Modules | Tailwind | Styled Components]
- **Testing**: [Vitest | Jest | Pytest]
- **Development**: [Docker | Local]
- **Deployment**: [GitHub Pages | Vercel | AWS | Heroku]

## Project Structure

```
├── src/                    # Application source code
├── public/                 # Static assets
├── examples/              # Code patterns and examples
├── PRPs/                  # Product Requirements Prompts
├── specs/                 # Technical specifications
├── ai_docs/               # AI assistant documentation
├── tests/                 # Test suites
├── config/                # Configuration files
├── docs/                  # Human documentation
└── .github/workflows/     # CI/CD pipelines
```

## Common Commands

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Build for production
npm run build
```

### Docker (if applicable)

```bash
# Start with Docker Compose
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

## Key Files

- **package.json**: Dependencies and scripts
- **vite.config.ts**: Build configuration (if using Vite)
- **.env.example**: Environment variables template
- **docker-compose.yml**: Docker services (if applicable)
- **PRPs/**: Feature requirements and context

## Performance Targets

- First Contentful Paint < 1 second
- Bundle size < 500KB gzipped
- Lighthouse Performance score > 90
- Test coverage > 80%

## Development Standards

### Code Quality

- TypeScript strict mode enabled
- ESLint and Prettier configured
- No `any` types
- Maximum file size: 500 lines
- Clear function and variable names

### Testing Requirements

- Unit tests for all utilities (>80% coverage)
- Integration tests for critical flows
- E2E tests for user journeys
- Accessibility tests (WCAG 2.1 AA)

### Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader tested
- Color contrast ratios met
- No color-only information

### Security

- Environment variables for secrets
- Input validation on all forms
- XSS prevention measures
- CSRF protection (if applicable)
- Regular dependency updates

## Current Context

### Active Development

- [ ] [Current feature being worked on]
- [ ] [Next priority]

### Known Issues

- **Input backgrounds turning white on focus**: Despite extensive CSS overrides in `IntakeForm.override.css`, input fields (especially project name) occasionally show white backgrounds when focused or typed in. Multiple fixes applied with `!important` flags but issue persists intermittently. Current workaround: Aggressive CSS overrides at lines 220-237 in override.css.
- [Issue 2]

### Recent Changes

- [Recent change 1]
- [Recent change 2]

## AI Assistant Guidelines

When working on this project:

1. **Follow existing patterns**: Check `examples/` directory
2. **Use TypeScript**: Strong typing required
3. **Test everything**: Write tests alongside code
4. **Accessibility first**: Every feature must be accessible
5. **Performance matters**: Monitor bundle size
6. **Document changes**: Update relevant documentation

### Before Making Changes

- Read relevant PRPs in `PRPs/` directory
- Check examples in `examples/` directory
- Review specs in `specs/` directory
- Understand current architecture

### After Making Changes

- Run validation loops (lint, test, type-check)
- Update documentation if needed
- Check accessibility
- Verify performance impact

## Project-Specific Context

[Add any project-specific information, patterns, or requirements here]

### Business Logic

[Describe core business logic and rules]

### API Endpoints (if applicable)

[List main API endpoints and their purposes]

### State Management

[Describe state management approach]

### Deployment Process

[Describe how the project is deployed]

## Important Notes

- [Important note 1]
- [Important note 2]
- [Important note 3]

---

**Last Updated**: [DATE]
**Maintained By**: [TEAM/PERSON]
