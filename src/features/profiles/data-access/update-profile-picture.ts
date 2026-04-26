import { supabase } from '@/services/supabse'

export async function updateProfilePicture(
  profileId: string,
  publicUrl: string,
) {
  const { error } = await supabase
    .from('profiles')
    .update({ profile_picture_url: publicUrl })
    .eq('id', profileId)

  if (error) {
    throw new Error(error.message)
  }
}
