import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  NEO_DARK: 'neo-dark',
  MINIMAL_LIGHT: 'minimal-light',
  AURORA: 'aurora'
};

export const ACCENT_COLORS = {
  BLUE: 'blue',
  PURPLE: 'purple',
  PINK: 'pink',
  GREEN: 'green',
  ORANGE: 'orange'
};

const themeConfig = {
  [THEMES.NEO_DARK]: {
    name: 'Neo Dark',
    colors: {
      bg: '#0a0a0f',
      bgSecondary: '#13131a',
      bgTertiary: '#1a1a24',
      text: '#e4e4e7',
      textSecondary: '#a1a1aa',
      border: '#27272a',
      borderLight: '#3f3f46',
    }
  },
  [THEMES.MINIMAL_LIGHT]: {
    name: 'Minimal Light Pro',
    colors: {
      bg: '#ffffff',
      bgSecondary: '#f8f9fa',
      bgTertiary: '#f1f3f5',
      text: '#1a1a1a',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      borderLight: '#d1d5db',
    }
  },
  [THEMES.AURORA]: {
    name: 'Aurora Dynamic',
    colors: {
      bg: '#0f0f1e',
      bgSecondary: '#1a1a2e',
      bgTertiary: '#16213e',
      text: '#f0f0f0',
      textSecondary: '#b4b4b4',
      border: '#2d3561',
      borderLight: '#4a5568',
    }
  }
};

const accentConfig = {
  [ACCENT_COLORS.BLUE]: {
    primary: '#3b82f6',
    secondary: '#60a5fa',
    glow: 'rgba(59, 130, 246, 0.5)'
  },
  [ACCENT_COLORS.PURPLE]: {
    primary: '#a855f7',
    secondary: '#c084fc',
    glow: 'rgba(168, 85, 247, 0.5)'
  },
  [ACCENT_COLORS.PINK]: {
    primary: '#ec4899',
    secondary: '#f472b6',
    glow: 'rgba(236, 72, 153, 0.5)'
  },
  [ACCENT_COLORS.GREEN]: {
    primary: '#10b981',
    secondary: '#34d399',
    glow: 'rgba(16, 185, 129, 0.5)'
  },
  [ACCENT_COLORS.ORANGE]: {
    primary: '#f59e0b',
    secondary: '#fbbf24',
    glow: 'rgba(245, 158, 11, 0.5)'
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || THEMES.NEO_DARK;
  });

  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('portfolio-accent') || ACCENT_COLORS.BLUE;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-accent', accent);
    
    // Apply CSS variables
    const root = document.documentElement;
    const currentTheme = themeConfig[theme] || themeConfig[THEMES.NEO_DARK];
    const currentAccent = accentConfig[accent] || accentConfig[ACCENT_COLORS.BLUE];

    if (currentTheme && currentTheme.colors) {
      Object.entries(currentTheme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }

    if (currentAccent) {
      Object.entries(currentAccent).forEach(([key, value]) => {
        root.style.setProperty(`--accent-${key}`, value);
      });
    }

    root.setAttribute('data-theme', theme);
    root.setAttribute('data-accent', accent);
  }, [theme, accent]);

  const changeTheme = (newTheme) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(newTheme);
      setTimeout(() => setIsTransitioning(false), 500);
    }, 100);
  };

  const changeAccent = (newAccent) => {
    setAccent(newAccent);
  };

  const cycleTheme = () => {
    const themes = Object.values(THEMES);
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    changeTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accent,
        changeTheme,
        changeAccent,
        cycleTheme,
        isTransitioning,
        themeConfig: themeConfig[theme] || themeConfig[THEMES.NEO_DARK],
        accentConfig: accentConfig[accent] || accentConfig[ACCENT_COLORS.BLUE],
        THEMES,
        ACCENT_COLORS
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
