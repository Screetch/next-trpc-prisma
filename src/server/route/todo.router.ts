import { z } from 'zod'

import { publicProcedure, protectedProcedure, router } from '@/src/server/trpc'
import { db } from '@/src/lib/db'

export const todoRouter = router({
  // getTodos: protectedProcedure.query(async () => {
  //   return await db.todos.findMany()
  // }),
  getTodos: publicProcedure.query(async () => {
    return await db.todos.findMany()
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
    await db.todos.create({
      data: {
        content: opts.input,
      },
    })
    return true
  }),
  updateTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(async (opts) => {
      await db.todos.update({
        where: {
          id: opts.input.id,
        },
        data: {
          done: opts.input.done,
        },
      })
      return true
    }),
})
