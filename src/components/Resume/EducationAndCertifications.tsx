import React from 'react';
import type { Education, Certification, Assessments } from '../../types/Resume';
import styles from './EducationAndCertifications.module.css';

interface EducationAndCertificationsProps {
  education: Education[];
  certifications: Certification[];
  assessments?: Assessments;
}

export const EducationAndCertifications: React.FC<
  EducationAndCertificationsProps
> = ({ education, certifications, assessments }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return styles.expert;
      case 'Proficient':
        return styles.proficient;
      case 'Familiar':
        return styles.familiar;
      default:
        return '';
    }
  };

  return (
    <section id="education" className={styles.educationSection}>
      <h2 className={styles.sectionTitle}>Education & Certifications</h2>

      <div className={styles.contentGrid}>
        {/* Education */}
        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>
            <span className={styles.subsectionIcon}>🎓</span>
            Education
          </h3>
          <div className={styles.itemsList}>
            {education.map((edu, index) => (
              <div key={index} className={styles.educationItem}>
                <div className={styles.itemHeader}>
                  <h4 className={styles.itemTitle}>{edu.degree}</h4>
                  <span className={styles.itemDate}>{edu.displayDate}</span>
                </div>
                <div className={styles.itemSubtitle}>{edu.institution}</div>
                {edu.isCurrent && (
                  <span className={styles.currentBadge}>Current</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>
            <span className={styles.subsectionIcon}>🏆</span>
            Certifications
          </h3>
          <div className={styles.itemsList}>
            {certifications.map((cert, index) => (
              <div key={index} className={styles.certificationItem}>
                <div className={styles.itemHeader}>
                  <h4 className={styles.itemTitle}>
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.certLink}
                      >
                        {cert.name}
                      </a>
                    ) : (
                      cert.name
                    )}
                  </h4>
                  <span className={styles.itemDate}>{cert.displayDate}</span>
                </div>
                <div className={styles.itemSubtitle}>{cert.provider}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessments */}
        {assessments?.indeed && assessments.indeed.length > 0 && (
          <div className={`${styles.subsection} ${styles.assessments}`}>
            <h3 className={styles.subsectionTitle}>
              <span className={styles.subsectionIcon}>📊</span>
              Skills Assessments
            </h3>
            <div className={styles.assessmentGrid}>
              {assessments.indeed.map((assessment, index) => (
                <div key={index} className={styles.assessmentItem}>
                  <div className={styles.assessmentName}>{assessment.name}</div>
                  <div
                    className={`${styles.assessmentLevel} ${getLevelColor(assessment.level)}`}
                  >
                    {assessment.level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
