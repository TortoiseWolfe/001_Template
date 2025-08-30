# Button Component PRP

## Purpose

A versatile, accessible button component that supports multiple variants, sizes, and states for triggering actions.

## User Stories

- As a user, I want to trigger actions by clicking buttons
- As a user, I want visual feedback when hovering or clicking
- As a user, I want to understand button hierarchy through visual design
- As a keyboard user, I want to navigate and activate buttons without a mouse
- As a screen reader user, I want to understand button purpose and state

## Component API

### Props Interface

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}
```

## Visual Design

### Variants

1. **Primary**: Main actions
   - Background: `--primary`
   - Text: `--primary-foreground`
   - Hover: Darken 10%
2. **Secondary**: Alternative actions
   - Background: `--secondary`
   - Text: `--secondary-foreground`
   - Hover: Darken 10%
3. **Destructive**: Dangerous actions
   - Background: `--destructive`
   - Text: `--destructive-foreground`
   - Hover: Darken 10%
4. **Outline**: Tertiary actions
   - Background: transparent
   - Border: `--border`
   - Text: `--foreground`
   - Hover: Background `--accent`
5. **Ghost**: Minimal emphasis
   - Background: transparent
   - Text: `--foreground`
   - Hover: Background `--accent`

### Sizes

- **Small**: Height 32px, padding 12px 16px, font-size 14px
- **Medium**: Height 40px, padding 16px 24px, font-size 16px (default)
- **Large**: Height 48px, padding 20px 32px, font-size 18px

### States

- **Default**: Base variant styling
- **Hover**: Slight darkening, cursor pointer
- **Focus**: Ring with `--primary` color, 2px offset
- **Active**: Scale 0.98, slight darkening
- **Disabled**: 50% opacity, cursor not-allowed
- **Loading**: Show spinner, disable interaction

## Interaction Patterns

### Click Behavior

- Single click triggers action
- Prevent double-click during loading
- Ripple effect on click (optional)

### Keyboard Navigation

- Tab/Shift+Tab: Navigate to/from button
- Space/Enter: Activate button
- Escape: Cancel if in modal/dropdown context

### Loading State

- Show spinner icon
- Disable button interaction
- Maintain button width to prevent layout shift
- Optional: Show loading text

## Accessibility Requirements

### ARIA Attributes

- `aria-label` when button has only icon
- `aria-pressed` for toggle buttons
- `aria-disabled` for disabled state
- `aria-busy` for loading state
- `role="button"` (implicit for button element)

### Focus Management

- Visible focus ring (2px, `--primary` color)
- Focus ring offset of 2px
- High contrast mode support
- Focus trap prevention

### Screen Reader

- Announce button label
- Announce state changes (disabled, loading)
- Describe action on activation

## Content Guidelines

### Button Text

- Use action verbs (Save, Delete, Continue)
- Keep text concise (1-3 words)
- Use sentence case
- Be specific about action

### Examples

- ✅ "Save changes"
- ✅ "Delete item"
- ✅ "Continue to checkout"
- ❌ "Click here"
- ❌ "Submit"

## Implementation Requirements

### HTML Structure

```html
<button type="button" class="btn btn-primary btn-md" aria-busy="false">
  <span class="btn-icon">
    <!-- Optional icon -->
  </span>
  <span class="btn-text"> Button Text </span>
</button>
```

### Loading Spinner

```html
<svg class="spinner" viewBox="0 0 24 24">
  <circle class="spinner-track" />
  <circle class="spinner-fill" />
</svg>
```

## Examples

### Basic Usage

```jsx
<Button variant="primary">Save Changes</Button>
```

### With Icon

```jsx
<Button variant="secondary" icon={<PlusIcon />} iconPosition="left">
  Add Item
</Button>
```

### Loading State

```jsx
<Button variant="primary" loading={isSubmitting} onClick={handleSubmit}>
  {isSubmitting ? 'Saving...' : 'Save'}
</Button>
```

### Destructive Action

```jsx
<Button variant="destructive" onClick={handleDelete}>
  Delete Account
</Button>
```

## Testing Criteria

### Unit Tests

- [ ] Renders all variants correctly
- [ ] Handles click events
- [ ] Shows loading state
- [ ] Disables when appropriate
- [ ] Forwards ref correctly
- [ ] Applies size variants

### Accessibility Tests

- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus ring is visible
- [ ] ARIA attributes are present
- [ ] Color contrast meets WCAG AA

### Visual Tests

- [ ] All variants in light theme
- [ ] All variants in dark theme
- [ ] All size variations
- [ ] All state combinations
- [ ] With and without icons

### Interaction Tests

- [ ] Click triggers callback
- [ ] Enter key triggers callback
- [ ] Space key triggers callback
- [ ] Disabled prevents interaction
- [ ] Loading prevents interaction

## Performance Considerations

- Use React.forwardRef for ref forwarding
- Memoize callbacks with useCallback
- Lazy load icons if numerous
- CSS transitions for smooth interactions

## Dependencies

- Design System tokens
- Icon library (optional)
- No external dependencies

## Notes

- Buttons should never navigate (use Link component)
- Form submit buttons should have type="submit"
- Default type is "button" to prevent accidental form submission
