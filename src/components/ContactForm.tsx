import { useState } from 'react';
import type { FormEvent } from 'react';
import { trackFormInteraction } from '../utils/analytics';
import { Toast } from './UI/Toast';
import { ScheduleModal } from './UI/ScheduleModal';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  accessKey?: string;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
  className = '',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Don't render if no access key is configured
  if (!accessKey) {
    console.warn(
      'No Web3Forms access key configured. Set VITE_WEB3FORMS_ACCESS_KEY in your .env file'
    );
    return null;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Track form submission attempt
    trackFormInteraction('submit');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Add access key to form data
    formData.append('access_key', accessKey);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setSubmitStatus('success');
        setShowToast(true);
        form.reset();
        // Show schedule modal after a brief delay
        setTimeout(() => {
          setShowScheduleModal(true);
        }, 1500);
        // Reset success message after toast disappears
        setTimeout(() => {
          setSubmitStatus('idle');
          setShowToast(false);
        }, 5000);
      } else {
        const data = await response.json();
        setErrorMessage(
          data.error || 'Failed to send message. Please try again.'
        );
        setSubmitStatus('error');
        setShowToast(true);
        trackFormInteraction('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage('Network error. Please check your connection.');
      setSubmitStatus('error');
      setShowToast(true);
      trackFormInteraction('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
    setSubmitStatus('idle');
  };

  return (
    <>
      <section className={`${styles.contactSection} ${className}`}>
        <h2 className={styles.title}>Get in Touch</h2>
        <p className={styles.subtitle}>
          Have a project in mind? Let's discuss how I can help.
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          aria-label="Contact form"
        >
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              required
              disabled={isSubmitting}
              placeholder="Your Name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              required
              disabled={isSubmitting}
              placeholder="your.email@example.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="company" className={styles.label}>
              Company (Optional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className={styles.input}
              disabled={isSubmitting}
              placeholder="Your Company"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className={styles.textarea}
              rows={5}
              required
              disabled={isSubmitting}
              placeholder="Tell me about your project or opportunity..."
            />
          </div>

          {/* Honeypot field for spam protection - Web3Forms uses 'botcheck' */}
          <input
            type="checkbox"
            name="botcheck"
            style={{ display: 'none' }}
            tabIndex={-1}
          />

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                Sending...
              </>
            ) : (
              <>
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Send Message
              </>
            )}
          </button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className={styles.successMessage} role="alert">
              <svg
                className={styles.statusIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Message sent successfully! I'll get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className={styles.errorMessage} role="alert">
              <svg
                className={styles.statusIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {errorMessage}
            </div>
          )}
        </form>
      </section>

      {/* Toast notifications */}
      {showToast && submitStatus === 'success' && (
        <Toast
          message="Message sent successfully! I'll get back to you soon."
          type="success"
          onClose={handleCloseToast}
        />
      )}

      {showToast && submitStatus === 'error' && (
        <Toast message={errorMessage} type="error" onClose={handleCloseToast} />
      )}

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        calendlyUrl={import.meta.env.VITE_CALENDLY_URL}
        googleCalendarUrl={import.meta.env.VITE_GOOGLE_CALENDAR_URL}
      />
    </>
  );
};

export default ContactForm;
