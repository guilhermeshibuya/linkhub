import { zodMessages as messages } from '@/lib/zod/zod-messages'
import { z } from 'zod'

export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { error: () => messages.string.min(3) })
    .max(30, { error: () => messages.string.max(30) })
    .regex(/^[a-zA-Z0-9_]+$/u, {
      error: () => messages.string.onlyLettersNumbersUnderscores(),
    }),
})

export type UsernameSchema = z.infer<typeof usernameSchema>
