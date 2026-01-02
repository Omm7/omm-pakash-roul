import React from 'react';
import { CommandPaletteProvider, useCommandPalette } from '../../contexts/CommandPaletteContext';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import CommandPalette from './CommandPalette';

/**
 * Command Palette Trigger Component
 * Add this component to trigger the command palette with keyboard shortcut
 */
const CommandPaletteTrigger = () => {
  const { toggle } = useCommandPalette();

  // Listen for ⌘K or Ctrl+K
  useKeyboardShortcut('k', { ctrl: true, cmd: true }, toggle);

  return null;
};

/**
 * Command Palette Wrapper
 * Use this to wrap your app and enable command palette functionality
 * 
 * @example
 * import { CommandPaletteWrapper } from './components/Utilities/CommandPaletteWrapper';
 * 
 * function App() {
 *   return (
 *     <CommandPaletteWrapper>
 *       <YourApp />
 *     </CommandPaletteWrapper>
 *   );
 * }
 */
export const CommandPaletteWrapper = ({ children }) => {
  return (
    <CommandPaletteProvider>
      {children}
      <CommandPaletteTrigger />
      <CommandPalette />
    </CommandPaletteProvider>
  );
};

/**
 * Hook to programmatically control the command palette
 * 
 * @example
 * function MyComponent() {
 *   const { open, close } = useCommandPalette();
 *   
 *   return (
 *     <button onClick={open}>
 *       Open Command Palette
 *     </button>
 *   );
 * }
 */
export { useCommandPalette } from '../../contexts/CommandPaletteContext';

export default CommandPaletteWrapper;
