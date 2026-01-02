import { useEffect } from 'react';

/**
 * Custom hook for keyboard shortcuts
 * @param {string} key - The key to listen for
 * @param {Object} modifiers - Modifier keys (ctrl, cmd, shift, alt)
 * @param {Function} callback - Function to call when shortcut is triggered
 * @param {Object} options - Additional options (enabled, preventDefault)
 */
export const useKeyboardShortcut = (
  key,
  modifiers = {},
  callback,
  options = {}
) => {
  const { enabled = true, preventDefault = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      const { ctrl = false, cmd = false, shift = false, alt = false } = modifiers;

      // Check if the key matches
      const keyMatches = event.key && key && event.key.toLowerCase() === key.toLowerCase();

      // Check if modifiers match
      const ctrlMatches = !ctrl || event.ctrlKey;
      const cmdMatches = !cmd || event.metaKey;
      const shiftMatches = !shift || event.shiftKey;
      const altMatches = !alt || event.altKey;

      // Check if ONLY the specified modifiers are pressed
      const onlySpecifiedModifiers =
        (!ctrl && !event.ctrlKey || ctrl && event.ctrlKey) &&
        (!cmd && !event.metaKey || cmd && event.metaKey) &&
        (!shift && !event.shiftKey || shift && event.shiftKey) &&
        (!alt && !event.altKey || alt && event.altKey);

      if (keyMatches && ctrlMatches && cmdMatches && shiftMatches && altMatches) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, modifiers, callback, enabled, preventDefault]);
};

/**
 * Hook for multiple keyboard shortcuts
 * @param {Array} shortcuts - Array of shortcut configurations
 */
export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      for (const shortcut of shortcuts) {
        const { key, modifiers = {}, callback, enabled = true } = shortcut;
        
        if (!enabled) continue;

        const keyMatches = event.key.toLowerCase() === key.toLowerCase();
        const { ctrl, cmd, shift, alt } = modifiers;

        const modifiersMatch =
          (!ctrl || event.ctrlKey) &&
          (!cmd || event.metaKey) &&
          (!shift || event.shiftKey) &&
          (!alt || event.altKey);

        if (keyMatches && modifiersMatch) {
          event.preventDefault();
          callback(event);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
