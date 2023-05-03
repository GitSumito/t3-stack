// React と Next.js のライブラリをインポート
import type { FC } from "react";
import Link from "next/link";

// カスタムフックとストアをインポート
import useStore from "../store";
import type { updateTaskInput } from "../schema/todo";

// アイコンをインポート
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

// タスクの状態を変更するカスタムフックをインポート
import { useMutateTask } from "../hooks/useMutateTask";

// TaskItem コンポーネントを定義
export const TaskItem: FC<updateTaskInput> = ({ taskId, title, body }) => {
  // 編集中のタスクを更新する関数を取得
  const update = useStore((state) => state.updateEditedTask);

  // タスクを削除するためのミューテーションを取得
  const { deleteTaskMutation } = useMutateTask();

  return (
    <li>
      {/* タスクの詳細ページへのリンクを表示 */}
      <Link href={`/task/${taskId}`} className="cursor-pointer">
        {title}
      </Link>
      <div className="float-right ml-20 flex">
        {/* 編集アイコンを表示し、クリック時に編集中のタスクを更新 */}
        <PencilIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-600"
          onClick={() => {
            update({
              taskId,
              title,
              body,
            });
          }}
        />
        {/* 削除アイコンを表示し、クリック時にタスクを削除 */}
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-600"
          onClick={() => {
            deleteTaskMutation.mutate({ taskId });
          }}
        />
      </div>
      {/* ミューテーションが処理中の場合、メッセージを表示 */}
      {deleteTaskMutation.isLoading && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )}
    </li>
  );
};
