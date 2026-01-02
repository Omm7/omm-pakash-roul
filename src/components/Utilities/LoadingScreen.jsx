import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = ({ duration = 2000 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Hide loading screen after duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [duration]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-content">
            {/* Logo/Name Animation */}
            <motion.div
              className="loading-logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="loading-title"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="gradient-text">Omm Prakash Roul</span>
              </motion.h1>
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              className="loading-bar-container"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '300px', opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="loading-bar">
                <motion.div
                  className="loading-bar-fill"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.div
                className="loading-percentage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {Math.floor(Math.min(progress, 100))}%
              </motion.div>
            </motion.div>

            {/* Animated Dots */}
            <motion.div
              className="loading-dots"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="dot"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>

            {/* Decorative Elements */}
            <div className="loading-decorations">
              <motion.div
                className="decoration-circle circle-1"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="decoration-circle circle-2"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
