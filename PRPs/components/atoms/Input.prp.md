# Input Component PRP

## Purpose

A reusable, accessible text input component that supports various types, validation states, and helper text.

## User Stories

- As a user, I want to enter text information in a form
- As a user, I want clear visual feedback when a field has an error
- As a user, I want to understand what information is required
- As a screen reader user, I want to understand the field's purpose and state

## Component API

### Props Interface

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Field label
  error?: string; // Error message
  helperText?: string; // Helper text below input
  fullWidth?: boolean; // Take full container width
  size?: 'sm' | 'md' | 'lg'; // Input size variant
}
```

## Visual States

### Default States

- **Default**: Border color `--border`, background `--background`
- **Hover**: Border color darkens by 10%
- **Focus**: Border `--primary`, ring `--primary` with 20% opacity
- **Disabled**: 50% opacity, cursor not-allowed
- **Error**: Border `--destructive`, text `--destructive`

### Sizes

- **Small**: Height 32px, padding 8px, font-size 14px
- **Medium**: Height 40px, padding 12px, font-size 16px (default)
- **Large**: Height 48px, padding 16px, font-size 18px

## Interaction Patterns

### Keyboard Navigation

- Tab: Focus input
- Shift+Tab: Focus previous element
- Type: Enter text
- Escape: Clear field (if clearable)

### Validation

- Show error state immediately on blur if invalid
- Clear error on focus
- Show success state when valid (optional)

### Auto-complete

- Support browser auto-complete
- Proper autocomplete attributes

## Accessibility Requirements

### ARIA Attributes

- `aria-label` or associated `<label>` element
- `aria-invalid` when in error state
- `aria-describedby` for error or helper text
- `aria-required` for required fields

### Labels

- Always associate label with input using `htmlFor`
- Mark required fields with asterisk (\*)
- Required indicator must be part of label

### Error Messages

- Connected via `aria-describedby`
- Use role="alert" for live error announcements
- Clear, actionable error text

## Content Guidelines

### Labels

- Use sentence case
- Be concise (1-3 words)
- End with asterisk (\*) if required

### Helper Text

- Provide context or examples
- Keep under 100 characters
- Use sentence case

### Error Messages

- Be specific about the problem
- Provide actionable solution
- Examples:
  - ❌ "Invalid input"
  - ✅ "Email must include @ symbol"

## Implementation Requirements

### HTML Structure

```html
<div class="input-wrapper">
  <label for="input-id">
    Label Text
    <span class="required">*</span>
  </label>
  <input
    id="input-id"
    aria-invalid="false"
    aria-describedby="input-id-helper"
  />
  <span id="input-id-helper" class="helper-text"> Helper text </span>
</div>
```

### Supported Types

- text (default)
- email
- password
- tel
- url
- number
- date
- search

## Examples

### Basic Usage

```jsx
<Input
  label="Email Address"
  type="email"
  placeholder="john@example.com"
  required
/>
```

### With Error

```jsx
<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
  value={password}
  onChange={handleChange}
/>
```

### With Helper Text

```jsx
<Input
  label="Username"
  helperText="Choose a unique username"
  placeholder="johndoe123"
/>
```

## Testing Criteria

### Unit Tests

- [ ] Renders with label
- [ ] Shows error state
- [ ] Shows helper text
- [ ] Handles disabled state
- [ ] Forwards ref correctly
- [ ] Applies size variants

### Accessibility Tests

- [ ] Has proper ARIA attributes
- [ ] Label is associated with input
- [ ] Error message is announced
- [ ] Keyboard navigation works
- [ ] Screen reader announces state changes

### Visual Tests

- [ ] All states render correctly in light theme
- [ ] All states render correctly in dark theme
- [ ] Focus ring is visible
- [ ] Text remains readable in all states

## Performance Considerations

- Use React.forwardRef for ref forwarding
- Memoize complex calculations
- Debounce validation if async

## Dependencies

- Design System tokens
- No external libraries required
