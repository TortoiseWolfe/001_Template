# Architecture Overview

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: CSS Modules with CSS Custom Properties
- **State Management**: React Context API
- **PDF Generation**: react-pdf (lazy loaded)
- **Development**: Docker with hot reload
- **Testing**: Vitest + React Testing Library
- **Deployment**: GitHub Pages via GitHub Actions

## Project Goals

- Single-page responsive resume website
- Professional design with download functionality
- Fast loading and mobile-optimized
- Easy content updates via JSON configuration
- Automated deployment pipeline
- Steampunk-themed dark mode (default)

## Key Design Decisions

### Static Site

- No backend required, pure client-side application
- All data stored in JSON files
- PDF generation happens in the browser
- Hosting on GitHub Pages (free, reliable)

### Component-Based Architecture

- Modular React components for maintainability
- Composition over inheritance
- Single responsibility principle
- Props for configuration, context for shared state

### Performance First

- Lazy loading for heavy libraries (PDF generation)
- CSS custom properties for theming (no runtime calculations)
- Code splitting at the route level
- Image optimization with WebP format
- Font display swap to prevent invisible text

### Docker Development

- Consistent environment across machines
- Hot reload for rapid development
- Production-like nginx server for testing
- Multi-stage builds for optimization

### CI/CD Pipeline

- Automated testing on every push
- Build and deploy on merge to main
- Performance budgets enforced
- Lighthouse CI for monitoring

## Component Architecture

### Component Hierarchy

```
App.tsx
├── ThemeProvider (Context)
│   ├── Layout
│   │   ├── Header
│   │   │   ├── TypewriterText (name)
│   │   │   ├── TypewriterText (title)
│   │   │   └── TopControls
│   │   │       ├── ThemeToggle
│   │   │       └── DownloadButton
│   │   └── Main
│   │       ├── PersonalInfo
│   │       ├── Summary
│   │       ├── Experience
│   │       │   └── ExperienceItem[]
│   │       ├── Skills
│   │       │   └── SkillCategory[]
│   │       ├── Education
│   │       │   └── EducationItem[]
│   │       └── Certifications
│   │           └── CertificationItem[]
│   └── Footer
└── ErrorBoundary
```

### Component Categories

#### Layout Components

- **Layout**: Main layout wrapper with theme support
- **Header**: Contains name, title, and controls
- **Footer**: Copyright and links
- **Navigation**: Section navigation (if needed)

#### Resume Components

- **PersonalInfo**: Contact details and links
- **Summary**: Professional summary
- **Experience**: Work history with timeline
- **Skills**: Categorized skill display
- **Education**: Academic background
- **Certifications**: Professional certifications

#### UI Components

- **ThemeToggle**: Dark/light mode switcher with gear animation
- **DownloadButton**: PDF/DOCX export with loading state
- **TypewriterText**: Animated text with cursor
- **LoadingSpinner**: Steampunk-styled loading indicator
- **ScheduleButton**: CTA button for Calendly/Calendar integration (Phase 6)
- **ContactForm**: Email contact form with Formspree integration (Phase 6)

#### Common Components

- **Card**: Reusable container with consistent styling
- **Section**: Resume section wrapper
- **Button**: Styled button with hover/focus states
- **Icon**: SVG icon wrapper

## State Management

### Context Providers

#### ThemeContext

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  systemPreference: 'light' | 'dark' | null;
}
```

- Manages theme state
- Persists to localStorage
- Respects system preferences
- Provides theme toggle function

#### ResumeDataContext

```typescript
interface ResumeDataContextType {
  data: ResumeData;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}
```

- Provides resume data to all components
- Handles loading and error states
- Allows data refresh if needed

### Local Component State

- Form inputs (controlled components)
- UI state (dropdowns, modals)
- Animation state (typewriter progress)
- Loading states for async operations

### State Flow

```
App Initialization
    ↓
Load Theme from localStorage
    ↓
Apply Theme to Document
    ↓
Load Resume Data (JSON)
    ↓
Render Components with Data
    ↓
User Interactions → Update State → Re-render
```

## Data Architecture

### Resume Data Structure

```typescript
interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    location: Location;
    phone: string;
    email: string;
    willingToRelocate: string[];
  };
  links: {
    portfolio: string;
    github: string[];
    linkedin: string;
    youtube?: string;
    twitch?: string;
  };
  summary: string;
  experience: Experience[];
  skills: SkillCategories;
  education: Education[];
  certifications: Certification[];
  assessments?: Assessment[];
}
```

### Date Handling

- All dates in ISO 8601 format (YYYY-MM-DD)
- `isCurrent` boolean for ongoing positions
- `displayDate` for custom formatting
- Utility functions for date formatting

## Performance Optimization

### Bundle Splitting Strategy

```
main.chunk.js         - Core app code (~150KB)
vendor.chunk.js       - React, dependencies (~100KB)
pdf.chunk.js          - PDF library (lazy) (~250KB)
styles.css            - All styles (~50KB)
```

### Loading Strategies

1. **Critical Path**: Core app loads immediately
2. **Progressive Enhancement**: Features load as needed
3. **Lazy Loading**: PDF library loads on demand
4. **Prefetching**: Preload fonts and critical images

### Caching Strategy

- Static assets cached for 1 year
- HTML cached for 1 hour
- Service worker for offline support
- localStorage for theme preference

## Testing Architecture

### Test Categories

1. **Unit Tests** - Utility functions, hooks
2. **Component Tests** - Individual component behavior
3. **Integration Tests** - Component interactions
4. **E2E Tests** - User flows
5. **Visual Regression** - Theme switching
6. **Performance Tests** - Lighthouse CI

### Test Structure

```
tests/
├── unit/
│   ├── utils/
│   └── hooks/
├── components/
│   ├── Layout/
│   ├── Resume/
│   └── UI/
├── integration/
│   ├── theme-switching.test.tsx
│   └── pdf-download.test.tsx
└── e2e/
    ├── user-journey.spec.ts
    └── accessibility.spec.ts
