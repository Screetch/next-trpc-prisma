import { z } from 'zod'

export const todoSchema = z.object({
  content: z.string(),
  done: z.boolean(),
})
