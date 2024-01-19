'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { RouterOutputs } from '@/src/server'
import { trpc } from '@/src/app/_trpc/client'

import { todoSchema } from '@/src/schema/todo.schema'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table'
import { Checkbox } from '@/src/components/ui/checkbox'

import { Button } from '@/src/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { CheckCircledIcon } from '@radix-ui/react-icons'

export const TodoList = ({
  initialTodos,
}: {
  initialTodos: RouterOutputs['todo']['getTodos']
}) => {
  const getTodos = trpc.todo.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  const addTodo = trpc.todo.addTodo.useMutation({
    //allow us to refetch automatically without refresh page to see result
    onSettled: () => {
      getTodos.refetch()
    },
  })
  const updateTodo = trpc.todo.updateTodo.useMutation({
    //allow us to refetch automatically without refresh page to see result
    onSettled: () => {
      getTodos.refetch()
    },
  })

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      content: '',
      done: false,
    },
  })

  const onSubmit = (values: z.infer<typeof todoSchema>) => {
    const { content } = values
    if (content.length) {
      addTodo.mutate(content)
      form.reset()
    }
  }

  return (
    <div className='grid w-full items-center gap-4'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Status</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getTodos?.data?.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>
                {todo.done ? (
                  <CheckCircledIcon className='text-green-600 h-5 w-5' />
                ) : (
                  <CheckCircledIcon className='text-destructive h-5 w-5' />
                )}
              </TableCell>
              <TableCell>{todo.content}</TableCell>
              <TableCell>
                <Checkbox
                  id={`check-${todo.id}`}
                  checked={!!todo.done}
                  onClick={async () => {
                    updateTodo.mutate({
                      id: todo.id,
                      done: todo.done ? false : true,
                    })
                  }}
                />
                <label
                  htmlFor={`check-${todo.id}`}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Todo...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Add todo</Button>
        </form>
      </Form>
    </div>
  )
}
