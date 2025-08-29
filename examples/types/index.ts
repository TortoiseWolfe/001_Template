/**
 * Example: Shared Types
 * Used by the test examples
 */

export interface DataItem {
  id: string;
  title: string;
  description: string;
  metadata?: {
    date: string;
    tags: string[];
  };
}
