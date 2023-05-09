// 特定のタスクの詳細を表示するページのコンポーネントを定義
// 必要なモジュールとコンポーネントをインポート
import Link from 'next/link'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { format } from 'date-fns' // 日付をフォーマットするためのライブラリ
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid' // Heroiconsからアイコンをインポート
import { trpc } from '../../utils/trpc' // tRPCユーティリティをインポート
import { Layout } from '../../components/Layout' // Layoutコンポーネントをインポート

// タスク詳細ページのコンポーネントを定義
const SingleTaskPage: NextPage = () => {
  // useRouterフックを使ってルーティング情報を取得
  const router = useRouter()
  // URLパラメータからタスクIDを取得
  const taskId = router.query.taskId as string
  // tRPCを使って特定のタスクのデータをフェッチ
  const { data, isLoading, error } = trpc.todo.getSingleTask.useQuery({
    taskId,
  })
  // データの読み込み中の場合、ローディングメッセージを表示
  if (isLoading) {
    return <Layout title="Task Detail">Loading single task...</Layout>
  }
  // エラーが発生した場合、エラーメッセージを表示
  if (error) {
    return <Layout title="Task Detail">{error.message}</Layout>
  }
  // タスクの詳細情報を表示
  return (
    <Layout title="Task Detail">
      <p className="mb-3 text-xl font-bold text-blue-600">{data?.title}</p>
      <p>{data?.body}</p>
      <p className="my-1 text-sm">
        {data && format(new Date(data.createdAt), 'yyyy-MM-dd HH:mm:ss')}
      </p>
      <p className="my-1 text-sm">
        {data && format(new Date(data.updatedAt), 'yyyy-MM-dd HH:mm:ss')}
      </p>
      <Link href={`/`}>
        <ArrowUturnLeftIcon className="mt-3 h-6 w-6 cursor-pointer text-blue-600" />
      </Link>
    </Layout>
  )
}

// SingleTaskPageコンポーネントをエクスポート
export default SingleTaskPage

// Next.jsのuseRouterフックを用いてURLパラメータからタスクIDを取得し、
// そのIDを用いてtRPCを使ってデータをフェッチしています。
// 上記のコードは、<Link>コンポーネントを使ってホームページへのリンクを提供しています。
// <ArrowUturnLeftIcon>は、ユーザーがクリックするとホームページに戻るアイコンです。
// 最後に、SingleTaskPageコンポーネントをエクスポートしています。
// これにより、このコンポーネントはアプリケーションの他の部分から使用できるようになります。