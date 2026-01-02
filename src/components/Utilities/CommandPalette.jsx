import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPalette } from '../../contexts/CommandPaletteContext';
import { useTheme } from '../../contexts/ThemeContext';
import { fuzzyFilter, highlightMatches } from '../../utils/fuzzySearch';
import { createCommands, getCommandTypeLabel } from '../../data/commands';
import './CommandPalette.css';

const CommandPalette = () => {
  const { isOpen, close, recentCommands, addToRecent } = useCommandPalette();
  const { changeTheme, changeAccent } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Command actions
  const scrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      close();
    }
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/assets/resume.pdf';
    link.download = 'Omm_Prakash_Roul_Resume.pdf';
    link.click();
    close();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('roulommprakash5@gmail.com');
    // Show toast notification
    close();
  };

  const openSocial = (platform) => {
    const urls = {
      github: 'https://github.com/Omm7',
      linkedin: 'https://www.linkedin.com/in/omm-prakash-roul',
      twitter: 'https://lnkd.in/gYePAYaQ',
    };
    window.open(urls[platform], '_blank');
    close();
  };

  // Create commands with actions
  const commands = useMemo(
    () =>
      createCommands({
        scrollTo,
        changeTheme,
        changeAccent,
        downloadResume,
        copyEmail,
        openSocial,
      }),
    [scrollTo, changeTheme, changeAccent, downloadResume, copyEmail, openSocial]
  );

  // Filter commands based on search
  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) {
      // Show all commands when no search query
      return commands;
    }

    const results = fuzzyFilter(commands, searchQuery, ['label', 'description', 'keywords']);
    return results.map(r => r.item);
  }, [commands, searchQuery]);

  // Group commands by type
  const groupedCommands = useMemo(() => {
    if (searchQuery.trim()) {
      return { '': filteredCommands };
    }

    const groups = {};
    filteredCommands.forEach(cmd => {
      const label = getCommandTypeLabel(cmd.type);
      if (!groups[label]) groups[label] = [];
      groups[label].push(cmd);
    });
    return groups;
  }, [filteredCommands, searchQuery]);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev =>
            prev === 0 ? filteredCommands.length - 1 : prev - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          close();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, close]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  const executeCommand = (command) => {
    addToRecent(command.id);
    command.action();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="command-palette-overlay" onClick={close}>
        <motion.div
          className="command-palette"
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          {/* Search Input */}
          <div className="command-search">
            <span className="command-search-icon">🔍</span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="command-input"
              aria-label="Search commands"
              aria-autocomplete="list"
              aria-controls="command-list"
              aria-activedescendant={
                filteredCommands[selectedIndex]?.id
              }
            />
            <kbd className="command-kbd">ESC</kbd>
          </div>

          {/* Command List */}
          <div
            ref={listRef}
            className="command-list"
            id="command-list"
            role="listbox"
          >
            {!searchQuery && recentCommands.length > 0 && (
              <div className="command-group-label">Recent</div>
            )}

            {Object.keys(groupedCommands).length === 0 ? (
              <div className="command-empty">
                <span className="command-empty-icon">🔍</span>
                <p>No commands found</p>
                <p className="command-empty-hint">
                  Try searching for "theme", "navigate", or "contact"
                </p>
              </div>
            ) : (
              Object.entries(groupedCommands).map(([groupLabel, cmds]) => (
                <div key={groupLabel} className="command-group">
                  {groupLabel && (
                    <div className="command-group-label">{groupLabel}</div>
                  )}
                  {cmds.map((command, index) => {
                    const globalIndex = filteredCommands.indexOf(command);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <motion.div
                        key={command.id}
                        id={command.id}
                        className={`command-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => executeCommand(command)}
                        role="option"
                        aria-selected={isSelected}
                        whileHover={{ backgroundColor: 'var(--color-bgTertiary)' }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="command-item-left">
                          {command.icon && (
                            <span className="command-icon">{command.icon}</span>
                          )}
                          <div className="command-item-text">
                            <div className="command-label">
                              {highlightMatches(command.label, searchQuery).map(
                                (part, i) =>
                                  part.highlight ? (
                                    <mark key={i} className="command-highlight">
                                      {part.text}
                                    </mark>
                                  ) : (
                                    <span key={i}>{part.text}</span>
                                  )
                              )}
                            </div>
                            {command.description && (
                              <div className="command-description">
                                {command.description}
                              </div>
                            )}
                          </div>
                        </div>
                        {command.shortcut && (
                          <kbd className="command-shortcut">{command.shortcut}</kbd>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="command-footer">
            <div className="command-footer-hints">
              <div className="command-hint">
                <kbd>↑↓</kbd> Navigate
              </div>
              <div className="command-hint">
                <kbd>↵</kbd> Select
              </div>
              <div className="command-hint">
                <kbd>ESC</kbd> Close
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
