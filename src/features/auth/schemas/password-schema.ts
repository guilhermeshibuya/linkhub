import { zodMessages as messages } from '@/lib/zod/zod-messages'
import { z } from 'zod'

export const passwordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(6, { error: () => messages.string.min(6) }),
})

export type PasswordSchema = z.infer<typeof passwordSchema>
