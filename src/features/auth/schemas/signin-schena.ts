import { zodMessages as messages } from '@/lib/zod/zod-messages'
import { z } from 'zod'
import { emailSchema } from './email-schema'

export const signinSchema = z.object({
  email: emailSchema.shape.email,
  password: z.string().trim().nonempty({ message: messages.string.nonempty() }),
})

export type SigninSchema = z.infer<typeof signinSchema>
