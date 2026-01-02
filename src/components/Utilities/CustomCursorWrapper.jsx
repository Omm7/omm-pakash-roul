import React, { useState, useEffect } from 'react';
import CustomCursor from './CustomCursor';

/**
 * Custom Cursor Wrapper Component
 * Handles enabling/disabling cursor based on user preferences and device
 * 
 * @param {boolean} enabled - Whether cursor is enabled (default: true)
 * @param {boolean} showOnMobile - Show cursor on mobile devices (default: false)
 * @param {boolean} respectUserPreference - Check localStorage for user preference (default: true)
 */
export const CustomCursorWrapper = ({ 
  enabled = true, 
  showOnMobile = false,
  respectUserPreference = true,
  children 
}) => {
  const [cursorEnabled, setCursorEnabled] = useState(enabled);

  useEffect(() => {
    if (!respectUserPreference) {
      setCursorEnabled(enabled);
      return;
    }

    // Check user preference in localStorage
    const savedPreference = localStorage.getItem('custom-cursor-enabled');
    
    if (savedPreference !== null) {
      setCursorEnabled(savedPreference === 'true');
    } else {
      setCursorEnabled(enabled);
    }
  }, [enabled, respectUserPreference]);

  const toggleCursor = () => {
    const newValue = !cursorEnabled;
    setCursorEnabled(newValue);
    if (respectUserPreference) {
      localStorage.setItem('custom-cursor-enabled', String(newValue));
    }
  };

  return (
    <>
      {children}
      <CustomCursor enabled={cursorEnabled} showOnMobile={showOnMobile} />
    </>
  );
};

/**
 * Hook to toggle custom cursor
 * Use this in settings or preferences UI
 */
export const useCustomCursor = () => {
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem('custom-cursor-enabled');
    return saved !== null ? saved === 'true' : true;
  });

  const toggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    localStorage.setItem('custom-cursor-enabled', String(newValue));
  };

  const enable = () => {
    setEnabled(true);
    localStorage.setItem('custom-cursor-enabled', 'true');
  };

  const disable = () => {
    setEnabled(false);
    localStorage.setItem('custom-cursor-enabled', 'false');
  };

  return { enabled, toggle, enable, disable };
};

export default CustomCursorWrapper;
