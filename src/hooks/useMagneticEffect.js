import { useEffect, useRef } from 'react';

/**
 * Custom hook for magnetic button effect
 * Buttons smoothly follow cursor when hovering nearby
 */
export const useMagneticEffect = (strength = 0.3) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Magnetic range
      const magneticRange = 100;

      if (distance < magneticRange) {
        const force = (magneticRange - distance) / magneticRange;
        const moveX = distanceX * strength * force;
        const moveY = distanceY * strength * force;

        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        element.style.transform = 'translate(0, 0)';
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return elementRef;
};
