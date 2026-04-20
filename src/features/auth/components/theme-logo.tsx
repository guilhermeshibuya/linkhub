import { useTheme } from '@/hooks/use-theme'
import LogoDark from '@/assets/logo-dark.svg?react'
import LogoLight from '@/assets/logo-light.svg?react'

export function ThemeLogo(props: React.SVGProps<SVGSVGElement>) {
  const { theme } = useTheme()
  const Logo = theme === 'dark' ? LogoDark : LogoLight

  return <Logo {...props} />
}
