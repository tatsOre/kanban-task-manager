import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme should be used within a ThemeProvider');
  }
  return context;
}

function ThemeProvider({ initialTheme = 'light', ...props }) {
  const [theme, setTheme] = useState(initialTheme);
  return <ThemeContext.Provider value={[theme, setTheme]} {...props} />;
}

export { useTheme, ThemeProvider };
