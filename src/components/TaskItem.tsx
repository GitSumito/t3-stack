// React と Next.js のライブラリをインポート
import type { FC } from "react"; // Functional Component の型をインポートします
import Link from "next/link"; // Next.js の Link コンポーネントをインポートします。これによりクライアントサイドのルーティングが可能になります

// カスタムフックとストアをインポート
import useStore from "../store"; // グローバルステートを管理するためのカスタムフックをインポートします
import type { updateTaskInput } from "../schema/todo"; // タスク更新時の入力型をインポートします

// アイコンをインポート
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"; // 編集と削除のアイコンをインポートします

// タスクの状態を変更するカスタムフックをインポート
import { useMutateTask } from "../hooks/useMutateTask"; // タスクの作成、更新、削除を行うためのカスタムフックをインポートします

// TaskItem コンポーネントを定義
export const TaskItem: FC<updateTaskInput> = ({ taskId, title, body }) => { // タスク一つ分の情報を表示するコンポーネントです。taskId、title、bodyの3つのプロパティを持つオブジェクトを引数に取ります

  // 編集中のタスクを更新する関数を取得
  // useStoreはZustandのステートをフック（取得）するためのカスタムフックです。
  // これにより、Reactのコンポーネント内でZustandのステートを読み取ることができます。
  // この関数は、Zustandのステートを更新するために使用されます。ここでstateは現在の全体のZustandのステートを表します。
  // また、stateは直接宣言されていませんが、useStoreフックを使用するときに自動的に提供されます。
  const update = useStore((state) => state.updateEditedTask);

  // タスクを削除するためのミューテーションを取得
  const { deleteTaskMutation } = useMutateTask(); // タスクを削除するためのミューテーションを取得します

  return (
    <li>
      {/* //タスクの詳細ページへのリンクを表示 */}
      <Link href={`/task/${taskId}`} className="cursor-pointer"> {/* // タスクの詳細ページへのリンクを作成します。URLパスは"/task/タスクのID"となります */}
        {title} {/* /// タスクのタイトルを表示します */}
      </Link>
      <div className="float-right ml-20 flex"> {/* // 右寄せのdiv要素を作成します。この中に編集と削除のアイコンが配置されます */}
        {/* //編集アイコンを表示し、クリック時に編集中のタスクを更新 */}
        <PencilIcon // 編集アイコンを表示します
          className="mx-1 h-5 w-5 cursor-pointer text-blue-600" //アイコンのスタイルを設定します
          onClick={() =>
          {
            update({
              taskId,
              title,
              body,
            });
          }}
        /> {/*// アイコンがクリックされたときに、タスクのID、タイトル、本文を使用して編集中のタスクを更新します*/}
        {/* 削除アイコンを表示し、クリック時にタスクを削除 */}
        <TrashIcon // 削除アイコンを表示します
          className="h-5 w-5 cursor-pointer text-blue-600" // アイコンのスタイルを設定します
          onClick={() => {
            deleteTaskMutation.mutate({ taskId });
          }}
        /> {/*// アイコンがクリックされたときに、タスクのIDを使用してタスクを削除します*/}
      </div>
      {/* ミューテーションが処理中の場合、メッセージを表示 */}
      {deleteTaskMutation.isLoading && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )} {/*// タスクの削除が処理中の場合、"Mutation under process..."というテキストを表示します*/}
    </li>
  );
};
