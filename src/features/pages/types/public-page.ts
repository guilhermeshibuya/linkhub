import type { Link } from '@/features/links/types/link'
import type { Theme } from './theme'

type PageLink = Omit<Link, 'isVisible' | 'clicks'>

export type PublicPage = {
  id: string
  title: string
  description: string
  themeName: Theme
  username: string
  profilePictureUrl: string
  links: PageLink[]
}

export type PageInfo = Omit<
  PublicPage,
  'links' | 'username' | 'profilePictureUrl'
>
