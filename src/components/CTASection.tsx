import ScheduleButton from './ScheduleButton';
import styles from './CTASection.module.css';

interface CTASectionProps {
  calendlyUrl?: string;
  googleCalendarUrl?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  calendlyUrl,
  googleCalendarUrl,
}) => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.content}>
        <h3 className={styles.title}>🚀 Want to Skip the Wait?</h3>
        <p className={styles.subtitle}>
          Book a time that works for you and let's discuss your opportunity!
        </p>
        <ScheduleButton
          calendlyUrl={calendlyUrl}
          googleCalendarUrl={googleCalendarUrl}
          variant="inline"
          className={styles.button}
        />
      </div>
    </section>
  );
};

export default CTASection;
