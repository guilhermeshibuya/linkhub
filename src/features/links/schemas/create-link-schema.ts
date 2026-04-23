import { zodMessages as messages } from '@/lib/zod/zod-messages'
import { z } from 'zod'

export const createLinkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: () => messages.string.min(1) })
    .max(150, { error: () => messages.string.max(150) }),
  url: z.url({ error: () => messages.string.url() }).trim(),
  isVisible: z.boolean(),
  position: z.number(),
  pageId: z.uuid({ error: () => messages.string.uuid() }).trim(),
})

export type CreateLinkSchema = z.infer<typeof createLinkSchema>
