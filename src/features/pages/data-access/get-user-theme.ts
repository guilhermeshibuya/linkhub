import { supabase } from '@/services/supabse'
import type { Theme } from '../types/theme'

export async function getUserTheme(userId: string) {
  const { data, error } = await supabase
    .from('pages')
    .select('themeName:theme_name')
    .eq('profile_id', userId)
    .maybeSingle()

  if (error) {
    throw new Error('Failed to get user theme: ' + error.message)
  }

  return data?.themeName as Theme
}
