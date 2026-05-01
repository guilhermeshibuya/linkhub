import { supabase } from '@/services/supabse'
import type { Link } from '../types/link'

export async function updateLink(linkId: string, updates: Partial<Link>) {
  await supabase
    .from('links')
    .update({
      is_visible: updates.isVisible,
      position: updates.position,
      title: updates.title,
      url: updates.url,
    })
    .eq('id', linkId)
    .throwOnError()
}
