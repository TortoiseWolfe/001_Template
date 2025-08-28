/**
 * Example: Generic API Hook
 *
 * Demonstrates:
 * - Type-safe data fetching
 * - Loading and error states
 * - Abort controller for cleanup
 * - Retry logic
 * - Caching strategy
 *
 * Usage:
 * ```
 * const { data, loading, error, refetch } = useAPI<User[]>('/api/users');
 * ```
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// Generic fetch options
interface UseAPIOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: HeadersInit;
  retries?: number;
  retryDelay?: number;
  cache?: boolean;
  cacheTime?: number; // in milliseconds
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
  enabled?: boolean; // Conditional fetching
}

// Hook return type
interface UseAPIResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  mutate: (newData: T) => void;
}

// Simple in-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();

export function useAPI<T = unknown>(
  url: string,
  options: UseAPIOptions = {}
): UseAPIResult<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    retries = 0,
    retryDelay = 1000,
    cache: useCache = false,
    cacheTime = 5 * 60 * 1000, // 5 minutes default
    onSuccess,
    onError,
    enabled = true,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retriesRef = useRef<number>(0);

  const fetchData = useCallback(async () => {
    // Don't fetch if disabled
    if (!enabled) return;

    // Check cache first
    if (useCache && method === 'GET') {
      const cached = cache.get(url);
      if (cached && Date.now() - cached.timestamp < cacheTime) {
        setData(cached.data);
        setLoading(false);
        return;
      }
    }

    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Update cache
      if (useCache && method === 'GET') {
        cache.set(url, { data: result, timestamp: Date.now() });
      }

      setData(result);
      setLoading(false);
      onSuccess?.(result);
      retriesRef.current = 0; // Reset retries on success
    } catch (err) {
      // Ignore abort errors
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }

      const error = err instanceof Error ? err : new Error('Unknown error');

      // Retry logic
      if (retriesRef.current < retries) {
        retriesRef.current++;
        setTimeout(() => fetchData(), retryDelay);
        return;
      }

      setError(error);
      setLoading(false);
      onError?.(error);
      retriesRef.current = 0; // Reset retries on final failure
    }
  }, [
    url,
    method,
    body,
    headers,
    retries,
    retryDelay,
    useCache,
    cacheTime,
    enabled,
    onSuccess,
    onError,
  ]);

  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchData();

    // Cleanup
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  // Manual refetch function
  const refetch = useCallback(async () => {
    // Clear cache for this URL
    if (useCache) {
      cache.delete(url);
    }
    await fetchData();
  }, [fetchData, url, useCache]);

  // Optimistic update function
  const mutate = useCallback(
    (newData: T) => {
      setData(newData);
      if (useCache) {
        cache.set(url, { data: newData, timestamp: Date.now() });
      }
    },
    [url, useCache]
  );

  return { data, loading, error, refetch, mutate };
}

// Specialized version for POST requests
export function useAPIMutation<TData = unknown, TBody = unknown>(
  url: string,
  options?: Omit<UseAPIOptions, 'method' | 'body'>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (body: TBody): Promise<TData | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        options?.onError?.(error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  );

  return { mutate, loading, error };
}

// Example usage with TypeScript types
interface User {
  id: number;
  name: string;
  email: string;
}

export function useUsersExample() {
  // Fetch users
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useAPI<User[]>('/api/users', {
    cache: true,
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retries: 3,
    onSuccess: (data) => console.log('Users loaded:', data),
    onError: (error) => console.error('Failed to load users:', error),
  });

  // Create user mutation
  const { mutate: createUser } = useAPIMutation<User, Partial<User>>(
    '/api/users',
    {
      onSuccess: () => refetch(), // Refresh users list
    }
  );

  return { users, loading, error, refetch, createUser };
}
