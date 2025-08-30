# ThemeToggle Component PRP

## Purpose

A toggle button that allows users to switch between light and dark themes, respecting system preferences and persisting user choice.

## User Stories

- As a user, I want to switch between light and dark themes
- As a user, I want my theme preference to be remembered
- As a user, I want the app to respect my system theme preference by default
- As a user with visual sensitivity, I want smooth theme transitions
- As a keyboard user, I want to toggle themes without a mouse

## Component API

### Props Interface

```typescript
interface ThemeToggleProps {
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
  showLabel?: boolean;
  className?: string;
  position?: 'fixed' | 'relative';
  onChange?: (theme: 'light' | 'dark') => void;
}
```

## Visual Design

### Button Design

- Shape: Rounded rectangle (radius-lg)
- Size: 44x44px minimum touch target
- Background: `--secondary`
- Hover: `--secondary` with 80% opacity
- Icon size: 20x20px

### Icons

- **Light Mode**: Sun icon ☀️
  - Color: `--amber-500`
  - Stroke width: 2px
- **Dark Mode**: Moon icon 🌙
  - Color: `--blue-400`
  - Stroke width: 2px

### Animation

- Icon rotation: 180deg on toggle
- Transition: 250ms ease
- Fade between icons

### Position Variants

- **Fixed**: Top-right corner (top-4, right-4)
- **Relative**: Inline with other elements

## Behavior

### Theme Detection

1. Check localStorage for saved preference
2. If none, check system preference via `prefers-color-scheme`
3. Default to light if no preference detected

### Theme Application

1. Add/remove `.dark` class on `document.documentElement`
2. Save preference to localStorage
3. Trigger onChange callback if provided

### System Preference Sync

- Listen for system theme changes
- Update if user hasn't set explicit preference
- Respect user override if manually toggled

## Interaction Patterns

### Click/Tap

- Single click toggles theme
- Visual feedback on interaction
- Smooth transition between states

### Keyboard

- Tab: Focus toggle button
- Space/Enter: Toggle theme
- Escape: Remove focus (browser default)

## Accessibility Requirements

### ARIA Attributes

- `aria-label`: "Toggle theme" or "Switch to [dark/light] theme"
- `aria-pressed`: true/false based on dark mode state
- `role="switch"` or `role="button"`
- `title`: Current theme and action

### Visual Indicators

- Focus ring: 2px solid `--primary`
- Focus ring offset: 2px
- High contrast mode support

### Screen Reader

- Announce current theme
- Announce action available
- Confirm theme change

## Implementation Requirements

### HTML Structure

```html
<button
  type="button"
  role="switch"
  aria-label="Toggle theme"
  aria-pressed="false"
  title="Currently light theme. Click to switch to dark theme."
  class="theme-toggle"
>
  <svg class="theme-icon sun-icon">
    <!-- Sun SVG path -->
  </svg>
  <svg class="theme-icon moon-icon">
    <!-- Moon SVG path -->
  </svg>
  <span class="theme-label"> Dark Mode </span>
</button>
```

### LocalStorage Schema

```javascript
{
  key: 'theme-preference',
  value: 'light' | 'dark' | 'system'
}
```

### CSS Classes

```css
.theme-toggle
.theme-toggle--fixed
.theme-toggle--with-label
.theme-icon
.theme-icon--active
.theme-label
```

## Examples

### Basic Usage

```jsx
<ThemeToggle />
```

### With Label

```jsx
<ThemeToggle showLabel={true} />
```

### Fixed Position

```jsx
<ThemeToggle position="fixed" />
```

### With Callback

```jsx
<ThemeToggle
  onChange={(theme) => {
    analytics.track('theme_changed', { theme });
  }}
/>
```

## Testing Criteria

### Unit Tests

- [ ] Detects system preference
- [ ] Toggles between themes
- [ ] Saves to localStorage
- [ ] Loads from localStorage
- [ ] Handles missing localStorage gracefully
- [ ] Calls onChange callback

### Accessibility Tests

- [ ] Has proper ARIA attributes
- [ ] Keyboard navigation works
- [ ] Screen reader announces state
- [ ] Focus ring is visible
- [ ] Works in high contrast mode

### Visual Tests

- [ ] Icons display correctly
- [ ] Animation is smooth
- [ ] Works in both themes
- [ ] Position variants work
- [ ] Label displays when enabled

### Integration Tests

- [ ] Theme applies to entire app
- [ ] Persists across sessions
- [ ] Syncs with system changes
- [ ] No flash of wrong theme

## Performance Considerations

- Lazy load SVG icons
- Debounce theme changes
- Use CSS transitions for smoothness
- Minimize reflows during toggle
- Use transform for animations

## Edge Cases

- localStorage disabled/unavailable
- System theme changes while app is open
- Rapid toggling
- Theme mismatch on load
- SSR hydration mismatch

## Dependencies

- Design System tokens
- No external libraries

## Notes

- Must prevent flash of incorrect theme on load
- Consider using cookies for SSR apps
- May need to inject script in head for immediate execution
- Test on various devices for touch targets
