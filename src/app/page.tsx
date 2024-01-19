import { TodoList } from '@/src/app/_components/TodoList'
import { serverClient } from '@/src/app/_trpc/serverClient'

export default async function Home() {
  // Batch prefetch
  const todos = await serverClient.todo.getTodos()

  return (
    <main className='max-w-3xl mx-auto mt-5'>
      <TodoList initialTodos={todos} />
    </main>
  )
}
