import React, { useEffect, useState } from 'react';
export type ThemeType = 'neon-blue' | 'cyberpunk-pink' | 'solarized-dark' | 'light';
export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>('neon-blue');
  const [isDarkMode, setIsDarkMode] = useState(true);
  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('notice-panel-theme');
    if (savedTheme && ['neon-blue', 'cyberpunk-pink', 'solarized-dark', 'light'].includes(savedTheme)) {
      setTheme(savedTheme as ThemeType);
      setIsDarkMode(savedTheme !== 'light');
    }
  }, []);
  // Save theme to localStorage whenever it changes
  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    setIsDarkMode(newTheme !== 'light');
    localStorage.setItem('notice-panel-theme', newTheme);
  };
  return {
    theme,
    changeTheme,
    isDarkMode,
    toggleDarkMode: () => {
      const newTheme = isDarkMode ? 'light' : 'neon-blue';
      changeTheme(newTheme);
    }
  };
}