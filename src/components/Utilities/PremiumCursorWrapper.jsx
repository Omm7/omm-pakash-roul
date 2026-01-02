import React, { useEffect } from 'react';
import PremiumCursor from './PremiumCursor';

/**
 * PremiumCursorWrapper Component
 * 
 * Wraps the PremiumCursor component and handles global cursor hiding.
 * This component should wrap your entire app to enable the custom cursor.
 */

const PremiumCursorWrapper = ({ children }) => {
  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'none';
    
    // Apply to all elements for consistent behavior
    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto';
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <>
      {children}
      <PremiumCursor />
    </>
  );
};

export default PremiumCursorWrapper;
export { PremiumCursorWrapper };
