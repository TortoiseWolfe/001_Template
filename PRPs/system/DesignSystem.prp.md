# Design System PRP

## Purpose

Define the foundational design tokens and system that all components will use, ensuring consistency across light and dark themes.

## Goals

- Establish a consistent visual language
- Support both light and dark themes seamlessly
- Ensure WCAG AA accessibility compliance
- Provide a scalable system for future components

## Design Tokens

### Color System

#### Semantic Colors

- **Primary**: Brand color for primary actions
  - Light: `hsl(221, 83%, 53%)` - Blue
  - Dark: `hsl(217, 91%, 60%)` - Lighter blue
- **Secondary**: Supporting brand color
  - Light: `hsl(210, 40%, 96%)` - Light gray
  - Dark: `hsl(217, 33%, 17%)` - Dark gray
- **Success**: Positive actions and states
  - Light: `hsl(142, 71%, 45%)` - Green
  - Dark: `hsl(142, 69%, 58%)` - Lighter green
- **Warning**: Caution states
  - Light: `hsl(38, 92%, 50%)` - Amber
  - Dark: `hsl(48, 96%, 53%)` - Yellow
- **Destructive/Error**: Dangerous actions and error states
  - Light: `hsl(0, 84%, 60%)` - Red
  - Dark: `hsl(0, 72%, 51%)` - Darker red

#### Neutral Colors

- **Background**: Main app background
  - Light: `hsl(0, 0%, 100%)` - White
  - Dark: `hsl(222, 84%, 5%)` - Near black
- **Foreground**: Main text color
  - Light: `hsl(222, 84%, 5%)` - Near black
  - Dark: `hsl(210, 40%, 98%)` - Near white
- **Muted**: Secondary text
  - Light: `hsl(215, 16%, 47%)` - Gray
  - Dark: `hsl(215, 20%, 65%)` - Light gray
- **Border**: Element borders
  - Light: `hsl(214, 32%, 91%)` - Light gray
  - Dark: `hsl(217, 33%, 17%)` - Dark gray

### Typography Scale

```
--font-size-xs: 0.75rem;   // 12px
--font-size-sm: 0.875rem;  // 14px
--font-size-base: 1rem;    // 16px
--font-size-lg: 1.125rem;  // 18px
--font-size-xl: 1.25rem;   // 20px
--font-size-2xl: 1.5rem;   // 24px
--font-size-3xl: 1.875rem; // 30px
--font-size-4xl: 2.25rem;  // 36px
```

### Spacing System (4px base)

```
--spacing-0: 0;
--spacing-1: 0.25rem;  // 4px
--spacing-2: 0.5rem;   // 8px
--spacing-3: 0.75rem;  // 12px
--spacing-4: 1rem;     // 16px
--spacing-5: 1.25rem;  // 20px
--spacing-6: 1.5rem;   // 24px
--spacing-8: 2rem;     // 32px
--spacing-10: 2.5rem;  // 40px
--spacing-12: 3rem;    // 48px
--spacing-16: 4rem;    // 64px
```

### Border Radius

```
--radius-sm: 0.125rem;  // 2px
--radius-base: 0.25rem; // 4px
--radius-md: 0.375rem;  // 6px
--radius-lg: 0.5rem;    // 8px
--radius-xl: 0.75rem;   // 12px
--radius-2xl: 1rem;     // 16px
--radius-full: 9999px;  // Fully rounded
```

### Shadows

```
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

### Animation

```
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 350ms ease;
```

## Accessibility Requirements

### Color Contrast

- Normal text: Minimum 4.5:1 ratio (WCAG AA)
- Large text: Minimum 3:1 ratio
- Interactive elements: Minimum 3:1 ratio against background
- Focus indicators: Minimum 3:1 ratio

### Focus States

- All interactive elements must have visible focus indicators
- Focus ring: 2px solid, using `--color-primary`
- Focus ring offset: 2px

### Motion

- Respect `prefers-reduced-motion` media query
- Provide option to disable animations

## Implementation

### CSS Framework

- Use Tailwind CSS for utility classes
- Extend with custom CSS variables for design tokens
- CSS Modules for component-specific styles

### Theme Switching

- Class-based theme switching (`.dark` class on root)
- System preference detection by default
- LocalStorage persistence for user preference
- Smooth transitions between themes

## Success Criteria

- [ ] All colors meet WCAG AA contrast requirements
- [ ] Theme switching works without flash of unstyled content
- [ ] Design tokens are consistently used across all components
- [ ] System respects user's OS theme preference
- [ ] All spacings follow the 4px grid system
- [ ] Typography scale is harmonious and readable
