# IntakeForm Template PRP

## Purpose

A comprehensive project intake form that collects client information, project requirements, and contact details with progressive validation and auto-save functionality.

## User Stories

- As a potential client, I want to describe my project needs
- As a potential client, I want to save my progress and return later
- As a potential client, I want to see what information is required
- As a potential client, I want to know my submission was received
- As a business owner, I want to collect structured project information
- As a business owner, I want to qualify leads based on budget and timeline

## Form Structure

### Sections

1. **Project Information** (Required)
   - Project name
   - Business description
   - Main challenges
   - Target users
   - Primary goals

2. **Project Type** (Required)
   - Website
   - Mobile app
   - Web application
   - E-commerce
   - Other

3. **Project Details**
   - Budget range
   - Timeline
   - User scale
   - Technical requirements

4. **Features & Functionality**
   - User accounts
   - Payment processing
   - Content management
   - Real-time features
   - Third-party integrations

5. **Contact Information** (Required)
   - Name
   - Email
   - Phone
   - Preferred contact method
   - Best time to contact

6. **Additional Information**
   - How did you hear about us?
   - Additional notes
   - File attachments (optional)

## Features

### Progressive Validation

- Validate on blur
- Show inline errors
- Clear errors on correction
- Section-level validation status
- Visual progress indicators

### Auto-save

- Save to localStorage every 30 seconds
- Save on blur of any field
- Show "Saving..." indicator
- Show "Last saved at X" timestamp
- Restore on page reload

### Progress Tracking

- Visual progress bar
- Section completion indicators
- "X of Y sections complete"
- Color coding (red/yellow/green)

### Gamification

- Celebrate section completion
- Motivating messages
- Progress milestones
- Completion animation

## Visual Design

### Layout

- Single column on mobile
- Two-column form sections on desktop
- Sticky progress sidebar on large screens
- Maximum width: 1200px
- Centered container

### Theme

- Light/dark mode toggle
- Respect system preference
- Smooth transitions
- Consistent with design system

### Typography Hierarchy

- Form title: font-size-3xl
- Section titles: font-size-xl
- Field labels: font-size-base
- Helper text: font-size-sm

## Data Model

```typescript
interface IntakeFormData {
  // Project Information
  projectName: string;
  businessDescription: string;
  mainChallenges: string;
  targetUsers: string;
  primaryGoals: string;

  // Project Type
  projectType: string[];

  // Project Details
  budget: 'under-5k' | '5k-10k' | '10k-25k' | '25k-50k' | 'over-50k';
  timeline: 'asap' | '1-month' | '2-3-months' | '3-6-months' | 'over-6-months';
  userScale: string;

  // Features
  features: {
    userAccounts: boolean;
    payments: boolean;
    contentManagement: boolean;
    realtime: boolean;
    integrations: string[];
  };

  // Contact
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  preferredContact: 'email' | 'phone' | 'either';
  bestTimeToContact: string;

  // Additional
  referralSource: string;
  additionalNotes: string;
  attachments?: File[];
}
```

## Validation Rules

### Required Fields

- Project name: Min 3 characters
- Business description: Min 20 characters
- Contact name: Min 2 characters
- Contact email: Valid email format
- At least one project type selected

### Optional Fields

- All other fields optional but encouraged
- Show completion percentage
- Highlight benefits of providing more info

## Submission Flow

1. **Validation**: Check all required fields
2. **Confirmation**: Show summary before submit
3. **Processing**: Loading state with spinner
4. **Success**:
   - Thank you message
   - Reference number
   - Next steps
   - Email confirmation
5. **Error Handling**:
   - Clear error messages
   - Retry mechanism
   - Fallback to email

## Integration Points

### Backend API

```
POST /api/intake
Content-Type: application/json
Body: IntakeFormData
Response: { id: string, reference: string }
```

### Email Notification

- Send to business owner
- Send confirmation to client
- Include all form data
- Format for readability

### CRM Integration

- Create lead/contact
- Map form fields
- Add to pipeline
- Trigger automation

### Analytics

- Track form starts
- Track section completion
- Track drop-off points
- Track submission success

## Accessibility Requirements

- All fields properly labeled
- Error messages associated with fields
- Keyboard navigation throughout
- Screen reader announcements
- Focus management on errors
- High contrast mode support
- Mobile touch targets (44x44px min)

## Performance Requirements

- Initial load < 3 seconds
- Auto-save < 100ms
- Form submission < 2 seconds
- Smooth animations (60fps)
- Works offline (localStorage)
- Progressive enhancement

## Testing Criteria

### E2E Tests

- [ ] Complete form submission flow
- [ ] Auto-save and restore
- [ ] Validation triggers correctly
- [ ] Error handling works
- [ ] Success state displays

### Accessibility Tests

- [ ] Keyboard only navigation
- [ ] Screen reader testing
- [ ] Color contrast validation
- [ ] Focus indicators visible
- [ ] Error announcements

### Performance Tests

- [ ] Load time under 3s
- [ ] Smooth scrolling
- [ ] No layout shifts
- [ ] Responsive on all devices

## Success Metrics

- Form completion rate > 60%
- Average time to complete < 10 minutes
- Error rate < 5%
- Mobile submission rate > 40%
- User satisfaction > 4.5/5

## Notes

- Consider A/B testing form length
- Add optional live chat support
- Consider progress save to account
- Add field tooltips for complex fields
- Consider conditional fields based on project type