```

## Security Considerations

### Content Security Policy

```
Content-Security-Policy:
  default-src 'self';
  style-src 'self' 'unsafe-inline';
  font-src 'self' data:;
  img-src 'self' data: https:;
  script-src 'self';
```

### Data Validation

- Sanitize all user inputs
- Validate JSON schema
- Escape HTML in text content
- Validate URLs before rendering

## Deployment Architecture

### GitHub Actions Workflow

```yaml
on: push to main
  ↓
Install Dependencies
  ↓
Run Tests
  ↓
Check Bundle Size
  ↓
Build Application
  ↓
Run Lighthouse CI
  ↓
Deploy to GitHub Pages
```

### Environment Configuration

- Development: Hot reload, source maps, verbose logging
- Staging: Production build, test data
- Production: Optimized build, minified, no source maps

## SEO & Professional Architecture (Phase 5)

### Data Update Strategy

Complete resume data updates should be performed only when all accurate information is available, rather than piecemeal updates of placeholder data. This ensures consistency and prevents partially accurate information from being deployed.

### Meta Tag Strategy

```html
<!-- Professional Title -->
<title>John Doe - Full Stack Developer & UI/UX Designer</title>

<!-- Search Engine Optimization -->
<meta
  name="description"
  content="Experienced Full Stack Developer specializing in React, Node.js, and cloud technologies. Available for hire in Tennessee and remote opportunities."
/>
<meta
  name="keywords"
  content="full stack developer, react developer, node.js, typescript, tennessee developer, remote developer"
/>

<!-- Open Graph for Social Media -->
<meta property="og:title" content="John Doe - Full Stack Developer" />
<meta property="og:description" content="Professional resume and portfolio" />
<meta property="og:image" content="/og-image.png" />
<meta property="og:url" content="https://tortoisewolfe.github.io/Resume/" />
<meta property="og:type" content="profile" />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="John Doe - Full Stack Developer" />
<meta name="twitter:description" content="Professional resume and portfolio" />
<meta name="twitter:image" content="/twitter-card.png" />
```

### Structured Data Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "John Doe",
  "jobTitle": "Full Stack Developer",
  "email": "johndoe@example.com",
  "telephone": "+1-555-123-4567",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cleveland",
    "addressRegion": "TN",
    "postalCode": "37312"
  },
  "sameAs": [
    "https://github.com/TortoiseWolfe",
    "https://linkedin.com/in/johndoe",
    "https://TurtleWolfe.com"
  ],
  "knowsAbout": ["React", "Node.js", "TypeScript", "Full Stack Development"]
}
```

### Favicon Strategy

```
favicon.ico           - 16x16, 32x32, 48x48
favicon-32x32.png     - High quality 32px
favicon-16x16.png     - High quality 16px
apple-touch-icon.png  - 180x180 for iOS
android-chrome-*.png  - 192x192, 512x512
site.webmanifest      - PWA manifest
```

### Analytics Implementation

- Google Analytics 4 for visitor tracking
- Goal conversion tracking for PDF downloads
- Custom events for theme toggles
- Performance monitoring with Web Vitals
- Search Console integration

## Monitoring & Analytics

### Performance Monitoring

- Core Web Vitals tracking
- Error boundary reporting
- Bundle size tracking
- Load time monitoring

### User Analytics & Conversion Tracking

- Page views and session duration
- Resume download conversions
- Theme preference statistics
- Device/browser analytics
- Geographic visitor data
- Referral source tracking
- **Schedule Interview button clicks** (Phase 6)
- **Contact form submissions** (Phase 6)
- **UTM campaign tracking** (Phase 6)
- **Conversion funnel analysis** (Phase 6)

## Phase 6: Engagement & Conversion Architecture

### Schedule Interview Integration

```typescript
interface ScheduleButtonProps {
  calendlyUrl?: string;
  googleCalendarUrl?: string;
  variant: 'floating' | 'header' | 'inline';
  trackingEvent?: string;
}
```

- Floating Action Button (FAB) with steampunk styling
- GA4 event tracking for conversion monitoring
- Support for both Calendly (free tier) and Google Calendar
- Responsive positioning and mobile optimization

### Contact Form Architecture

```typescript
interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string; // Anti-spam field
}
```

- Formspree integration (50 submissions/month free)
- Client-side validation with error states
- Honeypot field for spam prevention
- Success/error animations with user feedback
- GA4 form tracking events

### Conversion Tracking Utilities

```typescript
// utils/analytics.ts
interface ConversionEvent {
  action: 'schedule_click' | 'form_submit' | 'resume_download';
  category: 'engagement' | 'conversion';
  label?: string;
  value?: number;
}
```

- Centralized event tracking functions
- UTM parameter parsing and storage
- Conversion funnel tracking
- A/B test support infrastructure

## Future Considerations

### Potential Enhancements

1. Multiple resume templates
2. Resume builder/editor interface
3. A/B testing for layouts
4. Social media integration
5. QR code generation
6. Multi-language support
7. API integration for dynamic data
8. Resume analytics dashboard

### Scalability Path

1. Move to Next.js for SSR/SSG if needed
2. Add CMS for content management
3. Implement user accounts
4. Add resume sharing features
5. Create resume marketplace
