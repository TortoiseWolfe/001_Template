import { useState, useEffect } from 'react';
import type { ResumeData } from '../types/Resume';
import resumeDataJson from '../data/resume.json';

interface UseResumeDataReturn {
  data: ResumeData | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Merges environment variables with resume JSON data
 * Prioritizes environment variables for sensitive personal information
 */
const mergeWithEnvVariables = (data: ResumeData): ResumeData => {
  const env = import.meta.env;

  // Build links object from environment variables
  const links: ResumeData['links'] = {
    ...data.links,
  };

  if (env.VITE_PORTFOLIO_URL) links.portfolio = env.VITE_PORTFOLIO_URL;
  if (env.VITE_LINKEDIN_URL) links.linkedin = env.VITE_LINKEDIN_URL;
  if (env.VITE_YOUTUBE_URL) links.youtube = env.VITE_YOUTUBE_URL;
  if (env.VITE_TWITCH_URL) links.twitch = env.VITE_TWITCH_URL;

  // Handle GitHub URLs (can have multiple)
  if (env.VITE_GITHUB_URL) {
    const githubUrls = [env.VITE_GITHUB_URL];
    if (env.VITE_GITHUB_URL_2) {
      githubUrls.push(env.VITE_GITHUB_URL_2);
    }
    links.github = githubUrls;
  }

  return {
    ...data,
    personalInfo: {
      ...data.personalInfo,
      // Override with environment variables if they exist
      name: env.VITE_RESUME_NAME || data.personalInfo.name,
      title: env.VITE_RESUME_TITLE || data.personalInfo.title,
      email: env.VITE_RESUME_EMAIL || data.personalInfo.email,
      phone: env.VITE_RESUME_PHONE || data.personalInfo.phone,
      location: {
        city: env.VITE_RESUME_CITY || data.personalInfo.location?.city,
        state: env.VITE_RESUME_STATE || data.personalInfo.location?.state,
        zip: env.VITE_RESUME_ZIP || data.personalInfo.location?.zip,
      },
    },
    links,
  };
};

export const useResumeData = (): UseResumeDataReturn => {
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      // Validate that the JSON data matches our TypeScript interface
      const validatedData = resumeDataJson as ResumeData;

      // Basic validation checks
      if (!validatedData.personalInfo) {
        throw new Error('Invalid resume data: missing personal info');
      }

      if (
        !validatedData.experience ||
        !Array.isArray(validatedData.experience)
      ) {
        throw new Error('Invalid resume data: missing or invalid experience');
      }

      // Merge with environment variables
      const mergedData = mergeWithEnvVariables(validatedData);

      // Validate merged data has required fields
      if (!mergedData.personalInfo?.name) {
        throw new Error(
          'Resume data missing required name field - check your .env file'
        );
      }

      setData(mergedData);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to load resume data')
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
};
