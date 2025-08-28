# Project Template - Context Engineering Approach

A comprehensive project template following Context Engineering principles for production-ready applications with built-in quality, accessibility, and performance standards.

## 🎯 What is This?

This template provides a complete project structure with:
- **Context-first documentation** for AI-assisted development
- **Production-ready configurations** for React/TypeScript projects
- **Built-in quality gates** (testing, linting, accessibility)
- **Example patterns** abstracted from real projects
- **Comprehensive PRPs** (Product Requirements Prompts)

## 🚀 Quick Start

### Using This Template

1. **Clone the template**:
   ```bash
   git clone https://github.com/TortoiseWolfe/001_Template.git my-project
   cd my-project
   rm -rf .git
   git init
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Start development**:
   ```bash
   npm run dev
   # Or with Docker:
   docker-compose up --build
   ```

## 📁 Project Structure

```
.
├── PRPs/                  # Product Requirements Prompts
│   ├── templates/        # PRP templates for different feature types
│   └── README.md         # Guide to using PRPs
├── examples/             # Code patterns and examples
│   ├── component-patterns/
│   ├── hook-patterns/
│   ├── testing-patterns/
│   └── README.md
├── specs/                # Technical specifications
│   ├── requirements-template.md
│   └── design-system.md
├── ai_docs/              # AI assistant context
│   ├── architecture.md
│   └── context.md
├── src/                  # Your application code (empty)
├── public/               # Static assets
├── config/               # Configuration files
└── .github/workflows/    # CI/CD pipelines
```

## 📚 Key Concepts

### Context Engineering

This template follows Context Engineering principles:

1. **Context is King**: More context = better implementation
2. **Examples Over Instructions**: Concrete examples in `examples/`
3. **Validation Loops**: Built-in quality checks at every level
4. **Accessibility for All**: WCAG 2.1 AA compliance built-in
5. **Privacy by Default**: All tracking/analytics opt-in

### Product Requirements Prompts (PRPs)

PRPs provide comprehensive context for AI assistants or developers:

- **Goal & Success Criteria**: Clear definition of done
- **Task Breakdown**: Step-by-step implementation guide
- **Validation Loops**: Quality checks at each phase
- **Examples & Patterns**: Reference implementations
- **Anti-patterns**: What to avoid

See `PRPs/README.md` for detailed usage.

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Quality Checks
npm run lint            # Run ESLint
npm run lint:fix        # Fix linting issues
npm run format          # Format with Prettier
npm run type-check      # TypeScript checking

# Testing
npm test                # Run tests
npm run test:coverage   # With coverage report
npm run test:ui         # Interactive test UI

# Docker
docker-compose up       # Start with Docker
docker-compose down     # Stop containers
```

## 🎨 Customization Guide

### 1. Update Project Information

Edit these files with your project details:
- `package.json` - Name, description, author
- `CLAUDE.md` - Project context for AI assistants
- `.env` - Environment variables
- `vite.config.ts` - Base path for deployment

### 2. Choose Your Stack

The template supports multiple configurations:

#### Frontend Only (Current Setup)
- React + TypeScript + Vite
- CSS Modules
- GitHub Pages deployment

#### Full-Stack
```bash
# Add backend dependencies
npm install express cors dotenv
# Update docker-compose.yml for services
```

### 3. Implement Features

1. Create a PRP from templates:
   ```bash
   cp PRPs/templates/prp_frontend.md PRPs/features/my-feature.md
   ```

2. Fill out the PRP with requirements

3. Reference examples:
   ```bash
   # Check examples/ for patterns
   ls examples/component-patterns/
   ```

4. Implement with validation loops

## 🔒 Security & Privacy

### Default Settings
- ✅ Analytics disabled by default
- ✅ No cookies without consent
- ✅ Environment variables for secrets
- ✅ Input validation patterns
- ✅ XSS prevention examples

### Security Checklist
- [ ] Never commit `.env` file
- [ ] Use environment variables for secrets
- [ ] Validate all user inputs
- [ ] Implement CSRF protection (if needed)
- [ ] Regular dependency updates

## ♿ Accessibility

### Built-in Standards
- WCAG 2.1 AA compliance
- Keyboard navigation patterns
- Screen reader compatibility
- Color contrast checking
- Colorblind testing support

### Testing Accessibility
```bash
# Automated testing
npm run test:a11y

# Manual testing checklist
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Color contrast passes
- [ ] Works without color
- [ ] Focus indicators visible
```

## 🚀 Deployment

### GitHub Pages
```bash
# Update vite.config.ts
base: '/your-repo-name/'

# Deploy
npm run build
npm run deploy
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```bash
# Build production image
docker build -t my-app:prod .

# Run container
docker run -p 3000:3000 my-app:prod
```

## 📈 Performance Targets

All projects using this template should meet:

- ⚡ First Contentful Paint < 1s
- 📦 Bundle size < 500KB gzipped
- 🎯 Lighthouse score > 90
- ✅ Core Web Vitals passing
- 🧪 Test coverage > 80%

## 🤝 Contributing

1. Follow patterns in `examples/`
2. Create PRPs for new features
3. Run validation loops before committing
4. Update documentation
5. Ensure accessibility compliance

## 📖 Documentation

- **PRPs/**: Feature specifications and context
- **examples/**: Code patterns to follow
- **specs/**: Technical requirements
- **ai_docs/**: AI assistant context
- **CLAUDE.md**: Project-specific AI context

## 🏗️ Template Origin

This template was abstracted from the [TortoiseWolfe/Resume](https://github.com/TortoiseWolfe/Resume) project, which serves as the golden standard for structure and patterns.

## 📝 License

MIT

## 🙏 Acknowledgments

- Based on Context Engineering principles
- Inspired by production React applications
- Accessibility guidelines from WCAG
- Performance best practices from web.dev

---

## Next Steps

1. **Customize** - Update project information
2. **Plan** - Create PRPs for your features
3. **Build** - Implement following examples
4. **Validate** - Run quality checks
5. **Deploy** - Ship with confidence

For questions or issues, refer to the documentation in each directory.

**Remember**: Context is King, Examples Over Instructions, Validation Loops are Critical!