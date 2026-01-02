import React, { useState, useEffect, useRef } from 'react';
import './TerminalLoadingScreen.css';

const TerminalLoadingScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [currentPhase, setCurrentPhase] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const contentRef = useRef(null);
  const hasRunRef = useRef(false);

  // Simplified quick loading sequence (2-3 seconds total)
  const networkCheckSequence = {
    command: '$ test-network-connection',
    output: [
      'Checking network...',
      '✓ Network stable'
    ]
  };

  const downloadSequence = {
    command: '$ fetch-portfolio-assets',
    output: [
      'Downloading files...',
      '  % Total    % Received  Speed'
    ]
  };

  const finalSequence = {
    output: [
      '✓ Download complete',
      '✓ Portfolio ready',
      'Opening...'
    ]
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines, currentLine, downloadProgress]);

  // Character-by-character typing effect (fixed to prevent repetition)
  const typeLine = async (text) => {
    return new Promise((resolve) => {
      setIsTyping(true);
      setCurrentLine('');
      
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
          setCurrentLine(text.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setLines(prev => [...prev, text]);
          setCurrentLine('');
          setIsTyping(false);
          resolve();
        }
      }, 30); // 30ms per character
    });
  };

  const addLine = (text) => {
    setLines(prev => [...prev, text]);
  };

  useEffect(() => {
    // Prevent running twice in React Strict Mode
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const runSequence = async () => {
      // Phase 1: Network check (0.5s)
      setCurrentPhase(1);
      await typeLine(networkCheckSequence.command);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      for (const outputLine of networkCheckSequence.output) {
        addLine(outputLine);
        await new Promise(resolve => setTimeout(resolve, 80));
      }
      await new Promise(resolve => setTimeout(resolve, 200));

      // Phase 2: Download with progress (1.5s)
      setCurrentPhase(2);
      await typeLine(downloadSequence.command);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      for (const outputLine of downloadSequence.output) {
        addLine(outputLine);
        await new Promise(resolve => setTimeout(resolve, 80));
      }
      
      // Quick download progress
      for (let i = 0; i <= 100; i += 5) {
        await new Promise(resolve => setTimeout(resolve, 15));
        setDownloadProgress(i);
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));

      // Phase 3: Final messages (0.5s)
      setCurrentPhase(3);
      for (const outputLine of finalSequence.output) {
        addLine(outputLine);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      await new Promise(resolve => setTimeout(resolve, 300));

      // Phase 4: Transition to webpage
      setCurrentPhase(4);
      await new Promise(resolve => setTimeout(resolve, 200));
      onComplete();
    };

    runSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`terminal-loading-screen ${currentPhase === 4 ? 'fade-out' : ''}`}>
      <div className="terminal-loading-container">
        <div className="terminal-loading-header">
          <span className="terminal-user">guest@portfolio</span>
          <span className="terminal-separator">:</span>
          <span className="terminal-path">~</span>
          <span className="terminal-prompt">$</span>
        </div>
        
        <div className="terminal-loading-content" ref={contentRef}>
          {lines.map((line, index) => (
            <div key={index} className="terminal-loading-line">
              {line}
            </div>
          ))}
          
          {currentLine && (
            <div className="terminal-loading-line typing">
              {currentLine}
              {isTyping && <span className="typing-cursor">▌</span>}
            </div>
          )}
          
          {currentPhase === 2 && downloadProgress > 0 && downloadProgress <= 100 && (
            <div className="download-progress">
              <div className="terminal-progress-text">
                {downloadProgress.toString().padStart(3, ' ')}% 
                {'█'.repeat(Math.floor(downloadProgress / 5))}
                {'▒'.repeat(20 - Math.floor(downloadProgress / 5))}
              </div>
            </div>
          )}
          
          {!isTyping && <div className="terminal-cursor"></div>}
        </div>
      </div>
    </div>
  );
};

export default TerminalLoadingScreen;
