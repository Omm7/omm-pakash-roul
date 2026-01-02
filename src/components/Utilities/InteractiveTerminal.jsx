import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InteractiveTerminal.css';

const InteractiveTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to Omm Prakash Roul\'s Portfolio Terminal v1.0' },
    { type: 'system', content: 'Type "help" to see available commands' },
    { type: 'prompt', content: '' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: {
      description: 'Show all available commands',
      execute: () => {
        return [
          { type: 'info', content: '=== PORTFOLIO TERMINAL COMMANDS ===' },
          { type: 'info', content: '' },
          { type: 'command', content: 'Navigation Commands:' },
          { type: 'info', content: '  cd about      - Navigate to About section' },
          { type: 'info', content: '  cd skills     - Navigate to Skills section' },
          { type: 'info', content: '  cd projects   - Navigate to Projects section' },
          { type: 'info', content: '  cd experience - Navigate to Experience section' },
          { type: 'info', content: '  cd contact    - Navigate to Contact section' },
          { type: 'info', content: '  cd home       - Navigate to Home section' },
          { type: 'info', content: '' },
          { type: 'command', content: 'Information Commands:' },
          { type: 'info', content: '  ls            - List all sections' },
          { type: 'info', content: '  whoami        - Display profile information' },
          { type: 'info', content: '  about         - Show detailed about info' },
          { type: 'info', content: '  skills        - Show all skills' },
          { type: 'info', content: '  projects      - Show all projects' },
          { type: 'info', content: '  contact       - Show contact information' },
          { type: 'info', content: '' },
          { type: 'command', content: 'Utility Commands:' },
          { type: 'info', content: '  clear         - Clear terminal screen' },
          { type: 'info', content: '  help          - Show this help message' },
          { type: 'info', content: '  echo [text]   - Print text to terminal' },
          { type: 'info', content: '  date          - Show current date and time' },
          { type: 'info', content: '' },
        ];
      }
    },
    ls: {
      description: 'List all portfolio sections',
      execute: () => {
        return [
          { type: 'success', content: 'Portfolio Sections:' },
          { type: 'info', content: '  📁 home' },
          { type: 'info', content: '  📁 about' },
          { type: 'info', content: '  📁 skills' },
          { type: 'info', content: '  📁 experience' },
          { type: 'info', content: '  📁 projects' },
          { type: 'info', content: '  📁 contact' },
        ];
      }
    },
    whoami: {
      description: 'Display user information',
      execute: () => {
        return [
          { type: 'success', content: 'Omm Prakash Roul' },
          { type: 'info', content: 'Full-Stack Developer' },
          { type: 'info', content: 'Location: Odisha, India' },
          { type: 'info', content: 'Email: roulommprakash5@gmail.com' },
          { type: 'info', content: 'Status: Available for work' },
        ];
      }
    },
    about: {
      description: 'Show about information',
      execute: () => {
        return [
          { type: 'success', content: 'About Me:' },
          { type: 'info', content: 'Final-year Computer Science Engineering student at GITA Autonomous College.' },
          { type: 'info', content: 'Specializing in full-stack development, Java backend systems, and modern web frameworks.' },
          { type: 'info', content: 'Passionate about building database-driven applications and AI-powered solutions.' },
          { type: 'info', content: '' },
          { type: 'info', content: 'Tech Stack: React, Java, Node.js, MySQL, MongoDB' },
        ];
      }
    },
    skills: {
      description: 'List all technical skills',
      execute: () => {
        return [
          { type: 'success', content: 'Technical Skills:' },
          { type: 'info', content: '' },
          { type: 'command', content: 'Frontend:' },
          { type: 'info', content: '  • React.js, HTML5, CSS3, JavaScript (ES6+)' },
          { type: 'command', content: 'Backend:' },
          { type: 'info', content: '  • Java, Node.js, Express.js' },
          { type: 'command', content: 'Database:' },
          { type: 'info', content: '  • MySQL, MongoDB' },
          { type: 'command', content: 'Tools:' },
          { type: 'info', content: '  • Git, VS Code, Postman, Maven' },
        ];
      }
    },
    projects: {
      description: 'Show all projects',
      execute: () => {
        return [
          { type: 'success', content: 'Featured Projects:' },
          { type: 'info', content: '' },
          { type: 'command', content: '1. Full-Stack Web Applications' },
          { type: 'info', content: '   Database-driven platforms with REST APIs' },
          { type: 'command', content: '2. E-Commerce Solutions' },
          { type: 'info', content: '   Complete shopping platforms with payment integration' },
          { type: 'command', content: '3. AI-Powered Tools' },
          { type: 'info', content: '   Machine learning integrated web applications' },
          { type: 'info', content: '' },
          { type: 'info', content: 'Use "cd projects" to see detailed project showcase' },
        ];
      }
    },
    contact: {
      description: 'Show contact information',
      execute: () => {
        return [
          { type: 'success', content: 'Contact Information:' },
          { type: 'info', content: '' },
          { type: 'info', content: '📧 Email: roulommprakash5@gmail.com' },
          { type: 'info', content: '📍 Location: Odisha, India' },
          { type: 'info', content: '🔗 GitHub: github.com/Omm7' },
          { type: 'info', content: '💼 LinkedIn: linkedin.com/in/omm-prakash-roul' },
          { type: 'info', content: '' },
          { type: 'info', content: 'Use "cd contact" to access the contact form' },
        ];
      }
    },
    date: {
      description: 'Show current date and time',
      execute: () => {
        const now = new Date();
        return [
          { type: 'success', content: now.toString() }
        ];
      }
    },
    clear: {
      description: 'Clear terminal screen',
      execute: () => {
        setHistory([{ type: 'prompt', content: '' }]);
        return null;
      }
    }
  };

  const navigateTo = (section) => {
    const sectionId = section.toLowerCase();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return [
        { type: 'success', content: `Navigating to ${section}...` },
        { type: 'info', content: `Scrolling to ${section} section` }
      ];
    } else {
      return [
        { type: 'error', content: `Section "${section}" not found` }
      ];
    }
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add command to history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Add command to display
    const newHistory = [
      ...history.filter(h => h.type !== 'prompt'),
      { type: 'input', content: `$ ${trimmedCmd}` }
    ];

    // Parse command
    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = [];

    // Handle cd command
    if (command === 'cd') {
      if (args.length === 0) {
        output = [{ type: 'error', content: 'cd: missing operand. Try "cd home" or "cd about"' }];
      } else {
        const section = args[0];
        const validSections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
        if (validSections.includes(section.toLowerCase())) {
          output = navigateTo(section);
        } else {
          output = [{ type: 'error', content: `cd: ${section}: No such section` }];
        }
      }
    }
    // Handle echo command
    else if (command === 'echo') {
      output = [{ type: 'info', content: args.join(' ') }];
    }
    // Handle built-in commands
    else if (commands[command]) {
      const result = commands[command].execute();
      if (result) output = result;
    }
    // Unknown command
    else {
      output = [
        { type: 'error', content: `Command not found: ${command}` },
        { type: 'info', content: 'Type "help" for available commands' }
      ];
    }

    // Update history
    setHistory([...newHistory, ...output, { type: 'prompt', content: '' }]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <motion.div
      className="interactive-terminal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '500px',
        maxWidth: '500px'
      }}
    >
      {/* MacOS Window Header */}
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button close"></span>
          <span className="terminal-button minimize"></span>
          <span className="terminal-button maximize"></span>
        </div>
        <div className="terminal-title">portfolio-terminal — bash — 500×480</div>
      </div>

      {/* Terminal Body */}
      <div 
        className="terminal-body" 
        ref={terminalRef}
        onClick={handleTerminalClick}
      >
        <AnimatePresence>
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`terminal-line terminal-${item.type}`}
            >
              {item.type === 'prompt' ? (
                <div className="terminal-input-line">
                  <span className="terminal-prompt">guest@portfolio:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="terminal-input"
                    autoFocus
                    spellCheck={false}
                  />
                  <span className="terminal-cursor"></span>
                </div>
              ) : (
                <pre>{item.content}</pre>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
