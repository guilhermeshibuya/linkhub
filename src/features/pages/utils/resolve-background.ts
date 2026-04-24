import type { ThemeBackground } from '../types/theme'

export function resolveBackground(
  background: ThemeBackground,
): React.CSSProperties {
  switch (background.type) {
    case 'color':
      return { backgroundColor: background.value }
    case 'gradient':
      return { backgroundImage: background.value }
    case 'image':
      return {
        backgroundImage: `url(${background.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
  }
}
