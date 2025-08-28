import React from 'react';
import type { Experience as ExperienceType } from '../../types/Resume';
import styles from './Experience.module.css';

interface ExperienceProps {
  experiences: ExperienceType[];
  previousExperiences?: ExperienceType[];
}

interface ExperienceItemProps {
  experience: ExperienceType;
  isLast: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  experience,
  isLast,
}) => {
  const formatLocation = () => {
    const { city, state } = experience.location;
    return [city, state].filter(Boolean).join(', ') || 'Remote';
  };

  return (
    <div className={styles.experienceItem}>
      <div className={styles.timeline}>
        <div className={styles.timelineMarker}>
          <span className={styles.gear}>⚙️</span>
        </div>
        {!isLast && <div className={styles.timelineLine} />}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h3 className={styles.jobTitle}>{experience.title}</h3>
            <div className={styles.company}>
              <span className={styles.companyName}>{experience.company}</span>
              <span className={styles.location}>{formatLocation()}</span>
            </div>
          </div>

          <div className={styles.dateSection}>
            <span className={styles.dateRange}>{experience.displayDate}</span>
            {experience.isCurrent && (
              <span className={styles.currentBadge}>Current</span>
            )}
          </div>
        </div>

        <ul className={styles.responsibilities}>
          {experience.responsibilities
            .map((responsibility, index, array) => {
              // Check if this is the portfolio header
              const isPortfolioHeader = responsibility === 'Portfolio Sites:';

              // Check if previous item was portfolio header
              const prevIsPortfolioHeader =
                index > 0 && array[index - 1] === 'Portfolio Sites:';

              // Check if this is a portfolio site line (contains bullet and dash)
              const isPortfolioItem =
                responsibility.startsWith('•') &&
                responsibility.includes(' - ');

              if (isPortfolioHeader) {
                return (
                  <li key={index} className={styles.portfolioHeader}>
                    {responsibility}
                  </li>
                );
              }

              // If we're starting the portfolio section, wrap all portfolio items
              if (prevIsPortfolioHeader) {
                // Find all portfolio items
                const portfolioItems = array
                  .slice(index)
                  .filter((r) => r.startsWith('•'));

                return (
                  <li key={index} className={styles.portfolioCard}>
                    <ul className={styles.portfolioList}>
                      {portfolioItems.map((item, idx) => {
                        const siteName = item
                          .split(' - ')[0]
                          .replace('• ', '')
                          .trim();
                        const description = item.split(' - ')[1];
                        const link = experience.portfolioLinks?.find(
                          (l) => l.name === siteName
                        );

                        return (
                          <li key={idx} className={styles.portfolioItem}>
                            <span className={styles.bullet}>•</span>
                            {link ? (
                              <>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.portfolioLink}
                                >
                                  {siteName}
                                </a>
                                <span className={styles.portfolioDescription}>
                                  {' '}
                                  - {description}
                                </span>
                              </>
                            ) : (
                              <span>{item.replace('• ', '')}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              }

              // Skip portfolio items as they're handled above
              if (isPortfolioItem) {
                return null;
              }

              return (
                <li key={index} className={styles.responsibility}>
                  {responsibility}
                </li>
              );
            })
            .filter(Boolean)}
        </ul>
      </div>
    </div>
  );
};

export const Experience: React.FC<ExperienceProps> = ({
  experiences,
  previousExperiences,
}) => {
  return (
    <>
      <section id="experience" className={styles.experience}>
        <h2 className={styles.sectionTitle}>Professional Experience</h2>
        <div className={styles.experienceList}>
          {experiences.map((experience, index) => (
            <ExperienceItem
              key={`${experience.company}-${experience.startDate}`}
              experience={experience}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </section>

      {previousExperiences && previousExperiences.length > 0 && (
        <section id="previous-experience" className={styles.experience}>
          <h2 className={styles.sectionTitle}>Previous Experience</h2>
          <div className={styles.experienceList}>
            {previousExperiences.map((experience, index) => (
              <ExperienceItem
                key={`${experience.company}-${experience.startDate}`}
                experience={experience}
                isLast={index === previousExperiences.length - 1}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
};
