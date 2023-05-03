import {
  createTaskSchema,
  getSingleTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
} from '../../../schema/todo'
import { t, authedProcedure } from '../trpc'

export const todoRouter = t.router({
  createTask: authedProcedure
  .input(createTaskSchema)
  .mutation(async ({ ctx, input }) => { // 新規作成は mutation
    const task = await ctx.prisma.task.create({
      data: {
        ...input, //ログインしているユーザーのオブジェクトを渡す
        user: {
          connect: {
            id: ctx.session?.user?.id, // ログインしているユーザーのID に一致しているものを取得する
          },
        },
      },
    })
    return task
  }),
  getTasks: t.procedure.query(({ ctx }) => { //こちらは認証不要で実行できるものとする。タスクを取得するので mutation ではなく procedure.query
    return ctx.prisma.task.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
      orderBy:{
        createdAt: 'desc',
      },
    })
  }),
  getSingleTask: authedProcedure
  .input(getSingleTaskSchema)
  .query(({ ctx, input }) => {
    return ctx.prisma.task.findUnique({
      where:{
        id: input.taskId,
      },
    })
  }),
  updateTask: authedProcedure
  .input(updateTaskSchema)
  .mutation(async ({ ctx, input}) => {
    const task = await ctx.prisma.task.update({
      where:{
        id: input.taskId,
      },
      data: {
        title: input.title,
        body: input.body,
      },
    })
    return task
  }),
  deleteTask: authedProcedure
  .input(deleteTaskSchema)
  .mutation(async ({ ctx, input}) => {
    await ctx.prisma.task.delete({
      where: {
        id: input.taskId,
      }
    })
  })
})
