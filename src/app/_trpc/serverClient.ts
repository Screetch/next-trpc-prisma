import { appRouter } from '@/src/server'
import { createCallerFactory } from '@/src/server/trpc'

// httpBatchLink
const createCaller = createCallerFactory(appRouter)

// @ts-expect-error context already passed
export const serverClient = createCaller({})
