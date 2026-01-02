import { useEffect, useState } from 'react';
import { useSpring } from 'framer-motion';

/**
 * Hook to track mouse position with smooth spring physics
 * @param {Object} options - Configuration options
 * @returns {Object} - Mouse position { x, y } and spring-animated values
 */
export const useMousePosition = (options = {}) => {
  const {
    damping = 25,
    stiffness = 150,
    enabled = true
  } = options;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  // Spring-animated values
  const springX = useSpring(0, { damping, stiffness });
  const springY = useSpring(0, { damping, stiffness });

  useEffect(() => {
    if (!enabled) return;

    let timeoutId;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
      
      setIsMoving(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [enabled, springX, springY]);

  return {
    x: mousePosition.x,
    y: mousePosition.y,
    springX,
    springY,
    isMoving
  };
};

/**
 * Hook to detect when mouse is over interactive elements
 * @returns {boolean} - Whether mouse is over an interactive element
 */
export const useIsOverInteractive = () => {
  const [isOverInteractive, setIsOverInteractive] = useState(false);

  useEffect(() => {
    const interactiveSelectors = 'a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])';

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.matches(interactiveSelectors) || target.closest(interactiveSelectors);
      setIsOverInteractive(!!isInteractive);
    };

    const handleMouseOut = (e) => {
      const target = e.relatedTarget;
      if (!target) {
        setIsOverInteractive(false);
        return;
      }
      const isInteractive = target.matches(interactiveSelectors) || target.closest(interactiveSelectors);
      setIsOverInteractive(!!isInteractive);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return isOverInteractive;
};

/**
 * Hook to track cursor text (for displaying text near cursor)
 * @returns {Object} - { text, setText } to control cursor text
 */
export const useCursorText = () => {
  const [text, setText] = useState('');

  return { text, setText };
};
