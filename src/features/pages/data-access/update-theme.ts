import { supabase } from '@/services/supabse'
import type { Theme } from '../types/theme'

export async function updateTheme(pageId: string, theme: Theme) {
  const { error } = await supabase
    .from('pages')
    .update({ theme_name: theme })
    .eq('id', pageId)

  if (error) {
    throw new Error(`Failed to update theme: ${error.message}`)
  }
}
