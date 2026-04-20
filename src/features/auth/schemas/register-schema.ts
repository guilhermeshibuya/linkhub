import { zodMessages as messages } from '@/lib/zod/zod-messages'
import { z } from 'zod'

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[\p{L}\s]+$/u, {
      error: () => messages.string.onlyLettersAndSpaces(),
    })
    .min(1, { error: () => messages.string.min(1) })
    .max(150, { error: () => messages.string.max(150) }),
  email: z.email({ error: () => messages.string.email() }).trim(),
  password: z
    .string()
    .trim()
    .min(6, { error: () => messages.string.min(6) }),
})

export type RegisterSchema = z.infer<typeof registerSchema>
