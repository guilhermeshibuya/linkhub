export type Theme =
  | 'deep_slate'
  | 'cloud'
  | 'pop_brutal'
  | 'midnight'
  | 'terminal'
  | 'candy'
  | 'parchment'
  | 'noir'
  | 'forest'
  | 'dot_grid'
  | 'art_deco_stripe'
  | 'blueprint'
  | 'aurora'
  | 'holographic'
  | 'galaxy'

export type ThemeBackground =
  | { type: 'color'; value: string }
  | { type: 'gradient'; value: string }
  | { type: 'image'; value: string }
  | { type: 'pattern'; base: string; pattern: string }
  | { type: 'component'; value: string }

export type ThemeTokens = {
  background: ThemeBackground

  textPrimary: string
  textSecondary: string

  cardBackground: string
  cardForeground: string
  cardBorder: string
  cardShadow: string
  cardRadius: string
}

export const themeMap: Record<Theme, string> = {
  deep_slate: 'Deep Slate',
  cloud: 'Cloud',
  pop_brutal: 'Pop Brutal',
  midnight: 'Midnight',
  terminal: 'Terminal',
  candy: 'Candy',
  parchment: 'Parchment',
  noir: 'Noir',
  forest: 'Forest',
  dot_grid: 'Dot Grid',
  art_deco_stripe: 'Art Deco Stripe',
  blueprint: 'Blueprint',
  aurora: 'Aurora',
  holographic: 'Holographic',
  galaxy: 'Galaxy',
}

