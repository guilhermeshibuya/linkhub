import { supabase } from '@/services/supabse'

export async function updateLinkPositions(
  links: { id: string; position: number }[],
) {
  const results = await Promise.all(
    links.map(({ id, position }) =>
      supabase.from('links').update({ position }).eq('id', id),
    ),
  )

  const error = results.find((result) => result.error)?.error ?? null
  return { error }
}
