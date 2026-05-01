import { supabase } from '@/services/supabse'
import type { PageInfo } from '../types/public-page'

export async function getPageInfo(pageId: string): Promise<PageInfo> {
  const { data, error } = await supabase
    .from('pages')
    .select(
      `
        id, 
        title, 
        description, 
        themeName:theme_name
      `,
    )
    .eq('id', pageId)
    .maybeSingle()

  if (error) throw error

  if (!data) {
    throw new Error('Page not found')
  }

  const pageInfo: PageInfo = {
    id: data.id,
    title: data.title,
    description: data.description,
    themeName: data.themeName,
  }

  return pageInfo
}
