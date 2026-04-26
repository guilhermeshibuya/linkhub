import { supabase } from '@/services/supabse'
import type { HeaderData } from '../schemas/header-schema'

export async function udpateHeader(pageId: string, headerData: HeaderData) {
  const { error } = await supabase
    .from('pages')
    .update({
      title: headerData.title,
      description: headerData.description,
    })
    .eq('id', pageId)

  if (error) {
    throw new Error('Failed to update header data')
  }
}
