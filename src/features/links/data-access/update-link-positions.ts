import { supabase } from '@/services/supabse'

export async function updateLinkPositions(
  links: { id: string; position: number }[],
) {
  await Promise.all(
    links.map(({ id, position }) =>
      supabase.from('links').update({ position }).eq('id', id).throwOnError(),
    ),
  )
}
