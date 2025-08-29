import React, { useState, useEffect, useRef } from 'react';
import './IntakeForm.css';
import './IntakeForm.override.css';

interface FormData {
  projectName: string;
  projectType: string[];
  businessDescription: string;
  mainChallenge: string;
  targetUsers: string;
  primaryGoal: string;
  userScale: string;
  userAccounts: string[];
  payments: string[];
  contentFeatures: string[];
  communicationFeatures: string[];
  specialFeatures: string[];
  timeline: string;
  budget: string;
  examples: string;
  brandPersonality: string[];
  brandInfo: string;
  successMetrics: string;
  priority: string;
  additionalInfo: string;
  contactEmail: string;
  contactPhone: string;
  preferredContact: string;
  referralSource: string;
}

interface ValidationErrors {
  [key: string]: string;
}

export const IntakeForm: React.FC = () => {
  // Always start with CRUDgames defaults (no localStorage on initial load)
  const getInitialFormData = (): FormData => {
    // Skip localStorage - always start fresh with defaults
    // Form will still auto-save as user types
    // Return CRUDgames example data
    return {
      projectName: '',
      projectType: [],
      businessDescription:
        'We provide Software as a Service (SaaS) solutions, including our flagship location-based gaming platform geoLARP.com. Our focus is making custom software accessible to businesses of all sizes.',
      mainChallenge:
        'Helping small businesses discover that custom software is within their reach, while streamlining our client acquisition and consultation process.',
      targetUsers:
        "Small businesses and startups who need custom software but assume it's beyond their budget. We show them affordable, scalable solutions are possible.",
      primaryGoal:
        'Learn about our services and easily schedule a consultation to discuss their custom software needs.',
      userScale: '',
      userAccounts: [],
      payments: [],
      contentFeatures: [],
      communicationFeatures: [],
      specialFeatures: [],
      timeline: '',
      budget: '',
      examples: '',
      brandPersonality: [],
      brandInfo: '',
      successMetrics:
        'Generate 10+ qualified leads per month. Book 5+ discovery calls monthly. Build sustainable six-figure revenue stream. Maintain creative freedom and enjoyment in our work. Help small businesses achieve their software goals.',
      priority: '',
      additionalInfo: '',
      contactEmail: '',
      contactPhone: '',
      preferredContact: '',
      referralSource: '',
    };
  };

  const [formData, setFormData] = useState<FormData>(getInitialFormData());

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Mark field as interacted when radio changes
    setFieldInteracted((prev) => new Set([...prev, name]));

    // If changing preferred contact, also validate phone field
    if (name === 'preferredContact') {
      handleFieldBlur('contactPhone');
    }
  };

  const handleCheckboxChange = (category: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [category]:
        prev[category as keyof FormData] instanceof Array
          ? (prev[category as keyof FormData] as string[]).includes(value)
            ? (prev[category as keyof FormData] as string[]).filter(
                (item) => item !== value
              )
            : [...(prev[category as keyof FormData] as string[]), value]
          : [],
    }));
    // Mark field as interacted when checkbox changes
    setFieldInteracted((prev) => new Set([...prev, category]));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [showDebug, setShowDebug] = useState(false);
  const [fieldInteracted, setFieldInteracted] = useState<Set<string>>(
    new Set()
  );
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);
  const justCleared = useRef(false);

  // Set last saved timestamp on mount if data was loaded
  useEffect(() => {
    const savedData = localStorage.getItem('intakeFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setLastSaved(new Date(parsed.timestamp));
      } catch (error) {
        console.error('Failed to parse timestamp:', error);
      }
    }
  }, []);

  // Save to localStorage whenever formData changes (debounced)
  useEffect(() => {
    // Skip the first render to avoid overwriting loaded data
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Skip saving if we just cleared the form
    if (justCleared.current) {
      justCleared.current = false;
      return;
    }

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set saving indicator
    setIsSaving(true);

    // Set new timeout for saving
    saveTimeoutRef.current = setTimeout(() => {
      const dataToSave = {
        data: formData,
        timestamp: new Date().toISOString(),
      };
      console.log('Saving to localStorage:', dataToSave);
      localStorage.setItem('intakeFormData', JSON.stringify(dataToSave));
      setLastSaved(new Date());
      setIsSaving(false);
    }, 1000); // Save after 1 second of no changes

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData]);

  // Format time since last save
  const getTimeSinceLastSave = (): string => {
    if (!lastSaved) return '';
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastSaved.getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  // Reset form to CRUDgames defaults
  const clearForm = () => {
    // Don't auto-save the cleared state
    justCleared.current = true;

    // Reset to CRUDgames example data
    setFormData({
      projectName: '',
      projectType: [],
      businessDescription:
        'We provide Software as a Service (SaaS) solutions, including our flagship location-based gaming platform geoLARP.com. Our focus is making custom software accessible to businesses of all sizes.',
      mainChallenge:
        'Helping small businesses discover that custom software is within their reach, while streamlining our client acquisition and consultation process.',
      targetUsers:
        "Small businesses and startups who need custom software but assume it's beyond their budget. We show them affordable, scalable solutions are possible.",
      primaryGoal:
        'Learn about our services and easily schedule a consultation to discuss their custom software needs.',
      userScale: '',
      userAccounts: [],
      payments: [],
      contentFeatures: [],
      communicationFeatures: [],
      specialFeatures: [],
      timeline: '',
      budget: '',
      examples: '',
      brandPersonality: [],
      brandInfo: '',
      successMetrics:
        'Generate 10+ qualified leads per month. Book 5+ discovery calls monthly. Build sustainable six-figure revenue stream. Maintain creative freedom and enjoyment in our work. Help small businesses achieve their software goals.',
      priority: '',
      additionalInfo: '',
      contactEmail: '',
      contactPhone: '',
      preferredContact: '',
      referralSource: '',
    });
    setValidationErrors({});
    setTouched(new Set());
    setFieldInteracted(new Set());
  };

  // Helper to check if a field has real content
  const hasContent = (value: string | undefined): boolean => {
    return !!value && value.trim().length >= 3;
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  // Calculate section completion with proper validation
  const getSectionCompletion = (
    sectionName: string
  ): 'empty' | 'partial' | 'complete' => {
    switch (sectionName) {
      case 'basics': {
        const basicsComplete =
          hasContent(formData.projectName) &&
          hasContent(formData.businessDescription) &&
          hasContent(formData.mainChallenge);
        const basicsPartial =
          hasContent(formData.projectName) ||
          hasContent(formData.businessDescription) ||
          hasContent(formData.mainChallenge);
        return basicsComplete
          ? 'complete'
          : basicsPartial
            ? 'partial'
            : 'empty';
      }

      case 'projectType': {
        const projectTypeComplete = formData.projectType.length > 0;
        return projectTypeComplete ? 'complete' : 'empty';
      }

      case 'users': {
        const usersComplete =
          hasContent(formData.targetUsers) &&
          hasContent(formData.primaryGoal) &&
          !!formData.userScale;
        const usersPartial =
          hasContent(formData.targetUsers) ||
          hasContent(formData.primaryGoal) ||
          !!formData.userScale;
        return usersComplete ? 'complete' : usersPartial ? 'partial' : 'empty';
      }

      case 'features': {
        const featuresComplete =
          formData.userAccounts.length > 0 || formData.payments.length > 0;
        return featuresComplete ? 'complete' : 'empty';
      }

      case 'timeline': {
        const timelineComplete = !!formData.timeline && !!formData.budget;
        const timelinePartial = !!formData.timeline || !!formData.budget;
        return timelineComplete
          ? 'complete'
          : timelinePartial
            ? 'partial'
            : 'empty';
      }

      case 'look': {
        const lookComplete =
          (hasContent(formData.examples) ||
            formData.brandPersonality.length > 0) &&
          hasContent(formData.brandInfo);
        const lookPartial =
          hasContent(formData.examples) ||
          formData.brandPersonality.length > 0 ||
          hasContent(formData.brandInfo);
        return lookComplete ? 'complete' : lookPartial ? 'partial' : 'empty';
      }

      case 'success': {
        const successComplete =
          hasContent(formData.successMetrics) && !!formData.priority;
        const successPartial =
          hasContent(formData.successMetrics) || !!formData.priority;
        return successComplete
          ? 'complete'
          : successPartial
            ? 'partial'
            : 'empty';
      }

      case 'contact': {
        const contactComplete =
          isValidEmail(formData.contactEmail) &&
          isValidPhone(formData.contactPhone) &&
          !!formData.preferredContact;
        const contactPartial =
          formData.contactEmail.length > 0 ||
          formData.contactPhone.length > 0 ||
          !!formData.preferredContact;
        return contactComplete
          ? 'complete'
          : contactPartial
            ? 'partial'
            : 'empty';
      }

      default:
        return 'empty';
    }
  };

  const getSectionClassName = (sectionName: string): string => {
    const completion = getSectionCompletion(sectionName);
    return `form-section section-${completion}`;
  };

  // Get validation class for individual inputs
  const getInputValidationClass = (
    fieldName: string,
    value: string | string[],
    type: 'text' | 'email' | 'phone' | 'select' | 'array' = 'text'
  ): string => {
    // Only show validation state if field has been interacted with
    if (!fieldInteracted.has(fieldName)) {
      return '';
    }

    if (type === 'array') {
      const arr = value as string[];
      return arr.length > 0 ? 'input-valid' : 'input-empty';
    }

    const strValue = value as string;

    if (!strValue || strValue.trim().length === 0) {
      return 'input-empty';
    }

    if (type === 'email') {
      return isValidEmail(strValue) ? 'input-valid' : 'input-partial';
    }

    if (type === 'phone') {
      return isValidPhone(strValue) ? 'input-valid' : 'input-partial';
    }

    if (type === 'select') {
      return strValue ? 'input-valid' : '';
    }

    // For text fields
    const trimmed = strValue.trim();
    if (trimmed.length >= 3) {
      return 'input-valid';
    } else if (trimmed.length > 0) {
      return 'input-partial';
    }

    return 'input-empty';
  };

  // Validation function
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Required text fields
    if (!formData.projectName.trim()) {
      errors.projectName = 'Project name is required';
    }

    if (!formData.businessDescription.trim()) {
      errors.businessDescription =
        'Please describe your business (at least 10 characters)';
    } else if (formData.businessDescription.trim().length < 10) {
      errors.businessDescription =
        'Business description should be at least 10 characters';
    }

    if (!formData.mainChallenge.trim()) {
      errors.mainChallenge = "Please describe the problem we're solving";
    }

    // Project Type validation
    if (formData.projectType.length === 0) {
      errors.projectType = 'Please select at least one platform';
    }

    if (!formData.targetUsers.trim()) {
      errors.targetUsers = 'Please specify who will use this';
    }

    if (!formData.primaryGoal.trim()) {
      errors.primaryGoal = 'Please describe the main goal';
    }

    // Selection fields
    if (!formData.userScale) {
      errors.userScale = 'Please select expected user scale';
    }

    if (formData.userAccounts.length === 0) {
      errors.userAccounts = 'Please select at least one account type option';
    }

    if (formData.payments.length === 0) {
      errors.payments = 'Please select at least one payment option';
    }

    if (!formData.timeline) {
      errors.timeline = 'Please select your timeline';
    }

    if (!formData.budget) {
      errors.budget = 'Please select your budget range';
    }

    if (!formData.priority) {
      errors.priority = "Please select what's most important";
    }

    // Contact validation - Email is required, phone is truly optional
    if (!formData.contactEmail.trim()) {
      errors.contactEmail = 'Email is required so we can contact you';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      errors.contactEmail = 'Please enter a valid email address';
    }

    // Phone is required if preferred contact is phone
    if (
      formData.preferredContact === 'phone' &&
      !formData.contactPhone.trim()
    ) {
      errors.contactPhone =
        'Phone is required when selected as preferred contact method';
    }

    setValidationErrors(errors);

    // If there are errors, mark all fields as touched to show all errors
    if (Object.keys(errors).length > 0) {
      const allFields = new Set(Object.keys(errors));
      setTouched(allFields);
    }

    return Object.keys(errors).length === 0;
  };

  const handleFieldBlur = (fieldName: string) => {
    setTouched((prev) => new Set([...prev, fieldName]));
    setFieldInteracted((prev) => new Set([...prev, fieldName]));

    // Validate just this field
    const errors = { ...validationErrors };

    // Field-specific validation
    switch (fieldName) {
      case 'projectName':
        if (!formData.projectName.trim()) {
          errors.projectName = 'Project name is required';
        } else {
          delete errors.projectName;
        }
        break;
      case 'contactEmail':
        if (!formData.contactEmail.trim()) {
          errors.contactEmail = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
          errors.contactEmail = 'Please enter a valid email address';
        } else {
          delete errors.contactEmail;
        }
        break;
      case 'businessDescription':
        if (!formData.businessDescription.trim()) {
          errors.businessDescription = 'Please describe your business';
        } else if (formData.businessDescription.trim().length < 10) {
          errors.businessDescription =
            'Business description should be at least 10 characters';
        } else {
          delete errors.businessDescription;
        }
        break;
      case 'mainChallenge':
        if (!formData.mainChallenge.trim()) {
          errors.mainChallenge = "Please describe the problem we're solving";
        } else {
          delete errors.mainChallenge;
        }
        break;
      case 'targetUsers':
        if (!formData.targetUsers.trim()) {
          errors.targetUsers = 'Please specify who will use this';
        } else {
          delete errors.targetUsers;
        }
        break;
      case 'primaryGoal':
        if (!formData.primaryGoal.trim()) {
          errors.primaryGoal = 'Please describe the main goal';
        } else {
          delete errors.primaryGoal;
        }
        break;
      case 'contactPhone':
        if (
          formData.preferredContact === 'phone' &&
          !formData.contactPhone.trim()
        ) {
          errors.contactPhone =
            'Phone is required when selected as preferred contact method';
        } else {
          delete errors.contactPhone;
        }
        break;
    }

    setValidationErrors(errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form first
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.field-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Get Web3Forms access key from environment variables
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    const calendlyUrl = import.meta.env.VITE_CALENDLY_URL;

    if (!accessKey) {
      console.warn(
        'Web3Forms not configured. Please add VITE_WEB3FORMS_ACCESS_KEY to .env file.'
      );
      console.log('Form data:', formData);
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare form data for Web3Forms
      const web3FormData = {
        access_key: accessKey,
        subject: `New Project Inquiry: ${formData.projectName || 'Untitled'}`,
        from_name: formData.projectName || 'Form Submission',
        project_name: formData.projectName,
        project_type: formData.projectType.join(', '),
        business_description: formData.businessDescription,
        main_challenge: formData.mainChallenge,
        target_users: formData.targetUsers,
        primary_goal: formData.primaryGoal,
        user_scale: formData.userScale,
        user_accounts: formData.userAccounts.join(', '),
        payments: formData.payments.join(', '),
        content_features: formData.contentFeatures.join(', '),
        communication_features: formData.communicationFeatures.join(', '),
        special_features: formData.specialFeatures.join(', '),
        timeline: formData.timeline,
        budget: formData.budget,
        examples: formData.examples,
        brand_personality: formData.brandPersonality.join(', '),
        brand_info: formData.brandInfo,
        success_metrics: formData.successMetrics,
        priority: formData.priority,
        additional_info: formData.additionalInfo,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        preferred_contact: formData.preferredContact,
        referral_source: formData.referralSource,
      };

      // Send to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(web3FormData),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Form submitted successfully!');
        setSubmitStatus('success');

        // Show Calendly inline widget after successful submission
        if (calendlyUrl && window.Calendly) {
          setTimeout(() => {
            const calendlyContainer = document.getElementById(
              'calendly-inline-widget'
            );
            if (calendlyContainer && window.Calendly) {
              calendlyContainer.style.display = 'block';
              window.Calendly.initInlineWidget({
                url: calendlyUrl,
                parentElement: calendlyContainer,
                prefill: {
                  email: formData.contactEmail,
                  name: formData.projectName,
                  customAnswers: {
                    a1: formData.contactPhone,
                  },
                },
              });
            }
          }, 500);
        }
      } else {
        console.error('Form submission failed:', result);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Failed to send form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="intake-form">
      {/* Halloween Special Banner */}
      <div
        style={{
          background: `
          radial-gradient(circle at 80% 20%, #ff8c00 0%, #ffa500 4%, transparent 8%),
          radial-gradient(ellipse at 20% 80%, rgba(148,0,211,0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(75,0,130,0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(255,140,0,0.4) 0%, transparent 70%),
          linear-gradient(180deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)
        `,
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          boxShadow:
            '0 8px 16px rgba(0, 0, 0, 0.4), inset 0 2px 8px rgba(255,255,255,0.1)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <h2
          style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1.75rem',
            whiteSpace: 'nowrap',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          🎃 Halloween Special: Professional Landing Page - Only $100!
        </h2>
        <p
          style={{
            margin: '0',
            fontSize: '1.125rem',
            textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
          }}
        >
          ✓ Contact Form (Captures Leads) &nbsp; ✓ Calendly (Books Appointments)
          &nbsp; ✓ Domain Included
        </p>
        <p
          style={{
            margin: '0.5rem 0 0 0',
            fontSize: '0.875rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
          }}
        >
          $100/year: Lead-capture website with scheduling + domain + 2hr support
        </p>
        <p
          style={{
            margin: '0.25rem 0 0 0',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            color: '#fbbf24',
            textShadow: '2px 2px 3px rgba(0,0,0,0.9)',
          }}
        >
          ⏰ Book by October 31st to lock in this price!
        </p>
      </div>

      <header className="form-header">
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'flex-start',
            marginBottom: '2rem',
          }}
        >
          <div style={{ flex: '1' }}>
            <h1>🚀 Let's Build Something Great Together!</h1>
            <p className="subtitle">
              Tell us about your project and we'll help bring your vision to
              life.
            </p>

            {/* Auto-save status */}
            <div className="save-status">
              {isSaving && <span className="saving">💾 Saving...</span>}
              {!isSaving && lastSaved && (
                <span className="saved">
                  ✅ Draft saved {getTimeSinceLastSave()}
                </span>
              )}
              <button
                type="button"
                onClick={clearForm}
                className="clear-form-btn"
              >
                Reset Form
              </button>
            </div>
          </div>

          <div
            className="instructions"
            style={{ flex: '0 0 auto', minWidth: '320px' }}
          >
            <h3>How This Form Works</h3>
            <ol>
              <li>
                🔴 <strong>Red sections</strong> = Need your input to proceed
              </li>
              <li>
                🟡 <strong>Yellow sections</strong> = You're making progress!
              </li>
              <li>
                🟢 <strong>Green sections</strong> = Section complete!
              </li>
              <li>
                ✨ <strong>All sections turn green</strong> = Ready to submit
              </li>
              <li>💾 Your answers auto-save as you type</li>
            </ol>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        {/* The Basics */}
        <section className={getSectionClassName('basics')}>
          <h2>The Basics</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="projectName">
                Project Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('projectName')}
                placeholder="Your project name"
                autoComplete="organization"
                className={`${getInputValidationClass('projectName', formData.projectName)} ${touched.has('projectName') && validationErrors.projectName ? 'error' : ''}`}
                aria-label="Project Name"
                aria-required="true"
                aria-invalid={
                  touched.has('projectName') && !!validationErrors.projectName
                }
                aria-describedby={
                  validationErrors.projectName ? 'projectName-error' : undefined
                }
              />
              {touched.has('projectName') && validationErrors.projectName && (
                <span className="field-error">
                  {validationErrors.projectName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="businessDescription">
                Business Description <span className="required">*</span>
              </label>
              <textarea
                id="businessDescription"
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('businessDescription')}
                placeholder="Tell us about your business"
                autoComplete="on"
                rows={3}
                className={`${getInputValidationClass('businessDescription', formData.businessDescription)} ${touched.has('businessDescription') && validationErrors.businessDescription ? 'error' : ''}`}
              />
              {touched.has('businessDescription') &&
                validationErrors.businessDescription && (
                  <span className="field-error">
                    {validationErrors.businessDescription}
                  </span>
                )}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="mainChallenge">
              What problem are we solving for you?{' '}
              <span className="required">*</span>
            </label>
            <textarea
              id="mainChallenge"
              name="mainChallenge"
              value={formData.mainChallenge}
              onChange={handleInputChange}
              onBlur={() => handleFieldBlur('mainChallenge')}
              placeholder="Describe the main challenge or opportunity"
              rows={3}
              className={`${getInputValidationClass('mainChallenge', formData.mainChallenge)} ${touched.has('mainChallenge') && validationErrors.mainChallenge ? 'error' : ''}`}
              autoComplete="on"
            />
            {touched.has('mainChallenge') && validationErrors.mainChallenge && (
              <span className="field-error">
                {validationErrors.mainChallenge}
              </span>
            )}
          </div>
        </section>

        {/* Project Type */}
        <section className={getSectionClassName('projectType')}>
          <h2>Project Type</h2>

          <div className="form-group">
            <label>
              Platform <span className="required">*</span>
            </label>
            <div className="checkbox-group">
              {[
                'Website',
                'Web Application',
                'Mobile App',
                'Desktop Application',
                'Cross-Platform Solution',
              ].map((option) => (
                <label key={option} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.projectType.includes(option)}
                    onChange={() => handleCheckboxChange('projectType', option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {touched.has('projectType') && validationErrors.projectType && (
              <span className="field-error">
                {validationErrors.projectType}
              </span>
            )}
          </div>
        </section>

        {/* Your Users */}
        <section className={getSectionClassName('users')}>
          <h2>Your Users</h2>

          <div style={{ display: 'flex', gap: '5rem' }}>
            <div style={{ flex: '1' }}>
              <div className="form-group">
                <label htmlFor="targetUsers">
                  Target Users <span className="required">*</span>
                </label>
                <textarea
                  id="targetUsers"
                  name="targetUsers"
                  value={formData.targetUsers}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('targetUsers')}
                  placeholder="Customers, employees, both?"
                  autoComplete="on"
                  rows={3}
                  className={`${getInputValidationClass('targetUsers', formData.targetUsers)} ${touched.has('targetUsers') && validationErrors.targetUsers ? 'error' : ''}`}
                />
                {touched.has('targetUsers') && validationErrors.targetUsers && (
                  <span className="field-error">
                    {validationErrors.targetUsers}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="primaryGoal">
                  Primary Goal <span className="required">*</span>
                </label>
                <textarea
                  id="primaryGoal"
                  name="primaryGoal"
                  value={formData.primaryGoal}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('primaryGoal')}
                  placeholder="What they need to accomplish"
                  autoComplete="on"
                  rows={3}
                  className={`${getInputValidationClass('primaryGoal', formData.primaryGoal)} ${touched.has('primaryGoal') && validationErrors.primaryGoal ? 'error' : ''}`}
                />
                {touched.has('primaryGoal') && validationErrors.primaryGoal && (
                  <span className="field-error">
                    {validationErrors.primaryGoal}
                  </span>
                )}
              </div>
            </div>

            <div style={{ flex: '0 0 auto', minWidth: '300px' }}>
              <div className="form-group">
                <label>
                  User Scale <span className="required">*</span>
                </label>
                {touched.has('userScale') && validationErrors.userScale && (
                  <span className="field-error">
                    {validationErrors.userScale}
                  </span>
                )}
                <div
                  className={`radio-group ${getInputValidationClass('userScale', formData.userScale, 'select')}`}
                  id="userScale"
                >
                  {[
                    'Just a few (< 100)',
                    'Small group (100-1,000)',
                    'Growing audience (1,000-10,000)',
                    'Large scale (10,000+)',
                    'Not sure yet',
                  ].map((option) => (
                    <label key={option} className="radio-label">
                      <input
                        type="radio"
                        name="userScale"
                        value={option}
                        checked={formData.userScale === option}
                        onChange={() => handleRadioChange('userScale', option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features You Need */}
        <section className={getSectionClassName('features')}>
          <h2>Features You Need</h2>
          <p className="section-subtitle">Check all that apply</p>

          <div className="features-grid">
            <div className="form-group">
              <label>
                User Accounts: <span className="required">*</span>
              </label>
              {touched.has('userAccounts') && validationErrors.userAccounts && (
                <span className="field-error">
                  {validationErrors.userAccounts}
                </span>
              )}
              <div className="checkbox-group">
                {[
                  'No accounts needed',
                  'Basic login/signup',
                  'Social media login',
                  'Employee accounts',
                  'Customer accounts',
                ].map((option) => (
                  <label key={option} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.userAccounts.includes(option)}
                      onChange={() =>
                        handleCheckboxChange('userAccounts', option)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>
                Payments <span className="required">*</span>
              </label>
              {touched.has('payments') && validationErrors.payments && (
                <span className="field-error">{validationErrors.payments}</span>
              )}
              <div className="checkbox-group">
                {[
                  'No payments',
                  'One-time payments',
                  'Subscriptions',
                  'Donations accepted',
                ].map((option) => (
                  <label key={option} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.payments.includes(option)}
                      onChange={() => handleCheckboxChange('payments', option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Content & Files</label>
              <div className="checkbox-group">
                {[
                  'Static content only',
                  "You'll manage all content",
                  'Blog or news section',
                  'Download resources/documents',
                  'Upload files/images',
                ].map((option) => (
                  <label key={option} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.contentFeatures.includes(option)}
                      onChange={() =>
                        handleCheckboxChange('contentFeatures', option)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Communication</label>
              <div className="checkbox-group">
                {[
                  'No communication features',
                  'Email notifications',
                  'In-app messaging',
                  'Contact forms',
                  'Live chat',
                ].map((option) => (
                  <label key={option} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.communicationFeatures.includes(option)}
                      onChange={() =>
                        handleCheckboxChange('communicationFeatures', option)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Special Features</label>
              <div className="checkbox-group">
                {[
                  'Admin dashboard',
                  'Search functionality',
                  'Calendar/scheduling',
                  'Maps/location features',
                ].map((option) => (
                  <label key={option} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.specialFeatures.includes(option)}
                      onChange={() =>
                        handleCheckboxChange('specialFeatures', option)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline & Investment */}
        <section className={getSectionClassName('timeline')}>
          <h2>Timeline & Investment</h2>

          <div className="form-row">
            <div className="form-group">
              <label>
                When do you need this launched?{' '}
                <span className="required">*</span>
              </label>
              {touched.has('timeline') && validationErrors.timeline && (
                <span className="field-error">{validationErrors.timeline}</span>
              )}
              <div
                className={`radio-group ${getInputValidationClass('timeline', formData.timeline, 'select')}`}
              >
                {[
                  'ASAP (within 1 month)',
                  'Soon (2-3 months)',
                  'This quarter (3-6 months)',
                  'This year (6-12 months)',
                  'Flexible timeline',
                ].map((option) => (
                  <label key={option} className="radio-label">
                    <input
                      type="radio"
                      name="timeline"
                      value={option}
                      checked={formData.timeline === option}
                      onChange={() => handleRadioChange('timeline', option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>
                Budget range: (helps us recommend the right solution){' '}
                <span className="required">*</span>
              </label>
              {touched.has('budget') && validationErrors.budget && (
                <span className="field-error">{validationErrors.budget}</span>
              )}
              <div
                className={`radio-group ${getInputValidationClass('budget', formData.budget, 'select')}`}
              >
                {[
                  'Startup budget (< $5k)',
                  'Small business ($5k-$25k)',
                  'Growing business ($25k-$100k)',
                  'Enterprise ($100k+)',
                  "Let's discuss",
                ].map((option) => (
                  <label key={option} className="radio-label">
                    <input
                      type="radio"
                      name="budget"
                      value={option}
                      checked={formData.budget === option}
                      onChange={() => handleRadioChange('budget', option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Look & Feel */}
        <section className={getSectionClassName('look')}>
          <h2>Look & Feel</h2>

          <div className="form-row">
            <div>
              <div className="form-group">
                <label htmlFor="examples">Examples/Inspiration</label>
                <textarea
                  id="examples"
                  name="examples"
                  value={formData.examples}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('examples')}
                  placeholder="Websites or apps you like"
                  rows={4}
                  className={getInputValidationClass(
                    'examples',
                    formData.examples
                  )}
                  autoComplete="on"
                />
              </div>

              <div className="form-group">
                <label htmlFor="brandInfo">Brand Guidelines/Colors</label>
                <textarea
                  id="brandInfo"
                  name="brandInfo"
                  value={formData.brandInfo}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('brandInfo')}
                  placeholder="Current website or brand guide"
                  rows={4}
                  className={getInputValidationClass(
                    'brandInfo',
                    formData.brandInfo
                  )}
                  autoComplete="on"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Brand Personality</label>
              <div className="checkbox-group">
                {[
                  'Professional & corporate',
                  'Friendly & approachable',
                  'Modern & cutting-edge',
                  'Playful & fun',
                  'Elegant & sophisticated',
                ].map((option) => (
                  <label key={option} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.brandPersonality.includes(option)}
                      onChange={() =>
                        handleCheckboxChange('brandPersonality', option)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Looks Like... */}
        <section className={getSectionClassName('success')}>
          <h2>Success & Priority</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="successMetrics">Success Metrics</label>
              <textarea
                id="successMetrics"
                name="successMetrics"
                value={formData.successMetrics}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('successMetrics')}
                placeholder="How will we measure success?"
                rows={3}
                className={getInputValidationClass(
                  'successMetrics',
                  formData.successMetrics
                )}
                autoComplete="on"
              />
            </div>

            <div className="form-group">
              <label>
                Priority <span className="required">*</span>
              </label>
              {touched.has('priority') && validationErrors.priority && (
                <span className="field-error">{validationErrors.priority}</span>
              )}
              <div
                className={`radio-group ${getInputValidationClass('priority', formData.priority, 'select')}`}
                id="priority"
              >
                {[
                  'Works perfectly (reliability)',
                  'Look amazing (design)',
                  'Lightning fast (performance)',
                  'Easy to use (user experience)',
                  'Save money (efficiency)',
                ].map((option) => (
                  <label key={option} className="radio-label">
                    <input
                      type="radio"
                      name="priority"
                      value={option}
                      checked={formData.priority === option}
                      onChange={() => handleRadioChange('priority', option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className={getSectionClassName('contact')}>
          <h2>Contact Info</h2>

          <div className="form-row">
            <div>
              <div className="form-group">
                <label htmlFor="contactEmail">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('contactEmail')}
                  placeholder="your@email.com"
                  autoComplete="email"
                  className={`${getInputValidationClass('contactEmail', formData.contactEmail, 'email')} ${touched.has('contactEmail') && validationErrors.contactEmail ? 'error' : ''}`}
                />
                {touched.has('contactEmail') &&
                  validationErrors.contactEmail && (
                    <span className="field-error">
                      {validationErrors.contactEmail}
                    </span>
                  )}
              </div>

              <div className="form-group">
                <label htmlFor="contactPhone">
                  Phone{' '}
                  {formData.preferredContact === 'phone' ? (
                    <span className="required">*</span>
                  ) : (
                    '(optional - for scheduling callbacks)'
                  )}
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                  className={`${getInputValidationClass('contactPhone', formData.contactPhone, 'phone')} ${touched.has('contactPhone') && validationErrors.contactPhone ? 'error' : ''}`}
                  onBlur={() => handleFieldBlur('contactPhone')}
                />
                {touched.has('contactPhone') &&
                  validationErrors.contactPhone && (
                    <span className="field-error">
                      {validationErrors.contactPhone}
                    </span>
                  )}
              </div>

              <div className="form-group">
                <label htmlFor="referralSource">
                  How did you hear about us?
                </label>
                <input
                  type="text"
                  id="referralSource"
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleInputChange}
                  placeholder="Google, friend, social media, etc."
                  autoComplete="on"
                  className={getInputValidationClass(
                    'referralSource',
                    formData.referralSource
                  )}
                />
                <p
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#9ca3af',
                  }}
                >
                  💰{' '}
                  <a
                    href="/affiliate-signup"
                    target="_blank"
                    style={{ color: '#60a5fa', textDecoration: 'underline' }}
                  >
                    Become an affiliate partner and earn commissions
                  </a>
                </p>
              </div>
            </div>

            <div>
              <div className="form-group">
                <label htmlFor="preferredContact">
                  Preferred Contact Method{' '}
                  {formData.contactPhone && <span className="required">*</span>}
                </label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={(e) =>
                    handleRadioChange('preferredContact', e.target.value)
                  }
                  onBlur={() => handleFieldBlur('preferredContact')}
                  className={getInputValidationClass(
                    'preferredContact',
                    formData.preferredContact,
                    'select'
                  )}
                >
                  <option value="">Select preference</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="either">Either works</option>
                </select>
                {touched.has('preferredContact') &&
                  validationErrors.preferredContact && (
                    <span className="field-error">
                      {validationErrors.preferredContact}
                    </span>
                  )}
              </div>

              <div className="form-group">
                <label htmlFor="additionalInfo">Additional Info</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  onBlur={() => handleFieldBlur('additionalInfo')}
                  placeholder="Additional context, concerns, or questions"
                  rows={6}
                  className={getInputValidationClass(
                    'additionalInfo',
                    formData.additionalInfo
                  )}
                  autoComplete="on"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What Happens Next */}
        <section className="form-section next-steps">
          <h2>📞 What Happens Next?</h2>
          <ol>
            <li>We'll review your needs and create a project plan</li>
            <li>We'll schedule a call to discuss our recommendations</li>
            <li>You'll get a proposal with timeline and investment details</li>
            <li>We build something amazing together!</li>
          </ol>
          <p className="thank-you">
            Thank you for considering us for your project. We're excited to help
            bring your vision to life!
          </p>
        </section>

        <div className="form-actions">
          {/* Validation error summary - Show ALL errors when there are any */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="validation-summary">
              <h3>⚠️ Please fix the following issues:</h3>
              <ul>
                {Object.entries(validationErrors).map(([field, error]) => (
                  <li key={field}>
                    <a
                      href={`#${field}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(field);
                        if (element) {
                          element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                          });
                          element.focus();
                        }
                      }}
                    >
                      {error}
                    </a>
                  </li>
                ))}
              </ul>
              <p
                style={{
                  marginTop: '1rem',
                  fontSize: '0.9rem',
                  fontStyle: 'italic',
                }}
              >
                Fields found: {Object.keys(validationErrors).join(', ')}
              </p>
            </div>
          )}

          {submitStatus === 'success' && (
            <>
              <div className="success-message">
                ✅ Thank you! Your project information has been received.
                {import.meta.env.VITE_CALENDLY_URL && (
                  <p>Schedule your consultation below:</p>
                )}
              </div>
              <div
                id="calendly-inline-widget"
                className="calendly-inline-widget"
                style={{
                  minWidth: '320px',
                  height: '630px',
                  display: 'none',
                }}
              />
            </>
          )}
          {submitStatus === 'error' && (
            <div className="error-message">
              ❌ There was an error submitting your form. Please try again or
              email us directly.
            </div>
          )}
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Your Project Information'}
          </button>
        </div>
      </form>

      {/* Floating Debug Panel */}
      <button
        type="button"
        className="debug-toggle"
        onClick={() => setShowDebug(!showDebug)}
        aria-label="Toggle debug panel"
      >
        🐛
      </button>

      {showDebug && (
        <div className="debug-panel">
          <h3>Form Debug Info</h3>
          <ul>
            <li>
              {formData.projectName ? '✅' : '❌'} Project Name:{' '}
              {formData.projectName ? `"${formData.projectName}"` : 'Empty'}
            </li>
            <li>
              {formData.projectType.length > 0 ? '✅' : '❌'} Project Type:{' '}
              {formData.projectType.length} selected
            </li>
            <li>
              {formData.businessDescription ? '✅' : '❌'} Business:{' '}
              {formData.businessDescription
                ? `${formData.businessDescription.length} chars`
                : 'Empty'}
            </li>
            <li>
              {formData.mainChallenge ? '✅' : '❌'} Challenge:{' '}
              {formData.mainChallenge
                ? `${formData.mainChallenge.length} chars`
                : 'Empty'}
            </li>
            <li>
              {formData.targetUsers ? '✅' : '❌'} Target Users:{' '}
              {formData.targetUsers ? `"${formData.targetUsers}"` : 'Empty'}
            </li>
            <li>
              {formData.primaryGoal ? '✅' : '❌'} Primary Goal:{' '}
              {formData.primaryGoal ? `"${formData.primaryGoal}"` : 'Empty'}
            </li>
            <li>
              {formData.userScale ? '✅' : '❌'} User Scale:{' '}
              {formData.userScale || 'Not selected'}
            </li>
            <li>
              {formData.userAccounts.length > 0 ? '✅' : '❌'} User Accounts:{' '}
              {formData.userAccounts.length} selected
            </li>
            <li>
              {formData.payments.length > 0 ? '✅' : '❌'} Payments:{' '}
              {formData.payments.length} selected
            </li>
            <li>
              {formData.timeline ? '✅' : '❌'} Timeline:{' '}
              {formData.timeline || 'Not selected'}
            </li>
            <li>
              {formData.budget ? '✅' : '❌'} Budget:{' '}
              {formData.budget || 'Not selected'}
            </li>
            <li>
              {formData.priority ? '✅' : '❌'} Priority:{' '}
              {formData.priority || 'Not selected'}
            </li>
            <li>
              {formData.contactEmail ? '✅' : '❌'} Email:{' '}
              {formData.contactEmail || 'Empty'}
            </li>
          </ul>

          <h4>Validation Errors ({Object.keys(validationErrors).length})</h4>
          <pre>{JSON.stringify(validationErrors, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
