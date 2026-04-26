import { supabase } from '@/services/supabse'

export async function uploadProfilePicture(profileId: string, file: File) {
  const { error } = await supabase.storage
    .from('avatars')
    .upload(`public/${profileId}/profile.jpg`, file, {
      upsert: true,
      cacheControl: '600',
    })

  if (error) {
    throw new Error(error.message)
  }
}
