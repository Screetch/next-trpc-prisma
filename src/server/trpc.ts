import { initTRPC, TRPCError } from '@trpc/server'
import { Context } from '@/src/server/context'

const t = initTRPC.context<Context>().create()
const middleware = t.middleware

const isAuthed = middleware(async ({ ctx, next }) => {
  if (!ctx.auth) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      loggedIn: ctx.auth.loggedIn,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = publicProcedure.use(isAuthed)
export const createCallerFactory = t.createCallerFactory
