import { inferRouterOutputs } from '@trpc/server'

import { publicProcedure, router } from '@/src/server/trpc'
import { todoRouter } from '@/src/server/route/todo.router'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'up!'),
  todo: todoRouter,
})

export type AppRouter = typeof appRouter
export type RouterOutputs = inferRouterOutputs<AppRouter>
