import z from 'zod'
import { zodMessages as messages } from '@/lib/zod/zod-messages'
import { DESCRIPTION_MAX_LENGTH } from '../constants/description'

export const headerSchema = z.object({
  title: z
    .string()
    .min(1, { error: () => messages.string.min(1) })
    .max(30, { error: () => messages.string.max(30) }),
  description: z
    .string()
    .max(DESCRIPTION_MAX_LENGTH, {
      error: () => messages.string.max(DESCRIPTION_MAX_LENGTH),
    })
    .optional(),
})

export type HeaderData = z.infer<typeof headerSchema>
