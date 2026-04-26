import { supabase } from '@/services/supabse'
import type { PageInfo } from '../types/public-page'
import type { PostgrestError } from '@supabase/supabase-js'
import type { Theme } from '../types/theme'

type PageInfoResponse = {
  id: string
  title: string
  description: string
  themeName: Theme
  profiles: { profilePictureUrl: string }
}

export async function getPageInfo(pageId: string) {
  const { data, error } = (await supabase
    .from('pages')
    .select(
      `
        id, 
        title, 
        description, 
        themeName:theme_name, 
        profiles!inner(profilePictureUrl:profile_picture_url)
      `,
    )
    .eq('id', pageId)
    .single()) as {
    data: PageInfoResponse | null
    error: PostgrestError | null
  }

  if (error) {
    throw new Error('Failed to fetch page info')
  }

  if (!data) {
    throw new Error('Page not found')
  }

  const pageInfo: PageInfo = {
    id: data.id,
    title: data.title,
    description: data.description,
    themeName: data.themeName,
    profilePictureUrl: data.profiles?.profilePictureUrl || '',
  }
  return pageInfo
}
