import React, { createContext, useContext, useState, useCallback } from 'react';

const CommandPaletteContext = createContext();

export const CommandPaletteProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [recentCommands, setRecentCommands] = useState(() => {
    const saved = localStorage.getItem('recent-commands');
    return saved ? JSON.parse(saved) : [];
  });

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  const addToRecent = useCallback((commandId) => {
    setRecentCommands(prev => {
      const filtered = prev.filter(id => id !== commandId);
      const updated = [commandId, ...filtered].slice(0, 5);
      localStorage.setItem('recent-commands', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecentCommands([]);
    localStorage.removeItem('recent-commands');
  }, []);

  return (
    <CommandPaletteContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
        recentCommands,
        addToRecent,
        clearRecent
      }}
    >
      {children}
    </CommandPaletteContext.Provider>
  );
};

export const useCommandPalette = () => {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error('useCommandPalette must be used within CommandPaletteProvider');
  }
  return context;
};
