/**
 * Example: Component Testing Pattern
 *
 * Demonstrates:
 * - React Testing Library usage
 * - Accessibility testing
 * - User interaction testing
 * - Mocking strategies
 * - Async testing
 *
 * Framework: Vitest + React Testing Library
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend matchers
expect.extend(toHaveNoViolations);

// Example component to test
import { DataDisplay } from '../components/DataDisplay';
import type { DataItem } from '../types';

describe('DataDisplay Component', () => {
  // Mock data
  const mockData: DataItem[] = [
    {
      id: '1',
      title: 'Item 1',
      description: 'Description 1',
      metadata: {
        date: '2024-01-01',
        tags: ['tag1', 'tag2'],
      },
    },
    {
      id: '2',
      title: 'Item 2',
      description: 'Description 2',
    },
  ];

  // Mock functions
  const mockOnClick = vi.fn();

  // Setup and teardown
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should render data items correctly', () => {
      render(<DataDisplay data={mockData} />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should display loading state', () => {
      render(<DataDisplay data={[]} loading={true} />);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should display error state', () => {
      const error = new Error('Failed to load data');
      render(<DataDisplay data={[]} error={error} />);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Error loading data')).toBeInTheDocument();
      expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    });

    it('should display empty state', () => {
      render(<DataDisplay data={[]} emptyMessage="No items found" />);

      expect(screen.getByText('No items found')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should handle item click', async () => {
      const user = userEvent.setup();
      render(<DataDisplay data={mockData} onItemClick={mockOnClick} />);

      const firstItem = screen.getByText('Item 1').closest('article');
      await user.click(firstItem!);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(mockData[0]);
    });

    it('should handle keyboard navigation', async () => {
      render(<DataDisplay data={mockData} onItemClick={mockOnClick} />);

      const firstItem = screen.getByText('Item 1').closest('article');

      // Test Enter key
      fireEvent.keyDown(firstItem!, { key: 'Enter' });
      expect(mockOnClick).toHaveBeenCalledTimes(1);

      // Test Space key
      fireEvent.keyDown(firstItem!, { key: ' ' });
      expect(mockOnClick).toHaveBeenCalledTimes(2);
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<DataDisplay data={mockData} onItemClick={mockOnClick} />);

      // Tab through items
      await user.tab();
      const firstItem = screen.getByText('Item 1').closest('article');
      expect(firstItem).toHaveFocus();

      await user.tab();
      const secondItem = screen.getByText('Item 2').closest('article');
      expect(secondItem).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<DataDisplay data={mockData} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes', () => {
      render(<DataDisplay data={mockData} onItemClick={mockOnClick} />);

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();

      const items = within(list).getAllByRole('listitem');
      expect(items).toHaveLength(2);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    it('should announce loading state to screen readers', () => {
      render(<DataDisplay data={[]} loading={true} />);

      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-live', 'polite');
    });

    it('should announce errors to screen readers', () => {
      const error = new Error('Test error');
      render(<DataDisplay data={[]} error={error} />);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('should accept custom className', () => {
      const { container } = render(
        <DataDisplay data={mockData} className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should render metadata when provided', () => {
      render(<DataDisplay data={mockData} />);

      // Check date rendering
      const dateElement = screen.getByText('1/1/2024');
      expect(dateElement.tagName).toBe('TIME');
      expect(dateElement).toHaveAttribute('datetime', '2024-01-01');

      // Check tags rendering
      expect(screen.getByText('tag1')).toBeInTheDocument();
      expect(screen.getByText('tag2')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined data gracefully', () => {
      render(<DataDisplay data={undefined as DataItem[] | undefined} />);
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('should handle null data gracefully', () => {
      render(<DataDisplay data={null as DataItem[] | null} />);
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('should not call onClick for items without handler', () => {
      render(<DataDisplay data={mockData} />);

      const firstItem = screen.getByText('Item 1').closest('article');
      fireEvent.click(firstItem!);

      // Should not throw error
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('Async Behavior', () => {
    it('should transition from loading to loaded state', async () => {
      const { rerender } = render(<DataDisplay data={[]} loading={true} />);

      expect(screen.getByRole('status')).toBeInTheDocument();

      rerender(<DataDisplay data={mockData} loading={false} />);

      await waitFor(() => {
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });
    });

    it('should handle rapid prop changes', async () => {
      const { rerender } = render(<DataDisplay data={mockData} />);

      // Rapidly change props
      rerender(<DataDisplay data={[]} loading={true} />);
      rerender(
        <DataDisplay data={[]} loading={false} error={new Error('Test')} />
      );
      rerender(<DataDisplay data={mockData} />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
      });
    });
  });

  describe('Performance', () => {
    it('should not re-render unnecessarily', () => {
      const renderSpy = vi.fn();

      const TestWrapper = ({ data }: { data: DataItem[] }) => {
        renderSpy();
        return <DataDisplay data={data} />;
      };

      const { rerender } = render(<TestWrapper data={mockData} />);
      expect(renderSpy).toHaveBeenCalledTimes(1);

      // Re-render with same props
      rerender(<TestWrapper data={mockData} />);
      expect(renderSpy).toHaveBeenCalledTimes(2); // React will re-render

      // Note: In real app, you'd use React.memo to prevent this
    });
  });
});

// Helper function for testing with providers
export function renderWithProviders(
  ui: React.ReactElement,
  { ...renderOptions } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    // Add your providers here (Theme, Router, Redux, etc.)
    return <>{children}</>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Custom matchers
export function toBeAccessible(received: HTMLElement) {
  // Custom accessibility checks
  const hasRole =
    received.hasAttribute('role') ||
    ['BUTTON', 'LINK', 'NAV', 'MAIN'].includes(received.tagName);
  const hasLabel =
    received.hasAttribute('aria-label') ||
    received.hasAttribute('aria-labelledby');

  return {
    pass: hasRole && (hasLabel || received.textContent),
    message: () => `Expected element to be accessible`,
  };
}
