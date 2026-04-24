export type Theme = 'deep_slate' | 'cloud' | 'pop_brutal'

export type ThemeBackground =
  | { type: 'color'; value: string }
  | { type: 'gradient'; value: string }
  | { type: 'image'; value: string }

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
}
