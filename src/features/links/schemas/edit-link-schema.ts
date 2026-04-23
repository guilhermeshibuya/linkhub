import type z from 'zod'
import { createLinkSchema } from './create-link-schema'

export const editLinkSchema = createLinkSchema.pick({
  title: true,
  url: true,
})

export type EditLinkSchema = z.infer<typeof editLinkSchema>
