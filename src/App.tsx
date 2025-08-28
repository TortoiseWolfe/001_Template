import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout/Layout';
import { PersonalInfo } from './components/Resume/PersonalInfo';
import { Summary } from './components/Resume/Summary';
import { Experience } from './components/Resume/Experience';
import { Skills } from './components/Resume/Skills';
import { EducationAndCertifications } from './components/Resume/EducationAndCertifications';
import { useResumeData } from './hooks/useResumeData';
import ScheduleButton from './components/ScheduleButton';
import ContactForm from './components/ContactForm';
import CTASection from './components/CTASection';
import { trackPageViewWithUTM } from './utils/analytics';
import styles from './App.module.css';

function App() {
  const { data: resumeData, loading, error } = useResumeData();

  // Track UTM parameters on initial load
  useEffect(() => {
    trackPageViewWithUTM();
  }, []);

  if (loading) {
    return (
      <ThemeProvider>
        <Layout>
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading resume data...</p>
          </div>
        </Layout>
      </ThemeProvider>
    );
  }

  if (error || !resumeData) {
    return (
      <ThemeProvider>
        <Layout>
          <div className={styles.error}>
            <h2>Error Loading Resume</h2>
            <p>{error?.message || 'Failed to load resume data'}</p>
          </div>
        </Layout>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Layout>
        <main className={styles.resumeContent}>
          <PersonalInfo
            personalInfo={resumeData.personalInfo}
            links={resumeData.links}
          />

          <Summary summary={resumeData.summary} />

          <Experience
            experiences={resumeData.experience}
            previousExperiences={resumeData.previousExperience}
          />

          <Skills skills={resumeData.skills} />

          <EducationAndCertifications
            education={resumeData.education}
            certifications={resumeData.certifications}
            assessments={resumeData.assessments}
          />

          {/* Contact Form */}
          <ContactForm />

          {/* Call to Action Section */}
          <CTASection
            calendlyUrl={import.meta.env.VITE_CALENDLY_URL}
            googleCalendarUrl={import.meta.env.VITE_GOOGLE_CALENDAR_URL}
          />
        </main>

        {/* Schedule Interview Floating Action Button */}
        <ScheduleButton
          calendlyUrl={import.meta.env.VITE_CALENDLY_URL}
          googleCalendarUrl={import.meta.env.VITE_GOOGLE_CALENDAR_URL}
          variant="floating"
        />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
