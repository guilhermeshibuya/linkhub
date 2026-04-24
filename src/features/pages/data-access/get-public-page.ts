import { supabase } from '@/services/supabse'
import type { PublicPage } from '../types/public-page'

export async function getPublicPageByUsername(username: string) {
  const { data, error } = await supabase.rpc('get_public_page', {
    page_username: username,
  })
  if (error) throw new Error('Failed to get public page: ' + error.message)

  return data as PublicPage
}
