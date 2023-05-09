// ストアと trpc ユーティリティをインポート
import useStore from "../store";
import { trpc } from "../utils/trpc";

// useMutateTask フックを定義
export const useMutateTask = () => {
  // trpc の context を取得
  const utils = trpc.useContext();
  // 編集中のタスクをリセットする関数を取得
  const reset = useStore((state) => state.resetEditedTask);

  // タスクを作成するミューテーションを定義
  const createTaskMutation = trpc.todo.createTask.useMutation({
    // ミューテーションが成功したときの処理
    onSuccess: (res) => {
      // 既存のタスクデータを取得
      const previousTodos = utils.todo.getTasks.getData();
      // もし既存のタスクデータが存在すれば
      if (previousTodos) {
        // 新しく作成したタスクを既存のタスクリストの先頭に追加して、データを更新
        utils.todo.getTasks.setData(undefined, [res, ...previousTodos]);
      }
      // 編集中のタスクをリセット
      reset();
    },
  });

  // タスクを更新するミューテーションを定義
  const updateTaskMutation = trpc.todo.updateTask.useMutation({
    // ミューテーションが成功したときの処理
    onSuccess: (res) => {
      // 既存のタスクデータを取得
      const previousTodos = utils.todo.getTasks.getData();
      // もし既存のタスクデータが存在すれば
      if (previousTodos) {
        // 更新されたタスクのIDが一致する既存のタスクを更新したタスクで置き換えて、データを更新
        utils.todo.getTasks.setData(
          undefined,
          previousTodos.map((task) => (task.id === res.id ? res : task))
        );
      }
      // 編集中のタスクをリセット
      reset();
    },
  });

  // タスクを削除するミューテーションを定義
  const deleteTaskMutation = trpc.todo.deleteTask.useMutation({
    // ミューテーションが成功したときの処理
    onSuccess: (_, variables) => {
      // 既存のタスクデータを取得
      const previousTodos = utils.todo.getTasks.getData();
      // もし既存のタスクデータが存在すれば
      if (previousTodos) {
        // 削除されたタスクを既存のタスクリストから取り除いて、データを更新
        utils.todo.getTasks.setData(
          undefined,
          previousTodos.filter((task) => task.id !== variables.taskId)
        );
      }
      // 編集中のタスクをリセット
      reset();
    },
  });

  // タスクを作成、更新、削除するためのミューテーションを戻り値として返す
  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
