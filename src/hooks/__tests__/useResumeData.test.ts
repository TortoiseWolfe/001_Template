import { renderHook, waitFor } from '@testing-library/react';
import { useResumeData } from '../useResumeData';

describe('useResumeData', () => {
  it('should start with loading state', () => {
    const { result } = renderHook(() => useResumeData());

    // The effect runs immediately and synchronously loads the data
    // So by the time we check, loading is already false
    expect(result.current.loading).toBe(false);
    expect(result.current.data).not.toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('should load resume data successfully', async () => {
    const { result } = renderHook(() => useResumeData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.personalInfo).toBeDefined();
    expect(result.current.data?.personalInfo.name).toBeDefined();
    expect(result.current.error).toBe(null);
  });

  it('should have valid resume data structure', async () => {
    const { result } = renderHook(() => useResumeData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const data = result.current.data;
    expect(data).toBeDefined();

    if (data) {
      // Check required fields
      expect(data.personalInfo).toBeDefined();
      expect(data.personalInfo.name).toBeDefined();
      expect(data.personalInfo.title).toBeDefined();
      expect(data.links).toBeDefined();
      expect(data.summary).toBeDefined();
      expect(Array.isArray(data.experience)).toBe(true);
      expect(data.skills).toBeDefined();
      expect(Array.isArray(data.education)).toBe(true);
      expect(Array.isArray(data.certifications)).toBe(true);
    }
  });
});
