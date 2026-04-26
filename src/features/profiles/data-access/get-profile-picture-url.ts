import { supabase } from '@/services/supabse'

export async function getProfilePictureUrl(profileId: string): Promise<string> {
  const {
    data: { publicUrl },
  } = await supabase.storage
    .from('avatars')
    .getPublicUrl(`public/${profileId}/profile.jpg`)

  return publicUrl
}
