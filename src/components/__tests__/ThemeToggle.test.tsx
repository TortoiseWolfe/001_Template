import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { ThemeToggle } from '../UI/ThemeToggle';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render theme toggle button', () => {
    render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label');
  });

  it('should start with light theme by default', () => {
    render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('should toggle theme when clicked', () => {
    render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>
    );

    const button = screen.getByRole('button');

    // Initially light mode
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');

    // Click to toggle to dark mode
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');

    // Click to toggle back to light mode
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('should show gear icon in dark mode and sun icon in light mode', () => {
    render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>
    );

    const button = screen.getByRole('button');

    // In light mode, should not show gear icon
    expect(button.querySelector('[class*="gear"]')).not.toBeInTheDocument();

    // Toggle to dark mode
    fireEvent.click(button);

    // In dark mode, should show gear icon (has gear class)
    expect(button.querySelector('[class*="gear"]')).toBeInTheDocument();
  });

  it('should update document theme attribute', () => {
    render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>
    );

    const button = screen.getByRole('button');

    // Should start with light theme
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    // Toggle to dark
    fireEvent.click(button);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Toggle back to light
    fireEvent.click(button);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
