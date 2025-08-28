import React from 'react';
import type {
  Skills as SkillsType,
  SkillCategoryName,
} from '../../types/Resume';
import styles from './Skills.module.css';

interface SkillsProps {
  skills: SkillsType;
}

interface SkillCategoryProps {
  title: string;
  skills: string[];
  yearsExperience: { [skill: string]: number };
  icon: string;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({
  title,
  skills,
  yearsExperience,
  icon,
}) => {
  const getExperienceLevel = (years: number) => {
    if (years >= 8) return 'expert';
    if (years >= 5) return 'advanced';
    if (years >= 2) return 'intermediate';
    return 'beginner';
  };

  const getExperiencePercent = (years: number) => {
    return Math.min((years / 10) * 100, 100);
  };

  return (
    <div className={styles.category}>
      <div className={styles.categoryHeader}>
        <span className={styles.categoryIcon}>{icon}</span>
        <h3 className={styles.categoryTitle}>{title}</h3>
      </div>

      <div className={styles.skillsList}>
        {skills.map((skill) => {
          const years = yearsExperience[skill] || 0;
          const level = getExperienceLevel(years);
          const percent = getExperiencePercent(years);

          return (
            <div key={skill} className={styles.skillItem}>
              <div className={styles.skillHeader}>
                <span className={styles.skillName}>{skill}</span>
                {years > 0 && (
                  <span className={styles.skillYears}>
                    {years} year{years !== 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {years > 0 && (
                <div className={styles.skillBar}>
                  <div
                    className={`${styles.skillProgress} ${styles[level]}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const categoryConfig: Record<
    SkillCategoryName,
    { title: string; icon: string }
  > = {
    frontend: { title: 'Frontend Development', icon: '🎨' },
    backend: { title: 'Backend Development', icon: '⚙️' },
    database: { title: 'Databases', icon: '🗄️' },
    tools: { title: 'Tools & Technologies', icon: '🔧' },
    design: { title: 'Design & Graphics', icon: '🎭' },
    cms: { title: 'Content Management', icon: '📝' },
  };

  return (
    <section id="skills" className={styles.skills}>
      <h2 className={styles.sectionTitle}>Technical Skills</h2>

      <div className={styles.skillsGrid}>
        {(Object.keys(categoryConfig) as SkillCategoryName[]).map(
          (categoryKey) => {
            const category = skills[categoryKey];
            const config = categoryConfig[categoryKey];

            return (
              <SkillCategory
                key={categoryKey}
                title={config.title}
                skills={category.technologies}
                yearsExperience={category.yearsExperience}
                icon={config.icon}
              />
            );
          }
        )}
      </div>
    </section>
  );
};
