import { zodMessages as messages } from '@/lib/zod/zod-messages'
import { z } from 'zod'

export const emailSchema = z.object({
  email: z.email({ error: () => messages.string.email() }).trim(),
})

export type EmailSchema = z.infer<typeof emailSchema>
