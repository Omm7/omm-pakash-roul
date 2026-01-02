import React, { useState } from 'react';
import './RippleEffect.css';

/**
 * Higher-order component that adds ripple effect to any element
 * Usage: <RippleEffect><button>Click me</button></RippleEffect>
 */
const RippleEffect = ({ children, color = 'rgba(88, 166, 255, 0.6)' }) => {
  const [ripples, setRipples] = useState([]);

  const addRipple = (e) => {
    const rippleContainer = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rippleContainer.width, rippleContainer.height);
    const x = e.clientX - rippleContainer.left - size / 2;
    const y = e.clientY - rippleContainer.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now() + Math.random()
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <div className="ripple-container" onClick={addRipple}>
      {children}
      <span className="ripple-effects">
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              background: color
            }}
          />
        ))}
      </span>
    </div>
  );
};

export default RippleEffect;
