import { initTRPC } from '@trpc/server'
import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
// import { getSession } from 'next-auth/react';

export const createContext = async (opts: CreateNextContextOptions) => {
  // const session = await getSession({ req: opts.req });
  const auth = { loggedIn: false }

  return { auth }
}

export type Context = Awaited<ReturnType<typeof createContext>>
