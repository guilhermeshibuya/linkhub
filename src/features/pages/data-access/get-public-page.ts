import { supabase } from '@/services/supabse'
import type { PublicPage } from '../types/public-page'

export async function getPublicPageByUsername(username: string) {
  const { data } = await supabase.rpc('get_public_page', {
    page_username: username,
  })

  return data as PublicPage
}
