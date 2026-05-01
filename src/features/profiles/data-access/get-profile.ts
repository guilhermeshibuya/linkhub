import { supabase } from '@/services/supabse'

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('name, username, email, profilePictureUrl:profile_picture_url')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}
