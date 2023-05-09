// zodライブラリをインポートします。zodはスキーマ検証と型推論のためのライブラリです。
import z from 'zod'

// タスク作成時に必要なデータのスキーマを定義します。ここではタイトルと本文が必要であることを示しています。
// タイトルは最大20文字、本文は最低5文字である必要があると指定しています。
export const createTaskSchema = z.object({
    title: z.string().max(20),
    body: z.string().min(5),
})

// createTaskSchemaの型を推論して、CreateTaskInput型としてエクスポートします。
// これにより、createTaskSchemaを適用するデータはCreateTaskInput型であることが保証されます。
// z.TypeOf<>は、Zod スキーマから TypeScript の型を生成するためのユーティリティタイプです。

// Zod スキーマは、実行時にデータ構造を検証するためのものですが、
// このスキーマから TypeScript の型を生成することで、コンパイル時にもデータ構造を検証することが可能になります。
// これにより、型の安全性を向上させ、開発時のミスを早期に発見することができます。
export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>

// タスク更新時に必要なデータのスキーマを定義します。タスクID、タイトル、本文が必要であることを示しています。
// タスクIDはCUID形式、タイトルは最大20文字、本文は最低5文字である必要があると指定しています。
export const updateTaskSchema = z.object({
    taskId: z.string().cuid(),
    title: z.string().max(20),
    body: z.string().min(5),
})

// updateTaskSchemaの型を推論して、updateTaskInput型としてエクスポートします。
// これにより、updateTaskSchemaを適用するデータはupdateTaskInput型であることが保証されます。
export type updateTaskInput = z.TypeOf<typeof updateTaskSchema>

// 特定のタスクを取得する際に必要なデータのスキーマを定義します。
// ここではタスクIDが必要であることを示しています。
// タスクIDはCUID形式である必要があると指定しています。
export const getSingleTaskSchema = z.object({
    taskId: z.string().cuid(),
})

// タスク削除時に必要なデータのスキーマを定義します。ここではタスクIDが必要であることを示しています。
// タスクIDはCUID形式である必要があると指定しています。
export const deleteTaskSchema = z.object({
    taskId: z.string().cuid(),
})