export const themes: Record<Theme, ThemeTokens> = {
  deep_slate: {
    background: {
      type: 'gradient',
      value:
        'radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% )',
    },
    textPrimary: '#F4F4F5',
    textSecondary: '#E4E4E7',
    cardBackground: '#27272A',
    cardForeground: '#F4F4F5',
    cardBorder: '',
    cardShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
    cardRadius: '1.5rem',
  },
  cloud: {
    background: { type: 'color', value: '#E2E8F0' },
    textPrimary: '#18181B',
    textSecondary: '#3F3F47',
    cardBackground: '#F4F4F5',
    cardForeground: '#27272A',
    cardBorder: '',
    cardShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
    cardRadius: '1.5rem',
  },
  pop_brutal: {
    background: { type: 'color', value: '#f9b2d7' },
    textPrimary: '#27272A',
    textSecondary: '#3F3F47',
    cardBackground: '#cfecf3',
    cardForeground: '#27272A',
    cardBorder: '3px solid #27272A',
    cardShadow: '-2px 4px 0 0 #27272A',
    cardRadius: '0.5rem',
  },
  midnight: {
    background: { type: 'color', value: '#0a0a0f' },
    textPrimary: '#e0e0ff',
    textSecondary: '#a5a5c8',
    cardBackground: '#1e1b4b',
    cardForeground: '#e0e0ff',
    cardBorder: '1px solid #4338ca',
    cardShadow: '0 0 12px rgba(67, 56, 202, 0.25)',
    cardRadius: '1.5rem',
  },

  terminal: {
    background: { type: 'color', value: '#0f1a14' },
    textPrimary: '#bbf7d0',
    textSecondary: '#4ade80',
    cardBackground: '#052e16',
    cardForeground: '#bbf7d0',
    cardBorder: '1px solid #16a34a',
    cardShadow: 'none',
    cardRadius: '0.25rem',
  },

  candy: {
    background: {
      type: 'gradient',
      value: 'linear-gradient(135deg, #fce4ec 0%, #e8eaf6 100%)',
    },
    textPrimary: '#880e4f',
    textSecondary: '#ad1457',
    cardBackground: 'rgba(255, 255, 255, 0.75)',
    cardForeground: '#880e4f',
    cardBorder: '1px solid #f48fb1',
    cardShadow: '0 2px 8px rgba(236, 64, 122, 0.1)',
    cardRadius: '1.5rem',
  },

  parchment: {
    background: { type: 'color', value: '#fdf6e3' },
    textPrimary: '#5c3d1e',
    textSecondary: '#8b5e3c',
    cardBackground: '#fdf0d5',
    cardForeground: '#5c3d1e',
    cardBorder: '1.5px solid #b5895a',
    cardShadow: 'none',
    cardRadius: '0.25rem',
  },

  noir: {
    background: { type: 'color', value: '#1a0a00' },
    textPrimary: '#f5c842',
    textSecondary: '#c8860a',
    cardBackground: '#2a1200',
    cardForeground: '#f5c842',
    cardBorder: '1.5px solid #c8860a',
    cardShadow: 'none',
    cardRadius: '0.25rem',
  },

  forest: {
    background: { type: 'color', value: '#f0fdf4' },
    textPrimary: '#14532d',
    textSecondary: '#166534',
    cardBackground: '#dcfce7',
    cardForeground: '#14532d',
    cardBorder: '1px solid #86efac',
    cardShadow: '0 1px 4px rgba(34, 197, 94, 0.15)',
    cardRadius: '1.5rem',
  },

  dot_grid: {
    background: {
      type: 'pattern',
      base: '#fff8f0',
      pattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Ccircle cx='2' cy='2' r='1.2' fill='%23f97316' opacity='0.35'/%3E%3C/svg%3E")`,
    },
    textPrimary: '#7c2d12',
    textSecondary: '#9a3412',
    cardBackground: '#ffffff',
    cardForeground: '#7c2d12',
    cardBorder: '1.5px solid #f97316',
    cardShadow: '0 2px 8px rgba(249, 115, 22, 0.12)',
    cardRadius: '0.75rem',
  },

  art_deco_stripe: {
    background: {
      type: 'pattern',
      base: '#f5f0e8',
      pattern: `repeating-linear-gradient(
        -45deg,
        #d4a8534d 0px,
        #d4a8534d 20px,
        transparent 20px,
        transparent 40px
      )`,
    },
    textPrimary: '#3d2b00',
    textSecondary: '#78550a',
    cardBackground: '#fffbf0',
    cardForeground: '#3d2b00',
    cardBorder: '2px solid #b8860b',
    cardShadow: '3px 3px 0 0 #b8860b',
    cardRadius: '0.25rem',
  },

  blueprint: {
    background: {
      type: 'pattern',
      base: '#0a1628',
      pattern: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath d='M 24 0 L 0 0 0 24' fill='none' stroke='%231e40af' stroke-width='0.5' opacity='0.5'/%3E%3C/svg%3E")`,
    },
    textPrimary: '#bfdbfe',
    textSecondary: '#93c5fd',
    cardBackground: 'rgba(30, 58, 138, 0.5)',
    cardForeground: '#bfdbfe',
    cardBorder: '1px solid #3b82f6',
    cardShadow: '0 0 12px rgba(59, 130, 246, 0.2)',
    cardRadius: '0.25rem',
  },

  holographic: {
    background: {
      type: 'component',
      value: 'holographic',
    },
    textPrimary: '#3b0764',
    textSecondary: '#6b21a8',
    cardBackground: 'rgba(255, 255, 255, 0.30)',
    cardForeground: '#3b0764',
    cardBorder: '1px solid rgba(255, 255, 255, 0.65)',
    cardShadow: '0 4px 20px rgba(168, 85, 247, 0.12)',
    cardRadius: '1.5rem',
  },

  aurora: {
    background: {
      type: 'component',
      value: 'aurora',
    },
    textPrimary: '#ede9fe',
    textSecondary: '#c4b5fd',
    cardBackground: 'rgba(109, 40, 217, 0.30)',
    cardForeground: '#ede9fe',
    cardBorder: '1px solid #7c3aed',
    cardShadow: '0 0 20px rgba(124, 58, 237, 0.2)',
    cardRadius: '1.5rem',
  },

  galaxy: {
    background: {
      type: 'component',
      value: 'galaxy',
    },
    textPrimary: '#ede9fe',
    textSecondary: '#c4b5fd',
    cardBackground: 'rgba(91, 33, 182, 0.1)',
    cardForeground: '#ede9fe',
    cardBorder: '1px solid #7c3aed',
    cardShadow: '0 0 16px rgba(124, 58, 237, 0.2)',
    cardRadius: '1.25rem',
  },
}
