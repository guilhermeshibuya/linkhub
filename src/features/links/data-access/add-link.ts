import { supabase } from '@/services/supabse'
import type { CreateLinkSchema } from '../schemas/create-link-schema'

export async function addLink(createLink: CreateLinkSchema) {
  const { title, url, isVisible, position, pageId } = createLink

  const { data } = await supabase
    .from('links')
    .insert({
      title,
      url,
      is_visible: isVisible,
      position,
      page_id: pageId,
    })
    .select('id, title, url, clicks, isVisible:is_visible, position')
    .throwOnError()

  return data
}
