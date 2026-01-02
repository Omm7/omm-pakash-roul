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

  // Realistic command-output pairs
  const commandSequence = [
    {
      command: '$ portfolio-init --start',
      output: [
        'Initializing portfolio system...',
        '✓ System initialized'
      ]
    },
    {
      command: '$ check-browser-compatibility',
      output: [
        'Checking browser compatibility...',
        '  → Browser: Chrome/Edge (Chromium)',
        '  → Version: 120.0.0',
        '  → JavaScript: ES2023 supported',
        '  → WebGL: 2.0 available',
        '  → Canvas: Supported',
        '✓ Browser fully compatible'
      ]
    },
    {
      command: '$ verify-dependencies',
      output: [
        'Verifying dependencies on your device...',
        '  → React 18.2.0: ✓',
        '  → Framer Motion: ✓',
        '  → CSS3 Animations: ✓',
        '  → Modern JS Features: ✓',
        '✓ All dependencies verified'
      ]
    },
    {
      command: '$ prepare-environment',
      output: [
        'Preparing environment for your browser...',
        '  → Configuring viewport settings...',
        '  ✓ Viewport configured',
        '  → Setting up render context...',
        '  ✓ Render context ready',
        '  → Initializing animation engine...',
        '  ✓ Animations ready',
        '  → Optimizing performance...',
        '  ✓ Performance optimized',
        '✓ Environment prepared successfully'
      ]
    },
    {
      command: '$ fetch-portfolio-assets',
      output: [
        'Downloading portfolio content...',
        '  % Total    % Received  Time    Speed'
      ]
    }
  ];

  const networkCheckSequence = {
    command: '$ test-network-connection',
    output: [
      'Checking your network connection...',
      '  → Testing connection speed...',
      '  → Latency: 12ms',
      '  → Download speed: 125 Mbps',
      '  → Upload speed: 45 Mbps',
      '  ✓ Network connection stable',
      '  ✓ CDN servers reachable'
    ]
  };

  const assetLoadSequence = {
    command: '$ download-webpage-content',
    output: [
      'Downloading webpage data...',
      '  → Fetching HTML structure...',
      '  ✓ HTML loaded (12.4 KB)',
      '  → Fetching CSS stylesheets...',
      '  ✓ Styles loaded (45.8 KB)',
      '  → Fetching JavaScript bundles...',
      '  ✓ Scripts loaded (234.6 KB)',
      '  → Fetching images and assets...',
      '  ✓ Media loaded (1.2 MB)',
      '  → Fetching fonts...',
      '  ✓ Fonts loaded (89.3 KB)',
      '',
      '✓ All content downloaded successfully',
      '✓ Portfolio ready to display',
      '',
      'Opening portfolio in 3... 2... 1...'
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
      // Phase 1: Execute initial commands with realistic terminal flow
      setCurrentPhase(1);
      for (const item of commandSequence) {
        // Type the command
        await typeLine(item.command);
        await new Promise(resolve => setTimeout(resolve, 150));
        
        // Show the output instantly (like real terminal)
        for (const outputLine of item.output) {
          addLine(outputLine);
          await new Promise(resolve => setTimeout(resolve, 120));
        }
        
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Phase 2: Download progress with realistic terminal output
      setCurrentPhase(2);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Simulate download progress
      for (let i = 0; i <= 100; i += 2) {
        await new Promise(resolve => setTimeout(resolve, 40));
        setDownloadProgress(i);
      }
      
      addLine('');
      addLine('✓ Download complete - 1.58 MB received in 2.8s (577 KB/s)');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Phase 3: Network connection check
      setCurrentPhase(3);
      addLine('');
      
      // Type network check command
      await typeLine(networkCheckSequence.command);
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Show network check output
      for (const outputLine of networkCheckSequence.output) {
        addLine(outputLine);
        await new Promise(resolve => setTimeout(resolve, 180));
      }
      await new Promise(resolve => setTimeout(resolve, 500));

      // Phase 4: Asset loading
      setCurrentPhase(4);
      addLine('');
      
      // Type asset download command
      await typeLine(assetLoadSequence.command);
      await new Promise(resolve => setTimeout(resolve, 150));
      
      // Show asset loading output
      for (const outputLine of assetLoadSequence.output) {
        addLine(outputLine);
        await new Promise(resolve => setTimeout(resolve, 180));
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Phase 5: Transition to webpage
      setCurrentPhase(5);
      await new Promise(resolve => setTimeout(resolve, 500));
      onComplete();
    };

    runSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`terminal-loading-screen ${currentPhase === 5 ? 'fade-out' : ''}`}>
      <div className="terminal-loading-container">
        <div className="terminal-loading-header">
          <span className="terminal-user">guest@portfolio-viewer</span>
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
                {'█'.repeat(Math.floor(downloadProgress / 2))}
                {'▒'.repeat(50 - Math.floor(downloadProgress / 2))}
                {' '}[{((downloadProgress / 100) * 1.58).toFixed(2)} MB / 1.58 MB]
                {' '}{(downloadProgress * 5.77).toFixed(0)} KB/s
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
