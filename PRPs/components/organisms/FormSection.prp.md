# FormSection Component PRP

## Purpose

A container component that groups related form fields with consistent styling, validation states, and visual hierarchy.

## User Stories

- As a user, I want to understand which fields are related
- As a user, I want visual separation between different sections
- As a user, I want to see my progress through the form
- As a user, I want to know which sections have errors
- As a screen reader user, I want to understand form structure

## Component API

### Props Interface

```typescript
interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  status?: 'empty' | 'partial' | 'complete' | 'error';
  collapsible?: boolean;
  defaultExpanded?: boolean;
  icon?: React.ReactNode;
  required?: boolean;
  className?: string;
}
```

## Visual Design

### Container

- Background: `--card`
- Border: 1px solid `--border`
- Border radius: `--radius-lg`
- Padding: `--spacing-6`
- Shadow: `--shadow-base`
- Margin bottom: `--spacing-8`

### Header

- Title: font-size-xl, font-weight-semibold
- Description: font-size-sm, color `--muted-foreground`
- Icon: 24x24px, color matches status
- Divider: 1px solid `--border` (optional)

### Status Indicators

- **Empty**: Border `--border` (default gray)
- **Partial**: Border `--warning` (amber)
- **Complete**: Border `--success` (green)
- **Error**: Border `--destructive` (red)

### Status Colors (Border Left Indicator)

- Width: 4px
- Height: 100%
- Position: Absolute left
- Color based on status

### Collapsible Variant

- Chevron icon: Rotates 90deg when collapsed
- Smooth height animation: 250ms ease
- Maintain header visibility when collapsed

## Layout

### Grid System

- Default: Single column
- Medium screens: 2 columns for appropriate fields
- Gap: `--spacing-4` between fields
- Responsive breakpoints

### Field Spacing

- Between fields: `--spacing-4`
- Between groups: `--spacing-6`
- After header: `--spacing-4`

## Behavior

### Validation States

- Show status based on child field validation
- Update status in real-time
- Highlight section with errors

### Collapsible Behavior

- Click header to toggle
- Keyboard accessible (Enter/Space)
- Smooth animation
- Remember state (optional)

### Progress Tracking

- Calculate completion based on required fields
- Update visual status indicator
- Optional progress bar

## Accessibility Requirements

### Semantic HTML

- Use `<section>` element
- Include `aria-labelledby` for title
- Use `<fieldset>` and `<legend>` when appropriate

### ARIA Attributes

- `aria-expanded` for collapsible sections
- `aria-invalid` when section has errors
- `role="group"` for non-fieldset grouping
- `aria-describedby` for description

### Focus Management

- Focusable header if collapsible
- Skip collapsed content in tab order
- Visual focus indicator

## Content Guidelines

### Section Titles

- Use clear, descriptive titles
- Keep under 5 words
- Use title case
- Include count if multiple items (e.g., "Address (2 of 3)")

### Descriptions

- Provide helpful context
- Keep under 100 characters
- Use sentence case
- Be specific about requirements

### Examples

- Title: "Contact Information"
- Description: "How can we reach you about your project?"

## Implementation Requirements

### HTML Structure

```html
<section
  class="form-section"
  aria-labelledby="section-title-id"
  aria-describedby="section-desc-id"
>
  <header class="form-section-header">
    <div class="form-section-title-group">
      <span class="form-section-icon">
        <!-- Icon -->
      </span>
      <h2 id="section-title-id" class="form-section-title">Section Title</h2>
    </div>
    <p id="section-desc-id" class="form-section-description">
      Description text
    </p>
  </header>

  <div class="form-section-content">
    <!-- Child form fields -->
  </div>

  <div class="form-section-status">
    <!-- Status indicator -->
  </div>
</section>
```

## Examples

### Basic Usage

```jsx
<FormSection title="Personal Information" description="Tell us about yourself">
  <Input label="First Name" required />
  <Input label="Last Name" required />
  <Input label="Email" type="email" required />
</FormSection>
```

### With Status

```jsx
<FormSection title="Project Details" status="partial" icon={<ProjectIcon />}>
  <Textarea label="Description" />
  <Select label="Budget Range" />
</FormSection>
```

### Collapsible

```jsx
<FormSection title="Additional Information" collapsible defaultExpanded={false}>
  <Input label="Reference Number" />
  <Textarea label="Special Requirements" />
</FormSection>
```

## Testing Criteria

### Unit Tests

- [ ] Renders title and description
- [ ] Shows correct status styling
- [ ] Handles collapsible behavior
- [ ] Calculates completion status
- [ ] Passes className prop

### Accessibility Tests

- [ ] Has proper semantic HTML
- [ ] ARIA attributes present
- [ ] Keyboard navigation works
- [ ] Screen reader announces structure
- [ ] Focus management correct

### Visual Tests

- [ ] All status variants display
- [ ] Responsive layout works
- [ ] Dark/light theme support
- [ ] Animation smooth
- [ ] Icons display correctly

### Integration Tests

- [ ] Works with form fields
- [ ] Status updates with validation
- [ ] Collapsible state persists
- [ ] Layout doesn't break with many fields

## Performance Considerations

- Memoize status calculations
- Lazy render collapsed content
- Use CSS transitions not JS animations
- Debounce status updates
- Virtual scrolling for many fields

## Edge Cases

- No children provided
- Very long titles/descriptions
- Deeply nested sections
- Many fields (20+)
- Mixed field types

## Dependencies

- Design System tokens
- Input, Select, Textarea components
- Icon library (optional)

## Notes

- Consider progressive disclosure for complex forms
- Group related fields logically
- Limit to 5-7 fields per section
- Provide clear section progression
