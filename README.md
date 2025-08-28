# 🚀 **Let's Build Something Great Together!**

*Welcome! This is your project repository. Start by filling out the form below to help us understand your needs.*

[Skip to Developer Documentation](#developer-documentation) | [Skip to Template Documentation](#template-documentation)

---

## **📝 Tell Us About Your Project**

*Don't worry about technical details - just help us understand what you need. We'll handle the complicated stuff.*

---

### **How to Fill This Out**

1. **Time needed**: About 10-15 minutes
2. **How to edit**: Click the pencil icon (✏️) at the top right of this file on GitHub
3. **How to save**: Scroll down and click "Commit changes" when done
4. **Need help?** Contact us at support@example.com

---

## **The Basics**

**What should we call your project?**
```
Your project name: [YOUR PROJECT NAME]
```

**What does your business/organization do?** *(2-3 sentences)*
```
Tell us about your business:
[YOUR BUSINESS DESCRIPTION]
```

**What problem are we solving for you?**
```
Describe the main challenge or opportunity:
[YOUR MAIN CHALLENGE]
```

---

## **Your Users**

**Who will use this?** *(customers, employees, both?)*
```
Your target users:
[YOUR TARGET USERS]
```

**What's the main thing they need to do?**
```
Their primary goal:
[PRIMARY USER GOAL]
```

**How many people will use this?**
- [ ] Just a few (< 100)
- [ ] Small group (100-1,000)  
- [ ] Growing audience (1,000-10,000)
- [ ] Large scale (10,000+)
- [ ] Not sure yet

---

## **Features You Need**

*Check all that apply - we'll figure out the details*

### **User Accounts:**
- [ ] No accounts needed
- [ ] Basic login/signup
- [ ] Social media login
- [ ] Employee accounts
- [ ] Customer accounts

### **Payments:**
- [ ] No payments
- [ ] One-time payments
- [ ] Subscriptions
- [ ] Donations accepted

### **Content & Files:**
- [ ] Static content only
- [ ] You'll manage all content
- [ ] Blog or news section
- [ ] Download resources/documents
- [ ] Upload files/images

### **Communication:**
- [ ] No communication features
- [ ] Email notifications
- [ ] In-app messaging
- [ ] Contact forms
- [ ] Live chat

### **Special Features:**
- [ ] Admin dashboard
- [ ] Search functionality
- [ ] Calendar/scheduling
- [ ] Maps/location features
- [ ] Other: _______________

---

## **Timeline & Investment**

**When do you need this launched?**
- [ ] ASAP (within 1 month)
- [ ] Soon (2-3 months)
- [ ] This quarter (3-6 months)
- [ ] This year (6-12 months)
- [ ] Flexible timeline

**Budget range:** *(helps us recommend the right solution)*
- [ ] Startup budget (< $5k)
- [ ] Small business ($5k-$25k)
- [ ] Growing business ($25k-$100k)
- [ ] Enterprise ($100k+)
- [ ] Let's discuss

---

## **Look & Feel**

**Websites/apps you like:** *(share 2-3 examples)*
```
Examples:
1. 
2. 
3. 
```

**Your brand personality:**
- [ ] Professional & corporate
- [ ] Friendly & approachable
- [ ] Modern & cutting-edge
- [ ] Playful & fun
- [ ] Elegant & sophisticated

**Brand colors or existing website:**
```
Current website or brand guide:
[YOUR BRAND INFO]
```

---

## **Success Looks Like...**

**How will we know this is successful?** *(be specific if possible)*
```
Success metrics:
[YOUR SUCCESS METRICS]
```

**What's MOST important?** *(pick one)*
- [ ] Works perfectly (reliability)
- [ ] Look amazing (design)
- [ ] Lightning fast (performance)
- [ ] Easy to use (user experience)
- [ ] Save money (efficiency)

---

## **Anything Else?**

**What else should we know?**
```
Additional context, concerns, or questions:
[ADDITIONAL INFO]
```

**Best way to reach you:**
```
Email: 
Phone: 
Preferred contact method: 
```

---

## **📞 What Happens Next?**

1. **We'll review your needs** and create a project plan
2. **We'll schedule a call** to discuss our recommendations
3. **You'll get a proposal** with timeline and investment details
4. **We build something amazing together!**

*Thank you for considering us for your project. We're excited to help bring your vision to life!*

---

<!--
FOR INTERNAL USE:
Process intake form with Context Engineering approach
This will generate initial project structure based on client responses
-->

---
---

# Developer Documentation

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

## ✅ Core Requirements

### Accessibility (WCAG 2.1 AA)
- Minimum 4.5:1 color contrast ratio
- All interactive elements keyboard accessible
- Proper ARIA labels and semantic HTML
- Test with screen readers (NVDA/JAWS)
- Test for colorblind users

### Performance
- First Contentful Paint < 1s
- Time to Interactive < 3s
- Bundle size < 500KB
- Lighthouse score > 90
- Core Web Vitals passing

### Mobile-First
- Touch targets minimum 44x44px
- Test at 320px viewport width
- No horizontal scroll
- Font size minimum 16px

## 📁 Project Structure

```
├── PRPs/                  # Product Requirements Prompts
│   ├── templates/        # PRP templates
│   └── README.md         # PRP guide
├── examples/             # Code patterns
├── specs/                # Technical specs
├── ai_docs/              # AI context
├── src/                  # Your code here
├── public/               # Static assets
└── .github/workflows/    # CI/CD
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview build

# Quality
npm run lint            # Run ESLint
npm run format          # Format code
npm run type-check      # TypeScript check

# Testing
npm test                # Run tests
npm run test:coverage   # Coverage report
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

### Docker
```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

---

# Template Documentation

## 🎯 What is This Template?

A comprehensive project template following **Context Engineering** principles for production-ready applications with built-in quality, accessibility, and performance standards.

### Key Features
- **Context-first documentation** for AI-assisted development
- **Production-ready configurations** for React/TypeScript
- **Built-in quality gates** (testing, linting, accessibility)
- **Example patterns** abstracted from real projects
- **Comprehensive PRPs** (Product Requirements Prompts)

## 📚 Context Engineering Principles

1. **Context is King**: More context = better implementation
2. **Examples Over Instructions**: Concrete examples in `examples/`
3. **Validation Loops**: Quality checks at every level
4. **Accessibility for All**: WCAG 2.1 AA compliance
5. **Privacy by Default**: All tracking opt-in

## 📖 Key Resources

- **[PRPs/](PRPs/)**: Feature specifications and context
- **[examples/](examples/)**: Code patterns to follow
- **[specs/](specs/)**: Technical requirements
- **[ai_docs/](ai_docs/)**: AI assistant context
- **[CLAUDE.md](CLAUDE.md)**: Project-specific AI context
- **[TEMPLATE_README.md](TEMPLATE_README.md)**: Full template documentation

## 🏗️ Template Origin

This template was abstracted from the [TortoiseWolfe/Resume](https://github.com/TortoiseWolfe/Resume) project, which serves as the golden standard for structure and patterns.

## 📝 License

MIT

---

**Remember**: Context is King, Examples Over Instructions, Validation Loops are Critical!