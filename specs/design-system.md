# Design System Specification

## Color Palette

### Light Theme Colors

- **Primary**: #2563eb (Blue 600)
- **Primary Light**: #3b82f6 (Blue 500)
- **Primary Dark**: #1d4ed8 (Blue 700)
- **Text Primary**: #111827 (Gray 900)
- **Text Secondary**: #6b7280 (Gray 500)
- **Background**: #ffffff (White)
- **Background Alt**: #f9fafb (Gray 50)
- **Border**: #e5e7eb (Gray 200)
- **Focus**: #3b82f6 (Blue 500)
- **Error**: #ef4444 (Red 500)
- **Success**: #10b981 (Green 500)

### Dark Theme Colors (Default) - Steampunk Inspired

- **Primary**: #d97706 (Amber 600) - Copper accent
- **Primary Light**: #f59e0b (Amber 500) - Bright copper
- **Primary Dark**: #b45309 (Amber 700) - Dark copper
- **Secondary**: #8b5cf6 (Violet 500) - Steam purple
- **Text Primary**: #f9fafb (Gray 50) - Light text
- **Text Secondary**: #d1d5db (Gray 300) - Muted text
- **Background**: #1f2937 (Gray 800) - Dark background
- **Background Alt**: #374151 (Gray 700) - Card background
- **Border**: #4b5563 (Gray 600) - Subtle borders
- **Accent Gold**: #fbbf24 (Amber 400) - Gear highlights
- **Accent Bronze**: #92400e (Amber 800) - Deep metallic
- **Focus**: #f59e0b (Amber 500) - Copper focus ring
- **Error**: #f87171 (Red 400)
- **Success**: #34d399 (Green 400)

## CSS Custom Properties

### Color Variables

```css
:root[data-theme='light'] {
  --color-primary: #2563eb;
  --color-primary-light: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-background: #ffffff;
  --color-background-alt: #f9fafb;
  --color-border: #e5e7eb;
  --color-focus: #3b82f6;
  --color-error: #ef4444;
  --color-success: #10b981;
}

:root[data-theme='dark'] {
  --color-primary: #d97706;
  --color-primary-light: #f59e0b;
  --color-primary-dark: #b45309;
  --color-secondary: #8b5cf6;
  --color-text-primary: #f9fafb;
  --color-text-secondary: #d1d5db;
  --color-background: #1f2937;
  --color-background-alt: #374151;
  --color-border: #4b5563;
  --color-accent-gold: #fbbf24;
  --color-accent-bronze: #92400e;
  --color-focus: #f59e0b;
  --color-error: #f87171;
  --color-success: #34d399;
}
```

### Spacing Variables

```css
:root {
  /* Spacing Scale */
  --space-xs: 0.25rem; /* 4px */
  --space-sm: 0.5rem; /* 8px */
  --space-md: 1rem; /* 16px */
  --space-lg: 1.5rem; /* 24px */
  --space-xl: 2rem; /* 32px */
  --space-2xl: 3rem; /* 48px */

  /* Steampunk-specific spacing */
  --space-gear: 0.125rem; /* 2px - tiny details */
  --space-rivet: 0.375rem; /* 6px - small elements */
  --space-pipe: 0.75rem; /* 12px - medium elements */
}
```

### Typography Variables

```css
:root {
  /* Font Families */
  --font-primary:
    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Crimson Text', 'Times New Roman', serif;
  --font-mono: 'Courier New', 'Monaco', monospace;

  /* Font Sizes - Mobile First */
  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-2xl: 1.5rem; /* 24px */
  --font-size-3xl: 1.75rem; /* 28px */
  --font-size-4xl: 2rem; /* 32px */

  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-base: 1.5;
  --line-height-relaxed: 1.75;
}

/* Desktop Font Sizes */
@media (min-width: 768px) {
  :root {
    --font-size-3xl: 2.25rem; /* 36px */
    --font-size-2xl: 1.875rem; /* 30px */
  }
}
```

### Animation Variables

```css
:root {
  /* Durations */
  --duration-instant: 0ms;
  --duration-typewriter: 50ms;
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --duration-gear-spin: 1200ms;

  /* Easing Functions */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-spring: cubic-bezier(0.5, 1.5, 0.5, 1);

  /* Steampunk-specific animations */
  --animation-steam-rise: steam-rise 3s ease-in-out infinite;
  --animation-gear-rotate: gear-rotate var(--duration-gear-spin) linear infinite;
  --animation-typewriter: typewriter var(--duration-typewriter) steps(1, end);
}
```

### Layout Variables

```css
:root {
  /* Containers */
  --container-max-width: 800px;
  --container-padding: var(--space-md);

  /* Borders */
  --border-width: 1px;
  --border-radius-sm: 0.25rem;
  --border-radius-base: 0.5rem;
  --border-radius-lg: 0.75rem;
  --border-radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-steampunk: 0 0 20px rgba(217, 119, 6, 0.3);

  /* Z-index Scale */
  --z-base: 0;
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-fixed: 30;
  --z-modal-backdrop: 40;
  --z-modal: 50;
  --z-popover: 60;
  --z-tooltip: 70;
}

@media (min-width: 768px) {
  :root {
    --container-padding: var(--space-xl);
  }
}
```

## Typography

### Font Stack

- **Primary**: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Steampunk Display**: 'Crimson Text', 'Times New Roman', serif - For typewriter effect
- **Steampunk Accent**: 'Courier New', 'Monaco', monospace - For mechanical elements
- **Fallback**: System fonts for maximum compatibility

### Font Sizes

- **Heading 1**: 2.25rem (36px) - Name
- **Heading 2**: 1.875rem (30px) - Section headers
- **Heading 3**: 1.25rem (20px) - Job titles
- **Body Large**: 1.125rem (18px) - Summary
- **Body**: 1rem (16px) - Standard text
- **Body Small**: 0.875rem (14px) - Dates, metadata

