import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter } from '@/src/server'
import { createContext } from '@/src/server/context'

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    // @ts-expect-error context already passed
    createContext: () => ({}),
  })

export { handler as GET, handler as POST }
