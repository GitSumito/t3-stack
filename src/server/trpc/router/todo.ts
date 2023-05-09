import {
  createTaskSchema,
  getSingleTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
} from '../../../schema/todo'
import { t, authedProcedure } from '../trpc'

// TodoリストのAPIの定義
export const todoRouter = t.router({
  
  // 認証されたユーザーのみがアクセスできるAPIを定義します
  createTask: authedProcedure
    // このAPIの入力はcreateTaskSchemaに従います
    .input(createTaskSchema)
    // このAPIはデータベースに変更を加えるため、mutationとして定義します
    .mutation(async ({ ctx, input }) => {
      // ctx.prisma.task.createは、Prisma Clientのタスクモデルを使用して新しいタスクを作成します
      // このコードにおけるテーブル名は task
      const task = await ctx.prisma.task.create({
        data: {
          // ...inputは、inputオブジェクトの全てのプロパティを展開します
          // この場合、inputオブジェクトはタスクのタイトルや本文など、新しいタスクに必要なデータを含んでいます
          ...input,
          // userは、新しいタスクがどのユーザーに属するかを示します
          user: {
            // connectは、既存のユーザーと新しいタスクを関連付けるためのプロパティです
            // ここでは、現在のセッションのユーザーID（ctx.session?.user?.id）を使用しています
            // つまり、このタスクは現在のセッションのユーザーに関連付けられます
            connect: {
              id: ctx.session?.user?.id,
            },
          },
        },
      })
      // 新しく作成されたタスクを返します
      return task
    }),

  // タスクを取得するAPI
  getTasks: t.procedure.query(({ ctx }) => {
    // Prismaクライアントを使用してデータベースからタスクを検索します。
    return ctx.prisma.task.findMany({
      // 'where'オブジェクトを使用して検索条件を指定します。
      // この場合、ログインしているユーザーのIDに一致するタスクを検索します。
      where: {
        userId: ctx.session?.user?.id,
      },
      // 'orderBy'オブジェクトを使用して、取得するタスクの並び順を指定します。
      // この場合、作成日時（createdAt）が新しいものから順に並べます。
      orderBy:{
        createdAt: 'desc',
      },
    })
  }),

  // 特定のタスクを取得するAPI
  getSingleTask: authedProcedure
  .input(getSingleTaskSchema)
  .query(({ ctx, input }) => {
    return ctx.prisma.task.findUnique({
      where:{
        id: input.taskId,
      },
    })
  }),

  // タスクを更新するAPI
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

  // タスクを削除するAPI
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