## Layout

### Spacing Scale

- **XS**: 0.25rem (4px)
- **SM**: 0.5rem (8px)
- **MD**: 1rem (16px)
- **LG**: 1.5rem (24px)
- **XL**: 2rem (32px)
- **2XL**: 3rem (48px)

### Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Grid System

- **Container**: Max-width 800px, centered
- **Columns**: Single column layout
- **Gutters**: 1rem mobile, 2rem desktop

## Components

### Top Controls Bar

- **Position**: Fixed top-right corner
- **Layout**: Horizontal flex container with gap
- **Components**: Dark mode toggle + Download button
- **Z-index**: var(--z-fixed)

#### Dark Mode Toggle

- **Size**: 44px height (touch-friendly)
- **Style**: Steampunk gear/switch design with copper accents
- **States**: Dark (default), Light
- **Animation**: Smooth rotation/slide transition
- **Icons**: Gear/cog for dark, sun for light
- **Focus**: 2px solid outline with var(--color-focus)
- **Hover**: Scale(1.05) with shadow glow

#### Download Button

- **Size**: 44px height (touch-friendly)
- **Style**: Primary color with theme-appropriate text
- **Hover**: Darker primary color with steampunk glow effect
- **Active**: Scale(0.95) for tactile feedback
- **Loading**: Spinner animation with reduced opacity
- **Disabled**: Opacity 0.5 with cursor not-allowed

### Section Cards

- **Background**: var(--color-background-alt)
- **Padding**: 1.5rem
- **Border Radius**: var(--border-radius-base)
- **Shadow**: var(--shadow-base)
- **Hover**: var(--shadow-md) for interactive cards

### Typography Hierarchy

- **Name**: Large, bold, primary color with typewriter animation (Steampunk Display font)
- **Title**: Medium, regular weight, secondary color with typewriter animation
- **Section Headers**: Bold, uppercase, with bottom border
- **Content**: Regular weight, good line spacing

## Phase 6: Engagement Components

### Schedule Interview Button (CTA)

- **Variants**: Floating (FAB), Header, Inline
- **FAB Position**: Bottom-right corner, 2rem from edges
- **Size**: 56px diameter (FAB), 44px height (inline)
- **Style**: Prominent with steampunk accent colors
- **Icon**: Calendar or clock gear symbol
- **Animation**: Pulse effect every 5 seconds to draw attention
- **Hover**: Expand with "Schedule Interview" text
- **Mobile**: Fixed bottom position to avoid thumb reach issues
- **Z-index**: var(--z-fab) above content but below modals

### Contact Form

- **Layout**: Single column, full width on mobile
- **Fields**: Name, Email, Message (textarea)
- **Field Style**: Dark theme input with copper border
- **Validation**: Real-time with error messages below fields
- **Submit Button**: Primary action button with loading state
- **Success State**: Green checkmark animation with fade
- **Error State**: Red border with shake animation
- **Honeypot**: Hidden field for spam prevention
- **Typography**: Clear labels with proper spacing

## Interactive States

### Focus States

```css
.interactive-element:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: var(--border-radius-sm);
}
```

### Hover States

```css
.button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  background-color: var(--color-primary-dark);
  transition: all var(--duration-base) var(--ease-out);
}

.link:hover {
  color: var(--color-primary-light);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}
```

### Loading States

```css
.loading {
  position: relative;
  opacity: 0.7;
  pointer-events: none;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-primary);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin var(--duration-slow) linear infinite;
}
```

### Error States

```css
.error {
  border-color: var(--color-error);
  background-color: rgba(239, 68, 68, 0.1);
}

.error-message {
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-top: var(--space-xs);
}
```

## Animations

### Typewriter Effect

- **Target Elements**: Name and title text
- **Timing**: 50-100ms per character
- **Cursor**: Blinking pipe character (|) in accent color
- **Font**: Steampunk Display ('Crimson Text') for vintage feel
- **Behavior**: Types character by character on page load
- **Accessibility**: Respects prefers-reduced-motion setting

### Steampunk Animations

#### Gear Rotation

```css
@keyframes gear-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.gear-icon {
  animation: gear-rotate var(--duration-gear-spin) linear infinite;
}

.gear-icon:hover {
  animation-duration: calc(var(--duration-gear-spin) / 2);
}
```

#### Steam Rise Effect

```css
@keyframes steam-rise {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.8);
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(1.2);
  }
}

.steam-particle {
  animation: steam-rise 3s ease-in-out infinite;
}
```

#### Typewriter Cursor Blink

```css
@keyframes cursor-blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

.typewriter-cursor {
  animation: cursor-blink 1s step-end infinite;
  color: var(--color-accent-gold);
}
```

#### Copper Glow Pulse

```css
@keyframes copper-glow {
  0%,
  100% {
    box-shadow:
      0 0 5px var(--color-primary),
      0 0 10px var(--color-primary-light);
  }
  50% {
    box-shadow:
      0 0 10px var(--color-primary),
      0 0 20px var(--color-primary-light),
      0 0 30px var(--color-accent-gold);
  }
}

.steampunk-button:hover {
  animation: copper-glow 2s ease-in-out infinite;
}
```

## Accessibility

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .typewriter-text {
    animation: none;
  }
}
```

### Color Contrast

- All text meets WCAG 2.1 AA standards
- Primary text: 7:1 contrast ratio minimum
- Secondary text: 4.5:1 contrast ratio minimum
- Interactive elements: 3:1 contrast ratio minimum

### Focus Management

- Visible focus indicators for all interactive elements
- Logical tab order throughout the document
- Skip links for keyboard navigation
- Focus trap for modal dialogs
