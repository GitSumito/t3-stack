// React と関連ライブラリから必要な型・関数をインポート
import type { FormEvent } from "react";
import useStore from "../store";
import { useMutateTask } from "../hooks/useMutateTask";

// タスク作成・更新フォームのコンポーネントを定義
export const TaskForm = () => {
  // useMutateTask フックからタスク作成・更新に関する mutation を取得
  const { createTaskMutation, updateTaskMutation } = useMutateTask();
  
  // Zustand ストアから編集中のタスクを取得
  const { editedTask } = useStore();
  
  // Zustand ストアからタスクの更新関数を取得
  const update = useStore((state) => state.updateEditedTask);

  // フォームの送信時のハンドラを定義
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // デフォルトのフォーム送信をキャンセル
    
    // 編集中のタスクの ID が空文字列（新規タスク）の場合と既存のタスクの場合で処理を分岐
    if (editedTask.taskId === "")
      createTaskMutation.mutate({
        title: editedTask.title,
        body: editedTask.body,
      });
    else {
      updateTaskMutation.mutate({
        taskId: editedTask.taskId,
        title: editedTask.title,
        body: editedTask.body,
      });
    }
  };

  // フォームの JSX を返す
  return (
    // フォームを定義
    <form onSubmit={handleSubmit} className="mb-5 text-center">
      {/* // mutation が処理中の場合、処理中であることを表示*/}
      {(updateTaskMutation.isLoading || createTaskMutation.isLoading) && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )}
      {/* // タイトル入力フィールド*/}
      <input
        type="text"
        className="mb-3 border border-gray-300 px-3 py-2"
        placeholder="Title"
        value={editedTask.title || ""}
        onChange={(e) => update({ ...editedTask, title: e.target.value })}
      />
      {/* // タイトルのバリデーションエラーメッセージ*/}
      <p className="mb-3 text-pink-500">
        {createTaskMutation.error?.data?.zodError &&
          createTaskMutation.error.data.zodError.fieldErrors.title}
      </p>
      {/* // 本文入力フィールド*/}
      <textarea
        className="mb-3 border border-gray-300 px-3 py-2"
        placeholder="Body"
        value={editedTask.body || ""}
        onChange={(e) => update({ ...editedTask, body: e.target.value })}
      />
      {/* // 本文のバリデーションエラーメッセージ*/}
      <p className="mb-3 text-pink-500">
        {createTaskMutation.error?.data?.zodError &&
          createTaskMutation.error.data.zodError.fieldErrors.body}
      </p>
      {/* // 送信ボタン。新規作成と更新で表示テキストが変わる*/}
      <button className="rounded bg-indigo-600 py-1 px-3 text-white hover:bg-indigo-700 focus:outline-none">
        {editedTask.taskId === "" ? "Create" : "Update"}
      </button>
    </form>
  );
};
