import { zodMessages as messages } from '@/lib/zod/zod-messages'
import { z } from 'zod'
import { emailSchema } from './email-schema'
import { passwordSchema } from './password-schema'

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[\p{L}\s]+$/u, {
      error: () => messages.string.onlyLettersAndSpaces(),
    })
    .min(1, { error: () => messages.string.min(1) })
    .max(150, { error: () => messages.string.max(150) }),
  email: emailSchema.shape.email,
  password: passwordSchema.shape.password,
})

export type RegisterSchema = z.infer<typeof registerSchema>
