import { THEMES, ACCENT_COLORS } from '../contexts/ThemeContext';

/**
 * Command types for categorization
 */
export const COMMAND_TYPES = {
  NAVIGATION: 'navigation',
  ACTION: 'action',
  THEME: 'theme',
  SOCIAL: 'social',
};

/**
 * Command data structure
 * Each command has:
 * - id: unique identifier
 * - label: display text
 * - description: optional description
 * - type: command type for grouping
 * - icon: optional icon
 * - keywords: additional search terms
 * - action: function to execute
 * - shortcut: optional keyboard shortcut display
 */

export const createCommands = ({
  scrollTo,
  changeTheme,
  changeAccent,
  downloadResume,
  copyEmail,
  openSocial
}) => [
  // Navigation Commands
  {
    id: 'nav-home',
    label: 'Go to Home',
    description: 'Navigate to home section',
    type: COMMAND_TYPES.NAVIGATION,
    icon: '🏠',
    keywords: ['home', 'hero', 'start', 'top'],
    action: () => scrollTo('home'),
  },
  {
    id: 'nav-about',
    label: 'Go to About',
    description: 'Learn more about me',
    type: COMMAND_TYPES.NAVIGATION,
    icon: '👤',
    keywords: ['about', 'bio', 'profile', 'me'],
    action: () => scrollTo('about'),
  },
  {
    id: 'nav-skills',
    label: 'Go to Skills',
    description: 'View my technical skills',
    type: COMMAND_TYPES.NAVIGATION,
    icon: '⚡',
    keywords: ['skills', 'tech', 'stack', 'technologies'],
    action: () => scrollTo('skills'),
  },
  {
    id: 'nav-projects',
    label: 'Go to Projects',
    description: 'Explore my work',
    type: COMMAND_TYPES.NAVIGATION,
    icon: '💼',
    keywords: ['projects', 'work', 'portfolio', 'showcase'],
    action: () => scrollTo('projects'),
  },
  {
    id: 'nav-experience',
    label: 'Go to Experience',
    description: 'View my work experience',
    type: COMMAND_TYPES.NAVIGATION,
    icon: '🎯',
    keywords: ['experience', 'work', 'timeline', 'career'],
    action: () => scrollTo('experience'),
  },
  {
    id: 'nav-testimonials',
    label: 'Go to Testimonials',
    description: 'Read what others say',
    type: COMMAND_TYPES.NAVIGATION,
    icon: '💬',
    keywords: ['testimonials', 'reviews', 'feedback'],
    action: () => scrollTo('testimonials'),
  },
  {
    id: 'nav-contact',
    label: 'Go to Contact',
    description: 'Get in touch with me',
    type: COMMAND_TYPES.NAVIGATION,
    icon: '📧',
    keywords: ['contact', 'email', 'reach', 'message'],
    action: () => scrollTo('contact'),
  },

  // Theme Commands
  {
    id: 'theme-neo-dark',
    label: 'Theme: Neo Dark',
    description: 'Switch to Neo Dark theme',
    type: COMMAND_TYPES.THEME,
    icon: '🌙',
    keywords: ['theme', 'dark', 'neo', 'black'],
    action: () => changeTheme(THEMES.NEO_DARK),
  },
  {
    id: 'theme-minimal-light',
    label: 'Theme: Minimal Light',
    description: 'Switch to Minimal Light theme',
    type: COMMAND_TYPES.THEME,
    icon: '☀️',
    keywords: ['theme', 'light', 'minimal', 'white'],
    action: () => changeTheme(THEMES.MINIMAL_LIGHT),
  },
  {
    id: 'theme-aurora',
    label: 'Theme: Aurora',
    description: 'Switch to Aurora Dynamic theme',
    type: COMMAND_TYPES.THEME,
    icon: '🌈',
    keywords: ['theme', 'aurora', 'dynamic', 'colorful'],
    action: () => changeTheme(THEMES.AURORA),
  },

  // Accent Color Commands
  {
    id: 'accent-blue',
    label: 'Accent: Blue',
    description: 'Set accent color to blue',
    type: COMMAND_TYPES.THEME,
    icon: '🔵',
    keywords: ['accent', 'color', 'blue'],
    action: () => changeAccent(ACCENT_COLORS.BLUE),
  },
  {
    id: 'accent-purple',
    label: 'Accent: Purple',
    description: 'Set accent color to purple',
    type: COMMAND_TYPES.THEME,
    icon: '🟣',
    keywords: ['accent', 'color', 'purple'],
    action: () => changeAccent(ACCENT_COLORS.PURPLE),
  },
  {
    id: 'accent-pink',
    label: 'Accent: Pink',
    description: 'Set accent color to pink',
    type: COMMAND_TYPES.THEME,
    icon: '🩷',
    keywords: ['accent', 'color', 'pink'],
    action: () => changeAccent(ACCENT_COLORS.PINK),
  },
  {
    id: 'accent-green',
    label: 'Accent: Green',
    description: 'Set accent color to green',
    type: COMMAND_TYPES.THEME,
    icon: '🟢',
    keywords: ['accent', 'color', 'green'],
    action: () => changeAccent(ACCENT_COLORS.GREEN),
  },
  {
    id: 'accent-orange',
    label: 'Accent: Orange',
    description: 'Set accent color to orange',
    type: COMMAND_TYPES.THEME,
    icon: '🟠',
    keywords: ['accent', 'color', 'orange'],
    action: () => changeAccent(ACCENT_COLORS.ORANGE),
  },

  // Action Commands
  {
    id: 'action-resume',
    label: 'Download Resume',
    description: 'Download my resume PDF',
    type: COMMAND_TYPES.ACTION,
    icon: '📄',
    keywords: ['resume', 'cv', 'download', 'pdf'],
    action: downloadResume,
    shortcut: '⌘D',
  },
  {
    id: 'action-email',
    label: 'Copy Email',
    description: 'Copy email address to clipboard',
    type: COMMAND_TYPES.ACTION,
    icon: '📋',
    keywords: ['email', 'copy', 'clipboard', 'contact'],
    action: copyEmail,
  },
  {
    id: 'action-scroll-top',
    label: 'Scroll to Top',
    description: 'Go back to the top of the page',
    type: COMMAND_TYPES.ACTION,
    icon: '⬆️',
    keywords: ['scroll', 'top', 'up', 'home'],
    action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  },

  // Social Commands
  {
    id: 'social-github',
    label: 'Open GitHub',
    description: 'Visit my GitHub profile',
    type: COMMAND_TYPES.SOCIAL,
    icon: '💻',
    keywords: ['github', 'code', 'repository'],
    action: () => openSocial('github'),
  },
  {
    id: 'social-linkedin',
    label: 'Open LinkedIn',
    description: 'Visit my LinkedIn profile',
    type: COMMAND_TYPES.SOCIAL,
    icon: '💼',
    keywords: ['linkedin', 'professional', 'network'],
    action: () => openSocial('linkedin'),
  },
  {
    id: 'social-twitter',
    label: 'Open Twitter',
    description: 'Visit my Twitter profile',
    type: COMMAND_TYPES.SOCIAL,
    icon: '🐦',
    keywords: ['twitter', 'x', 'tweets'],
    action: () => openSocial('twitter'),
  },
];

/**
 * Get command type label for grouping
 */
export const getCommandTypeLabel = (type) => {
  const labels = {
    [COMMAND_TYPES.NAVIGATION]: 'Navigation',
    [COMMAND_TYPES.ACTION]: 'Actions',
    [COMMAND_TYPES.THEME]: 'Themes & Colors',
    [COMMAND_TYPES.SOCIAL]: 'Social Links',
  };
  return labels[type] || 'Other';
};
