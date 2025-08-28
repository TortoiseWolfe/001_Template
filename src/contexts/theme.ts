import { createContext } from 'react';

type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  systemPreference: Theme | null;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
